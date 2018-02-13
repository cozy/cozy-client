jest.mock('../CozyStackLink')

import CozyStackLink from '../CozyStackLink'
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

const fail = msg => ({ message: () => msg, pass: false })

expect.extend({
  toConformToJSONAPI(received) {
    if (!Array.isArray(received.data))
      return fail('expected response to have a `data` array property')
    if (
      typeof received.meta !== 'object' ||
      !received.meta.hasOwnProperty('count')
    )
      return fail('expected response to have a `meta` property with a `count`')
    if (typeof received.next !== 'boolean')
      return fail('expected response to have a boolean `next` property')
    if (typeof received.skip !== 'number')
      return fail('expected response to have a `skip` property')
    return {
      message: () => 'expected response to conform to JSON API',
      pass: true
    }
  },
  toHaveDocumentIdentity(received) {
    if (!received.id) return fail('expected document to have an `id` property')
    if (!received._id)
      return fail('expected document to have an `_id` property')
    if (!received._type)
      return fail('expected document to have a `_type` property')
    return {
      message: () => 'expected document to be normalized',
      pass: true
    }
  }
})

describe('DocumentCollection', () => {
  const link = new CozyStackLink()
  const collection = new DocumentCollection('io.cozy.todos', link)

  describe('all', () => {
    beforeAll(() => {
      link.fetch.mockReturnValue(Promise.resolve(ALL_RESPONSE_FIXTURE))
    })

    it('should call the right route', async () => {
      const resp = await collection.all()
      expect(link.fetch).toHaveBeenCalledWith(
        'GET',
        '/data/io.cozy.todos/_all_docs?include_docs=true&limit=50&skip=0'
      )
    })

    it('should accept skip and limit options', async () => {
      const resp = await collection.all({ skip: 50, limit: 200 })
      expect(link.fetch).toHaveBeenCalledWith(
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
      link.fetch.mockReturnValueOnce(
        Promise.reject(new Error('404: not_found'))
      )
      const resp = await collection.all()
      expect(resp).toConformToJSONAPI()
      expect(resp.data).toHaveLength(0)
    })
  })

  describe('createIndex', () => {
    beforeAll(() => {
      link.fetch.mockReturnValue(
        Promise.resolve({
          id: '_design/123456',
          name: '123456',
          result: 'exists'
        })
      )
    })

    it('should call the right route with the right payload', async () => {
      const resp = await collection.createIndex(['label', 'done'])
      expect(link.fetch).toHaveBeenCalledWith(
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
    beforeAll(() => {
      link.fetch.mockReturnValueOnce(
        Promise.resolve({
          id: '_design/123456',
          name: '123456',
          result: 'exists'
        })
      )
      link.fetch.mockReturnValue(Promise.resolve(FIND_RESPONSE_FIXTURE))
    })

    it('should call the right route with the right payload', async () => {
      const resp = await collection.find({ done: false })
      expect(link.fetch).toHaveBeenLastCalledWith(
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
      const resp = await collection.find(
        { done: false },
        { skip: 50, limit: 200 }
      )
      expect(link.fetch).toHaveBeenLastCalledWith(
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

    it('should return a correct JSON API response', async () => {
      const resp = await collection.find({ done: false })
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized documents', async () => {
      const resp = await collection.find({ done: false })
      expect(resp.data[0]).toHaveDocumentIdentity()
    })
  })
})
