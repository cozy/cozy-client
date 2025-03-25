export default DatabaseQueryEngine;
export type FindParams = {
    /**
     * - The mango selector
     */
    selector: object;
    /**
     * - Following the mango selector syntax, used to filter out documents at indexing time
     */
    partialFilter: object;
    /**
     * - The mango sort
     */
    sort: any[];
    /**
     * - The doctype
     */
    doctype: string;
    /**
     * - Array of indexed field name
     */
    indexedFields: Array<string>;
    /**
     * - Maximum number of documents to return
     */
    limit: number;
    /**
     * - Number of documents to skip
     */
    skip: number;
    /**
     * - Whether or not an existing index should be recreated
     */
    recreateIndex: boolean;
};
export type AllDocsParams = {
    /**
     * - Maximum number of documents to return
     */
    limit: number;
    /**
     * - Number of documents to skip
     */
    skip: number;
};
export type QueryResponse = {
    /**
     * - The documents retrieved by the query
     */
    data: Array<object>;
};
export type QueryResponseSingleDoc = {
    /**
     * - The document retrieved by the query
     */
    data: object;
};
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
declare class DatabaseQueryEngine {
    /**
     * Open the database
     *
     * @param {string} dbName - The database name
     */
    openDB(dbName: string): void;
    /**
     * Find docs with filtered query
     *
     * @param {FindParams} options - The find options
     * @returns {Promise<QueryResponse>} The found docs
     */
    find(options: FindParams): Promise<QueryResponse>;
    /**
     * Get all docs
     *
     * @param {AllDocsParams} options - The all docs options
     * @returns {Promise<QueryResponse>} The found docs
     */
    allDocs(options: AllDocsParams): Promise<QueryResponse>;
    /**
     * Get a single doc by its id
     *
     * @param {string} id - id of the document to get
     * @returns {Promise<QueryResponseSingleDoc>} The found docs
     */
    getById(id: string): Promise<QueryResponseSingleDoc>;
    /**
     * Get several docs by their ids
     *
     * @param {Array<string>} ids - ids of the documents to get
     * @returns {Promise<QueryResponse>} The found docs
     */
    getByIds(ids: Array<string>): Promise<QueryResponse>;
}
