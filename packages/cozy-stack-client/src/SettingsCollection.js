import DocumentCollection from './DocumentCollection'

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
   * @param  {string} path The setting route to call, eg `instance` or `context`
   * @returns {object} The response from the route
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
}

SettingsCollection.normalizeDoctype = DocumentCollection.normalizeDoctypeJsonApi

export default SettingsCollection
