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
