import logger from './logger'

/**
 * @typedef {Promise} CancelablePromise
 * @property {Function} cancel - Cancel the promise
 */

/**
 * Wraps a promise so that it can be canceled
 *
 * Rejects with canceled: true as soon as cancel is called
 *
 * @param  {Promise} promise  - Promise
 * @returns {CancelablePromise} - Promise with .cancel method
 */
const cancelable = promise => {
  let _reject

  const wrapped = new Promise((resolve, reject) => {
    _reject = reject
    promise.then(resolve)
    promise.catch(reject)
  })

  // @ts-ignore
  wrapped.cancel = () => {
    _reject({ canceled: true })
  }

  return wrapped
}

export { cancelable }

/**
 * Returns whether the result of a query (given via queryConnect or Query)
 * is loading.
 */
export const isQueryLoading = col => {
  if (!col) {
    logger.warn('isQueryLoading called on falsy value.')
    return false
  }
  return col.fetchStatus === 'loading' || col.fetchStatus === 'pending'
}

/**
 * Returns whether a query has been loaded at least once
 */
export const hasQueryBeenLoaded = col => {
  return col.lastFetch
}
