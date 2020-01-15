import CozyClient from '../../cozy-client/src'
import omit from 'lodash/omit'

import CozyPouchLink from '.'
import { SCHEMA, TODO_1, TODO_2, TODO_3, TODO_4 } from './__tests__/fixtures'
import PouchDB from 'pouchdb-browser'
import PouchDBMemoryAdapterPlugin from 'pouchdb-adapter-memory'

import { Q } from 'cozy-client'

// Necessary to have the memory adapter for the tests since neither
// IndexedDB nor WebSQL adapter can be used in Jest
PouchDB.plugin(PouchDBMemoryAdapterPlugin)

const mockClient = {
  stackClient: {
    uri: 'http://cozy.tools:8080',
    token: {
      toBasicAuth: () => 'user:token@'
    }
  }
}

const TODO_DOCTYPE = SCHEMA.todos.doctype

let client, link

async function setup(linkOpts = {}) {
  link = new CozyPouchLink({ doctypes: [TODO_DOCTYPE], ...linkOpts })

  client = new CozyClient({
    ...mockClient,
    links: [link],
    warningForCustomHandlers: false,
    schema: {
      todos: omit(SCHEMA.todos, ['relationships'])
    }
  })

  await link.onLogin()
  client.setData = jest.fn()
}

async function clean() {
  await link.reset()
}

