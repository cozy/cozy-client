import DocumentCollection, { normalizeDoc } from './DocumentCollection'

/**
 * Derived class for collections where the stack returns documents
 * with the JSON API.
 */
class JsonApiDocumentCollection extends DocumentCollection {
  /**
   * Provide a callback for `Collection.get`
   * @param {string} doctype
   * @return {function} (data, response) => normalizedDocument
   *                                        using `normalizeDoc`
   */
  static normalizeDoctype(doctype) {
    return function(data, response) {
      // use the "data" attribute of the response
      return normalizeDoc(data, doctype)
    }
  }
}

export default JsonApiDocumentCollection

const normalizeDoctype = JsonApiDocumentCollection.normalizeDoctype
export { normalizeDoctype, normalizeDoc }
