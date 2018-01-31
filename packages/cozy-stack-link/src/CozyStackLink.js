import AppToken from './AppToken'

const normalizeUri = uri => {
  while (uri[uri.length - 1] === '/') {
    uri = uri.slice(0, -1)
  }
  return uri
}

export default class CozyStackLink {
  constructor(options) {
    const { token, uri } = options
    this.uri = normalizeUri(uri)
    this.token = new AppToken(token)
  }

  fetch = async (method, path, body, options = {}) => {
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
    if (resp.ok) {
      const contentType = resp.headers.get('content-type')
      const isJson = contentType && contentType.indexOf('json') >= 0
      const data = await (isJson ? resp.json() : resp.text())
      return data
    }
    return resp
  }

  fullpath(path) {
    return this.uri + path
  }

  getCredentials() {
    if (!this.token) return null
    return { client: null, token: this.token }
  }
}
