import Collection, { dontThrowNotFoundError } from './Collection'
import { normalizeDoc } from './DocumentCollection'
import { normalizeJob } from './JobCollection'
import { uri } from './utils'
import DocumentCollection from './DocumentCollection'
export const JOBS_DOCTYPE = 'io.cozy.jobs'
export const TRIGGERS_DOCTYPE = 'io.cozy.triggers'

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
class TriggerCollection extends DocumentCollection {
  constructor(stackClient) {
    super(TRIGGERS_DOCTYPE, stackClient)
  }

  /**
   * Get the list of triggers.
   *
   * @see https://docs.cozy.io/en/cozy-stack/jobs/#get-jobstriggers
   * @param  {{Worker}} options The fetch options: Worker allow to filter only triggers associated with a specific worker.
   * @return {{data}} The JSON API conformant response.
   * @throws {FetchError}
   */
  async all(options = {}) {
    try {
      const resp = await this.stackClient.fetchJSON('GET', `/jobs/triggers`)

      return {
        data: resp.data.map(row => normalizeTrigger(row, TRIGGERS_DOCTYPE)),
        meta: { count: resp.data.length },
        next: false,
        skip: 0
      }
    } catch (error) {
      return dontThrowNotFoundError(error)
    }
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

  /**
   * Deletes a trigger
   * @see https://docs.cozy.io/en/cozy-stack/jobs/#delete-jobstriggerstrigger-id
   * @param  {object} document The trigger to delete — must have an _id field
   * @returns {object} The deleted document
   */
  async destroy(document) {
    const { _id } = document
    if (!_id) {
      throw new Error('TriggerCollection.destroy needs a document with an _id')
    }
    await this.stackClient.fetchJSON('DELETE', uri`/jobs/triggers/${_id}`)
    return {
      data: normalizeTrigger({ ...document, _deleted: true })
    }
  }

  async find(selector = {}, options = {}) {
    if (Object.keys(selector).length === 1 && selector.worker) {
      // @see https://github.com/cozy/cozy-stack/blob/master/docs/jobs.md#get-jobstriggers
      const url = `/jobs/triggers?Worker=${selector.worker}`

      try {
        const resp = await this.stackClient.fetchJSON('GET', url)

        return {
          data: resp.data.map(row => normalizeTrigger(row, TRIGGERS_DOCTYPE)),
          meta: { count: resp.data.length },
          next: false,
          skip: 0
        }
      } catch (error) {
        return dontThrowNotFoundError(error)
      }
    } else {
      return super.find(selector, options)
    }
  }

  async get(id) {
    return Collection.get(this.stackClient, uri`/jobs/triggers/${id}`, {
      normalize: normalizeTrigger
    })
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
