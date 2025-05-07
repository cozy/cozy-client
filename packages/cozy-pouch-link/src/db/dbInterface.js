/**
 * @typedef {object} FindParams
 * @property {object} selector - The mango selector
 * @property {object} partialFilter - Following the mango selector syntax, used to filter out documents at indexing time
 * @property {Array} sort - The mango sort
 * @property {string} doctype - The doctype
 * @property {Array<string>} indexedFields - Array of indexed field name
 * @property {number} limit - Maximum number of documents to return
 * @property {number} skip - Number of documents to skip
 * @property {boolean} recreateIndex - Whether or not an existing index should be recreated
 */

/**
 * @typedef {object} AllDocsParams
 * @property {number} limit - Maximum number of documents to return
 * @property {number} skip - Number of documents to skip
 */

/**
 * @typedef {object} QueryResponse
 * @property {Array<object>} data - The documents retrieved by the query
 */

/**
 * @typedef {object} QueryResponseSingleDoc
 * @property {object} data - The document retrieved by the query
 */

class DatabaseQueryEngine {
  /**
   * Open the database
   *
   * @param {string} dbName - The database name
   */
  openDB(dbName) {
    throw new Error('method non implemented')
  }

  /**
   * Find docs with filtered query
   *
   * @param {FindParams} options - The find options
   * @returns {Promise<QueryResponse>} The found docs
   */
  async find(options) {
    throw new Error('method not implemented')
  }

  /**
   * Get all docs
   *
   * @param {AllDocsParams} options - The all docs options
   * @returns {Promise<QueryResponse | null>} The found docs
   */
  async allDocs(options) {
    throw new Error('method not implemented')
  }

  /**
   * Get a single doc by its id
   *
   * @param {string} id - id of the document to get
   * @returns {Promise<QueryResponseSingleDoc | null>} The found docs
   */
  async getById(id) {
    throw new Error('method not implemented')
  }

  /**
   * Get several docs by their ids
   *
   * @param {Array<string>} ids - ids of the documents to get
   * @returns {Promise<QueryResponse | null>} The found docs
   */
  async getByIds(ids) {
    throw new Error('method not implemented')
  }
}

export default DatabaseQueryEngine
