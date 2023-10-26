jest.mock('./CozyStackClient')

import CozyStackClient from './CozyStackClient'
import AppsRegistryCollection, {
  APPS_REGISTRY_DOCTYPE
} from './AppsRegistryCollection'

describe(`AppsRegistryCollection`, () => {
  const client = new CozyStackClient()

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

    it('should return list of apps in maintenance', async () => {
      client.fetchJSON.mockReturnValue(
        Promise.resolve([
          {
            _id: 'app1',
            slug: 'app1',
            type: 'webapp',
            maintenance_activated: true
          },
          {
            maintenance_activated: true,
            slug: 'konnector1',
            type: 'konnector'
          }
        ])
      )

      const resp = await collection.get('maintenance')

      expect(resp.data).toHaveLength(2)
      expect(resp.data).toStrictEqual([
        {
          _id: 'app1',
          _type: 'io.cozy.apps_registry',
          id: 'app1',
          slug: 'app1',
          type: 'webapp',
          maintenance_activated: true
        },
        {
          _id: 'konnector1',
          _type: 'io.cozy.apps_registry',
          id: 'konnector1',
          maintenance_activated: true,
          slug: 'konnector1',
          type: 'konnector'
        }
      ])
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
