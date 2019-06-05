import JobCollection from './JobCollection'
import StackClient from './CozyStackClient'

describe('job collection', () => {
  let stackClient, col

  beforeEach(() => {
    stackClient = new StackClient()
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
})
