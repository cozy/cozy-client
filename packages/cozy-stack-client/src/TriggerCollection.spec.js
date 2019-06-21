jest.mock('./CozyStackClient')

import CozyStackClient from './CozyStackClient'
import TriggerCollection from './TriggerCollection'

const ALL_RESPONSE_FIXTURE = {
  data: [
    {
      type: 'io.cozy.triggers',
      id: 'f100f8d2d30449b98ff1f25437829b3e',
      attributes: {},
      links: {
        self: '/jobs/triggers/f100f8d2d30449b98ff1f25437829b3e'
      }
    },
    {
      type: 'io.cozy.triggers',
      id: '5d9b24acbb8e435c8543e5156d65501a',
      attributes: {},
      links: {
        self: '/jobs/triggers/5d9b24acbb8e435c8543e5156d65501a'
      }
    }
  ]
}

describe('TriggerCollection', () => {
  const stackClient = new CozyStackClient()
  const collection = new TriggerCollection(stackClient)

  beforeEach(() => {
    jest.spyOn(stackClient, 'fetchJSON').mockResolvedValue(ALL_RESPONSE_FIXTURE)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('all', () => {
    it('should call /jobs/triggers route', async () => {
      await collection.all()
      expect(stackClient.fetchJSON).toHaveBeenLastCalledWith(
        'GET',
        '/jobs/triggers'
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

  describe('find', () => {
    it('should throw if no worker in selector', async () => {
      await expect(collection.find()).rejects.toThrowError()
    })

    it('should call /jobs/triggers route', async () => {
      await collection.find({ worker: 'thumbnail' })
      expect(stackClient.fetchJSON).toHaveBeenLastCalledWith(
        'GET',
        '/jobs/triggers?Worker=thumbnail'
      )
    })
  })

  describe('destroy', () => {
    it('should call the correct route', async () => {
      const result = await collection.destroy({
        _id: '123'
      })
      expect(stackClient.fetchJSON).toHaveBeenLastCalledWith(
        'DELETE',
        '/jobs/triggers/123'
      )
      expect(result.data._deleted).toBe(true)
    })

    it('should throw if the document has no _id', async () => {
      await expect(collection.destroy({ _rev: 'yolo' })).rejects.toThrowError()
    })
  })

  describe('get', () => {
    beforeEach(() => {
      jest.spyOn(stackClient, 'fetchJSON').mockImplementation(id => ({
        data: ALL_RESPONSE_FIXTURE.data.find(async t => t.id === id)
      }))
    })

    it('should return trigger', async () => {
      await expect(
        collection.get('f100f8d2d30449b98ff1f25437829b3e')
      ).resolves.toEqual({
        data: {
          ...ALL_RESPONSE_FIXTURE.data[0],
          _id: 'f100f8d2d30449b98ff1f25437829b3e',
          _type: 'io.cozy.triggers'
        }
      })
    })

    it('should return null', async () => {
      jest.spyOn(stackClient, 'fetchJSON').mockImplementation(async () => {
        throw new Error('not_found')
      })

      await expect(
        collection.get('abcdef12345678abcdef12345678abde')
      ).resolves.toEqual({ data: null })
    })

    it('should throw', async () => {
      jest.spyOn(stackClient, 'fetchJSON').mockImplementation(async () => {
        throw new Error('Test error')
      })

      await expect(
        collection.get('f100f8d2d30449b98ff1f25437829b3e')
      ).rejects.toEqual(new Error('Test error'))
    })
  })
})
