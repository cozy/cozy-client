/* global jest */

// TODO use jest.useFakeTimers() to speed up the tests
// See https://github.com/cozy/cozy-client/pull/239 for example
// on how to use fake timers with setTimeout created in promises.

import PouchManager, { LOCALSTORAGE_SYNCED_KEY } from './PouchManager'
import * as mocks from './__tests__/mocks'
import { isMobileApp } from 'cozy-device-helper'

jest.mock('pouchdb-browser')
jest.mock('cozy-device-helper')
import PouchDB from 'pouchdb-browser'

const sleep = delay => {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

describe('PouchManager', () => {
  let manager,
    managerOptions,
    getReplicationURL,
    onSync = jest.fn()

  beforeEach(() => {
    getReplicationURL = () => 'replicationURL'
    managerOptions = {
      replicationDelay: 16,
      getReplicationURL: () => getReplicationURL(),
      onSync,
      prefix: 'cozy.tools'
    }
    manager = new PouchManager(['io.cozy.todos'], managerOptions)
    const pouch = manager.getPouch('io.cozy.todos')
    const replication = mocks.pouchReplication({
      direction: 'pull',
      change: {
        docs: [
          { _id: '1', name: 'Make replication work' },
          { _id: '2', name: 'Profit!' }
        ]
      }
    })
    pouch.sync = jest.fn().mockImplementation(replication)
    pouch.info = jest.fn().mockImplementation(() => Promise.resolve())
    PouchDB.mockReset()
    PouchDB.plugin.mockReset()
  })

  afterEach(() => {
    manager.destroy()
  })

  it('should create pouches', () => {
    expect(Object.values(manager.pouches).length).toBe(1)
  })

  it('should call info() on all pouches before starting replication', async () => {
    manager.startReplicationLoop()
    await sleep(1)
    expect(manager.getPouch('io.cozy.todos').info).toHaveBeenCalled()
    manager.stopReplicationLoop()
    manager.startReplicationLoop()
    await sleep(1)

    // Database existence check should only occur once
    expect(manager.getPouch('io.cozy.todos').info).toHaveBeenCalledTimes(1)
  })

  it('should periodically call sync', async () => {
    manager.startReplicationLoop()
    await sleep(1000)
    const pouch = manager.getPouch('io.cozy.todos')
    expect(pouch.sync.mock.calls.length).toBeGreaterThan(5)
  })

  it('should only replicate from the remote for some doctypes', async () => {
    manager = new PouchManager(
      ['io.cozy.todos', 'io.cozy.readonly', 'io.cozy.writeonly'],
      {
        ...managerOptions,
        doctypesReplicationOptions: {
          'io.cozy.readonly': { strategy: 'fromRemote' },
          'io.cozy.writeonly': { strategy: 'toRemote' }
        }
      }
    )
    const normalPouch = manager.getPouch('io.cozy.todos')
    const readOnlyPouch = manager.getPouch('io.cozy.readonly')
    readOnlyPouch.replicate = {}
    readOnlyPouch.replicate.from = jest.fn()
    const writeOnlyPouch = manager.getPouch('io.cozy.writeonly')
    writeOnlyPouch.replicate = {}
    writeOnlyPouch.replicate.to = jest.fn()
    manager.startReplicationLoop()
    await sleep(1000)
    expect(readOnlyPouch.replicate.from).toHaveBeenCalled()
    expect(writeOnlyPouch.replicate.to).toHaveBeenCalled()
    expect(normalPouch.sync).toHaveBeenCalled()
  })

  it('should stop in case of error', async () => {
    getReplicationURL = () => {
      throw new Error()
    }
    jest.spyOn(console, 'warn').mockReturnValue()
    jest.spyOn(manager, 'stopReplicationLoop')
    manager.startReplicationLoop()
    await sleep(1)

    try {
      await manager.waitForCurrentReplications()
    } catch (e) {
      /* continue regardless of error */
    }
    expect(manager.stopReplicationLoop).toHaveBeenCalled()
  })

  it('should not start replication several times', async () => {
    jest.spyOn(manager, 'replicateOnce')
    manager.options.replicationDelay = 30 * 1000
    expect(manager.replicateOnce).toHaveBeenCalledTimes(0)
    manager.startReplicationLoop()
    await sleep(1)
    expect(manager.replicateOnce).toHaveBeenCalledTimes(1)
    manager.startReplicationLoop()
    await sleep(1)
    expect(manager.replicateOnce).toHaveBeenCalledTimes(1)
    manager.replicateOnce.mockRestore()
  })

  it('should sync immediately', async () => {
    try {
      await manager.startReplicationLoop()
      expect(manager.replicationLoop).not.toBeUndefined()
      jest.spyOn(manager.replicationLoop, 'scheduleImmediateTask')
      manager.syncImmediately()
      expect(manager.replicationLoop.scheduleImmediateTask).toHaveBeenCalled()
    } finally {
      manager.stopReplicationLoop()
    }
  })

  it('should call on sync with doctype updates', async () => {
    jest.spyOn(manager, 'replicateOnce')
    onSync.mockReset()
    await manager.replicateOnce()
    expect(onSync).toHaveBeenCalledWith({
      'io.cozy.todos': [
        {
          _id: '1',
          name: 'Make replication work'
        },
        {
          _id: '2',
          name: 'Profit!'
        }
      ]
    })
  })

  it('should add pouch plugin', async () => {
    const options = { ...managerOptions, pouch: { plugins: ['myPlugin'] } }
    new PouchManager(['io.cozy.todos'], options)
    expect(PouchDB.plugin).toHaveBeenCalledTimes(1)
  })

  it('should instanciate pouch with options', async () => {
    const pouchOptions = { adapter: 'cordova-sqlite', location: 'default' }
    const options = { ...managerOptions, pouch: { options: pouchOptions } }
    new PouchManager(['io.cozy.todos'], options)
    expect(PouchDB).toHaveBeenCalledWith(
      'cozy.tools_io.cozy.todos',
      pouchOptions
    )
  })

  describe('getPersistedSyncedDoctypes', () => {
    it('Should return an empty array if local storage is empty', () => {
      const manager = new PouchManager(['io.cozy.todos'], managerOptions)

      expect(manager.getPersistedSyncedDoctypes()).toEqual([])
    })

    it('Should return an empty array if local storage contains something that is not an array', () => {
      localStorage.__STORE__[LOCALSTORAGE_SYNCED_KEY] = 'true'
      const manager = new PouchManager(['io.cozy.todos'], managerOptions)

      expect(manager.getPersistedSyncedDoctypes()).toEqual([])
    })

    it('Should return the list of doctypes if local storage contains one', () => {
      const persistedSyncedDoctypes = ['io.cozy.todos']
      localStorage.__STORE__[LOCALSTORAGE_SYNCED_KEY] = JSON.stringify(
        persistedSyncedDoctypes
      )
      const manager = new PouchManager(['io.cozy.todos'], managerOptions)

      expect(manager.getPersistedSyncedDoctypes()).toEqual(
        persistedSyncedDoctypes
      )
    })
  })

  describe('persistSyncedDoctypes', () => {
    it('Should put the list of synced doctypes in localStorage', () => {
      const manager = new PouchManager(['io.cozy.todos'], managerOptions)
      manager.syncedDoctypes = ['io.cozy.todos']
      manager.persistSyncedDoctypes()

      expect(localStorage.__STORE__[LOCALSTORAGE_SYNCED_KEY]).toEqual(
        JSON.stringify(manager.syncedDoctypes)
      )
    })
  })

  describe('addSyncedDoctype', () => {
    it('Should add the doctype to synced doctypes', () => {
      const manager = new PouchManager(['io.cozy.todos'], managerOptions)
      manager.addSyncedDoctype('io.cozy.todos')

      expect(manager.syncedDoctypes).toEqual(['io.cozy.todos'])
    })

    it('Should persist the new synced doctypes list', () => {
      const manager = new PouchManager(['io.cozy.todos'], managerOptions)
      manager.persistSyncedDoctypes = jest.fn()
      manager.addSyncedDoctype('io.cozy.todos')

      expect(manager.persistSyncedDoctypes).toHaveBeenCalledTimes(1)
    })
  })

  describe('isSynced', () => {
    let manager

    beforeEach(() => {
      manager = new PouchManager(['io.cozy.todos'], managerOptions)
    })

    it('Should return true if the doctype is synced', () => {
      manager.addSyncedDoctype('io.cozy.todos')

      expect(manager.isSynced('io.cozy.todos')).toBe(true)
    })

    it('Should return false if the doctype is not synced', () => {
      expect(manager.isSynced('io.cozy.todos')).toBe(false)
    })
  })

  describe('destroySyncedDoctypes', () => {
    it('Should destroy the local storage item', () => {
      manager.destroySyncedDoctypes()

      expect(localStorage.removeItem).toHaveBeenLastCalledWith(
        LOCALSTORAGE_SYNCED_KEY
      )
    })
    it('Should reset syncedDoctypes', () => {
      manager.syncedDoctypes = ['io.cozy.todos']
      manager.destroySyncedDoctypes()
      expect(manager.syncedDoctypes).toEqual([])
    })
  })

  describe('Events Listeners', () => {
    describe('Add/Remove Listeners', () => {
      beforeEach(() => {
        isMobileApp.mockResolvedValue(true)
        // eslint-disable-next-line no-global-assign
        addEventListener = jest.spyOn(document, 'addEventListener')
        // eslint-disable-next-line no-global-assign
        removeEventListener = jest.spyOn(document, 'removeEventListener')
        jest.resetModules()
      })

      it('starts without listener', () => {
        expect(addEventListener).not.toHaveBeenCalled()
        expect(removeEventListener).not.toHaveBeenCalled()
      })

      it('adds listeners only one time', () => {
        expect(addEventListener).not.toHaveBeenCalled()
        manager.addListeners()
        expect(addEventListener).toHaveBeenCalled()
        const calls = addEventListener.mock.calls
        manager.addListeners()
        expect(addEventListener).toHaveBeenCalledTimes(calls.length)
      })

      it('removes listeners only one time', () => {
        expect(removeEventListener).not.toHaveBeenCalled()
        manager.addListeners()
        manager.removeListeners()
        expect(removeEventListener).toHaveBeenCalled()
        const calls = addEventListener.mock.calls
        manager.removeListeners()
        expect(removeEventListener).toHaveBeenCalledTimes(calls.length)
      })
    })

    describe('Each Events', () => {
      let startReplicationLoop, stopReplicationLoop

      beforeEach(() => {
        isMobileApp.mockResolvedValue(true)
        startReplicationLoop = jest.spyOn(manager, 'startReplicationLoop')
        stopReplicationLoop = jest.spyOn(manager, 'stopReplicationLoop')
        manager.addListeners()
      })

      afterEach(() => {
        startReplicationLoop.mockRestore()
        stopReplicationLoop.mockRestore()
      })

      for (const eventName of ['resume', 'online']) {
        it(`check ${eventName} listener to start replication`, () => {
          document.dispatchEvent(new Event(eventName))
          expect(startReplicationLoop).toHaveBeenCalled()
          expect(stopReplicationLoop).not.toHaveBeenCalled()
        })
      }

      for (const eventName of ['pause', 'offline']) {
        it(`check ${eventName} listener to start replication`, () => {
          document.dispatchEvent(new Event(eventName))
          expect(startReplicationLoop).not.toHaveBeenCalled()
          expect(stopReplicationLoop).toHaveBeenCalled()
        })
      }
    })
  })
})
