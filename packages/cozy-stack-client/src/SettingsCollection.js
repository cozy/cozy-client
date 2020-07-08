import DocumentCollection from './DocumentCollection'

export const SETTINGS_DOCTYPE = 'io.cozy.settings'

/**
 * Implements `DocumentCollection` API to interact with the /settings endpoint of the stack
 * 
 * @typedef {object} SettingsDocument
 
 */

class SettingsCollection extends DocumentCollection {
  constructor(stackClient) {
    super(SETTINGS_DOCTYPE, stackClient)
  }

  /**
   * async get - Calls a route on the /settings API
   *
   * @param  {string} path The setting route to call, eg `instance` or `context`
   * @returns {SettingsDocument} The response from the route
   */
  async get(path) {
    const resp = await this.stackClient.fetchJSON('GET', `/settings/${path}`)
    return {
      data: DocumentCollection.normalizeDoctypeJsonApi(SETTINGS_DOCTYPE)(
        resp.data,
        resp
      )
    }
  }
  /**
   * async create - Post on the /settings API
   *
   * @param {object} path The setting route to call, eg `synchronized`
   * @returns {SettingsDocument} Return a SettingsDocument
   */
  async create({ path }) {
    if (!path) {
      console.error(`You have to pass an object with a path attribute`)
    }
    let sanitized = path.startsWith('/') ? path.substr(1) : path
    const resp = await this.stackClient.fetchJSON(
      'POST',
      `/settings/${sanitized}`
    )
    return {
      data: DocumentCollection.normalizeDoctypeJsonApi(SETTINGS_DOCTYPE)(
        resp.data,
        resp
      )
    }
  }
}

SettingsCollection.normalizeDoctype = DocumentCollection.normalizeDoctypeJsonApi

export default SettingsCollection
