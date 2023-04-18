const EXPIRED_TOKEN = /Expired token/
const CLIENT_NOT_FOUND = /Client not found/
const INVALID_TOKEN = /Invalid JWT token/

export default {
  EXPIRED_TOKEN,
  CLIENT_NOT_FOUND,
  INVALID_TOKEN
}

const getWwwAuthenticateErrorMessage = response => {
  const invalidTokenRegex = /invalid_token/
  const expiredTokenRegex = /access token expired/
  const wwwAuthenticateHeader =
    response.headers && response.headers.get('www-authenticate')

  if (!wwwAuthenticateHeader) {
    return undefined
  }

  if (expiredTokenRegex.test(wwwAuthenticateHeader)) {
    return 'Expired token'
  }

  if (invalidTokenRegex.test(wwwAuthenticateHeader)) {
    return 'Invalid token'
  }

  return undefined
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

    let wwwAuthenticateErrorMessage = getWwwAuthenticateErrorMessage(response)

    if (reason === null) {
      throw new Error(
        `FetchError received a ${response.status} error without a Response Body when calling ${response.url}`
      )
    }

    Object.defineProperty(this, 'message', {
      value:
        reason.message ||
        wwwAuthenticateErrorMessage ||
        (typeof reason === 'string' ? reason : JSON.stringify(reason))
    })
  }
}
