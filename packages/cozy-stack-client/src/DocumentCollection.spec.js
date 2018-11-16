jest.mock('./CozyStackClient')

import CozyStackClient from './CozyStackClient'
import DocumentCollection from './DocumentCollection'

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
    }
  ],
  total_rows: 2
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
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/data/io.cozy.todos/_normal_docs?include_docs=true'
      )
    })

    it('should accept skip and limit options', async () => {
      await collection.all({ skip: 50, limit: 200 })
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/data/io.cozy.todos/_normal_docs?include_docs=true&limit=200&skip=50'
      )
    })

    it('should paginate results', async () => {
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

    it('should accept keys option', async () => {
      client.fetchJSON.mockReturnValue(Promise.resolve(ALL_RESPONSE_FIXTURE))
      await collection.all({ keys: ['abc', 'def'] })
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/data/io.cozy.todos/_all_docs?include_docs=true&keys=[%22abc%22%2C%22def%22]'
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
  })

  describe('createIndex', () => {
    const collection = new DocumentCollection('io.cozy.todos', client)

    describe('existing index', () => {
      beforeAll(() => {
        client.fetchJSON.mockReturnValue(
          Promise.resolve({
            id: '_design/123456',
            name: '123456',
            result: 'exists'
          })
        )
      })

      it('should call the right route with the right payload', async () => {
        await collection.createIndex(['label', 'done'])
        expect(client.fetchJSON).toHaveBeenCalledWith(
          'POST',
          '/data/io.cozy.todos/_index',
          { index: { fields: ['label', 'done'] } }
        )
      })

      it('should return the index ID', async () => {
        const resp = await collection.createIndex(['label', 'done'])
        expect(resp).toHaveProperty('id', '_design/123456')
      })
    })

    describe('new index', () => {
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
      client.fetchJSON.mockReturnValueOnce(
        Promise.resolve({
          id: '_design/123456',
          name: '123456',
          result: 'exists'
        })
      )
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
          use_index: '_design/123456'
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
          use_index: '_design/123456'
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
          use_index: '_design/123456'
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
          use_index: '_design/123456'
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
          use_index: '_design/123456'
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
          use_index: '_design/123456'
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

    it('should index the specified fields', async () => {
      const collection = new DocumentCollection('io.cozy.todos', client)
      await collection.find(
        { done: { $exists: true } },
        { indexedFields: ['label'], sort: [{ label: 'desc' }] }
      )
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'POST',
        '/data/io.cozy.todos/_index',
        { index: { fields: ['label'] } }
      )
      expect(client.fetchJSON).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        {
          skip: 0,
          selector: { done: { $exists: true } },
          sort: [{ label: 'desc' }],
          use_index: '_design/123456'
        }
      )
    })
  })

  describe('create', () => {
    const collection = new DocumentCollection('io.cozy.todos', client)

    beforeAll(() => {
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
})
