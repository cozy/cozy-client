import omit from 'lodash/omit'

import { find, allDocs, withoutDesignDocuments } from './helpers'
jest.mock('./helpers', () => ({
  find: jest.fn(),
  allDocs: jest.fn(),
  normalizeFindSelector: jest.requireActual('./helpers').default
    .normalizeFindSelector,
  withoutDesignDocuments: jest.fn()
}))

import CozyPouchLink from '.'
import { SCHEMA, TODO_1, TODO_2, TODO_3, TODO_4 } from './__tests__/fixtures'
import PouchDB from 'pouchdb-browser'
import PouchDBMemoryAdapterPlugin from 'pouchdb-adapter-memory'
import CozyClient, { Q } from 'cozy-client'

// Necessary to have the memory adapter for the tests since neither
// IndexedDB nor WebSQL adapter can be used in Jest
PouchDB.plugin(PouchDBMemoryAdapterPlugin)

const mockClient = {
  stackClient: {
    uri: 'http://cozy.tools:8080',
    token: {
      toBasicAuth: () => 'user:token@'
    },
    on: jest.fn()
  }
}

const TODO_DOCTYPE = SCHEMA.todos.doctype

let client, link

async function setup(linkOpts = {}) {
  jest.spyOn(CozyPouchLink.prototype, 'executeMutation')
  jest.spyOn(CozyPouchLink.prototype, 'executeQuery')

  link = new CozyPouchLink({ doctypes: [TODO_DOCTYPE], ...linkOpts })

  client = new CozyClient({
    ...mockClient,
    links: [link],
    warningForCustomHandlers: false,
    schema: {
      todos: omit(SCHEMA.todos, ['relationships'])
    }
  })
  client.emit = jest.fn()
  await link.onLogin()

  client.setData = jest.fn()
}

async function clean() {
  await link.reset()
}

