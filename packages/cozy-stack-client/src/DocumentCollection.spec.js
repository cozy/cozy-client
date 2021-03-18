jest.mock('./CozyStackClient')

import flag from 'cozy-flags'
import CozyStackClient from './CozyStackClient'
import DocumentCollection from './DocumentCollection'
import { getMatchingIndex } from './mangoIndex'

jest.mock('./mangoIndex', () => ({
  ...jest.requireActual('./mangoIndex'),
  getMatchingIndex: jest.fn()
}))

const ALL_RESPONSE_FIXTURE = {
  offset: 0,
  rows: [
    {
      id: '12345',
      doc: { _id: '12345', label: 'Buy bread', done: false }
    },
    {
      id: '67890',
      doc: { _id: '67890', label: 'Check email', done: false }
    },
    {
      id: '_design/todo',
      doc: { _id: '_design/todo' }
    }
  ],
  total_rows: 3
}

const NORMAL_RESPONSE_FIXTURE = {
  rows: [
    {
      id: '12345',
      label: 'Buy bread',
      done: false
    },
    {
      id: '67890',
      label: 'Check email',
      done: false
    }
  ],
  total_rows: 2
}

const FIND_RESPONSE_FIXTURE = {
  docs: [
    { _id: '12345', label: 'Buy bread', done: false },
    { _id: '67890', label: 'Check email', done: false }
  ],
  limit: 100,
  next: false
}

const GET_RESPONSE_FIXTURE = {
  id: '12345',
  label: 'Buy bread',
  done: false
}

const NEW_TODO = {
  label: 'Jettison boosters',
  done: false
}
const CREATE_RESPONSE_FIXTURE = {
  id: '12345',
  ok: true,
  type: 'io.cozy.todos',
  rev: '1-67890',
  data: {
    _id: '12345',
    _type: 'io.cozy.todos',
    _rev: '1-67890',
    ...NEW_TODO
  }
}

const TODO_TO_UPDATE = {
  _id: '12345',
  _type: 'io.cozy.todos',
  _rev: '1-67890',
  label: 'Jettison boosters',
  done: false
}
const UPDATE_RESPONSE_FIXTURE = {
  id: '12345',
  ok: true,
  type: 'io.cozy.todos',
  rev: '2-67890',
  data: {
    _rev: '2-67890',
    ...TODO_TO_UPDATE
  }
}

const TODO_TO_DESTROY = {
  _id: '12345',
  _type: 'io.cozy.todos',
  _rev: '1-67890'
}
const DESTROY_RESPONSE_FIXTURE = {
  id: '12345',
  type: 'io.cozy.todos',
  ok: true,
  rev: '2-12345',
  _deleted: true
}

