const isArray = require('lodash/isArray')
const orderBy = require('lodash/orderBy')

/**
 * typedef QueryDefinition
 */

/**
 * Chainable API to create query definitions to retrieve documents
 * from a Cozy. `QueryDefinition`s are sent to links.
 */
class QueryDefinition {
  /**
   * @class
   * @param {object} options Initial options for the query definition
   * @param {string} options.doctype - The doctype of the doc.
   * @param {string} options.id - The id of the doc.
   * @param {Array} options.ids - The ids of the docs.
   * @param {object} options.selector - The selector to query the docs.
   * @param {Array} options.fields - The fields to return.
   * @param {Array} options.indexedFields - The fields to index.
   * @param {Array} options.sort - The sorting params.
   * @param {string} options.includes - The docs to include.
   * @param {string} options.referenced - The referenced document.
   * @param {number} options.limit - The document's limit to return.
   * @param {number} options.skip - The number of docs to skip.
   * @param {number} options.cursor - The cursor to paginate views.
   * @param {number} options.bookmark - The bookmark to paginate mango queries.
   */
  constructor(options = {}) {
    this.doctype = options.doctype
    this.id = options.id
    this.ids = options.ids
    this.selector = options.selector
    this.fields = options.fields
    this.indexedFields = options.indexedFields
    this.sort = options.sort
    this.includes = options.includes
    this.referenced = options.referenced
    this.limit = options.limit
    this.skip = options.skip
    this.cursor = options.cursor
    this.bookmark = options.bookmark
  }

  /**
   * Query a single document on its id.
   *
   * @param {string} id   The document id.
   * @returns {QueryDefinition}  The QueryDefinition object.
   */
  getById(id) {
    return new QueryDefinition({ ...this.toDefinition(), id })
  }

  /**
   * Query several documents on their ids.
   *
   * @param {Array} ids   The documents ids.
   * @returns {QueryDefinition}  The QueryDefinition object.
   */
  getByIds(ids) {
    return new QueryDefinition({ ...this.toDefinition(), ids })
  }

  /**
   * Query documents with a [mango selector](http://docs.couchdb.org/en/latest/api/database/find.html#find-selectors).
   * Each field passed in the selector will be indexed, except if the indexField option is used.
   *
   * @param {object} selector   The Mango selector.
   * @returns {QueryDefinition}  The QueryDefinition object.
   */
  where(selector) {
    return new QueryDefinition({ ...this.toDefinition(), selector })
  }

  /**
   * Specify which fields of each object should be returned. If it is omitted, the entire object is returned.
   *
   * @param {Array} fields The fields to return.
   * @returns {QueryDefinition}  The QueryDefinition object.
   */
  select(fields) {
    return new QueryDefinition({ ...this.toDefinition(), fields })
  }

  /**
   * Specify which fields should be indexed. This prevent the automatic indexing of the mango fields.
   *
   * @param {Array} indexedFields The fields to index.
   * @returns {QueryDefinition}  The QueryDefinition object.
   */
  indexFields(indexedFields) {
    return new QueryDefinition({ ...this.toDefinition(), indexedFields })
  }

  /**
   * Specify how to sort documents, following the [sort syntax](http://docs.couchdb.org/en/latest/api/database/find.html#find-sort)
   *
   * @param {Array} sort The list of field name and direction pairs.
   * @returns {QueryDefinition}  The QueryDefinition object.
   */
  sortBy(sort) {
    if (!isArray(sort)) {
      throw new Error(
        `Invalid sort, should be an array ([{ label: "desc"}, { name: "asc"}]), you passed ${JSON.stringify(
          sort
        )}.`
      )
    }
    return new QueryDefinition({ ...this.toDefinition(), sort })
  }

  /**
   * Includes documents having a relationships with the ones queried.
   * For example, query albums including the photos.
   *
   * @param {Array} includes The documents to include.
   * @returns {QueryDefinition}  The QueryDefinition object.
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
   * @returns {QueryDefinition}  The QueryDefinition object.
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
   * Beware, this [performs badly](http://docs.couchdb.org/en/stable/ddocs/views/pagination.html#paging-alternate-method) on view's index.
   *  Prefer cursor-based pagination in such situation.
   *
   * @param {number} skip The number of documents to skip.
   * @returns {QueryDefinition}  The QueryDefinition object.
   */
  offset(skip) {
    return new QueryDefinition({ ...this.toDefinition(), skip })
  }

