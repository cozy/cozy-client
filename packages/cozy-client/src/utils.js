/**
 * Wraps a promise so that it can be canceled
 *
 * Rejects with canceled: true as soon as cancel is called
 *
 * @param  {Promise} promise
 * @returns {AugmentedPromise} - Promise with .cancel method
 */
const cancelable = promise => {
  let _reject
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
 * Create a promise which can be canceled or resolved
 * from outside
 *
 * It's a standard promise but with additionnal methods
 * attached.
 */
export class ResolvablePromise extends Promise {
  /**
   * @param {Function} callback - (resolve, reject) => void
   */
  constructor(callback) {
    let myResolve
    let myReject
    let status = { value: 'waiting' }
    super((resolve, reject) => {
      myResolve = res => {
        if (status.value === 'waiting') status.value = 'resolved'
        return resolve(res)
      }
      myReject = res => {
        if (status.value === 'waiting') status.value = 'rejected'
        return reject(res)
      }
      if (callback) callback(myResolve, myReject)
    })
    this.resolve = myResolve
    this.reject = myReject
    this.status = status
  }

  /**
   * Check if the promise has already resolved
   *
   * @returns {bool}
   */
  hasResolved() {
    return this.status.value === 'resolved'
  }

  /**
   * Check if the promise has rejected
   *
   * @returns {bool}
   */
  hasRejected() {
    return this.status.value === 'rejected'
  }

  /**
   * Check if the promise is still waiting a result
   *
   * @returns {bool}
   */
  isStillWaiting() {
    return this.status.value === 'waiting'
  }
}

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
