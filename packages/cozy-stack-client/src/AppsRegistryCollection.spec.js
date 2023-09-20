jest.mock('./CozyStackClient')

import CozyStackClient from './CozyStackClient'
import AppsRegistryCollection, {
  APPS_REGISTRY_DOCTYPE
} from './AppsRegistryCollection'

describe(`AppsRegistryCollection`, () => {
  const client = new CozyStackClient()

  describe('getAll', () => {
    const collection = new AppsRegistryCollection(client)
    const slugs = ['alan', 'caf']

    beforeAll(() => {
      client.fetchJSON.mockReturnValue(
        Promise.resolve({
          data: [
            {
              id: 'git://github.com/konnectors/alan.git',
              slug: 'alan',
              _type: 'io.cozy.apps_registry',
              latest_version: {
                manifest: {
                  source: 'git://github.com/konnectors/alan.git'
                }
              }
            },
            {
              id: 'git://github.com/konnectors/caf.git',
              slug: 'caf',
              _type: 'io.cozy.apps_registry',
              latest_version: {
                manifest: {
                  source: 'git://github.com/konnectors/caf.git'
                }
              }
            }
          ],
          meta: { count: 2 }
        })
      )
    })

    it('should call the right route', async () => {
      await collection.getAll(slugs)
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/registry/?limit=1000'
      )
    })

    it('should return the correct data', async () => {
      const resp = await collection.getAll(slugs)
      expect(resp.data.length).toBeLessThanOrEqual(slugs.length)
      expect(resp.data.every(d => slugs.includes(d.slug))).toBe(true)
    })

    it('should return a correct JSON API response', async () => {
      const resp = await collection.getAll(slugs)
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized documents', async () => {
      const resp = await collection.getAll(slugs)
      expect(resp.data[0]).toHaveDocumentIdentity()
      expect(resp.data[0]._type).toEqual(APPS_REGISTRY_DOCTYPE)
    })
  })

  describe('all', () => {
    const collection = new AppsRegistryCollection(client)

    beforeAll(() => {
      client.fetchJSON.mockReturnValue(
        Promise.resolve({
          data: [
            {
              id: 'git://github.com/konnectors/alan.git',
              _id: 'git://github.com/konnectors/alan.git',
              _type: 'io.cozy.apps_registry',
              latest_version: {
                manifest: {
                  source: 'git://github.com/konnectors/alan.git'
                }
              }
            }
          ],
          meta: { count: 1 }
        })
      )
    })

    it('should call the right default route', async () => {
      await collection.all()
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/registry/?limit=1000'
      )
    })

    it('should call the right route with custom limit', async () => {
      await collection.all({ limit: 10 })
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/registry/?limit=10'
      )
    })

    it('should return a correct JSON API response', async () => {
      const resp = await collection.all()
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized documents', async () => {
      const resp = await collection.all()
      expect(resp.data[0]).toHaveDocumentIdentity()
      expect(resp.data[0]._type).toEqual(APPS_REGISTRY_DOCTYPE)
    })
  })

  describe('get', () => {
    const collection = new AppsRegistryCollection(client)

    beforeAll(() => {
      client.fetchJSON.mockReturnValue(
        Promise.resolve({
          type: 'io.cozy.apps_registry',
          id: '5396fc6',
          latest_version: {
            manifest: {
              source: 'source.notes'
            }
          }
        })
      )
    })

    it('should call the right route', async () => {
      await collection.get('io.cozy.apps_registry/fakeid')
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/registry/io.cozy.apps_registry/fakeid'
      )
    })

    it('should return a correct JSON API response', async () => {
      const resp = await collection.get('io.cozy.apps_registry/fakeid')
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized document', async () => {
      const resp = await collection.get('io.cozy.apps_registry/fakeid')
      expect(resp.data).toHaveDocumentIdentity()
      expect(resp.data._type).toEqual(APPS_REGISTRY_DOCTYPE)
    })
  })
  describe('create', () => {
    const collection = new AppsRegistryCollection(client)

    it('should throw error', async () => {
      await expect(collection.create()).rejects.toThrowError(
        'create() method is not available for AppsRegistryCollection'
      )
    })
  })
  describe('destroy', () => {
    const collection = new AppsRegistryCollection(client)

    it('should throw error', async () => {
      await expect(collection.destroy()).rejects.toThrowError(
        'destroy() method is not available for AppsRegistryCollection'
      )
    })
  })
})
