import DocumentCollection from './DocumentCollection'
import logger from './logger'

export const SETTINGS_DOCTYPE = 'io.cozy.settings'

/**
 * Implements `DocumentCollection` API to interact with the /settings endpoint of the stack
 */
class SettingsCollection extends DocumentCollection {
  constructor(stackClient) {
    super(SETTINGS_DOCTYPE, stackClient)
  }

  /**
   * async get - Calls a route on the /settings API
   *
   * @param  {string} id The setting id to call, eg `io.cozy.settings.instance` for `instance` route or `io.cozy.settings.context` for `context`route
   * @returns {object} The response from the route
   */
  async get(id) {
    let path

    if (id.startsWith('io.cozy.settings.')) {
      path = id.substring(17)
    } else {
      logger.warn(
        `Deprecated: in next versions of cozy-client, it will not be possible to query settings with an incomplete id

- Q('io.cozy.settings').getById('instance')
+ Q('io.cozy.settings').getById('io.cozy.settings.instance')`
      )
      path = id
    }

    const resp = await this.stackClient.fetchJSON('GET', `/settings/${path}`)
    return {
      data: DocumentCollection.normalizeDoctypeJsonApi(SETTINGS_DOCTYPE)(
        { id: `/settings/${path}`, ...resp.data },
        resp
      )
    }
  }
}

SettingsCollection.normalizeDoctype = DocumentCollection.normalizeDoctypeJsonApi

export default SettingsCollection
