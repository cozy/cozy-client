import { CozyStackClient } from './types'

/**
 * Handler for error response which return a empty value for "not found" error
 *
 * @param  {Error}         error - An error
 * @param  {Array|object|null}  data Data to return in case of "not found" error
 * @returns {object}        JsonAPI response with empty data in case of "not
 * found" error.
 */
export const dontThrowNotFoundError = (error, data = []) => {
  if (error.message.match(/not_found/)) {
    const expectsCollection = Array.isArray(data)
    // Return expected JsonAPI attributes : collections are expecting
    // meta, skip and next attribute
    return expectsCollection
      ? { data, meta: { count: 0 }, skip: 0, next: false }
      : {
          data
        }
  }
  throw error
}

/**
 * Helper to identify an index not found error
 *
 * @param {Error} error - An error
 * @returns {Array|null} - Whether or not the error is an index not found error
 */
export const isIndexNotFoundError = error => {
  return error.message.match(/no_index/)
}

/**
 * Helper to identify an index conflict
 *
 * @param {Error} error - An error
 * @returns {Array|null} - Whether or not the error is an index conflict error
 */
export const isIndexConflictError = error => {
  return error.message.match(/error_saving_ddoc/)
}

/**
 * Helper to identify a not used index
 *
 * @param {string} warning - The warning returned by CouchDB
 * @returns {Array|null} Whether or not this is a not used index warning
 */
export const isIndexNotUsedWarning = warning => {
  return warning.match(
    /was not used because it does not contain a valid index for this query/
  )
}

/**
 * Helper to identify a no usable index error
 *
 * @param {Error} error - An error
 * @returns {Array|null} - Whether or not the error is a no usable index error
 */
export const isNoUsableIndexError = error => {
  return error.message.match(/no_usable_index/)
}

/**
 * Helper to identify timeout error
 * See cozy-stack's timeout value for couchdb request: https://github.com/cozy/cozy-stack/blob/669cd694132388ef6b7d1a58cf3d1b5dfb52896a/pkg/config/config/config.go#L963
 *
 * @param {Error} error - An error
 * @returns {Array|null} Whether or not the error is a timeout error
 */
export const isTimeoutError = error => {
  return error.message.match(/context deadline exceeded/)
}

/**
 * Helper to identify a document conflict
 *
 * @param {Error} error - An error
 * @returns {Array|null} - Whether or not the error is a document conflict error
 */
export const isDocumentUpdateConflict = error => {
  return error.message.match(/Document update conflict/)
}

/**
 * Utility class to abstract an regroup identical methods and logics for
 * specific collections.
 */
export class Collection {
  /**
   * Utility method aimed to return only one document.
   *
   * @param  {CozyStackClient}  stackClient - CozyStackClient
   * @param  {string}  endpoint - Stack endpoint
   * @param  {object}  options - Options of the collection
   * @param  {Function}    options.normalize Callback to normalize response data
   * (default `data => data`)
   * @param  {string}  [options.method=GET]  -  HTTP method
   * @returns {Promise<object>}  JsonAPI response containing normalized
   * document as data attribute
   */
  static async get(
    stackClient,
    endpoint,
    { normalize = (data, response) => data, method = 'GET' }
  ) {
    try {
      const resp = await stackClient.fetchJSON(method, endpoint)
      return {
        data: normalize(resp.data, resp)
      }
    } catch (error) {
      return dontThrowNotFoundError(error, null)
    }
  }
}

export default Collection
