export const JOBS_DOCTYPE = 'io.cozy.jobs'

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
}

export default JobCollection
