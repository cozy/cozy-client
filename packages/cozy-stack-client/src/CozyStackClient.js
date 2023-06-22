import cloneDeep from 'lodash/cloneDeep'
import AppCollection, { APPS_DOCTYPE } from './AppCollection'
import AppToken from './AppToken'
import AccessToken from './AccessToken'
import DocumentCollection from './DocumentCollection'
import FileCollection from './FileCollection'
import JobCollection, { JOBS_DOCTYPE } from './JobCollection'
import KonnectorCollection, { KONNECTORS_DOCTYPE } from './KonnectorCollection'
import SharingCollection from './SharingCollection'
import PermissionCollection from './PermissionCollection'
import TriggerCollection, { TRIGGERS_DOCTYPE } from './TriggerCollection'
import SettingsCollection, { SETTINGS_DOCTYPE } from './SettingsCollection'
import NotesCollection, { NOTES_DOCTYPE } from './NotesCollection'
import OAuthClientsCollection, {
  OAUTH_CLIENTS_DOCTYPE
} from './OAuthClientsCollection'
import ShortcutsCollection, { SHORTCUTS_DOCTYPE } from './ShortcutsCollection'
import ContactsCollection, { CONTACTS_DOCTYPE } from './ContactsCollection'
import getIconURL from './getIconURL'
import logDeprecate from './logDeprecate'
import errors from './errors'
import { fetchWithXMLHttpRequest, shouldXMLHTTPRequestBeUsed } from './xhrFetch'
import MicroEE from 'microee'
import { FetchError } from './errors'
import logger from './logger'
import PromiseCache from './promise-cache'

const normalizeUri = uriArg => {
  let uri = uriArg
  if (uri === null) return null
  while (uri[uri.length - 1] === '/') {
    uri = uri.slice(0, -1)
  }
  return uri
}

const isRevocationError = err => {
  return err.message && errors.CLIENT_NOT_FOUND.test(err.message)
}

/**
 * Main API against the `cozy-stack` server.
 */
class CozyStackClient {
  constructor(options) {
    const opts = { ...options }
    const { token, uri = '' } = opts
    this.options = opts
    this.setUri(uri)
    this.setToken(token)

    this.konnectors = new KonnectorCollection(this)
    this.jobs = new JobCollection(this)
    this._promiseCache = new PromiseCache()
  }

  /**
   * Creates a {@link DocumentCollection} instance.
   *
   * @param  {string} doctype The collection doctype.
   * @returns {DocumentCollection}
   */
  collection(doctype) {
    if (!doctype) {
      throw new Error('CozyStackClient.collection() called without a doctype')
    }

    switch (doctype) {
      case APPS_DOCTYPE:
        return new AppCollection(this)
      case KONNECTORS_DOCTYPE:
        return new KonnectorCollection(this)
      case 'io.cozy.files':
        return new FileCollection(doctype, this)
      case 'io.cozy.sharings':
        return new SharingCollection(doctype, this)
      case 'io.cozy.permissions':
        return new PermissionCollection(doctype, this)
      case CONTACTS_DOCTYPE:
        return new ContactsCollection(doctype, this)
      case TRIGGERS_DOCTYPE:
        return new TriggerCollection(this)
      case JOBS_DOCTYPE:
        return new JobCollection(this)
      case SETTINGS_DOCTYPE:
        return new SettingsCollection(this)
      case NOTES_DOCTYPE:
        return new NotesCollection(this)
      case OAUTH_CLIENTS_DOCTYPE:
        return new OAuthClientsCollection(this)
      case SHORTCUTS_DOCTYPE:
        return new ShortcutsCollection(this)
      default:
        return new DocumentCollection(doctype, this)
    }
  }

  /**
   * Fetches an endpoint in an authorized way.
   *
   * @param  {string} method The HTTP method.
   * @param  {string} path The URI.
   * @param  {object} [body] The payload.
   * @param  {object} [opts={}] Options for fetch
   * @returns {object}
   * @throws {FetchError}
   */
  async fetch(method, path, body, opts = {}) {
    const options = { ...opts }
    options.method = method
    const headers = (options.headers = { ...opts.headers })

    if (method !== 'GET' && method !== 'HEAD' && body !== undefined) {
      if (headers['Content-Type']) {
        options.body = body
      }
    }

    if (!headers.Authorization) {
      headers.Authorization = this.getAuthorizationHeader()
    }

    // the option credentials:include tells fetch to include the cookies in the
    // request even for cross-origin requests
    // it is still prossible to enforce `credentials` value by providing one in the `opts` prop
    options.credentials = options.credentials || 'include'

    const fullPath = this.fullpath(path)

    const fetcher = shouldXMLHTTPRequestBeUsed(method, path, options)
      ? fetchWithXMLHttpRequest
      : fetch

    try {
      const response = await fetcher(fullPath, options)
      if (!response.ok) {
        this.emit(
          'error',
          new FetchError(response, `${response.status} ${response.statusText}`)
        )
      }
      return response
    } catch (err) {
      if (isRevocationError(err)) {
        this.onRevocationChange(true)
      }
      throw err
    }
  }

