import AppToken from './AppToken'
import DocumentCollection from './DocumentCollection'
import FileCollection from './FileCollection'

const normalizeUri = uri => {
  while (uri[uri.length - 1] === '/') {
    uri = uri.slice(0, -1)
  }
  return uri
}

/**
 * Cozy stack HTTP client.
 */
export default class CozyStackLink {
  constructor({ token, uri = '' }) {
    this.uri = normalizeUri(uri)
    this.token = new AppToken(token)
  }

  /**
   * Creates a {@link DocumentCollection} instance.
   *
   * @param  {String} doctype The collection doctype.
   * @return {DocumentCollection}
   */
  collection(doctype) {
    if (!doctype) {
      throw new Error('CozyStackLink.collection() called without a doctype')
    }
    switch (doctype) {
      case 'io.cozy.files':
        return new FileCollection(doctype, this)
      default:
        return new DocumentCollection(doctype, this)
    }
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
  async fetch(method, path, body, options = {}) {
    options.method = method
    const headers = (options.headers = options.headers || {})

    headers['Accept'] = 'application/json'

    if (method !== 'GET' && method !== 'HEAD' && body !== undefined) {
      if (headers['Content-Type']) {
        options.body = body
      } else {
        headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(body)
      }
    }

    const credentials = this.getCredentials()
    if (credentials) {
      headers['Authorization'] = credentials.token.toAuthHeader()
      // the option credentials:include tells fetch to include the cookies in the
      // request even for cross-origin requests
      options.credentials = 'include'
    }

    const resp = await fetch(this.fullpath(path), options)
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
    if (!this.token) return null
    return { client: null, token: this.token }
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
