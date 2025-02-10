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

const FIND_RESPONSE_FIXTURES = {
  docs: [
    {
      arguments: '0 37 4 * * 2',
      debounce: '',
      domain: 'q.cozy.tools:8080',
      message: {
        account: '4e33fd27e1d8e55a34742bac6d147290',
        folder_to_save: '4e33fd27e1d8e55a34742bac6d0e886f',
        konnector: 'trainline'
      },
      options: null,
      prefix: 'cozy971032aab50344a685d8862a25234d2c',
      type: '@cron',
      worker: 'konnector',
      _id: '4e33fd27e1d8e55a34742bac6d147ab9',
      _rev: '1-31dc8bf5420aadcf7359b8a5c3f24f83'
    },
    {
      arguments: '0 52 1 * * 2',
      debounce: '',
      domain: 'q.cozy.tools:8080',
      message: {
        account: '4e33fd27e1d8e55a34742bac6d145e34',
        folder_to_save: '4e33fd27e1d8e55a34742bac6d0e886f',
        konnector: 'trainline'
      },

      options: null,
      prefix: 'cozy971032aab50344a685d8862a25234d2c',
      type: '@cron',
      worker: 'konnector',
      _id: '4e33fd27e1d8e55a34742bac6d146af1',
      _rev: '1-1b356adff56becd91fbb5e2ddc18ea4b'
    }
  ],
  limit: 100,
  next: false
}

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

