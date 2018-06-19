jest.mock('../CozyStackClient')

import CozyStackClient from '../CozyStackClient'
import DocumentCollection from '../DocumentCollection'

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

const FIND_RESPONSE_FIXTURE = {
  docs: [
    { _id: '12345', label: 'Buy bread', done: false },
    { _id: '67890', label: 'Check email', done: false }
  ],
  limit: 50,
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
      client.fetch.mockReturnValue(Promise.resolve(ALL_RESPONSE_FIXTURE))
    })

    it('should call the right route', async () => {
      await collection.all()
      expect(client.fetch).toHaveBeenCalledWith(
        'GET',
        '/data/io.cozy.todos/_all_docs?include_docs=true&limit=50&skip=0'
      )
    })

    it('should accept skip and limit options', async () => {
      await collection.all({ skip: 50, limit: 200 })
      expect(client.fetch).toHaveBeenCalledWith(
        'GET',
        '/data/io.cozy.todos/_all_docs?include_docs=true&limit=200&skip=50'
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

    it('should not fail if there is no doc of this type yet', async () => {
      client.fetch.mockReturnValueOnce(
        Promise.reject(new Error('404: not_found'))
      )
      const resp = await collection.all()
      expect(resp).toConformToJSONAPI()
      expect(resp.data).toHaveLength(0)
    })

    it('should throw for other error types', async () => {
      client.fetch.mockReturnValueOnce(Promise.reject(new Error('Bad request')))
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

    beforeAll(() => {
      client.fetch.mockReturnValue(
        Promise.resolve({
          id: '_design/123456',
          name: '123456',
          result: 'exists'
        })
      )
    })

    it('should call the right route with the right payload', async () => {
      await collection.createIndex(['label', 'done'])
      expect(client.fetch).toHaveBeenCalledWith(
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

  describe('find', () => {
    beforeEach(() => {
      client.fetch.mockReturnValueOnce(
        Promise.resolve({
          id: '_design/123456',
          name: '123456',
          result: 'exists'
        })
      )
      client.fetch.mockReturnValue(Promise.resolve(FIND_RESPONSE_FIXTURE))
    })

    it('should call the right route with the right payload', async () => {
      const collection = new DocumentCollection('io.cozy.todos', client)
      await collection.find({ done: false })
      expect(client.fetch).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        {
          limit: 50,
          selector: { done: false },
          skip: 0,
          use_index: '_design/123456'
        }
      )
    })

    it('should accept skip and limit options', async () => {
      const collection = new DocumentCollection('io.cozy.todos', client)
      await collection.find({ done: false }, { skip: 50, limit: 200 })
      expect(client.fetch).toHaveBeenLastCalledWith(
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
      await collection.find({ done: false }, { sort: { label: 'desc' } })
      expect(client.fetch).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.todos/_find',
        {
          limit: 50,
          skip: 0,
          selector: { done: false },
          sort: [{ done: 'desc' }, { label: 'desc' }],
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
  })

  describe('create', () => {
    const collection = new DocumentCollection('io.cozy.todos', client)

    beforeAll(() => {
      client.fetch.mockReturnValue(Promise.resolve(CREATE_RESPONSE_FIXTURE))
    })

    it('should call the right route with the right payload', async () => {
      await collection.create(NEW_TODO)
      expect(client.fetch).toHaveBeenLastCalledWith(
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
      client.fetch.mockReturnValue(Promise.resolve(UPDATE_RESPONSE_FIXTURE))
    })

    it('should call the right route with the right payload', async () => {
      await collection.update(TODO_TO_UPDATE)
      expect(client.fetch).toHaveBeenLastCalledWith(
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
      client.fetch.mockReturnValueOnce(Promise.resolve({ data: [] }))
      client.fetch.mockReturnValueOnce(
        Promise.resolve(DESTROY_RESPONSE_FIXTURE)
      )
    })

    it('should call the right route with the right payload', async () => {
      await collection.destroy(TODO_TO_DESTROY)
      expect(client.fetch).toHaveBeenLastCalledWith(
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
