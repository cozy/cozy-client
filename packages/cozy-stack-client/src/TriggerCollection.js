import { normalizeDoc } from './DocumentCollection'
import { uri } from './utils'

export const JOBS_DOCTYPE = 'io.cozy.jobs'
export const TRIGGERS_DOCTYPE = 'io.cozy.triggers'

export const normalizeJob = job => {
  return {
    ...job,
    ...normalizeDoc(job, JOBS_DOCTYPE),
    ...job.attributes
  }
}

export const normalizeTrigger = trigger => {
  return {
    ...trigger,
    ...normalizeDoc(trigger, TRIGGERS_DOCTYPE),
    ...trigger.attributes
  }
}

/**
 * Implements `DocumentCollection` API along with specific methods for `io.cozy.triggers`.
 */
class TriggerCollection {
  constructor(stackClient) {
    this.stackClient = stackClient
  }

  async all() {
    throw new Error('all() method is not yet implemented')
  }

  /**
   * Creates a Trigger document
   * @see https://docs.cozy.io/en/cozy-stack/jobs/#post-jobstriggers
   * @param  {object}  attributes Trigger's attributes
   * @return {object}  Stack response, containing trigger document under `data` attribute.
   */
  async create(attributes) {
    const path = uri`/jobs/triggers`
    const resp = await this.stackClient.fetchJSON('POST', path, {
      data: {
        attributes
      }
    })
    return {
      data: normalizeTrigger(resp.data)
    }
  }

  async destroy() {
    throw new Error('destroy() method is not available for triggers')
  }

  async find() {
    throw new Error('find() method is not yet implemented')
  }

  async get() {
    throw new Error('get() method is not yet implemented')
  }

  /**
   * Force given trigger execution.
   * @see https://docs.cozy.io/en/cozy-stack/jobs/#post-jobstriggerstrigger-idlaunch
   * @param {object} Trigger to launch
   * @return {object} Stack response, containing job launched by trigger, under `data` attribute.
   */
  async launch(trigger) {
    const path = uri`/jobs/triggers/${trigger._id}/launch`
    const resp = await this.stackClient.fetchJSON('POST', path)
    return {
      data: normalizeJob(resp.data)
    }
  }

  async update() {
    throw new Error('update() method is not available for triggers')
  }
}

export default TriggerCollection
