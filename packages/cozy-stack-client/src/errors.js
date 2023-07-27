const EXPIRED_TOKEN = /Expired token/
const CLIENT_NOT_FOUND = /Client not found/
const INVALID_TOKEN = /Invalid JWT token/
const INVALID_TOKEN_ALT = /Invalid token/
const UNREGISTERED_CLIENT = /the client must be registered/

export default {
  EXPIRED_TOKEN,
  CLIENT_NOT_FOUND,
  INVALID_TOKEN,
  INVALID_TOKEN_ALT,
  UNREGISTERED_CLIENT
}

const invalidTokenRegex = /invalid_token/
const expiredTokenRegex = /access_token_expired/

const getWwwAuthenticateErrorMessage = response => {
  const wwwAuthenticateHeader = response.headers?.get('www-authenticate')

  if (!wwwAuthenticateHeader) return undefined

  if (expiredTokenRegex.test(wwwAuthenticateHeader)) return 'Expired token'

  if (invalidTokenRegex.test(wwwAuthenticateHeader)) return 'Invalid token'
}

const getReasonMessage = (reason, wwwAuthenticateErrorMessage) => {
  // As for now we only want to use `reason.error` over `reason.message` if it's an unregistered client error
  // For other scenarios, we want to still use `reason.message` over `JSON.stringify(reason)` for better backward compatibility
  const isUnregisteredError =
    typeof reason.error === 'string' && UNREGISTERED_CLIENT.test(reason.error)
      ? reason.error
      : undefined

  return (
    isUnregisteredError ||
    reason.message ||
    wwwAuthenticateErrorMessage ||
    (typeof reason === 'string' ? reason : JSON.stringify(reason))
  )
}

export class FetchError extends Error {
  constructor(response, reason) {
    super()
    Error.captureStackTrace?.(this, this.constructor)

    // WARN We have to hardcode this because babel doesn't play nice when extending Error
    this.name = 'FetchError'
    this.response = response
    this.url = response.url
    this.status = response.status
    this.reason = reason

    if (reason === null) {
      throw new Error(
        `FetchError received a ${response.status} error without a Response Body when calling ${response.url}`
      )
    }

    let wwwAuthenticateErrorMessage = getWwwAuthenticateErrorMessage(response)

    Object.defineProperty(this, 'message', {
      value: getReasonMessage(reason, wwwAuthenticateErrorMessage)
    })
  }
}
