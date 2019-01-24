import AppCollection, { APPS_DOCTYPE } from './AppCollection'
import AppToken from './AppToken'
import DocumentCollection from './DocumentCollection'
import FileCollection from './FileCollection'
import SharingCollection from './SharingCollection'
import PermissionCollection from './PermissionCollection'
import TriggerCollection, { TRIGGERS_DOCTYPE } from './TriggerCollection'

const normalizeUri = uri => {
  while (uri[uri.length - 1] === '/') {
    uri = uri.slice(0, -1)
  }
  return uri
}

/**
 * Main API against the `cozy-stack` server.
 */
class CozyStackClient {
  constructor({ token, uri = '' }) {
    this.setUri(uri)
    this.setCredentials(token)
  }

  /**
   * Creates a {@link DocumentCollection} instance.
   *
   * @param  {String} doctype The collection doctype.
   * @return {DocumentCollection}
   */
  collection(doctype) {
    if (!doctype) {
      throw new Error('CozyStackClient.collection() called without a doctype')
    }
    switch (doctype) {
      case APPS_DOCTYPE:
        return new AppCollection(this)
      case 'io.cozy.files':
        return new FileCollection(doctype, this)
      case 'io.cozy.sharings':
        return new SharingCollection(doctype, this)
      case 'io.cozy.permissions':
        return new PermissionCollection(doctype, this)
      case TRIGGERS_DOCTYPE:
        return new TriggerCollection(this)
      default:
        return new DocumentCollection(doctype, this)
    }
  }

  /**
   * Fetches an endpoint in an authorized way.
   *
   * @param  {String} method The HTTP method.
   * @param  {String} path The URI.
   * @param  {Object} body The payload.
   * @param  {Object} options
   * @return {Object}
   * @throws {FetchError}
   */
  async fetch(method, path, body, options = {}) {
    options.method = method
    const headers = (options.headers = options.headers || {})

    if (method !== 'GET' && method !== 'HEAD' && body !== undefined) {
      if (headers['Content-Type']) {
        options.body = body
      }
    }

    const credentials = options.credentials || this.getCredentials()
    if (credentials) {
      headers['Authorization'] = credentials
      // the option credentials:include tells fetch to include the cookies in the
      // request even for cross-origin requests
      options.credentials = 'include'
    }

    return fetch(this.fullpath(path), options)
  }

  /**
   * Fetches JSON in an authorized way.
   *
   * @param  {String} method The HTTP method.
   * @param  {String} path The URI.
   * @param  {Object} body The payload.
   * @param  {Object} options
   * @return {Object}
   * @throws {FetchError}
   */
  async fetchJSON(method, path, body, options = {}) {
    const headers = (options.headers = options.headers || {})

    headers['Accept'] = 'application/json'

    if (method !== 'GET' && method !== 'HEAD' && body !== undefined) {
      if (!headers['Content-Type']) {
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify(body)
      }
    }

    const resp = await this.fetch(method, path, body, options)
    const contentType = resp.headers.get('content-type')
    const isJson = contentType && contentType.indexOf('json') >= 0
    const data = await (isJson ? resp.json() : resp.text())
    if (resp.ok) {
      return data
    }
    throw new FetchError(resp, data)
  }

  fullpath(path) {
    return this.uri + path
  }

  getCredentials() {
    return this.token ? this.token.toAuthHeader() : null
  }

  setCredentials(token) {
    this.token = token ? new AppToken(token) : null
  }

  setUri(uri) {
    this.uri = normalizeUri(uri)
  }
}

export class FetchError extends Error {
  constructor(response, reason) {
    super()
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
    // WARN We have to hardcode this because babel doesn't play nice when extending Error
    this.name = 'FetchError'
    this.response = response
    this.url = response.url
    this.status = response.status
    this.reason = reason

    Object.defineProperty(this, 'message', {
      value:
        reason.message ||
        (typeof reason === 'string' ? reason : JSON.stringify(reason))
    })
  }
}

export default CozyStackClient
