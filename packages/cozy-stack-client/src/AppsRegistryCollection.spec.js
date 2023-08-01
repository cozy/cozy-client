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
