import Collection from './Collection'
import { normalizeDoc } from './DocumentCollection'
import { uri } from './utils'

export const JOBS_DOCTYPE = 'io.cozy.jobs'

export const normalizeJob = job => {
  return {
    ...job,
    ...normalizeDoc(job, JOBS_DOCTYPE),
    ...job.attributes
  }
}

class JobCollection {
  constructor(stackClient) {
    this.stackClient = stackClient
  }
  queued(workerType) {
    return this.stackClient.fetchJSON('GET', `/jobs/queue/${workerType}`)
  }

  create(workerType, args, options) {
    return this.stackClient.fetchJSON('POST', `/jobs/queue/${workerType}`, {
      data: {
        type: JOBS_DOCTYPE,
        attributes: {
          arguments: args || {},
          options: options || {}
        }
      }
    })
  }

  async get(id) {
    return Collection.get(this.stackClient, uri`/jobs/${id}`, {
      normalize: normalizeJob
    })
  }
}

export default JobCollection
