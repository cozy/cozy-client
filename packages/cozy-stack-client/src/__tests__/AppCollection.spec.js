jest.mock('../CozyStackClient')

import CozyStackClient from '../CozyStackClient'
import AppCollection from '../AppCollection'
import ALL_APPS_RESPONSE from './fixtures/apps.json'

const FIXTURES = {
  ALL_APPS_RESPONSE
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
})
