import Collection from './Collection'
import { normalizeDoc } from './DocumentCollection'
import { uri } from './utils'

export const JOBS_DOCTYPE = 'io.cozy.jobs'

const sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

export const normalizeJob = job => {
  return {
    ...job,
    ...normalizeDoc(job, JOBS_DOCTYPE),
    ...job.attributes
  }
}

export const hasJobFinished = job => {
  return job.state === 'done' || job.state === 'errored'
}

class JobCollection {
  constructor(stackClient) {
    this.stackClient = stackClient
  }
  queued(workerType) {
    return this.stackClient.fetchJSON('GET', `/jobs/queue/${workerType}`)
  }

  /**
   * Creates a job
   * @param  {string} workerType - Ex: "konnector"
   * @param  {Object} args - Ex: {"slug": "my-konnector", "trigger": "trigger-id"}
   * @param  {Object} options
   * @return {Object} createdJob
   */
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

  /**
   * Return a normalized job, given its id
   */
  async get(id) {
    return Collection.get(this.stackClient, uri`/jobs/${id}`, {
      normalize: normalizeJob
    })
  }

  /**
   * Polls a job state until it is finished
   *
   * `options.until` can be used to tweak when to stop waiting. It will be
   * given the current job state. If true is returned, the awaiting is
   * stopped.
   */
  async waitFor(
    id,
    {
      onUpdate = null,
      until = hasJobFinished,
      delay = 5 * 1000,
      timeout = 60 * 5 * 1000
    }
  ) {
    const start = Date.now()
    let jobData = (await this.get(id)).data.attributes
    while (!jobData || !until(jobData)) {
      await sleep(delay)
      jobData = (await this.get(id)).data.attributes
      if (onUpdate) {
        onUpdate(jobData)
      }
      const now = Date.now()
      if (start - now > timeout) {
        throw new Error('Timeout for JobCollection::waitFor')
      }
    }
    return jobData
  }
}

export default JobCollection