describe('CozyPouchLink', () => {
  beforeEach(() => {
    allDocs.mockReturnValue({ docs: [] })
    withoutDesignDocuments.mockReturnValue({ docs: [] })
    find.mockReturnValue({ docs: [] })
  })
  afterEach(clean)

  it('should generate replication url', async () => {
    await setup()
    const url = await link.getReplicationURL(TODO_DOCTYPE)
    expect(url).toBe('http://user:token@cozy.tools:8080/data/io.cozy.todos')
  })

  describe('request handling', () => {
    const query1 = () => ({
      definition: () => Q(TODO_DOCTYPE).limitBy(100),
      options: {
        as: 'query1'
      }
    })
    const query2 = () => ({
      definition: () => Q(TODO_DOCTYPE).limitBy(100),
      options: {
        as: 'query2'
      }
    })

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

    it('should check if the pouch is synced and queries warmuped and forward if not', async () => {
      await setup({
        doctypesReplicationOptions: {
          TODO_DOCTYPE: { warmupQueries: [query1(), query2()] }
        }
      })
      const query = Q(TODO_DOCTYPE)
      expect.assertions(1)
      await link.request(query, null, () => {
        expect(true).toBe(true)
      })
    })

    it('should not forward if the pouch is synced and there is no warmup queries for this doctype', async () => {
      await setup({
        doctypesReplicationOptions: {
          'io.cozy.files': { warmupQueries: [query1(), query2()] }
        }
      })
      link.pouches.getSyncStatus = jest.fn().mockReturnValue('synced')

      const query = Q(TODO_DOCTYPE)
      expect.assertions(0)
      await link.request(query, null, () => {
        expect(true).toBe(true)
      })
    })

    test('supportsOperation returns false if the doctype is synched with a read only strategy and the operation is a mutation', async () => {
      const operationTODO = {
        doctype: TODO_DOCTYPE,
        mutationType: 'CREATE_DOCUMENT',
        document: { _type: 'io.cozy.todos' }
      }

      await setup({
        doctypesReplicationOptions: {
          'io.cozy.todos': { strategy: 'fromRemote' }
        }
      })

      expect(link.supportsOperation(operationTODO)).toBe(false)
    })

    test('supportsOperation returns true if the doctype is synched with a read only strategy and the operation is not a mutation', async () => {
      const operationTODO = {
        doctype: TODO_DOCTYPE
      }

      await setup({
        doctypesReplicationOptions: {
          'io.cozy.todos': { strategy: 'fromRemote' }
        }
      })

      expect(link.supportsOperation(operationTODO)).toBe(true)
    })

    test('supportsOperation with a synchronized doctype', async () => {
      const operationTODO = {
        doctype: TODO_DOCTYPE
      }

      await setup()
      expect(link.supportsOperation(operationTODO)).toBe(true)
    })

    it('should forward if the doctype is synched only for read access and the query is a mutation', async () => {
      await setup({
        doctypesReplicationOptions: {
          'io.cozy.todos': { strategy: 'fromRemote' }
        }
      })
      link.pouches.getSyncStatus = jest.fn().mockReturnValue('synced')
      await link.request(
        {
          doctype: TODO_DOCTYPE,
          mutationType: 'CREATE_DOCUMENT',
          document: { _type: 'io.cozy.todos' }
        },
        null,
        () => {
          expect(true).toBe(true)
        }
      )
    })

    it('should not forward if the doctype is synched only for read access and the query is not a mutation', async () => {
      await setup({
        doctypesReplicationOptions: {
          'io.cozy.todos': { strategy: 'fromRemote' }
        }
      })
      link.pouches.getSyncStatus = jest.fn().mockReturnValue('synced')
      const mock = jest.fn()
      await link.request(Q(TODO_DOCTYPE), null, mock)
      expect(mock).not.toHaveBeenCalled()
    })
  })

  describe('queries', () => {
    beforeEach(() => {
      allDocs.mockReturnValue({ docs: [TODO_1] })
      withoutDesignDocuments.mockReturnValue({ docs: [TODO_1] })
      find.mockReturnValue({ docs: [TODO_1] })
    })
    const docs = [TODO_1, TODO_2, TODO_3, TODO_4]
    it('should be able to execute a query', async () => {
      await setup()
      link.pouches.getSyncStatus = jest.fn().mockReturnValue('synced')
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
      link.pouches.getSyncStatus = jest.fn().mockReturnValue('synced')
      const db = link.getPouch(TODO_DOCTYPE)
      db.post({
        _id: 'deadbeef',
        label: 'Make PouchDB link work',
        done: false
      })
      const query = Q(TODO_DOCTYPE).getById('deadbeef')
      const resp = await link.request(query)
      expect(resp.data.label).toBe('Make PouchDB link work')
    })

    it('should be possible to explicitly index fields', async () => {
      find.mockReturnValue({ docs: [TODO_3, TODO_4] })
      await setup()
      link.pouches.getSyncStatus = jest.fn().mockReturnValue('synced')
      const db = link.getPouch(TODO_DOCTYPE)
      await db.bulkDocs(docs.map(x => omit(x, '_type')))
      const query = Q(TODO_DOCTYPE)
        .where({ done: true, label: { $gt: null } })
        .indexFields(['label', 'done'])
      const resp = await link.request(query)
      expect(resp.data.length).toEqual(2)
      expect(resp.data[0]._id).toEqual(TODO_3._id)
      expect(resp.data[1]._id).toEqual(TODO_4._id)
    })

    it('should be possible to query multiple docs', async () => {
      withoutDesignDocuments.mockReturnValue({ docs: [TODO_1, TODO_3] })
      await setup()
      link.pouches.getSyncStatus = jest.fn().mockReturnValue('synced')
      const db = link.getPouch(TODO_DOCTYPE)
      await db.bulkDocs(docs.map(x => omit(x, '_type')))
      const ids = [TODO_1._id, TODO_3._id]
      const query = Q(TODO_DOCTYPE).getByIds(ids)
      const resp = await link.request(query)
      expect(resp.next).toBe(false)
      expect(resp.data.length).toEqual(2)
      expect(resp.data[0]._id).toEqual(TODO_1._id)
      expect(resp.data[1]._id).toEqual(TODO_3._id)
    })

    it('should be possible to select', async () => {
      find.mockReturnValue({ docs: [TODO_3, TODO_4] })
      await setup()
      link.pouches.getSyncStatus = jest.fn().mockReturnValue('synced')
      const db = link.getPouch(TODO_DOCTYPE)
      await db.bulkDocs(docs.map(x => omit(x, '_type')))
      const query = Q(TODO_DOCTYPE)
        .where({ label: { $gt: null }, done: true })
        .indexFields(['done', 'label'])
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

    it("should add _id in the selected fields since CozyClient' store needs it", async () => {
      find.mockReturnValue({ docs: [TODO_3, TODO_4] })
      await setup()
      link.pouches.getSyncStatus = jest.fn().mockReturnValue('synced')
      const db = link.getPouch(TODO_DOCTYPE)
      await db.bulkDocs(docs.map(x => omit(x, '_type')))
      const query = Q(TODO_DOCTYPE)
        .where({ label: { $gt: null }, done: true })
        .indexFields(['done', 'label'])
        .sortBy([{ done: 'asc' }, { label: 'asc' }])
        .select(['label', 'done'])
      await link.request(query)
      expect(find).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({
          fields: ['label', 'done', '_id', '_rev']
        })
      )
    })
  })

  describe('mutations', () => {
    it('should be possible to save a new document', async () => {
      await setup()
      link.pouches.getSyncStatus = jest.fn().mockReturnValue('synced')
      const { _id, ...NEW_TODO } = TODO_3
      const mutation = client.getDocumentSavePlan(NEW_TODO)
      const res = await link.request(mutation)
      expect(link.executeMutation).toHaveBeenCalled()
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

    it('should be possible to save multiple documents', async () => {
      await setup()
      link.pouches.getSyncStatus = jest.fn().mockReturnValue('synced')
      const { _id, ...NEW_TODO } = TODO_3
      const res = await client.saveAll([TODO_3, TODO_4, NEW_TODO])
      expect(link.executeMutation).toHaveBeenCalled()
      expect(res).toMatchObject({
        data: [
          expect.objectContaining({
            label: 'Build stuff',
            _rev: expect.any(String)
          }),
          expect.objectContaining({
            label: 'Run a semi-marathon',
            _rev: expect.any(String)
          }),
          expect.objectContaining({
            label: 'Build stuff',
            _rev: expect.any(String)
          })
        ]
      })
    })

    it('should throw with BulkEditError in case of partial success when saving multiple documents', async () => {
      await setup()
      link.dbMethod = method => {
        if (method !== 'bulkDocs') {
          throw new Error('Only bulkDocs is overrided in the test')
        }
        return [
          { error: 'conflict', id: TODO_3._id },
          { ok: true, id: TODO_4._id, rev: '2-gabedead' },
          { ok: true, id: '3', rev: '1-cffeebabe' }
        ]
      }
      link.pouches.getSyncStatus = jest.fn().mockReturnValue('synced')
      const { _id, ...NEW_TODO } = TODO_3
      let err
      try {
        await client.saveAll([TODO_3, TODO_4, NEW_TODO])
      } catch (e) {
        err = e
      }
      expect(link.executeMutation).toHaveBeenCalled()
      expect(err.message).toEqual('Error while bulk saving')
      const errors = err.getErrors()
      expect(errors.length).toBe(1)
      expect(errors[0].error).toEqual('conflict')
      expect(errors[0].doc._id).toEqual(TODO_3._id)
    })

    it('should be possible to update a document', async () => {
      await setup()
      link.pouches.getSyncStatus = jest.fn().mockReturnValue('synced')
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
            label: 'Buy bread',
            relationships: {
              referenced_by: undefined
            }
          }
        ]
      })
      expect(client.emit).toHaveBeenCalledWith('pouchlink:sync:end')
    })
  })
  describe('startReplication', () => {
    it('should emit the event', async () => {
      await setup()
      link.startReplication()

      expect(client.emit).toHaveBeenCalledWith('pouchlink:sync:start')
    })
  })
  describe('stopReplication', () => {
    it('should emit the event', async () => {
      await setup()
      link.stopReplication()

      expect(client.emit).toHaveBeenCalledWith('pouchlink:sync:stop')
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
          },
          on: jest.fn()
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

  describe('index creation', () => {
    let spy
    beforeEach(() => {
      allDocs.mockReturnValue({ docs: [] })
      withoutDesignDocuments.mockReturnValue({ docs: [] })
      find.mockReturnValue({ docs: [] })
    })
    afterEach(() => {
      spy.mockRestore()
    })

    it('uses the default index, the one from the sort', async () => {
      spy = jest.spyOn(PouchDB.prototype, 'createIndex')
      await setup()
      link.pouches.getSyncStatus = jest.fn().mockReturnValue('synced')
      const query = Q(TODO_DOCTYPE)
        .where({})
        .sortBy([{ name: 'asc' }])
      await link.request(query)
      expect(spy).toHaveBeenCalledWith({
        index: {
          ddoc: 'by_name',
          fields: ['name'],
          indexName: 'by_name',
          partial_filter_selector: undefined
        }
      })
    })

    it('uses indexFields if provided', async () => {
      spy = jest.spyOn(PouchDB.prototype, 'createIndex').mockReturnValue({})
      await setup()
      await link.ensureIndex(TODO_DOCTYPE, {
        indexedFields: ['myIndex']
      })
      expect(spy).toHaveBeenCalled()
      expect(spy).toHaveBeenCalledWith({
        index: {
          ddoc: 'by_myIndex',
          fields: ['myIndex'],
          indexName: 'by_myIndex',
          partial_filter_selector: undefined
        }
      })
    })

    it('should handle partial filters', async () => {
      spy = jest.spyOn(PouchDB.prototype, 'createIndex').mockReturnValue({})
      await setup()
      await link.ensureIndex(TODO_DOCTYPE, {
        indexedFields: ['myIndex'],
        partialFilter: { SOME_FIELD: { $exists: true } }
      })
      expect(spy).toHaveBeenCalled()
      expect(spy).toHaveBeenCalledWith({
        index: {
          ddoc: 'by_myIndex_filter_(SOME_FIELD_$exists_true)',
          fields: ['myIndex'],
          indexName: 'by_myIndex_filter_(SOME_FIELD_$exists_true)',
          partial_filter_selector: {
            SOME_FIELD: {
              $exists: true
            }
          }
        }
      })
    })

    it('uses the specified index', async () => {
      let spyIndex = jest
        .spyOn(CozyPouchLink.prototype, 'ensureIndex')
        .mockReturnValue({ id: 'design/myIndex2' })

      await setup()
      const db = link.getPouch(TODO_DOCTYPE)
      await link.executeQuery({
        doctype: TODO_DOCTYPE,
        indexedFields: ['myIndex2'],
        selector: {}
      })
      const params = {
        sort: undefined,
        selector: {
          myIndex2: {
            $gt: null
          }
        },
        fields: undefined,
        limit: undefined,
        partialFilter: undefined,
        skip: undefined
      }

      expect(spyIndex).toHaveBeenCalledWith('io.cozy.todos', {
        ...params,
        indexedFields: ['myIndex2']
      })
      params.use_index = 'design/myIndex2'
      expect(find).toHaveBeenCalledWith(db, params)
      spyIndex.mockRestore()
    })
  })

  describe('deleteDocument', () => {
    it('should add _rev and _deleted prop to a deleted document', async () => {
      await setup()
      const document = { id: 'docId', rev: '123', ok: true }
      link.dbMethod = jest.fn().mockReturnValue(document)
      const res = await link.deleteDocument({ document })

      expect(res).toMatchObject({
        id: 'docId',
        _id: 'docId',
        rev: '123',
        _rev: '123',
        _deleted: true
      })
    })
  })
})
