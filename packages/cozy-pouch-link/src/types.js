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

/** @typedef {object} SyncInfo
 * @property {string} Date
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
 */

export default {}
