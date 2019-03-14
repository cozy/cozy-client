jest.mock('./CozyStackClient')

import CozyStackClient from './CozyStackClient'
import TriggerCollection from './TriggerCollection'

const ALL_RESPONSE_FIXTURE = {
  data: [
    {
      type: 'io.cozy.triggers',
      id: '123123',
      attributes: {},
      links: {
        self: '/jobs/triggers/123123'
      }
    }
  ]
}

describe('TriggerCollection', () => {
  const stackClient = new CozyStackClient()

  describe('all', () => {
    const collection = new TriggerCollection(stackClient)

    beforeAll(() => {
      stackClient.fetchJSON.mockReturnValue(
        Promise.resolve(ALL_RESPONSE_FIXTURE)
      )
    })

    afterAll(() => {
      stackClient.fetchJSON.mockRestore()
    })

    it('should call the right route', async () => {
      await collection.all()
      expect(stackClient.fetchJSON).toHaveBeenLastCalledWith(
        'GET',
        '/jobs/triggers'
      )

      await collection.all({ Worker: 'konnector' })
      expect(stackClient.fetchJSON).toHaveBeenLastCalledWith(
        'GET',
        '/jobs/triggers?Worker=konnector'
      )
    })

    it('should return a correct JSON API response', async () => {
      const resp = await collection.all()
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized documents', async () => {
      const resp = await collection.all()
      expect(resp.data[0]).toHaveDocumentIdentity()
    })

    it('should not fail if there is no doc of this type yet', async () => {
      stackClient.fetchJSON.mockReturnValue(
        Promise.reject(new Error('404: not_found'))
      )

      const respAll = await collection.all()
      expect(respAll).toConformToJSONAPI()
      expect(respAll.data).toHaveLength(0)

      stackClient.fetchJSON.mockRestore()
    })

    it('should throw for other error types', async () => {
      stackClient.fetchJSON.mockReturnValueOnce(
        Promise.reject(new Error('Bad request'))
      )
      expect.assertions(1)
      try {
        await collection.all()
      } catch (e) {
        expect(e).toBeInstanceOf(Error)
      }
    })
  })
})
