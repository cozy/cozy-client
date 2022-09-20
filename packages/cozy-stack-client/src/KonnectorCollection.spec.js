jest.mock('./CozyStackClient')

import CozyStackClient from './CozyStackClient'
import DocumentCollection from './KonnectorCollection'
import KonnectorCollection from './KonnectorCollection'
import TriggerCollection from './TriggerCollection'
import {
  ALL_KONNECTORS_RESPONSE,
  GET_KONNECTORS_RESPONSE
} from './__tests__/fixtures/konnectors'

const FIXTURES = {
  ALL_KONNECTORS_RESPONSE,
  GET_KONNECTORS_RESPONSE
}
describe(`KonnectorCollection`, () => {
  const client = new CozyStackClient()

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('all', () => {
    const collection = new KonnectorCollection(client)

    beforeAll(() => {
      client.fetchJSON.mockReturnValue(
        Promise.resolve(FIXTURES.ALL_KONNECTORS_RESPONSE)
      )
    })

    it('should call the right route', async () => {
      await collection.all()
      expect(client.fetchJSON).toHaveBeenCalledWith('GET', '/konnectors/')
    })

    it('should return a correct JSON API response', async () => {
      const resp = await collection.all()
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized documents', async () => {
      const resp = await collection.all()
      expect(resp.data[0]).toHaveDocumentIdentity()
      expect(resp.data[0].id).toEqual('io.cozy.konnectors/bouibox')
    })

    it('should ignore id attribute in manifests', async () => {
      const resp = await collection.all()
      expect(
        resp.data.every(
          konnector => konnector.id === `${konnector._type}/${konnector.slug}`
        )
      ).toBe(true)
    })
  })

  describe('find', () => {
    it('should rely internally on DocumentCollection.find()', async () => {
      jest
        .spyOn(DocumentCollection.prototype, 'find')
        .mockImplementation(() => {})

      const collection = new KonnectorCollection(client)
      await collection.find({ slug: 'test' })

      expect(DocumentCollection.prototype.find).toHaveBeenLastCalledWith({
        slug: 'test'
      })
    })
  })

  describe('get', () => {
    const collection = new KonnectorCollection(client)

    beforeAll(() => {
      client.fetchJSON.mockReturnValue(
        Promise.resolve(FIXTURES.GET_KONNECTORS_RESPONSE)
      )
    })
    it('should call the right route', async () => {
      await collection.get('io.cozy.konnectors/fakeid')
      expect(client.fetchJSON).toHaveBeenCalledWith('GET', '/konnectors/fakeid')
    })

    it('should return a correct JSON API response', async () => {
      const resp = await collection.get('io.cozy.konnectors/fakeid')
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized document', async () => {
      const resp = await collection.get('io.cozy.konnectors/fakeid')
      expect(resp.data).toHaveDocumentIdentity()
      expect(resp.data.name).toEqual('Boui Box')
    })
  })

  describe('create', () => {
    const collection = new KonnectorCollection(client)

    it('should throw error', async () => {
      await expect(collection.create()).rejects.toThrowError(
        'create() method is not available for konnectors'
      )
    })
  })

  describe('launch', () => {
    it('should launch the right konnector', async () => {
      const collection = new KonnectorCollection(client)
      jest.spyOn(TriggerCollection.prototype, 'all').mockResolvedValue({
        data: [
          {
            id: 1,
            attributes: {
              _id: 1,
              worker: 'konnector',
              message: { account: '123a', konnector: 'konn1' }
            }
          },
          {
            id: 2,
            attributes: {
              _id: 2,
              worker: 'service',
              message: { account: '123a' }
            }
          }
        ]
      })
      client.fetchJSON.mockReset().mockResolvedValue({ data: {} })
      await collection.launch('konn1')
      expect(client.fetchJSON).toMatchSnapshot()
    })
  })

  describe('update', () => {
    const collection = new KonnectorCollection(client)

    it('should call the right route', async () => {
      await collection.update('boursorama83')
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'PUT',
        '/konnectors/boursorama83',
        {}
      )
    })

    it('should call the right route (with source)', async () => {
      await collection.update('boursorama83', {
        source: 'registry://boursorama83/beta'
      })
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'PUT',
        '/konnectors/boursorama83?Source=registry://boursorama83/beta',
        {}
      )
    })

    it('should call the right route (with sync)', async () => {
      await collection.update('boursorama83', {
        sync: true,
        source: 'registry://boursorama83/beta'
      })
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'PUT',
        '/konnectors/boursorama83?Source=registry://boursorama83/beta',
        {
          headers: {
            Accept: 'text/event-stream'
          }
        }
      )
    })
  })

  describe('destroy', () => {
    const collection = new KonnectorCollection(client)

    it('should throw error', async () => {
      await expect(collection.destroy()).rejects.toThrowError(
        'destroy() method is not available for konnectors'
      )
    })
  })
})
