/**
 * @typedef {Object} Cancelable
 * @property {Function} [cancel] - Cancel the promise
 */

/**
 * @typedef {Promise & Cancelable} CancelablePromise
 */

/**
 * @typedef {CancelablePromise[] & Cancelable} CancelablePromises
 */

/**
 * @typedef {"synced"|"not_synced"|"not_complete"} SyncStatus
 */

/**
 * @typedef {object} SyncInfo
 * @property {string} date - The date of the last synchronization
 * @property {SyncStatus} status - The current synchronization status
 */

/**
 * @typedef {object} LocalStorage
 * @property {function(string): Promise<string | null>} getItem
 * @property {function(string, string): Promise<void>} setItem
 * @property {function(string): Promise<void>} removeItem
 */

/**
 * @typedef {object} LinkPlatform
 * @property {LocalStorage} storage Methods to access local storage
 * @property {any} pouchAdapter PouchDB class (can be pouchdb-core or pouchdb-browser)
 * @property {function(): Promise<boolean>} isOnline Method that check if the app is connected to internet
 */

/**
 * @typedef {Object} MangoPartialFilter
 */

/**
 * @typedef {object} MangoSelector
 */

/**
 * @typedef {Array<object>} MangoSort
 */

/**
 * @typedef {object} MangoQueryOptions
 * @property {MangoSelector} [selector] Selector
 * @property {MangoSort} [sort] The sorting parameters
 * @property {Array<string>} [fields] The fields to return
 * @property {Array<string>} [partialFilterFields] The partial filter fields
 * @property {number|null} [limit] For pagination, the number of results to return
 * @property {number|null} [skip] For skip-based pagination, the number of referenced files to skip
 * @property {string|null} [indexId] The _id of the CouchDB index to use for this request
 * @property {string|null} [bookmark] For bookmark-based pagination, the document _id to start from
 * @property {Array<string>} [indexedFields]
 * @property {string} [use_index] Name of the index to use
 * @property {boolean} [execution_stats] If true, we request the stats from Couch
 * @property {MangoPartialFilter|null} [partialFilter] An optional partial filter
 */

/**
 * @typedef {object} PouchDbIndex
 * @property {string} id - The ddoc's id
 * @property {string} name - The ddoc's name
 * @property {'exists'|'created'} result - If the index has been created or if it already exists
 */

export default {}