describe('CozyPouchLink', () => {
  afterEach(clean)

  it('should generate replication url', async () => {
    await setup()
    const url = await link.getReplicationURL(TODO_DOCTYPE)
    expect(url).toBe('http://user:token@cozy.tools:8080/data/io.cozy.todos')
  })

  describe('request handling', () => {
    it('should check if the doctype is supported and forward if not', async () => {
      await setup()
      const query = Q('io.cozy.rockets')
      await link.request(query, null, () => {
        expect(true).toBe(true)
        return Promise.resolve()
      })
    })

    it('should check if the pouch is synced and forward if not', async () => {
      await setup()
      const query = Q(TODO_DOCTYPE)
      expect.assertions(1)
      await link.request(query, null, () => {
        expect(true).toBe(true)
      })
    })
  })

  describe('queries', () => {
    const docs = [TODO_1, TODO_2, TODO_3, TODO_4]
    it('should be able to execute a query', async () => {
      await setup()
      link.pouches.isSynced = jest.fn().mockReturnValue(true)
      const db = link.getPouch(TODO_DOCTYPE)
      db.post({
        label: 'Make PouchDB link work',
        done: false
      })
      const query = Q(TODO_DOCTYPE)
      const docs = await link.request(query)
      expect(docs.data.length).toBe(1)
    })

    it('should be possible to query only one doc', async () => {
      await setup()
      link.pouches.isSynced = jest.fn().mockReturnValue(true)
      const db = link.getPouch(TODO_DOCTYPE)
      db.post({
        _id: 'deadbeef',
        label: 'Make PouchDB link work',
        done: false
      })
      const query = client.get(TODO_DOCTYPE, 'deadbeef')
      const resp = await link.request(query)
      expect(resp.data.label).toBe('Make PouchDB link work')
    })

    it('should be possible to select', async () => {
      await setup()
      link.pouches.isSynced = jest.fn().mockReturnValue(true)
      const db = link.getPouch(TODO_DOCTYPE)
      await db.bulkDocs(docs.map(x => omit(x, '_type')))
      const query = client
        .find(TODO_DOCTYPE, { label: { $gt: null }, done: true })
        .sortBy([{ done: 'asc' }, { label: 'asc' }])
      const res = await link.request(query)
      // expect(link.hasIndex('io.cozy.todos/by_done_and_id')).toBe(true)
      expect(res).toMatchObject({
        data: [
          {
            label: 'Build stuff',
            _type: TODO_DOCTYPE
          },
          {
            label: 'Run a semi-marathon',
            _type: TODO_DOCTYPE
          }
        ],
        meta: {
          count: 2
        },
        skip: 0,
        next: false
      })
    })
  })

  describe('mutations', () => {
    it('should be possible to save a new document', async () => {
      await setup()
      link.pouches.isSynced = jest.fn().mockReturnValue(true)
      const { _id, ...NEW_TODO } = TODO_3
      const mutation = client.getDocumentSavePlan(NEW_TODO)
      const res = await link.request(mutation)
      expect(res).toMatchObject({
        data: {
          id: expect.any(String),
          _id: expect.any(String),
          _rev: expect.any(String),
          label: 'Build stuff',
          _type: TODO_DOCTYPE
        }
      })
    })

    it('should be possible to update a document', async () => {
      await setup()
      link.pouches.isSynced = jest.fn().mockReturnValue(true)
      const { _id, ...NEW_TODO } = TODO_3
      const saveMutation = client.getDocumentSavePlan(NEW_TODO)
      const saved = (await link.request(saveMutation)).data
      const updateMutation = client.getDocumentSavePlan({
        ...saved,
        done: false
      })
      const updated = (await link.request(updateMutation)).data
      expect(updated).toMatchObject({
        label: 'Build stuff',
        done: false
      })
    })
  })

  describe('reset', () => {
    let spy

    afterEach(async () => {
      spy.mockRestore()
    })

    it('should delete all databases', async () => {
      await setup()
      spy = jest.spyOn(link.pouches, 'destroy').mockReturnValue(jest.fn())
      const pouches = link.pouches
      await link.reset()
      expect(pouches.destroy).toHaveBeenCalledTimes(1)
    })

    it('should delete client', async () => {
      await setup()
      spy = jest.spyOn(link.pouches, 'destroy').mockReturnValue(jest.fn())
      link.registerClient(jest.fn())
      expect(link.client).not.toBeNull()
      await link.reset()
      expect(link.client).toBeNull()
    })

    it('should forget the PouchManager instance', async () => {
      await setup()
      await link.reset()
      expect(link.pouches).toBeNull()
    })
  })

  describe('onSync', () => {
    it('should call setData with normalized data', async () => {
      await setup()
      link.handleOnSync({
        'io.cozy.todos': [{ ...TODO_1, rev: '1-deadbeef' }]
      })
      expect(client.setData).toHaveBeenCalledTimes(1)
      expect(client.setData).toHaveBeenCalledWith({
        'io.cozy.todos': [
          {
            _id: '1',
            _rev: '1-deadbeef',
            _type: 'io.cozy.todos',
            done: false,
            id: '1',
            label: 'Buy bread'
          }
        ]
      })
    })
  })

  describe('onLogin', () => {
    let spy

    afterEach(() => {
      spy.mockRestore()
    })

    it('should start the replication loop if `options.initialSync` is true', async () => {
      spy = jest
        .spyOn(CozyPouchLink.prototype, 'startReplication')
        .mockReturnValue(jest.fn())

      await setup({ initialSync: true })

      expect(link.startReplication).toHaveBeenCalledTimes(1)
    })

    it('should not start the replication loop if `options.initialSync` is false', async () => {
      spy = jest
        .spyOn(CozyPouchLink.prototype, 'startReplication')
        .mockReturnValue(jest.fn())

      await setup({ initialSync: false })

      expect(link.startReplication).not.toHaveBeenCalled()
    })
  })

  describe('immediate sync', () => {
    it('should not throw if pouches not there', async () => {
      await setup()
      link.pouches = null
      expect(() => {
        link.syncImmediately()
      }).not.toThrow()
    })
    it('should call syncImmediately on pouch manager', async () => {
      await setup()
      link.pouches.syncImmediately = jest.fn().mockImplementation(() => {})
      await link.syncImmediately()
      expect(link.pouches.syncImmediately).toHaveBeenCalled()
    })
  })

  describe('login', () => {
    it('should throw if the stack client uri is not initialized', () => {
      const clientWithoutUri = {
        stackClient: {
          token: {
            toBasicAuth: () => 'user:token@'
          }
        }
      }

      const link = new CozyPouchLink({ doctypes: [TODO_DOCTYPE] })
      const client = new CozyClient({
        ...clientWithoutUri,
        links: [link],
        warningForCustomHandlers: false,
        schema: {
          todos: omit(SCHEMA.todos, ['relationships'])
        }
      })

      link.registerClient(client)

      expect(link.onLogin()).rejects.toThrow()
    })
  })
})
