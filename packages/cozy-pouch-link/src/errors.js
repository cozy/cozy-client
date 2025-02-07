const EXPIRED_TOKEN_ERROR = /Expired token/
const INVALID_TOKEN_ERROR = /Invalid JWT token/
const INVALID_TOKEN_ALT_ERROR = /Invalid token/

const expiredTokenError = error => {
  const errorMsg = error.message
  const errorName = error.name
  return (
    EXPIRED_TOKEN_ERROR.test(errorMsg) ||
    EXPIRED_TOKEN_ERROR.test(errorName) ||
    INVALID_TOKEN_ERROR.test(errorMsg) ||
    INVALID_TOKEN_ERROR.test(errorName) ||
    INVALID_TOKEN_ALT_ERROR.test(errorMsg) ||
    INVALID_TOKEN_ALT_ERROR.test(errorName)
  )
}

export const isExpiredTokenError = error => {
  // @ts-ignore
  // eslint-disable-next-line no-undef
  if (error instanceof AggregateError) {
    return error.errors.some(err => expiredTokenError(err))
  }
  return expiredTokenError(error)
}
