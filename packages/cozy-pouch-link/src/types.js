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

export default {}