const UPDATE_RESPONSE_FIXTURE = {
  data: {
    type: 'io.cozy.triggers',
    id: 'b926bd6657614b82b7d6d4e63bd7c0c0',
    attributes: {
      type: '@client',
      worker: 'client',
      message: {
        konnector: 'edf',
        account: 'accountid',
        folder_to_save: 'newfolderid'
      }
    },
    links: {
      self: '/jobs/triggers/b926bd6657614b82b7d6d4e63bd7c0c0'
    }
  }
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
    it('should call /jobs/triggers route if only worker selector is passed', async () => {
      await collection.find({ worker: 'thumbnail' })
      expect(stackClient.fetchJSON).toHaveBeenLastCalledWith(
        'GET',
        '/jobs/triggers?Worker=thumbnail'
      )
    })

    it('should call /jobs/triggers route if only type selector is passed', async () => {
      await collection.find({ type: '@cron' })
      expect(stackClient.fetchJSON).toHaveBeenLastCalledWith(
        'GET',
        '/jobs/triggers?Type=%40cron'
      )
    })

    it('should call /jobs/triggers route if only type selector is passed with multiple values', async () => {
      await collection.find({ type: { $in: ['@cron', '@webhook'] } })
      expect(stackClient.fetchJSON).toHaveBeenLastCalledWith(
        'GET',
        '/jobs/triggers?Type=%40cron%2C%40webhook'
      )
    })

    it('should call /jobs/triggers route if only worker selector is passed with multiple values', async () => {
      await collection.find({ worker: { $in: ['client', 'konnector'] } })
      expect(stackClient.fetchJSON).toHaveBeenLastCalledWith(
        'GET',
        '/jobs/triggers?Worker=client%2Ckonnector'
      )
    })

    it('should call /jobs/triggers route if only Worker and type selector is passed', async () => {
      await collection.find({ worker: 'thumbnail', type: '@cron' })
      expect(stackClient.fetchJSON).toHaveBeenLastCalledWith(
        'GET',
        '/jobs/triggers?Worker=thumbnail&Type=%40cron'
      )
    })

    it('should call /jobs/triggers route if only Worker and type selector is passed with multiple type values', async () => {
      await collection.find({
        worker: 'thumbnail',
        type: { $in: ['@cron', '@webhook'] }
      })
      expect(stackClient.fetchJSON).toHaveBeenLastCalledWith(
        'GET',
        '/jobs/triggers?Worker=thumbnail&Type=%40cron%2C%40webhook'
      )
    })

    it('should call /jobs/triggers route if only Worker and type selector is passed with multiple Worker values', async () => {
      await collection.find({
        worker: { $in: ['client', 'konnector'] },
        type: '@cron'
      })
      expect(stackClient.fetchJSON).toHaveBeenLastCalledWith(
        'GET',
        '/jobs/triggers?Worker=client%2Ckonnector&Type=%40cron'
      )
    })

    it('should call /data/io.cozy.triggers/_find route if multiple arguments are passed', async () => {
      stackClient.fetchJSON.mockReturnValue(FIND_RESPONSE_FIXTURES)
      await collection.find({
        worker: 'thumbnail',
        message: { konnector: 'trainline' }
      })
      expect(stackClient.fetchJSON).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.triggers/_find',
        {
          selector: {
            message: {
              konnector: 'trainline'
            },
            worker: 'thumbnail'
          },
          skip: 0,
          use_index: '_design/by_worker_and_message'
        }
      )
    })

    it('should call /data/io.cozy.triggers/_find route if partialFilter is passed', async () => {
      stackClient.fetchJSON.mockReturnValue(FIND_RESPONSE_FIXTURES)
      await collection.find({}, { partialFilter: { worker: 'konnector' } })
      expect(stackClient.fetchJSON).toHaveBeenLastCalledWith(
        'POST',
        '/data/io.cozy.triggers/_find',
        {
          selector: { worker: 'konnector' },
          skip: 0,
          use_index: '_design/by__filter_(worker_konnector)'
        }
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

  describe('create', () => {
    const collection = new TriggerCollection(stackClient)

    beforeEach(() => {
      stackClient.fetchJSON.mockResolvedValue(CREATE_RESPONSE_FIXTURE)
    })
    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should call the right route', async () => {
      await collection.create(attributes)
      expect(stackClient.fetchJSON).toHaveBeenCalledWith(
        'POST',
        '/jobs/triggers',
        {
          data: { attributes }
        }
      )
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

  describe('update', () => {
    const collection = new TriggerCollection(stackClient)

    beforeEach(() => {
      stackClient.fetchJSON.mockResolvedValue(UPDATE_RESPONSE_FIXTURE)
    })
    afterEach(() => {
      jest.resetAllMocks()
    })

    it('should call the right route', async () => {
      await collection.update({
        _id: 'b926bd6657614b82b7d6d4e63bd7c0c0',
        message: {
          konnector: 'edf',
          account: 'accountid',
          folder_to_save: 'newfolderid'
        }
      })
      expect(stackClient.fetchJSON).toHaveBeenCalledWith(
        'PATCH',
        '/jobs/triggers/b926bd6657614b82b7d6d4e63bd7c0c0',
        {
          data: {
            attributes: {
              message: {
                konnector: 'edf',
                account: 'accountid',
                folder_to_save: 'newfolderid'
              }
            }
          }
        }
      )
    })

    it('should return a correct JSON API response', async () => {
      const resp = await collection.update({
        message: {
          konnector: 'edf',
          account: 'accountid',
          folder_to_save: 'newfolderid'
        }
      })
      expect(resp).toConformToJSONAPI()
    })

    it('should return normalized documents', async () => {
      const resp = await collection.update({
        message: {
          konnector: 'edf',
          account: 'accountid',
          folder_to_save: 'newfolderid'
        }
      })
      expect(resp.data).toHaveDocumentIdentity()
    })
    it('should refuse to update a document with non conform attributes', async () => {
      await expect(
        collection.update({ _id: 'triggerid', notaccepted: 'anyvalue' })
      ).rejects.toThrowError()
    })
  })

  describe('launch', () => {
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

    beforeEach(() => {
      stackClient.fetchJSON.mockResolvedValue(LAUNCH_RESPONSE_FIXTURE)
    })
    afterEach(() => {
      jest.resetAllMocks()
    })
    it('should call the right route', async () => {
      await collection.launch(trigger)
      expect(stackClient.fetchJSON).toHaveBeenCalledWith(
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
})
