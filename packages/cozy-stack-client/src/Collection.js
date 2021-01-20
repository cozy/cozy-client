/**
 * Handler for error response which return a empty value for "not found" error
 *
 * @param  {Error}         error
 * @param  {Array|object}  data Data to return in case of "not found" error
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
 * @param {Error} error
 * @returns {boolean} - Whether or not the error is an index not found error
 */
export const isIndexNotFoundError = error => {
  return error.message.match(/no_index/)
}

/**
 * Helper to identify an index conflict
 *
 * @param {Error} error
 * @returns {boolean} - Whether or not the error is an index conflict error
 */
export const isIndexConflictError = error => {
  return error.message.match(/error_saving_ddoc/)
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
   * @param  {Func}    options.normalize Callback to normalize response data
   * (default `data => data`)
   * @param  {string}  options.method    HTTP method (default `GET`)
   * @returns {object}  JsonAPI response containing normalized
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
