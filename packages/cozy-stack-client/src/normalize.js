/**
 * Normalize a document, adding its doctype if needed
 *
 * @param {object} doc - Document to normalize
 * @param {string} doctype - Document doctype
 * @returns {object} normalized document
 * @private
 */
export function normalizeDoc(doc = {}, doctype) {
  const id = doc._id || doc.id
  return { id, _id: id, _type: doctype, ...doc }
}

/**
 * Normalizes a document in JSON API format for a specific doctype
 *
 * @param {string} doctype - The document type
 * @returns {Function} A function that normalizes the document
 */
export function normalizeDoctypeJsonApi(doctype) {
  /**
   * @param {object} data - The document from "data" property of the response in JSON API format
   * @returns {object} The normalized document
   */
  return function(data) {
    const normalizedDoc = normalizeDoc(data, doctype)
    return {
      ...normalizedDoc,
      ...normalizedDoc.attributes
    }
  }
}
