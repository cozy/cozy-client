const JOB_DOCTYPE = 'io.cozy.jobs'

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
        type: JOB_DOCTYPE,
        attributes: {
          arguments: args || {},
          options: options || {}
        }
      }
    })
  }
}

export default JobCollection
