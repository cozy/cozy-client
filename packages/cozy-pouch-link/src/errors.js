const EXPIRED_TOKEN_ERROR = /Expired token/
const INVALID_TOKEN_ERROR = /Invalid JWT token/
const INVALID_TOKEN_ALT_ERROR = /Invalid token/

const SQLITE_MISSING_INDEX_ERROR = /no such index/
const POUCHDB_MISSING_INDEX_ERROR = /Could not find that index/
const POUCHDB_MISSING_INDEX_ERROR_ALT = /no index/
const IDB_MISSING_INDEX_ERROR = /The specified index was not found/

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

export const isMissingSQLiteIndexError = error => {
  return SQLITE_MISSING_INDEX_ERROR.test(error.message)
}

export const isMissingPouchDBIndexError = error => {
  return (
    POUCHDB_MISSING_INDEX_ERROR.test(error.message) ||
    POUCHDB_MISSING_INDEX_ERROR_ALT.test(error.message)
  )
}

export const isMissingIDBIndexError = error => {
  return IDB_MISSING_INDEX_ERROR.test(error.message)
}