  /**
   * Use [cursor-based](https://docs.cozy.io/en/cozy-stack/jsonapi/#pagination) pagination.
   * *Warning*: this is only useful for views.
   * The cursor is a [startkey, startkey_docid] array, where startkey is the view's key,
   * e.g. ["io.cozy.photos.albums", "album-id"] and startkey_docid is the id of
   * the starting document of the query, e.g. "file-id".
   * Use the last docid of each query as startkey_docid to paginate or leave blank for the first query.
   *
   * @param {Array} cursor The cursor for pagination.
   * @returns {QueryDefinition}  The QueryDefinition object.
   */
  offsetCursor(cursor) {
    return new QueryDefinition({ ...this.toDefinition(), cursor })
  }

  /**
   * Use [bookmark](https://docs.couchdb.org/en/2.2.0/api/database/find.html#pagination) pagination.
   * Note this only applies for mango-queries (not views) and is way more efficient than skip pagination.
   * The bookmark is a string returned by the _find response and can be seen as a pointer in
   * the index for the next query.
   *
   * @param {string} bookmark The bookmark to continue a previous paginated query.
   * @returns {QueryDefinition}  The QueryDefinition object.
   */
  offsetBookmark(bookmark) {
    return new QueryDefinition({ ...this.toDefinition(), bookmark })
  }

  /**
   * Use the [file reference system](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/)
   *
   * @param {object} document The reference document
   * @returns {QueryDefinition}  The QueryDefinition object.
   */
  referencedBy(document) {
    return new QueryDefinition({ ...this.toDefinition(), referenced: document })
  }

  toDefinition() {
    return {
      doctype: this.doctype,
      id: this.id,
      ids: this.ids,
      selector: this.selector,
      fields: this.fields,
      indexedFields: this.indexedFields,
      sort: this.sort,
      includes: this.includes,
      referenced: this.referenced,
      limit: this.limit,
      skip: this.skip,
      cursor: this.cursor,
      bookmark: this.bookmark
    }
  }
}

/**
 * Helper to create a QueryDefinition. Recommended way to create
 * query definitions.
 *
 * @example
 * ```
 * import { Q } from 'cozy-client'
 *
 * const qDef = Q('io.cozy.todos').where({ _id: '1234' })
 * ```
 */
export const Q = doctype => new QueryDefinition({ doctype })

// Mutations
const CREATE_DOCUMENT = 'CREATE_DOCUMENT'
const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT'
const DELETE_DOCUMENT = 'DELETE_DOCUMENT'
const ADD_REFERENCES_TO = 'ADD_REFERENCES_TO'
const REMOVE_REFERENCES_TO = 'REMOVE_REFERENCES_TO'
const ADD_REFERENCED_BY = 'ADD_REFERENCED_BY'
const REMOVE_REFERENCED_BY = 'REMOVE_REFERENCED_BY'
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

export const addReferencedBy = (document, referencedDocuments) => ({
  mutationType: MutationTypes.ADD_REFERENCED_BY,
  referencedDocuments,
  document
})

export const removeReferencedBy = (document, referencedDocuments) => ({
  mutationType: MutationTypes.REMOVE_REFERENCED_BY,
  referencedDocuments,
  document
})

export const uploadFile = (file, dirPath) => ({
  mutationType: MutationTypes.UPLOAD_FILE,
  file,
  dirPath
})

/**
 * Creates a sort function from a definition.
 *
 * Used to sort query results inside the store when creating a file or
 * receiving updates.
 *
 * @private
 */
export const makeSorterFromDefinition = definition => {
  const sort = definition.sort
  if (!sort) {
    return docs => docs
  } else if (!isArray(definition.sort)) {
    console.warn(
      'Correct update of queries with a sort that is not an array is not supported. Use an array as argument of QueryDefinition::sort'
    )
    return docs => docs
  } else {
    const attributeOrders = sort.map(x => Object.entries(x)[0])
    const attrs = attributeOrders.map(x => x[0])
    const orders = attributeOrders.map(x => x[1])
    return docs => orderBy(docs, attrs, orders)
  }
}

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
  addReferencedBy,
  removeReferencedBy,
  uploadFile
}

export const MutationTypes = {
  CREATE_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  ADD_REFERENCES_TO,
  REMOVE_REFERENCES_TO,
  ADD_REFERENCED_BY,
  REMOVE_REFERENCED_BY,
  UPLOAD_FILE
}

export { QueryDefinition }
