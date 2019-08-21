import DocumentCollection, { normalizeDoc } from './DocumentCollection'

/**
 * Derived class for collections where the stack returns documents
 * at the root of the json response and not as JSON API
 */
class RawApiDocumentCollection extends DocumentCollection {
  /**
   * Provide a callback for `Collection.get`
   * @param {string} doctype
   * @return {function} (data, response) => normalizedDocument
   *                                        using `normalizeDoc`
   */
  static normalizeDoctype(doctype) {
    return function(data, response) {
      // use the response directly, we are not in a standard json api
      return normalizeDoc(response, doctype)
    }
  }
}

export default RawApiDocumentCollection

const normalizeDoctype = RawApiDocumentCollection.normalizeDoctype
export { normalizeDoctype, normalizeDoc }
