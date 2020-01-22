jest.mock('../CozyStackClient')

import CozyStackClient from '../CozyStackClient'
import AppCollection from '../AppCollection'
import { ALL_APPS_RESPONSE, GET_APPS_RESPONSE } from './fixtures/apps'

const FIXTURES = {
  ALL_APPS_RESPONSE,
  GET_APPS_RESPONSE
}
describe(`AppCollection`, () => {
  const client = new CozyStackClient()

  describe('all', () => {
    const collection = new AppCollection(client)

    beforeAll(() => {
      client.fetchJSON.mockReturnValue(
        Promise.resolve(FIXTURES.ALL_APPS_RESPONSE)
      )
    })

    it('should call the right route', async () => {
      await collection.all()
      expect(client.fetchJSON).toHaveBeenCalledWith('GET', '/apps/')
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

  describe('get', () => {
    const collection = new AppCollection(client)

    beforeAll(() => {
      client.fetchJSON.mockReturnValue(
        Promise.resolve(FIXTURES.GET_APPS_RESPONSE)
      )
    })
    it('should call the right route', async () => {
      await collection.get('fakeid')
      expect(client.fetchJSON).toHaveBeenCalledWith('GET', '/apps/fakeid')
    })

    it('should return a correct JSON API response', async () => {
      const resp = await collection.get('fakeid')
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized document', async () => {
      const resp = await collection.get('fakeid')
      expect(resp.data).toHaveDocumentIdentity()
    })
  })

  describe('create', () => {
    const collection = new AppCollection(client)

    it('should throw error', async () => {
      await expect(collection.create()).rejects.toThrowError(
        'create() method is not available for applications'
      )
    })
  })

  describe('update', () => {
    const collection = new AppCollection(client)

    it('should throw error', async () => {
      await expect(collection.update()).rejects.toThrowError(
        'update() method is not available for applications'
      )
    })
  })

  describe('destroy', () => {
    const collection = new AppCollection(client)

    it('should throw error', async () => {
      await expect(collection.destroy()).rejects.toThrowError(
        'destroy() method is not available for applications'
      )
    })
  })
})
