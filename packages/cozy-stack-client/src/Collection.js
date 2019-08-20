/**
 * Handler for error response which return a empty value for "not found" error
 * @param  {Error}         error
 * @param  {Array|Object}  data Data to return in case of "not found" error
 * @return {Object}        JsonAPI response with empty data in case of "not
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
 * Utility class to abstract an regroup identical methods and logics for
 * specific collections.
 */
export class Collection {
  /**
   * Utility method aimed to return only one document.
   * @param  {Object}  stackClient
   * @param  {String}  endpoint          Stack endpoint
   * @param  {Object}  options
   * @param  {Func}    options.normalize Callback to normalize response data
   * (default `data => data`)
   * @param  {String}  options.method    HTTP method (default `GET`)
   * @return {Object}  JsonAPI response containing normalized
   * document as data attribute
   */
  static async get(
    stackClient,
    endpoint,
    { normalize = (doc, response) => doc, method = 'GET' }
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
