jest.mock('../CozyStackClient')

import CozyStackClient from '../CozyStackClient'
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
    it('throw error', async () => {
      const collection = new KonnectorCollection(client)
      expect(collection.find()).rejects.toThrowError(
        'find() method is not yet implemented'
      )
    })
  })

  describe('get', () => {
    it('throw error', async () => {
      const collection = new KonnectorCollection(client)
      expect(collection.get()).rejects.toThrowError(
        'get() method is not yet implemented'
      )
    })
  })

  describe('create', () => {
    const collection = new KonnectorCollection(client)

    it('should throw error', async () => {
      expect(collection.create()).rejects.toThrowError(
        'create() method is not available for applications'
      )
    })
  })

  describe('update', () => {
    const collection = new KonnectorCollection(client)

    it('should throw error', async () => {
      expect(collection.update()).rejects.toThrowError(
        'update() method is not available for applications'
      )
    })
  })

  describe('destroy', () => {
    const collection = new KonnectorCollection(client)

    it('should throw error', async () => {
      expect(collection.destroy()).rejects.toThrowError(
        'destroy() method is not available for applications'
      )
    })
  })
})
