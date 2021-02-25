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

  /**
   * @type {Partial<CancelablePromise>}
   */
  const wrapped = new Promise((resolve, reject) => {
    _reject = reject
    promise.then(resolve)
    promise.catch(reject)
  })

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
    console.warn('isQueryLoading called on falsy value.') // eslint-disable-line no-console
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
