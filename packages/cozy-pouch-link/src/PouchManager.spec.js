/* global jest */

import PouchManager from './PouchManager'
import * as mocks from './__tests__/mocks'

jest.mock('pouchdb')

const sleep = delay => {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

describe('PouchManager', () => {
  let manager,
    getReplicationURL,
    onSync = jest.fn()

  beforeEach(() => {
    getReplicationURL = () => 'replicationURL'
    manager = new PouchManager(['io.cozy.todos'], {
      replicationDelay: 16,
      getReplicationURL: () => getReplicationURL(),
      onSync
    })
    const pouch = manager.getPouch('io.cozy.todos')
    const replication = mocks.pouchReplication({
      changes: {
        docs: [
          { _id: '1', name: 'Make replication work' },
          { _id: '2', name: 'Profit!' }
        ]
      }
    })
    pouch.sync = jest.fn().mockImplementation(replication)
  })

  afterEach(() => {
    manager.destroy()
  })

  it('should create pouches', () => {
    expect(Object.values(manager.pouches).length).toBe(1)
  })

  it('should periodically call replicate', async () => {
    manager.startReplicationLoop()
    await sleep(1000)
    const pouch = manager.getPouch('io.cozy.todos')
    expect(pouch.sync.mock.calls.length).toBeGreaterThan(5)
  })

  it('should stop in case of error', async () => {
    getReplicationURL = () => {
      throw new Error()
    }
    jest.spyOn(console, 'warn').mockReturnValue()
    jest.spyOn(manager, 'stopReplicationLoop')
    manager.startReplicationLoop()
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
})
