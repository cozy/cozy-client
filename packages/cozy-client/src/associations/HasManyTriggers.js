import get from 'lodash/get'
import memoize from 'lodash/memoize'

import HasMany from './HasMany'

const TRIGGERS_DOCTYPE = 'io.cozy.triggers'

/**
 * Memoize the fetch promise. For now we are only fetching it once but it will
 * evolve in the future.
 */
const fetchKonnectorTriggers = memoize(
  client => client.all(TRIGGERS_DOCTYPE).where({ worker: 'konnector' }),
  client => client.stackClient.uri
)

/**
 * Association used for konnectors to retrieve all their related triggers.
 * @extends HasMany
 */
class HasManyTriggers extends HasMany {
  /**
   * In this association the query is special, we need to fetch all the triggers
   * having for the 'konnector' worker, and then filter them based on their
   * `message.konnector` attribute
   */
  static async query(doc, client) {
    // Check the memoized promise instead of the redux store to avoid executing
    // the same query several times (one time per konnector)
    await fetchKonnectorTriggers(client)

    // Triggers are in store now !
    const triggers = client.getCollectionFromState(TRIGGERS_DOCTYPE)

    return triggers
      ? triggers.filter(
          trigger => get(trigger, 'message.konnector') === doc.slug
        )
      : []
  }
}

export default HasManyTriggers
