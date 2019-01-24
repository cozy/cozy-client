jest.mock('../CozyStackClient')

import CozyStackClient from '../CozyStackClient'
import TriggerCollection from '../TriggerCollection'

describe('TriggerCollection', () => {
  const client = new CozyStackClient()

  describe('create', () => {
    const collection = new TriggerCollection(client)

    const attributes = {
      type: '@event',
      arguments: 'io.cozy.invitations',
      debounce: '10m',
      worker: 'sendmail',
      worker_arguments: {},
      options: {
        priority: 3,
        timeout: 60,
        max_exec_count: 3
      }
    }

    const CREATE_RESPONSE_FIXTURE = {
      data: {
        type: 'io.cozy.triggers',
        id: 'b926bd6657614b82b7d6d4e63bd7cd3c',
        attributes: {
          type: '@every',
          arguments: '30m10s',
          debounce: '10m',
          worker: 'sendmail',
          options: {
            priority: 3,
            timeout: 60,
            max_exec_count: 3
          }
        },
        links: {
          self: '/jobs/triggers/b926bd6657614b82b7d6d4e63bd7cd3c'
        }
      }
    }

    beforeAll(() => {
      client.fetchJSON.mockResolvedValue(CREATE_RESPONSE_FIXTURE)
    })

    it('should call the right route', async () => {
      await collection.create(attributes)
      expect(client.fetchJSON).toHaveBeenCalledWith('POST', '/jobs/triggers', {
        data: { attributes }
      })
    })

    it('should return a correct JSON API response', async () => {
      const resp = await collection.create(attributes)
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized documents', async () => {
      const resp = await collection.create(attributes)
      expect(resp.data).toHaveDocumentIdentity()
    })
  })

  describe('launch', () => {
    const collection = new TriggerCollection(client)

    const LAUNCH_RESPONSE_FIXTURE = {
      data: {
        type: 'io.cozy.jobs',
        id: '123123',
        attributes: {
          domain: 'me.cozy.tools',
          worker: 'sendmail',
          options: {},
          state: 'running',
          queued_at: '2016-09-19T12:35:08Z',
          started_at: '2016-09-19T12:35:08Z',
          error: ''
        },
        links: {
          self: '/jobs/123123'
        }
      }
    }

    const trigger = {
      _id: '4fb62e7aa17146d8af8f45f5d536d753',
      type: '@event',
      arguments: 'io.cozy.invitations',
      debounce: '10m',
      worker: 'sendmail',
      worker_arguments: {},
      options: {
        priority: 3,
        timeout: 60,
        max_exec_count: 3
      }
    }

    beforeAll(() => {
      client.fetchJSON.mockResolvedValue(LAUNCH_RESPONSE_FIXTURE)
    })

    it('should call the right route', async () => {
      await collection.launch(trigger)
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'POST',
        '/jobs/triggers/4fb62e7aa17146d8af8f45f5d536d753/launch'
      )
    })

    it('should return a correct JSON API response', async () => {
      const resp = await collection.launch(trigger)
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized documents', async () => {
      const resp = await collection.launch(trigger)
      expect(resp.data).toHaveDocumentIdentity()
    })
  })

  describe('all', () => {
    it('throw error', async () => {
      const collection = new TriggerCollection(client)
      expect(collection.all()).rejects.toThrowError(
        'all() method is not yet implemented'
      )
    })
  })

  describe('find', () => {
    it('throw error', async () => {
      const collection = new TriggerCollection(client)
      expect(collection.find()).rejects.toThrowError(
        'find() method is not yet implemented'
      )
    })
  })

  describe('get', () => {
    it('throw error', async () => {
      const collection = new TriggerCollection(client)
      expect(collection.get()).rejects.toThrowError(
        'get() method is not yet implemented'
      )
    })
  })

  describe('update', () => {
    const collection = new TriggerCollection(client)

    it('should throw error', async () => {
      expect(collection.update()).rejects.toThrowError(
        'update() method is not available for applications'
      )
    })
  })

  describe('destroy', () => {
    const collection = new TriggerCollection(client)

    it('should throw error', async () => {
      expect(collection.destroy()).rejects.toThrowError(
        'destroy() method is not available for applications'
      )
    })
  })
})