describe('DocumentCollection', () => {
  const client = new CozyStackClient()

  describe('all', () => {
    const collection = new DocumentCollection('io.cozy.todos', client)

    beforeAll(() => {
      client.fetchJSON.mockReturnValue(Promise.resolve(NORMAL_RESPONSE_FIXTURE))
    })

    it('should call the right route', async () => {
      await collection.all()
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'GET',
        '/data/io.cozy.todos/_normal_docs?include_docs=true&limit=100'
      )

      client.fetchJSON.mockReturnValue(Promise.resolve(ALL_RESPONSE_FIXTURE))
      await collection.all({ limit: null })
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'GET',
        '/data/io.cozy.todos/_all_docs?include_docs=true'
      )
    })

    it('should accept skip and limit options', async () => {
      await collection.all({ skip: 50, limit: 200 })
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/data/io.cozy.todos/_normal_docs?include_docs=true&limit=200&skip=50'
      )
    })

    it('should accept bookmark options', async () => {
      await collection.all({ bookmark: 'himark' })
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/data/io.cozy.todos/_normal_docs?include_docs=true&limit=100&bookmark=himark'
      )
    })

    it('should paginate results with skip', async () => {
      client.fetchJSON.mockReturnValue({
        rows: [{}, {}],
        total_rows: 3
      })
      const respWithNext = await collection.all({ skip: 0, limit: 2 })
      expect(respWithNext.next).toBe(true)

      client.fetchJSON.mockReturnValue({
        rows: [{}],
        total_rows: 3
      })
      const respWithoutNext = await collection.all({ skip: 2, limit: 2 })
      expect(respWithoutNext.next).toBe(false)
    })

    it('should paginate results with bookmark', async () => {
      client.fetchJSON.mockReturnValue({
        rows: [{}, {}],
        total_rows: 3
      })
      const respWithNext = await collection.all({ limit: 2, bookmark: 'book' })
      expect(respWithNext.next).toBe(true)

      client.fetchJSON.mockReturnValue({
        rows: [{}],
        total_rows: 3
      })
      const respWithoutNext = await collection.all({
        limit: 2,
        bookmark: 'mark'
      })
      expect(respWithoutNext.next).toBe(false)
    })

    it('should accept keys option', async () => {
      client.fetchJSON.mockReturnValue(Promise.resolve(ALL_RESPONSE_FIXTURE))
      await collection.all({ keys: ['abc', 'def'] })
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/data/io.cozy.todos/_all_docs?include_docs=true&limit=100&keys=[%22abc%22,%22def%22]'
      )
    })

    it('should return a correct JSON API response', async () => {
      const resp = await collection.all()
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized documents', async () => {
      const resp = await collection.all()
      expect(resp.data[0]).toHaveDocumentIdentity()
    })

    it('should normalize documents regardless of the route being used', async () => {
      client.fetchJSON.mockReturnValue(Promise.resolve(ALL_RESPONSE_FIXTURE))
      const resp = await collection.all({ keys: ['abc', 'def'] })
      expect(resp.data[0]).toHaveDocumentIdentity()
      expect(resp.data[0].label).toBe('Buy bread')
    })

    it('should not fail if there is no doc of this type yet', async () => {
      client.fetchJSON.mockReturnValue(
        Promise.reject(new Error('404: not_found'))
      )

      const respAll = await collection.all()
      expect(respAll).toConformToJSONAPI()
      expect(respAll.data).toHaveLength(0)

      const respFind = await collection.find({ name: 'Bart' })
      expect(respFind).toConformToJSONAPI()
      expect(respFind.data).toHaveLength(0)

      const respGet = await collection.get('fakeId')
      expect(respGet).toConformToJSONAPI()
      expect(respGet.data).toBe(null)

      const respGetAll = await collection.getAll(['fakeId', 'fakeId2'])
      expect(respGetAll).toConformToJSONAPI()
      expect(respGetAll.data.length).toBe(0)

      client.fetchJSON.mockRestore()
    })

    it('should throw for other error types', async () => {
      client.fetchJSON.mockReturnValueOnce(
        Promise.reject(new Error('Bad request'))
      )
      expect.assertions(1)
      try {
        await collection.all()
      } catch (e) {
        expect(e).toBeInstanceOf(Error)
      }
    })

    it('should not return design documents if we intentionnally define limit=null', async () => {
      client.fetchJSON.mockResolvedValueOnce(
        Promise.resolve(ALL_RESPONSE_FIXTURE)
      )
      const docs = await collection.all({ limit: null })

      expect(docs.data.length).toBe(2)
    })

    it('should works even if the key references an empty doc', async () => {
      const responsesWithEmptyDoc = {
        ...ALL_RESPONSE_FIXTURE,
        rows: [
          ...ALL_RESPONSE_FIXTURE.rows,
          {
            id: '11111',
            doc: null
          }
        ]
      }
      client.fetchJSON.mockReturnValue(Promise.resolve(responsesWithEmptyDoc))
      const docs = await collection.all({ keys: ['12345', '67890', '11111'] })
      expect(docs.data.length).toBe(2)
    })

    it('should ignore rows with errors', async () => {
      const responsesWithEmptyDoc = {
        ...ALL_RESPONSE_FIXTURE,
        rows: [
          ...ALL_RESPONSE_FIXTURE.rows,
          {
            key: '11111',
            error: 'not_found'
          }
        ]
      }
      client.fetchJSON.mockReturnValue(Promise.resolve(responsesWithEmptyDoc))
      const docs = await collection.all({ keys: ['12345', '67890', '11111'] })
      expect(docs.data.length).toBe(2)
    })
  })

  describe('get', () => {
    const collection = new DocumentCollection('io.cozy.todos', client)

    beforeAll(() => {
      client.fetchJSON.mockReturnValue(Promise.resolve(GET_RESPONSE_FIXTURE))
    })
    it('should call the right route', async () => {
      await collection.get('fakeid')
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/data/io.cozy.todos/fakeid'
      )
    })

    it('should return a correct JSON API response', async () => {
      const resp = await collection.get('fakeid')
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized document', async () => {
      const resp = await collection.get('fakeid')
      expect(resp.data).toHaveDocumentIdentity()
    })
  })

  describe('createIndex', () => {
    const collection = new DocumentCollection('io.cozy.todos', client)

    describe('existing index', () => {
      beforeAll(() => {
        jest.resetAllMocks()
        jest.spyOn(client, 'fetchJSON').mockResolvedValue({
          id: '_design/123456',
          name: '123456',
          result: 'exists'
        })
      })

      afterAll(() => {
        jest.resetAllMocks()
      })

      it('should call the right route with the right payload', async () => {
        await collection.createIndex(['label', 'done'])
        expect(client.fetchJSON).toHaveBeenCalledWith(
          'POST',
          '/data/io.cozy.todos/_index',
          { index: { fields: ['label', 'done'] } }
        )
      })

      it('should use the partial filter if defined', async () => {
        const partialFilter = { $trashed: false }
        await collection.createIndex(['label', 'done'], {
          partialFilter
        })
        expect(client.fetchJSON).toHaveBeenCalledWith(
          'POST',
          '/data/io.cozy.todos/_index',
          {
            index: {
              fields: ['label', 'done'],
              partial_filter_selector: partialFilter
            }
          }
        )
      })

      it('should return the index ID', async () => {
        const resp = await collection.createIndex(['label', 'done'])
        expect(resp).toHaveProperty('id', '_design/123456')
      })
    })

    describe('new index', () => {
      afterAll(() => {
        jest.resetAllMocks()
      })
      it('should return the index ID', async () => {
        client.fetchJSON
          .mockReturnValueOnce(
            Promise.resolve({
              id: '_design/123456',
              name: '123456',
              result: 'created'
            })
          )
          .mockReturnValueOnce(
            Promise.resolve({
              id: '_design/123456',
              name: '123456',
              result: 'exists'
            })
          )
        const resp = await collection.createIndex(['label', 'done'])
        expect(resp).toHaveProperty('id', '_design/123456')
      })
    })
  })

  describe('find', () => {
    beforeEach(() => {
      client.fetchJSON.mockReturnValue(Promise.resolve(FIND_RESPONSE_FIXTURE))
    })

    it('should call the right route with the right payload', async () => {
      const collection = new DocumentCollection('io.cozy.todos', client)
      await collection.find({ done: false })
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        {
          selector: { done: false },
          skip: 0,
          use_index: '_design/by_done'
        }
      )
    })

    it('should accept skip and limit options', async () => {
      const collection = new DocumentCollection('io.cozy.todos', client)
      await collection.find({ done: false }, { skip: 50, limit: 200 })
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        {
          limit: 200,
          selector: { done: false },
          skip: 50,
          use_index: '_design/by_done'
        }
      )
    })

    it('should accept bookmark option', async () => {
      const collection = new DocumentCollection('io.cozy.todos', client)
      await collection.find({ done: false }, { bookmark: 'himark', limit: 200 })
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        {
          limit: 200,
          selector: { done: false },
          skip: 0,
          bookmark: 'himark',
          use_index: '_design/by_done'
        }
      )
    })

    it('should accept a sort option', async () => {
      const collection = new DocumentCollection('io.cozy.todos', client)
      await collection.find({ done: false }, { sort: [{ label: 'desc' }] })
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        {
          skip: 0,
          selector: { done: false },
          sort: [{ label: 'desc' }, { done: 'desc' }],
          use_index: '_design/by_label_and_done'
        }
      )
    })

    it('should use a valid default sorting option', async () => {
      const collection = new DocumentCollection('io.cozy.todos', client)
      await collection.find({ done: false }, { sort: [{ label: 'asc' }] })
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        {
          skip: 0,
          selector: { done: false },
          sort: [{ label: 'asc' }, { done: 'asc' }],
          use_index: '_design/by_label_and_done'
        }
      )
      await collection.find({ done: false }, { sort: [{ label: 'desc' }] })
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        {
          skip: 0,
          selector: { done: false },
          sort: [{ label: 'desc' }, { done: 'desc' }],
          use_index: '_design/by_label_and_done'
        }
      )
    })

    it('should throw when using different sort orders', async () => {
      const collection = new DocumentCollection('io.cozy.todos', client)
      await expect(
        collection.find(
          { done: false },
          { sort: [{ label: 'asc' }, { _id: 'desc' }] }
        )
      ).rejects.toThrow()
    })

    it('should respect the sorting order', async () => {
      const collection = new DocumentCollection('io.cozy.todos', client)
      await collection.find(
        { done: false },
        { sort: [{ label: 'desc' }, { _id: 'desc' }] }
      )
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        {
          skip: 0,
          selector: { done: false },
          sort: [{ label: 'desc' }, { _id: 'desc' }, { done: 'desc' }],
          use_index: '_design/by_label_and__id_and_done'
        }
      )
    })

    it('should return a correct JSON API response', async () => {
      const collection = new DocumentCollection('io.cozy.todos', client)
      const resp = await collection.find({ done: false })
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized documents', async () => {
      const collection = new DocumentCollection('io.cozy.todos', client)
      const resp = await collection.find({ done: false })
      expect(resp.data[0]).toHaveDocumentIdentity()
    })

    it('should not throw an error if it is a missing index', async () => {
      client.fetchJSON.mockRestore()
      client.fetchJSON
        .mockRejectedValueOnce(new Error('no_index'))
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce(FIND_RESPONSE_FIXTURE)
        .mockResolvedValueOnce(FIND_RESPONSE_FIXTURE)
      const collection = new DocumentCollection('io.cozy.todos', client)
      await expect(
        collection.findWithMango(
          'fakepath',
          { done: { $exists: true } },
          { indexedFields: ['label'] }
        )
      ).resolves.toBe(FIND_RESPONSE_FIXTURE)
      client.fetchJSON
        .mockRejectedValueOnce(new Error('no_usable_index'))
        .mockResolvedValueOnce({ rows: [] })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce(FIND_RESPONSE_FIXTURE)
        .mockResolvedValueOnce(FIND_RESPONSE_FIXTURE)

      await expect(
        collection.findWithMango(
          'fakepath',
          { done: { $exists: true } },
          { indexedFields: ['label'] }
        )
      ).resolves.toBe(FIND_RESPONSE_FIXTURE)
    })

    it('should throw an error if it is not a missing index', async () => {
      client.fetchJSON.mockRestore()
      client.fetchJSON.mockRejectedValueOnce(new Error('custom error'))
      const collection = new DocumentCollection('io.cozy.todos', client)
      await expect(
        collection.findWithMango(
          'fakepath',
          { done: { $exists: true } },
          { indexedFields: ['label'] }
        )
      ).rejects.toThrow()
    })

    it('should index the specified fields when no index exists', async () => {
      client.fetchJSON.mockRestore()
      client.fetchJSON
        .mockRejectedValueOnce(new Error('no_index'))
        .mockReturnValueOnce(
          Promise.resolve({
            rows: []
          })
        )
        .mockReturnValueOnce(
          Promise.resolve({
            id: '_design/by_label',
            name: 'by_label',
            result: 'created'
          })
        )
        .mockReturnValueOnce(Promise.resolve(FIND_RESPONSE_FIXTURE))
        .mockReturnValueOnce(Promise.resolve(FIND_RESPONSE_FIXTURE))

      const collection = new DocumentCollection('io.cozy.todos', client)
      await collection.find(
        { done: { $exists: true } },
        { indexedFields: ['label'], sort: [{ label: 'desc' }] }
      )
      const expectedFindParams = {
        skip: 0,
        selector: { done: { $exists: true } },
        sort: [{ label: 'desc' }],
        use_index: '_design/by_label'
      }

      expect(client.fetchJSON).toHaveBeenCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        expectedFindParams
      )
      expect(client.fetchJSON).toHaveBeenNthCalledWith(
        2,
        'GET',
        '/data/io.cozy.todos/_design_docs?include_docs=true'
      )
      expect(client.fetchJSON).toHaveBeenNthCalledWith(
        3,
        'POST',
        '/data/io.cozy.todos/_index',
        { index: { fields: ['label'] }, ddoc: 'by_label' }
      )
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        expectedFindParams
      )
    })

    it('should deal with index conflict', async () => {
      client.fetchJSON.mockRestore()
      client.fetchJSON
        .mockRejectedValueOnce(new Error('no_index'))
        .mockReturnValueOnce(Promise.resolve({ rows: [] }))
        .mockRejectedValueOnce(new Error('error_saving_ddoc'))
        .mockReturnValueOnce(Promise.resolve(FIND_RESPONSE_FIXTURE))

      const collection = new DocumentCollection('io.cozy.todos', client)
      await collection.find(
        { done: { $exists: true } },
        { indexedFields: ['label'], sort: [{ label: 'desc' }] }
      )
      const expectedFindParams = {
        skip: 0,
        selector: { done: { $exists: true } },
        sort: [{ label: 'desc' }],
        use_index: '_design/by_label'
      }
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        expectedFindParams
      )
      expect(client.fetchJSON).toHaveBeenNthCalledWith(
        2,
        'GET',
        '/data/io.cozy.todos/_design_docs?include_docs=true'
      )
      expect(client.fetchJSON).toHaveBeenNthCalledWith(
        3,
        'POST',
        '/data/io.cozy.todos/_index',
        { index: { fields: ['label'] }, ddoc: 'by_label' }
      )
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        expectedFindParams
      )
    })

    it('should copy existing index', async () => {
      const index = {
        id: '_design/123456',
        doc: {
          _id: '_design/123456',
          _rev: '1-123',
          language: 'query',
          views: {
            123456: {
              map: {
                fields: {
                  label: 'asc',
                  done: 'asc'
                },
                partial_filter_selector: {
                  trashed: false
                }
              }
            }
          }
        }
      }
      getMatchingIndex.mockReturnValue(index.doc)
      
      client.fetchJSON.mockRestore()
      client.fetchJSON
        .mockRejectedValueOnce(new Error('no_index'))
        .mockReturnValueOnce(Promise.resolve({ rows: [index] }))
        .mockReturnValueOnce(
          Promise.resolve({
            id: '_design/by_label_and_done',
            ok: true,
            rev: '1-123'
          })
        )
        .mockReturnValueOnce(
          Promise.resolve({
            id: '_design/123456',
            ok: true,
            rev: '1-123'
          })
        )
        .mockReturnValueOnce(Promise.resolve(FIND_RESPONSE_FIXTURE))
        .mockReturnValueOnce(Promise.resolve(FIND_RESPONSE_FIXTURE))

      const collection = new DocumentCollection('io.cozy.todos', client)
      await collection.find(
        { done: { $exists: true } },
        {
          indexedFields: ['label', 'done'],
          sort: [{ label: 'desc' }],
          partialFilter: {
            trashed: false
          }
        }
      )
      const expectedFindParams = {
        skip: 0,
        selector: { done: { $exists: true } },
        sort: [{ label: 'desc' }, { done: 'desc' }],
        use_index: '_design/by_label_and_done'
      }
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        expectedFindParams
      )
      expect(client.fetchJSON).toHaveBeenNthCalledWith(
        2,
        'GET',
        '/data/io.cozy.todos/_design_docs?include_docs=true'
      )
      expect(client.fetchJSON).toHaveBeenNthCalledWith(
        3,
        'POST',
        '/data/io.cozy.todos/_design/123456/copy?rev=1-123',
        null,
        { headers: { Destination: '_design/by_label_and_done' } }
      )
      expect(client.fetchJSON).toHaveBeenNthCalledWith(
        4,
        'DELETE',
        '/data/io.cozy.todos/_design/123456?rev=1-123'
      )
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        expectedFindParams
      )
    })

    it('should set executions stats if flag is enabled', async () => {
      const collection = new DocumentCollection('io.cozy.todos', client)
      flag('perfs.execution_stats', true)
      await collection.find({ done: false })
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        {
          selector: { done: false },
          skip: 0,
          use_index: '_design/by_done',
          execution_stats: true
        }
      )
    })
  })

  describe('create', () => {
    const collection = new DocumentCollection('io.cozy.todos', client)

    beforeAll(() => {
      jest.resetAllMocks()
      client.fetchJSON.mockReturnValue(Promise.resolve(CREATE_RESPONSE_FIXTURE))
    })

    it('should call the right route with the right payload', async () => {
      await collection.create(NEW_TODO)
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.todos/',
        NEW_TODO
      )
    })

    it('should return normalized documents', async () => {
      const resp = await collection.create(NEW_TODO)
      expect(resp.data).toHaveDocumentIdentity()
    })
  })

  describe('update', () => {
    const collection = new DocumentCollection('io.cozy.todos', client)

    beforeAll(() => {
      client.fetchJSON.mockReturnValue(Promise.resolve(UPDATE_RESPONSE_FIXTURE))
    })

    it('should call the right route with the right payload', async () => {
      await collection.update(TODO_TO_UPDATE)
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'PUT',
        `/data/io.cozy.todos/${TODO_TO_UPDATE._id}`,
        TODO_TO_UPDATE
      )
    })

    it('should return normalized documents', async () => {
      const resp = await collection.update(TODO_TO_UPDATE)
      expect(resp.data).toHaveDocumentIdentity()
    })
  })

  describe('destroy', () => {
    const collection = new DocumentCollection('io.cozy.todos', client)

    beforeEach(() => {
      // we first need to mock the return value of getAllSharingLinks()
      client.fetchJSON.mockReturnValueOnce(Promise.resolve({ data: [] }))
      client.fetchJSON.mockReturnValueOnce(
        Promise.resolve(DESTROY_RESPONSE_FIXTURE)
      )
    })

    afterEach(() => {
      client.fetchJSON.mockRestore()
    })

    it('should call the right route with the right payload', async () => {
      await collection.destroy(TODO_TO_DESTROY)
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'DELETE',
        `/data/io.cozy.todos/${TODO_TO_DESTROY._id}?rev=${TODO_TO_DESTROY._rev}`
      )
    })

    it('should return a normalized document', async () => {
      const resp = await collection.destroy(TODO_TO_DESTROY)
      expect(resp.data).toHaveDocumentIdentity()
    })
  })

  describe('batch update/delete', () => {
    const setup = () => {
      const client = new CozyStackClient()
      const collection = new DocumentCollection('io.cozy.simpsons', client)
      jest.spyOn(collection, 'updateAll')
      return { client, collection }
    }

    it('should create database when bulk updating', async () => {
      const { client, collection } = setup()
      jest.spyOn(collection, 'create').mockImplementation(doc => doc)
      client.fetchJSON
        .mockRejectedValueOnce({
          reason: { reason: 'Database does not exist.' }
        })
        .mockImplementationOnce((method, doctype, data) =>
          Promise.resolve(
            data.docs.map(doc => ({
              id: doc._id,
              _rev: Math.random(),
              ok: true
            }))
          )
        )

      const res = await collection.updateAll([
        { _id: 1, name: 'Marge' },
        { _id: 2, name: 'Homer' }
      ])

      expect(collection.create).toHaveBeenCalledWith({
        _id: 1,
        name: 'Marge'
      })
      expect(collection.updateAll).toHaveBeenCalledWith([
        { _id: 2, name: 'Homer' }
      ])
      expect(res.map(doc => doc.id)).toEqual([1, 2])
    })

    it('should do bulk delete', async () => {
      const { collection, client } = setup()
      await collection.destroyAll([
        { _id: 1, name: 'Marge', _type: 'io.cozy.simpsons' },
        { _id: 2, name: 'Homer' }
      ])
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'POST',
        '/data/io.cozy.simpsons/_bulk_docs',
        {
          docs: [
            { _deleted: true, _id: 1, name: 'Marge' },
            { _deleted: true, _id: 2, name: 'Homer' }
          ]
        }
      )
    })
  })

  describe('changes', () => {
    const collection = new DocumentCollection('io.cozy.todos', client)
    const defaultCouchOptions = { include_docs: true, since: 'my-seq' }
    beforeEach(() => {
      client.fetchJSON.mockReturnValueOnce(
        Promise.resolve({
          last_seq: 'new-seq',
          results: [
            { doc: { _id: '1', done: false, label: 'Fetch changes' } },
            { doc: null },
            { doc: { _id: '_design/view' } },
            { doc: { _id: '2', _deleted: true, label: 'Refactor code' } }
          ]
        })
      )
    })

    it('should call the right route without parameter', async () => {
      await collection.fetchChanges()
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/data/io.cozy.todos/_changes',
        undefined
      )
    })

    it('should call the right route with deprecated parameter', async () => {
      jest.spyOn(console, 'warn').mockImplementation(() => {})
      await collection.fetchChanges('my-seq')
      console.warn.mockRestore()
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/data/io.cozy.todos/_changes?include_docs=true&since=my-seq',
        undefined
      )
    })

    it('should call the right route with deprecated parameter', async () => {
      await collection.fetchChanges({ limit: 100 })
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/data/io.cozy.todos/_changes?limit=100',
        undefined
      )
    })

    it('should call changes with doc_ids parameters', async () => {
      await collection.fetchChanges({ doc_ids: [1, 2, 3] })
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'POST',
        '/data/io.cozy.todos/_changes?filter=_doc_ids',
        { doc_ids: [1, 2, 3] }
      )
    })

    it('should call the right route', async () => {
      const changes = await collection.fetchChanges(defaultCouchOptions)
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/data/io.cozy.todos/_changes?include_docs=true&since=my-seq',
        undefined
      )
      expect(changes).toEqual({
        newLastSeq: 'new-seq',
        documents: [{ _id: '1', done: false, label: 'Fetch changes' }]
      })
    })

    it('should call support includeDeleted', async () => {
      const changes = await collection.fetchChanges(defaultCouchOptions, {
        includeDeleted: true
      })
      expect(changes).toEqual({
        newLastSeq: 'new-seq',
        documents: [
          { _id: '1', done: false, label: 'Fetch changes' },
          { _id: '2', _deleted: true, label: 'Refactor code' }
        ]
      })
    })

    it('should call support includeDesign', async () => {
      const changes = await collection.fetchChanges(defaultCouchOptions, {
        includeDesign: true
      })
      expect(changes).toEqual({
        newLastSeq: 'new-seq',
        documents: [
          { _id: '1', done: false, label: 'Fetch changes' },
          { _id: '_design/view' }
        ]
      })
    })
  })

  describe('handleMissingIndex', () => {
    const collection = new DocumentCollection('io.cozy.triggers', client)
    const selector = {
      'message.account': 'ca7b7f1'
    }

    beforeEach(() => {
      collection.findExistingIndex = jest.fn()
      collection.migrateUnamedIndex = jest.fn()
      collection.createIndex = jest.fn()
    })

    it('should not throw with undefined indexedFields', async () => {
      client.fetchJSON.mockResolvedValue({ rows: [] })
      expect(
        await collection.handleMissingIndex(selector, {
          indexedFields: undefined,
          sort: undefined
        })
      )
    })

    it('should migrate unamed index with or without indexedFields ', async () => {
      const existingIndex = {
        _id: '123'
      }
      collection.findExistingIndex.mockResolvedValue(existingIndex)
      collection.migrateUnamedIndex.mockResolvedValue({})

      await collection.handleMissingIndex(selector, {
        indexedFields: undefined,
        sort: undefined
      })
      expect(collection.migrateUnamedIndex).toHaveBeenCalledWith(
        existingIndex,
        'by_message.account'
      )

      await collection.handleMissingIndex(selector, {
        indexedFields: ['message.account']
      })
      expect(collection.migrateUnamedIndex).toHaveBeenCalledWith(
        existingIndex,
        'by_message.account'
      )
    })

    it('should create new index, with or without indexedFields', async () => {
      collection.findExistingIndex.mockResolvedValue(null)
      collection.createIndex.mockResolvedValue({})

      await collection.handleMissingIndex(selector, {
        indexedFields: undefined,
        sort: undefined
      })
      expect(collection.createIndex).toHaveBeenCalledWith(['message.account'], {
        indexName: 'by_message.account'
      })

      await collection.handleMissingIndex(selector, {
        indexedFields: ['message.account']
      })
      expect(collection.createIndex).toHaveBeenCalledWith(['message.account'], {
        indexName: 'by_message.account'
      })
    })
  })

  describe('findExistingIndex', () => {
    const collection = new DocumentCollection('io.cozy.triggers', client)
    const selector = {
      'message.account': 'ca7b7f1'
    }

    beforeEach(() => {
      collection.fetchAllMangoIndexes = jest.fn()
    })
    it('should not find anything if there no existing index', async () => {
      collection.fetchAllMangoIndexes.mockResolvedValue([])
      const res = await collection.findExistingIndex(selector, {
        indexedFields: undefined,
        sort: undefined
      })
      expect(res).toBe(null)
    })

    it('should get matching index with correct arguments with indexed field', async () => {
      const index = {
        _id: '123'
      }
      collection.fetchAllMangoIndexes.mockResolvedValue([index])

      await collection.findExistingIndex(selector, {
        indexedFields: ['message.account']
      })
      expect(getMatchingIndex).toHaveBeenCalledWith(
        [index],
        ['message.account'],
        undefined
      )
    })

    it('should get matching index with correct arguments without indexed field', async () => {
      const index = {
        _id: '123'
      }
      collection.fetchAllMangoIndexes.mockResolvedValue([index])

      await collection.findExistingIndex(selector, {
        sort: [{ 'cozyMetadata.createdAt': 'desc' }]
      })
      expect(getMatchingIndex).toHaveBeenCalledWith(
        [index],
        ['cozyMetadata.createdAt', 'message.account'],
        undefined
      )
    })
  })
})
