import pick from 'lodash/pick'

import AppCollection from './AppCollection'
import TriggerCollection, {
  isForKonnector,
  isForAccount
} from './TriggerCollection'
import { normalizeDoc } from './normalize'

export const KONNECTORS_DOCTYPE = 'io.cozy.konnectors'

class KonnectorCollection extends AppCollection {
  constructor(stackClient) {
    super(stackClient)
    this.doctype = KONNECTORS_DOCTYPE
    this.endpoint = '/konnectors/'
  }

  async create() {
    throw new Error('create() method is not available for konnectors')
  }

  async destroy() {
    throw new Error('destroy() method is not available for konnectors')
  }

  /**
   * Find triggers for a particular konnector
   *
   * @param  {string} slug of the konnector
   */
  async findTriggersBySlug(slug) {
    const triggerCol = new TriggerCollection(this.stackClient)
    const { data: rawTriggers } = await triggerCol.all({ limit: null })
    return rawTriggers
      .map(x => x.attributes)
      .filter(triggerAttrs => isForKonnector(triggerAttrs, slug))
  }

  /**
   * Launch a trigger for a given konnector.
   *
   * @param  {string} slug - Konnector slug
   * @param  {object} options - Options
   * @param  {object} options.accountId - Pinpoint the account that should be used, useful if the user
   * has more than 1 account for 1 konnector
   */
  async launch(slug, options = {}) {
    const triggerCol = new TriggerCollection(this.stackClient)
    const konnTriggers = await this.findTriggersBySlug(slug)
    const filteredTriggers = options.accountId
      ? konnTriggers.filter(triggerAttrs =>
          isForAccount(triggerAttrs, options.accountId)
        )
      : konnTriggers

    if (filteredTriggers.length === 1) {
      return triggerCol.launch(konnTriggers[0])
    } else {
      const filterAttrs = JSON.stringify(
        pick({ slug, accountId: options.accountId })
      )
      if (filteredTriggers.length === 0) {
        throw new Error(`No trigger found for ${filterAttrs}`)
      } else if (filteredTriggers.length > 1) {
        throw new Error(`More than 1 trigger found for ${filterAttrs}`)
      }
    }
  }

  /**
   * Updates a konnector
   *
   * @param  {string} slug - Konnector slug
   * @param  {object} options - Options
   * @param  {object} options.source - Specify the source (ex: registry://slug/stable)
   * @param  {boolean} options.sync - Wait for konnector to be updated, otherwise the job
   * is just scheduled
   */
  async update(slug, options = {}) {
    if (!slug) {
      throw new Error('Cannot call update with no slug')
    }
    const source = options.source || null
    const sync = options.sync || false
    const reqOptions = sync
      ? {
          headers: {
            Accept: 'text/event-stream'
          }
        }
      : {}
    const rawKonnector = await this.stackClient.fetchJSON(
      'PUT',
      `/konnectors/${slug}` + (source ? `?Source=${source}` : ''),
      reqOptions
    )
    return normalizeDoc(rawKonnector)
  }
}

export default KonnectorCollection