  onTokenRefresh(token) {
    if (this.options && this.options.onTokenRefresh) {
      this.options.onTokenRefresh(token)
    }
  }

  onRevocationChange(state) {
    if (this.options && this.options.onRevocationChange) {
      this.options.onRevocationChange(state)
    }
  }

  /**
   * Returns whether the client has been revoked on the server
   */
  async checkForRevocation() {
    try {
      await this.fetchInformation()
      return false
    } catch (err) {
      return isRevocationError(err)
    }
  }

  /**
   * Retrieves a new app token by refreshing the currently used token.
   *
   * @throws {Error} The client should already have an access token to use this function
   * @throws {Error} The client couldn't fetch a new token
   * @returns {Promise} A promise that resolves with a new AccessToken object
   */
  async refreshToken() {
    if (!this.token) throw new Error('Cannot refresh an empty token')

    const options = {
      method: 'GET',
      credentials: 'include'
    }

    if (!global.document) {
      throw new Error('Not in a web context, cannot refresh token')
    }

    const response = await fetch('/?refreshToken', options)

    if (!response.ok) {
      throw new Error(
        "couldn't fetch a new token - response " + response.statusCode
      )
    }
    const html = await response.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    if (!doc) {
      throw Error("couldn't fetch a new token - doc is not html")
    }
    const appNode = doc.querySelector('div[role="application"]')
    if (!appNode) {
      throw Error("couldn't fetch a new token - no div[role=application]")
    }
    const data = appNode.dataset.cozy
      ? JSON.parse(appNode.dataset.cozy)
      : { ...appNode.dataset }

    let { token } = data
    if (token) {
      token = token || data.cozyToken
    }

    if (!token) {
      throw Error(
        "couldn't fetch a new token -- missing data-cozy or data-cozy-token attribute"
      )
    }
    const newToken = new AppToken(token)
    this.setToken(newToken)
    this.onTokenRefresh(newToken)
    return newToken
  }

  /**
   * Fetches JSON in an authorized way.
   *
   * @param  {string} method The HTTP method.
   * @param  {string} path The URI.
   * @param  {object} body The payload.
   * @param  {object} options Options
   * @returns {object}
   * @throws {FetchError}
   */
  async fetchJSON(method, path, body, options = {}) {
    try {
      return await this.fetchJSONWithCurrentToken(method, path, body, options)
    } catch (e) {
      if (
        errors.EXPIRED_TOKEN.test(e.message) ||
        errors.INVALID_TOKEN.test(e.message)
      ) {
        try {
          await this._promiseCache.exec(
            () => this.refreshToken(),
            () => 'refreshToken'
          )
        } catch (refreshError) {
          throw e
        }
        return await this.fetchJSONWithCurrentToken(method, path, body, options)
      } else {
        throw e
      }
    }
  }

  async fetchJSONWithCurrentToken(method, path, bodyArg, options = {}) {
    //Since we modify the object later by adding in some case a
    //content-type, let's clone this object to scope the modification
    const clonedOptions = cloneDeep(options)
    const headers = (clonedOptions.headers = clonedOptions.headers || {})
    headers['Accept'] = 'application/json'

    let body = bodyArg
    if (method !== 'GET' && method !== 'HEAD' && body !== undefined) {
      if (!headers['Content-Type']) {
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify(body)
      }
    }
    const resp = await this.fetch(method, path, body, clonedOptions)
    const contentType = resp.headers.get('content-type')
    const isJson = contentType && contentType.indexOf('json') >= 0
    const data = await (isJson ? resp.json() : resp.text())
    if (resp.ok) {
      return data
    }
    throw new FetchError(resp, data)
  }

  fullpath(path) {
    if (path.startsWith('http')) {
      return path
    } else {
      return this.uri + path
    }
  }

  getAuthorizationHeader() {
    return this.token ? this.token.toAuthHeader() : null
  }

  setCredentials(token) {
    logDeprecate(
      'CozyStackClient::setCredentials is deprecated, use CozyStackClient::setToken'
    )
    return this.setToken(token)
  }

  getCredentials() {
    logDeprecate(
      'CozyStackClient::getCredentials is deprecated, use CozyStackClient::getAuthorizationHeader'
    )
    return this.getAuthorizationHeader()
  }

  /**
   * Change or set the API token
   *
   * @param {string|AppToken|AccessToken} token - Stack API token
   */
  setToken(token) {
    if (!token) {
      this.token = null
    } else {
      if (token.toAuthHeader) {
        // AppToken or AccessToken
        this.token = token
      } else if (typeof token === 'string') {
        // jwt string
        this.token = new AppToken(token)
      } else {
        logger.warn('Cozy-Client: Unknown token format', token)
        throw new Error('Cozy-Client: Unknown token format')
      }
      this.onRevocationChange(false)
    }
  }

  /**
   * Get the access token string, being an oauth token or an app token
   *
   * @returns {string} token
   */
  getAccessToken() {
    return this.token && this.token.getAccessToken()
  }

  setUri(uri) {
    this.uri = normalizeUri(uri)
  }

  getIconURL(opts) {
    return getIconURL(this, opts)
  }
}

MicroEE.mixin(CozyStackClient)
export default CozyStackClient
