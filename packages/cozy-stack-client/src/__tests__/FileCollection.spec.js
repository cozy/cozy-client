jest.mock('../CozyStackClient')

import CozyStackClient from '../CozyStackClient'
import FileCollection from '../FileCollection'

const STAT_BY_ID_RESPONSE = {
  data: {
    type: 'io.cozy.files',
    id: '42',
    attributes: {
      type: 'directory',
      name: 'bills',
      dir_id: 'io.cozy.files.root-dir',
      created_at: '2016-11-25T16:07:45.398867198+01:00',
      updated_at: '2016-11-25T16:07:45.398867198+01:00',
      tags: []
    },
    meta: {},
    links: {},
    relationships: {}
  },
  included: []
}

const CREATE_DIRECTORY_RESPONSE = {
  data: {
    type: 'io.cozy.files',
    id: 'cb1c159a8db1ee7aeb9441c3ff001753',
    attributes: {
      type: 'directory',
      name: 'notes',
      dir_id: 'io.cozy.files.root-dir',
      created_at: '2016-11-25T16:07:45.398867198+01:00',
      updated_at: '2016-11-25T16:07:45.398867198+01:00',
      tags: []
    },
    meta: {},
    links: {},
    relationships: {}
  }
}

describe('FileCollection', () => {
  const client = new CozyStackClient()
  const collection = new FileCollection('io.cozy.files', client)

  describe('statById', () => {
    beforeAll(() => {
      client.fetch.mockReturnValue(Promise.resolve(STAT_BY_ID_RESPONSE))
    })

    it('should call the right route', async () => {
      const resp = await collection.statById(42)
      expect(client.fetch).toHaveBeenCalledWith(
        'GET',
        '/files/42?limit=50&skip=0'
      )
    })

    it('should accept skip and limit options', async () => {
      const resp = await collection.statById(42, { skip: 50, limit: 200 })
      expect(client.fetch).toHaveBeenCalledWith(
        'GET',
        '/files/42?limit=200&skip=50'
      )
    })

    it('should return a correct JSON API response', async () => {
      const resp = await collection.statById(42)
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized documents', async () => {
      const resp = await collection.statById(42)
      expect(resp.data).toHaveDocumentIdentity()
    })
  })

  describe('createDirectory', () => {
    const NEW_DIR = {
      name: 'notes',
      dirId: '12345',
      lastModifiedDate: 'Wed, 01 Feb 2017 10:24:42 GMT'
    }

    beforeAll(() => {
      client.fetch.mockReset()
      client.fetch.mockReturnValue(Promise.resolve(CREATE_DIRECTORY_RESPONSE))
    })

    it('should call the right route', async () => {
      const resp = await collection.createDirectory(NEW_DIR)
      expect(client.fetch).toHaveBeenCalledWith(
        'POST',
        '/files/12345?Name=notes&Type=directory',
        undefined,
        { headers: { Date: 'Wed, 01 Feb 2017 10:24:42 GMT' } }
      )
    })

    it('should return a correct JSON API response', async () => {
      const resp = await collection.createDirectory(NEW_DIR)
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized documents', async () => {
      const resp = await collection.createDirectory(NEW_DIR)
      expect(resp.data).toHaveDocumentIdentity()
    })
  })

  describe('createDirectoryByPath', () => {
    beforeEach(() => {
      collection.statById = jest.fn(() =>
        Promise.resolve({
          data: {
            _id: 'io.cozy.files.root-dir',
            attributes: {
              path: '/'
            }
          }
        })
      )
      collection.statByPath = jest.fn(
        path =>
          path === '/foo'
            ? Promise.resolve({
                data: {
                  _id: '8c217f9bf5e7118a34627f1ab800243b',
                  attributes: {
                    name: 'foo',
                    dir_id: 'io.cozy.files.root-dir',
                    path: '/foo'
                  }
                }
              })
            : Promise.reject(
                new Error(
                  JSON.stringify({
                    errors: [
                      {
                        status: '404'
                      }
                    ]
                  })
                )
              )
      )
      collection.createDirectory = jest.fn(({ name }) =>
        Promise.resolve(
          name === 'bar'
            ? {
                data: {
                  _id: '9c217f9bf5e7118a34627f1ab800243b',
                  attributes: {
                    name: 'bar',
                    dir_id: '8c217f9bf5e7118a34627f1ab800243b',
                    path: '/foo/bar'
                  }
                }
              }
            : {
                data: {
                  _id: '7c217f9bf5e7118a34627f1ab800243b',
                  attributes: {
                    name: 'bar',
                    dir_id: '9c217f9bf5e7118a34627f1ab800243b',
                    path: '/foo/bar/baz'
                  }
                }
              }
        )
      )
    })

    it('should return the root dir when given an empty path', async () => {
      const resp = await collection.createDirectoryByPath('/')
      expect(resp.data._id).toBe('io.cozy.files.root-dir')
    })

    it('should work...(naming fatigue)', async () => {
      const resp = await collection.createDirectoryByPath('/foo/bar/baz')
      expect(resp.data._id).toBe('7c217f9bf5e7118a34627f1ab800243b')
      expect(collection.statByPath).toHaveBeenCalledTimes(3)
      expect(collection.createDirectory).toHaveBeenCalledTimes(2)
      expect(collection.createDirectory).toHaveBeenLastCalledWith({
        dirID: '9c217f9bf5e7118a34627f1ab800243b',
        name: 'baz'
      })
    })
  })
})
