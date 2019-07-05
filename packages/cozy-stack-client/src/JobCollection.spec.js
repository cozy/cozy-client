import JobCollection from './JobCollection'
import StackClient from './CozyStackClient'

describe('job collection', () => {
  let stackClient, col

  beforeAll(() => {
    stackClient = new StackClient()
  })

  beforeEach(() => {
    jest.spyOn(stackClient, 'fetchJSON').mockResolvedValue({})
    col = new JobCollection(stackClient)
  })

  it('should call the right route when creating', async () => {
    await col.create('service', {
      message: {
        name: 'categorization',
        slug: 'banks'
      }
    })
    expect(stackClient.fetchJSON).toHaveBeenCalledWith(
      'POST',
      '/jobs/queue/service',
      {
        data: {
          attributes: {
            arguments: { message: { name: 'categorization', slug: 'banks' } },
            options: {}
          },
          type: 'io.cozy.jobs'
        }
      }
    )
  })

  it('should call the right route when fetching queued jobs', async () => {
    await col.queued('service')
    expect(stackClient.fetchJSON).toHaveBeenCalledWith(
      'GET',
      '/jobs/queue/service'
    )
  })

  describe('get', () => {
    beforeEach(() => {
      jest.spyOn(stackClient, 'fetchJSON').mockResolvedValue({
        data: {
          type: 'io.cozy.jobs',
          id: '5396fc6299dd437d8d30fecd44745745',
          attributes: {
            domain: 'me.cozy.tools',
            worker: 'sendmail',
            options: {
              priority: 3,
              timeout: 60,
              max_exec_count: 3
            },
            state: 'running',
            queued_at: '2016-09-19T12:35:08Z',
            started_at: '2016-09-19T12:35:08Z',
            error: ''
          },
          links: {
            self: '/jobs/5396fc6299dd437d8d30fecd44745745'
          }
        }
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should call the expected stack endpoint', async () => {
      const jobId = '5396fc6299dd437d8d30fecd44745745'
      await col.get(jobId)
      expect(stackClient.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/jobs/5396fc6299dd437d8d30fecd44745745'
      )
    })
  })
})
