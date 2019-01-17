const isString = require('lodash/isString')

/**
 * API to query documents
 */
class QueryDefinition {
  /**
   * Represents a QueryDefinition.
   * @constructor
   * @param {string} doctype - The doctype of the doc.
   * @param {string} id - The id of the doc.
   * @param {Array} ids - The ids of the docs.
   * @param {Object} selector - The selector to query the docs.
   * @param {Array} fields - The fields to return.
   * @param {Array} indexedFields - The fields to index.
   * @param {Array} sort - The sorting params.
   * @param {string} includes - The docs to include.
   * @param {string} referenced - The referenced document.
   * @param {number} limit - The document's limit to return.
   * @param {number} skip - The number of docs to skip.
   */
  constructor({
    doctype,
    id,
    ids,
    selector,
    fields,
    indexedFields,
    sort,
    includes,
    referenced,
    limit,
    skip
  } = {}) {
    this.doctype = doctype
    this.id = id
    this.ids = ids
    this.selector = selector
    this.fields = fields
    this.indexedFields = indexedFields
    this.sort = sort
    this.includes = includes
    this.referenced = referenced
    this.limit = limit
    this.skip = skip
  }

  /**
   * Query documents with a [mango selector](http://docs.couchdb.org/en/latest/api/database/find.html#find-selectors).
   * Each field passed in the selector will be indexed, except if the indexField option is used.
   *
   * @param {Object} selector   The Mango selector.
   * @return {QueryDefinition}  The QueryDefinition object.
   */
  where(selector) {
    return new QueryDefinition({ ...this.toDefinition(), selector })
  }

  /**
   * Specify which fields of each object should be returned. If it is omitted, the entire object is returned.
   *
   * @param {Array} fields The fields to return.
   * @return {QueryDefinition}  The QueryDefinition object.
   */
  select(fields) {
    return new QueryDefinition({ ...this.toDefinition(), fields })
  }

  /**
   * Specify which fields should be indexed. This prevent the automatic indexing of the mango fields.
   *
   * @param {Array} fields The fields to index.
   * @return {QueryDefinition}  The QueryDefinition object.
   */
  indexFields(indexedFields) {
    return new QueryDefinition({ ...this.toDefinition(), indexedFields })
  }

  /**
   * Specify how to sort documents, following the [sort syntax](http://docs.couchdb.org/en/latest/api/database/find.html#find-sort)
   *
   * @param {Array} sort The list of field name and direction pairs.
   * @return {QueryDefinition}  The QueryDefinition object.
   */
  sortBy(sort) {
    if (isString(sort)) {
      throw new Error(
        'Invalid sort, should be an object (`{ label: "desc"}`), you passed a string.'
      )
    }
    return new QueryDefinition({ ...this.toDefinition(), sort })
  }

  /**
   * Includes documents having a relationships with the ones queried.
   * For example, query albums including the photos.
   *
   * @param {Array} includes The documents to include.
   * @return {QueryDefinition}  The QueryDefinition object.
   */
  include(includes) {
    if (!Array.isArray(includes)) {
      throw new Error('include() takes an array of relationship names')
    }
    return new QueryDefinition({ ...this.toDefinition(), includes })
  }

  /**
   * Maximum number of documents returned, useful for pagination. Default is 100.
   *
   * @param {number} limit The document's limit.
   * @return {QueryDefinition}  The QueryDefinition object.
   */
  limitBy(limit) {
    return new QueryDefinition({ ...this.toDefinition(), limit })
  }

  UNSAFE_noLimit() {
    return new QueryDefinition({ ...this.toDefinition(), limit: null })
  }

  /**
   * Skip the first ‘n’ documents, where ‘n’ is the value specified.
   *
   * @param {number} skip The number of documents to skip.
   * @return {QueryDefinition}  The QueryDefinition object.
   */
  offset(skip) {
    return new QueryDefinition({ ...this.toDefinition(), skip })
  }

  /**
   * Use the [file reference system](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/)
   *
   * @param {Object} document The reference document
   * @return {QueryDefinition}  The QueryDefinition object.
   */
  referencedBy(document) {
    return new QueryDefinition({ ...this.toDefinition(), referenced: document })
  }

  toDefinition() {
    return {
      doctype: this.doctype,
      id: this.id,
      selector: this.selector,
      fields: this.fields,
      indexedFields: this.indexedFields,
      sort: this.sort,
      includes: this.includes,
      referenced: this.referenced,
      limit: this.limit,
      skip: this.skip
    }
  }
}

// Mutations
const CREATE_DOCUMENT = 'CREATE_DOCUMENT'
const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT'
const DELETE_DOCUMENT = 'DELETE_DOCUMENT'
const ADD_REFERENCES_TO = 'ADD_REFERENCES_TO'
const REMOVE_REFERENCES_TO = 'REMOVE_REFERENCES_TO'
const UPLOAD_FILE = 'UPLOAD_FILE'

export const createDocument = document => ({
  mutationType: MutationTypes.CREATE_DOCUMENT,
  document
})

export const updateDocument = document => ({
  mutationType: MutationTypes.UPDATE_DOCUMENT,
  document
})

export const deleteDocument = document => ({
  mutationType: MutationTypes.DELETE_DOCUMENT,
  document
})

export const addReferencesTo = (document, referencedDocuments) => ({
  mutationType: MutationTypes.ADD_REFERENCES_TO,
  referencedDocuments,
  document
})

export const removeReferencesTo = (document, referencedDocuments) => ({
  mutationType: MutationTypes.REMOVE_REFERENCES_TO,
  referencedDocuments,
  document
})

export const uploadFile = (file, dirPath) => ({
  mutationType: MutationTypes.UPLOAD_FILE,
  file,
  dirPath
})

export const getDoctypeFromOperation = operation => {
  if (operation.mutationType) {
    const type = operation.mutationType
    switch (type) {
      case CREATE_DOCUMENT:
        return operation.document._type
      case UPDATE_DOCUMENT:
        return operation.document._type
      case DELETE_DOCUMENT:
        return operation.document._type
      case ADD_REFERENCES_TO:
        throw new Error('Not implemented')
      case UPLOAD_FILE:
        throw new Error('Not implemented')
      default:
        throw new Error(`Unknown mutationType ${type}`)
    }
  } else {
    return operation.doctype
  }
}

export const Mutations = {
  createDocument,
  updateDocument,
  deleteDocument,
  addReferencesTo,
  removeReferencesTo,
  uploadFile
}

export const MutationTypes = {
  CREATE_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  ADD_REFERENCES_TO,
  REMOVE_REFERENCES_TO,
  UPLOAD_FILE
}

export { QueryDefinition }
