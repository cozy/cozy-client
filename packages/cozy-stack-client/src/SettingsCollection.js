import DocumentCollection, { normalizeDoc } from './DocumentCollection'
import logger from './logger'
import { uri } from './utils'

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
    // This is a dirty quick fix waiting for this issue to be resolved
    // https://github.com/cozy/cozy-stack/issues/3864
    if (id === 'io.cozy.settings.bitwarden') {
      const resp = await this.stackClient.fetchJSON(
        'GET',
        '/data/io.cozy.settings/io.cozy.settings.bitwarden'
      )
      return {
        data: DocumentCollection.normalizeDoctypeJsonApi(SETTINGS_DOCTYPE)(
          resp,
          resp
        )
      }
    }

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

  /**
   * Updates a settings document
   *
   * @param {object} document - Document to update. Do not forget the _id attribute
   */
  async update(document) {
    let resp

    if (document._id === 'io.cozy.settings.instance') {
      resp = await this.stackClient.fetchJSON(
        'PUT',
        '/settings/instance',
        document
      )
    } else {
      resp = await this.stackClient.fetchJSON(
        'PUT',
        uri`/data/${this.doctype}/${document._id}`,
        document
      )
    }

    return {
      data: normalizeDoc(resp.data, this.doctype)
    }
  }

  /**
   * Updates the current OAuth client's last synchronization date
   */
  async updateLastSynced() {
    return this.stackClient.fetchJSON('POST', '/settings/synchronized')
  }
}

SettingsCollection.normalizeDoctype = DocumentCollection.normalizeDoctypeJsonApi

export default SettingsCollection
