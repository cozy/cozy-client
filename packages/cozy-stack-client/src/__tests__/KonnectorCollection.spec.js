jest.mock('../CozyStackClient')

import CozyStackClient from '../CozyStackClient'
import DocumentCollection from '../KonnectorCollection'
import KonnectorCollection from '../KonnectorCollection'
import ALL_KONNECTORS_RESPONSE from './fixtures/konnectors.json'

const FIXTURES = {
  ALL_KONNECTORS_RESPONSE
}
describe(`KonnectorCollection`, () => {
  const client = new CozyStackClient()

  describe('all', () => {
    const collection = new KonnectorCollection(client)

    beforeAll(() => {
      client.fetchJSON.mockReturnValue(
        Promise.resolve(FIXTURES.ALL_KONNECTORS_RESPONSE)
      )
    })

    afterEach(() => {
      jest.restoreAllMocks()
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
    it('throw error', async () => {
      const collection = new KonnectorCollection(client)
      await expect(collection.get()).rejects.toThrowError(
        'get() method is not yet implemented'
      )
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

  describe('update', () => {
    const collection = new KonnectorCollection(client)

    it('should throw error', async () => {
      await expect(collection.update()).rejects.toThrowError(
        'update() method is not available for konnectors'
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
