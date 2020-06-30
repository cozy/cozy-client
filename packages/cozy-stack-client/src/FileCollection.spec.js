jest.mock('./CozyStackClient')

import CozyStackClient from './CozyStackClient'
import FileCollection from './FileCollection'

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
    beforeEach(() => {
      client.fetchJSON.mockReturnValue(Promise.resolve(STAT_BY_ID_RESPONSE))
    })

    afterEach(() => {
      client.fetchJSON.mockReset()
    })

    it('should call the right route', async () => {
      await collection.statById(42)
      expect(client.fetchJSON).toHaveBeenCalledWith('GET', '/files/42')
    })

    it('should accept skip, cursor and limit options', async () => {
      await collection.statById(42, {
        'page[skip]': 50,
        'page[limit]': 200,
        'page[cursor]': 'abc123',
        ignoredOption: 'not-included'
      })
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/files/42?page[limit]=200&page[skip]=50&page[cursor]=abc123'
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

  describe('find', () => {
    client.uri = 'http://cozy.tools'
    const FIND_RESPONSE = {
      data: [{ id: '1' }, { id: '2' }],
      links: {
        next: '/files/_find?page[cursor]=bookmark-id-123'
      },
      meta: {
        count: 4
      }
    }

    beforeAll(() => {
      client.fetchJSON.mockReturnValue(Promise.resolve(FIND_RESPONSE))
    })

    afterAll(() => {
      client.fetchJSON.mockReset()
    })

    it('should call the right route with the right params', async () => {
      await collection.find(
        { trashed: false },
        {
          indexId: 'index-1',
          bookmark: 'bookmark-123',
          limit: 2,
          skip: 4,
          sort: [{ name: 'asc' }]
        }
      )
      expect(client.fetchJSON).toHaveBeenCalledWith('POST', '/files/_find', {
        bookmark: 'bookmark-123',
        fields: undefined,
        limit: 2,
        selector: { trashed: false },
        skip: 4,
        sort: [{ name: 'asc' }, { trashed: 'asc' }],
        use_index: 'index-1'
      })
    })

    it('should return the expected value', async () => {
      const result = await collection.find(
        { trashed: false },
        {
          indexId: 'index-1',
          bookmark: 'bookmark-123',
          limit: 2,
          skip: 4,
          sort: [{ name: 'asc' }]
        }
      )

      expect(result.data.length).toEqual(FIND_RESPONSE.data.length)
      expect(result.meta).toEqual(FIND_RESPONSE.meta)
      expect(result.bookmark).toEqual('bookmark-id-123')
    })

    it('should handle malformatted next links', async () => {
      client.fetchJSON.mockReturnValue(Promise.resolve({ data: [], meta: {} }))
      const resultWithoutNext = await collection.find(
        {},
        { indexId: 'index-1' }
      )
      expect(resultWithoutNext.bookmark).toBeUndefined()

      client.fetchJSON.mockReturnValue(
        Promise.resolve({ next: {}, data: [], meta: {} })
      )
      const resultWithoutLink = await collection.find(
        {},
        { indexId: 'index-1' }
      )
      expect(resultWithoutLink.bookmark).toBeUndefined()

      client.fetchJSON.mockReturnValue(
        Promise.resolve({
          next: { link: '/no-cursor-here' },
          data: [],
          meta: {}
        })
      )
      const resultWithoutCursor = await collection.find(
        {},
        { indexId: 'index-1' }
      )
      expect(resultWithoutCursor.bookmark).toBeUndefined()
    })
  })

  describe('createDirectory', () => {
    const NEW_DIR = {
      name: 'notes',
      dirId: '12345',
      lastModifiedDate: 'Wed, 01 Feb 2017 10:24:42 GMT'
    }

    beforeAll(() => {
      client.fetchJSON.mockReturnValue(
        Promise.resolve(CREATE_DIRECTORY_RESPONSE)
      )
    })

    afterAll(() => {
      client.fetchJSON.mockReset()
    })

    it('should call the right route', async () => {
      await collection.createDirectory(NEW_DIR)
      expect(client.fetchJSON).toHaveBeenCalledWith(
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
      jest.spyOn(collection, 'statById').mockImplementation(() =>
        Promise.resolve({
          data: {
            _id: 'io.cozy.files.root-dir',
            attributes: {
              path: '/'
            }
          }
        })
      )
      jest.spyOn(collection, 'statByPath').mockImplementation(path =>
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
      jest.spyOn(collection, 'createDirectory').mockImplementation(({ name }) =>
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

    afterEach(() => {
      collection.statById.mockRestore()
      collection.statByPath.mockRestore()
      collection.createDirectory.mockRestore()
    })

    it('should return the root dir when given an empty path', async () => {
      const resp = await collection.createDirectoryByPath('/')
      expect(resp.data._id).toBe('io.cozy.files.root-dir')
    })

    it('should create the whole path', async () => {
      const resp = await collection.createDirectoryByPath('/foo/bar/baz')
      expect(resp.data._id).toBe('7c217f9bf5e7118a34627f1ab800243b')
      expect(collection.statByPath).toHaveBeenCalledTimes(3)
      expect(collection.createDirectory).toHaveBeenCalledTimes(2)
      expect(collection.createDirectory).toHaveBeenLastCalledWith({
        dirId: '9c217f9bf5e7118a34627f1ab800243b',
        name: 'baz'
      })
    })
  })

  describe('findReferencedBy', () => {
    const client = new CozyStackClient()
    const collection = new FileCollection('io.cozy.files', client)

    const spy = jest.spyOn(client, 'fetchJSON')

    beforeEach(() => {
      spy.mockClear()
    })

    const doc = {
      _type: 'io.cozy.files',
      _id: '123'
    }

    it('should pass all the filters', () => {
      spy.mockReturnValue({
        data: [],
        meta: {}
      })
      collection.findReferencedBy(doc)
      expect(spy).toMatchSnapshot()
    })

    it('should detect a next page', async () => {
      spy.mockReturnValue({
        data: [],
        links: {
          next: 'http://example.com/next'
        },
        meta: {}
      })
      const result = await collection.findReferencedBy(doc)
      expect(result.next).toBe(true)
    })

    it('should detect the abscence of a next page', async () => {
      spy.mockReturnValue({
        data: [],
        links: {},
        meta: {}
      })
      const result = await collection.findReferencedBy(doc)
      expect(result.next).toBe(false)
    })
  })

  describe('referencedBy', () => {
    const client = new CozyStackClient()
    const collection = new FileCollection('io.cozy.files', client)

    const spy = jest.spyOn(client, 'fetchJSON')

    beforeEach(() => {
      spy.mockClear()
    })

    const file = {
      _type: 'io.cozy.files',
      _id: '123'
    }

    it('should add a reference', async () => {
      const refs = [
        {
          _id: '456',
          _type: 'io.cozy.photos.albums'
        }
      ]
      await collection.addReferencedBy(file, refs)
      expect(spy).toMatchSnapshot()
    })
    it('should remove a reference', async () => {
      const refs = [
        {
          _id: '456',
          _type: 'io.cozy.photos.albums'
        }
      ]
      await collection.removeReferencedBy(file, refs)
      expect(spy).toMatchSnapshot()
    })
  })

  describe('updateAttributes', () => {
    beforeEach(() => {
      client.fetchJSON.mockReturnValue({ data: [] })
    })

    afterEach(() => {
      client.fetchJSON.mockClear()
    })

    it('should call the right route', async () => {
      await collection.updateAttributes('42', {
        dir_id: '123'
      })
      expect(client.fetchJSON.mock.calls.length).toBeGreaterThan(0)
      expect(
        client.fetchJSON.mock.calls[client.fetchJSON.mock.calls.length - 1]
      ).toMatchSnapshot()
    })
  })

  describe('updateMetadataAttribute', () => {
    beforeEach(() => {
      client.fetchJSON.mockReturnValue({ data: [] })
    })

    afterEach(() => {
      client.fetchJSON.mockClear()
    })

    it('should call the right route', async () => {
      await collection.updateMetadataAttribute('42', {
        classification: 'tax_notice'
      })
      expect(client.fetchJSON.mock.calls.length).toBeGreaterThan(0)
      expect(
        client.fetchJSON.mock.calls[client.fetchJSON.mock.calls.length - 1]
      ).toMatchSnapshot()
    })
  })

  describe('createFileMetadata', () => {
    beforeEach(() => {
      client.fetchJSON.mockReturnValue({ data: [] })
    })

    afterEach(() => {
      client.fetchJSON.mockClear()
    })

    it('should call the right route', async () => {
      await collection.createFileMetadata({
        type: 'bill'
      })
      expect(client.fetchJSON.mock.calls.length).toBeGreaterThan(0)
      expect(
        client.fetchJSON.mock.calls[client.fetchJSON.mock.calls.length - 1]
      ).toMatchSnapshot()
    })
  })

  describe('updateFile', () => {
    beforeEach(() => {
      client.fetchJSON.mockReturnValue({
        data: {
          id: '59140416-b95f',
          _id: '59140416-b95f',
          dir_id: '41686c35-9d8e'
        }
      })
    })

    afterEach(() => {
      client.fetchJSON.mockClear()
    })

    it('should update a file without metadata', async () => {
      const data = new File([''], 'mydoc.epub')
      const params = {
        fileId: '59140416-b95f',
        checksum: 'a6dabd99832b270468e254814df2ed20'
      }
      const result = await collection.updateFile(data, params)
      const expectedPath =
        '/files/59140416-b95f?Name=mydoc.epub&Type=file&Executable=false'
      const expectedOptions = {
        headers: {
          'Content-MD5': 'a6dabd99832b270468e254814df2ed20',
          'Content-Type': 'application/epub+zip'
        }
      }
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'PUT',
        expectedPath,
        data,
        expectedOptions
      )
      expect(result).toEqual({
        data: {
          id: '59140416-b95f',
          _id: '59140416-b95f',
          _type: 'io.cozy.files',
          dir_id: '41686c35-9d8e'
        }
      })
    })

    it('should update a file with metadata', async () => {
      const metadataId = '2460a631-ae55'
      client.fetchJSON.mockReturnValueOnce({
        data: {
          id: metadataId
        }
      })
      const data = new File([''], 'mydoc.epub')
      const params = {
        fileId: '59140416-b95f',
        checksum: 'a6dabd99832b270468e254814df2ed20',
        metadata: { type: 'bill' }
      }
      const result = await collection.updateFile(data, params)
      const expectedPath = `/files/59140416-b95f?Name=mydoc.epub&Type=file&Executable=false&MetadataID=${metadataId}`
      const expectedOptions = {
        headers: {
          'Content-MD5': 'a6dabd99832b270468e254814df2ed20',
          'Content-Type': 'application/epub+zip'
        }
      }
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'PUT',
        expectedPath,
        data,
        expectedOptions
      )
      expect(result).toEqual({
        data: {
          id: '59140416-b95f',
          _id: '59140416-b95f',
          _type: 'io.cozy.files',
          dir_id: '41686c35-9d8e'
        }
      })
    })
  })
  describe('emptyTrash', () => {
    it('should empty the trash', async () => {
      await collection.emptyTrash()
      expect(client.fetchJSON).toHaveBeenCalledWith('DELETE', '/files/trash')
    })
  })
  describe('restore', () => {
    it('should restore a trashed file', async () => {
      const FILE_ID = 'd04ab491-2fc6'
      client.fetchJSON.mockReturnValue({
        data: {
          id: FILE_ID,
          type: 'io.cozy.files',
          trashed: false
        }
      })
      const result = await collection.restore(FILE_ID)
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'POST',
        '/files/trash/d04ab491-2fc6'
      )
      expect(result).toEqual({
        data: {
          id: FILE_ID,
          type: 'io.cozy.files',
          trashed: false
        }
      })
    })
  })

  describe('deleteFilePermanently', () => {
    it('should definitely delete a file', async () => {
      const FILE_ID = 'd04ab491-2fc6'
      client.fetchJSON.mockReturnValue({
        data: {
          id: FILE_ID,
          type: 'io.cozy.files'
        }
      })
      const result = await collection.deleteFilePermanently(FILE_ID)
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'PATCH',
        '/files/d04ab491-2fc6',
        {
          data: {
            type: 'io.cozy.files',
            id: 'd04ab491-2fc6',
            attributes: {
              permanent_delete: true
            }
          }
        }
      )
      expect(result).toEqual({
        id: FILE_ID,
        type: 'io.cozy.files'
      })
    })
  })

  describe('download', () => {
    beforeEach(() => {
      client.fetchJSON.mockResolvedValue({
        links: {
          related: 'http://downloadable-link'
        },
        data: {}
      })
    })

    afterEach(() => {
      client.fetchJSON.mockClear()
    })

    it('should work when not specifying a revision', async () => {
      const file = {
        _id: '42',
        name: 'fileName'
      }
      await collection.download(file)
      const expectPath = `/files/downloads?Id=${file._id}&Filename=${file.name}`
      expect(client.fetchJSON).toHaveBeenCalledWith('POST', expectPath)
    })

    it('should use download a specific version of a file', async () => {
      const file = {
        _id: '42',
        name: 'fileName'
      }
      await collection.download(file, '123')
      const expectPath = `/files/downloads?VersionId=123&Filename=${file.name}`
      expect(client.fetchJSON).toHaveBeenCalledWith('POST', expectPath)
    })

    it('should use download a specific version of a file with a specific name', async () => {
      const file = {
        _id: '42',
        name: 'fileName'
      }
      await collection.download(file, '123', 'myFileName')
      const expectPath = `/files/downloads?VersionId=123&Filename=myFileName`
      expect(client.fetchJSON).toHaveBeenCalledWith('POST', expectPath)
    })
  })

  describe('createFile', () => {
    const data = new File([''], 'mydoc.epub')
    const id = '59140416-b95f'
    const dirId = '41686c35-9d8e'

    beforeEach(() => {
      client.fetchJSON.mockReturnValue({
        data: {
          id: id,
          _id: id,
          dir_id: dirId
        }
      })
    })

    afterEach(() => {
      client.fetchJSON.mockClear()
    })

    it('should create a file without metadata', async () => {
      const params = {
        dirId: '41686c35-9d8e'
      }
      const result = await collection.createFile(data, params)
      const expectedPath = `/files/${dirId}?Name=mydoc.epub&Type=file&Executable=false&MetadataID=`
      const expectedOptions = {
        headers: {
          'Content-Type': 'application/epub+zip'
        }
      }
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'POST',
        expectedPath,
        data,
        expectedOptions
      )
      expect(result).toEqual({
        data: {
          id: id,
          _id: id,
          _type: 'io.cozy.files',
          dir_id: dirId
        }
      })
    })

    it('should create a file with metadata', async () => {
      const metadataId = '2460a631-ae55'
      client.fetchJSON.mockReturnValueOnce({
        data: {
          id: metadataId
        }
      })
      const params = {
        dirId: dirId,
        metadata: { type: 'bill' }
      }
      const result = await collection.createFile(data, params)
      const expectedPath = `/files/${dirId}?Name=mydoc.epub&Type=file&Executable=false&MetadataID=${metadataId}`
      const expectedOptions = {
        headers: {
          'Content-Type': 'application/epub+zip'
        }
      }
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'POST',
        expectedPath,
        data,
        expectedOptions
      )
      expect(result).toEqual({
        data: {
          id: id,
          _id: id,
          _type: 'io.cozy.files',
          dir_id: dirId
        }
      })
    })
  })

  describe('isChild', () => {
    beforeEach(() => {
      client.fetchJSON
        .mockReturnValue({
          data: {
            _id: 'root-id',
            dir_id: '',
            path: '/'
          }
        })
        .mockReturnValueOnce({
          data: {
            _id: '123',
            dir_id: 'root-id',
            path: '/a/b'
          }
        })
        .mockReturnValueOnce({
          data: {
            _id: '456',
            dir_id: '123',
            path: '/a/b/c'
          }
        })
    })

    it('should find the parent with path', async () => {
      const child = { _id: 'file-id', path: '/a/b/c', dirID: '456' }
      const parent = { _id: 'root-id' }
      const res = await collection.isChildOf(child, parent)
      expect(res).toEqual(true)

      expect(client.fetchJSON).toHaveBeenNthCalledWith(
        1,
        'GET',
        '/files/metadata?Path=%2Fa'
      )
      expect(client.fetchJSON).toHaveBeenNthCalledWith(
        2,
        'GET',
        '/files/metadata?Path=%2Fa%2Fb'
      )
      expect(client.fetchJSON).toHaveBeenNthCalledWith(
        3,
        'GET',
        '/files/metadata?Path=%2Fa%2Fb%2Fc'
      )
    })

    it('should find the parent with id', async () => {
      client.fetchJSON
        .mockReturnValueOnce({
          data: {
            _id: 'root-id',
            dir_id: '',
            path: '/'
          }
        })
        .mockReturnValueOnce({
          data: {
            _id: '123',
            dir_id: 'root-id',
            path: '/a'
          }
        })
        .mockReturnValueOnce({
          data: {
            _id: 'file-id',
            dir_id: '123',
            path: '/a/b'
          }
        })

      const res = await collection.isChildOf('file-id', 'root-id')
      expect(res).toEqual(true)
    })

    it('should find the parent with dirID', async () => {
      const child = { _id: 'file-id', path: '/a/b/c', dirID: 'root-id' }
      const parent = 'root-id'
      const res = await collection.isChildOf(child, parent)
      expect(res).toEqual(true)
    })

    it('should not find the parent', async () => {
      const child = { _id: 'file-id', path: '/a/b/c', dirID: '456' }
      const parent = { _id: 'fake-id' }
      const res = await collection.isChildOf(child, parent)
      expect(res).toEqual(false)
    })
  })

  describe('fetchFileContent', () => {
    it('should fetch the content of a file', async () => {
      const FILE_ID = 'd04ab491-2fc6'

      await collection.fetchFileContent(FILE_ID)
      expect(client.fetch).toHaveBeenCalledWith(
        'GET',
        '/files/download/d04ab491-2fc6'
      )
    })
  })
})
