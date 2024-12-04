/**
 * Caches promises while they are pending
 * Serves to dedupe equal queries requested at the same time
 */
class PromiseCache {
  constructor() {
    /**
     * Holds pending promises
     *
     * @type {Object.<string, Promise>}
     */
    this.pending = {}
  }

  /**
   * Tries to find a pending promise corresponding to the result of keyFunc
   * - If not found, promiseFunc is executed and the resulting promise is stored while it's pending
   * - If found, it is immediately returned
   *
   * @template T
   * @param  {function(): Promise<T>} promiseFunc - Not executed only if an "equal" promise is already pending.
   * @param  {function(): string} keyFunc - Returns a key to find in cache to find a pending promise.
   * @returns {Promise<T>}
   */
  async exec(promiseFunc, keyFunc) {
    const key = keyFunc()

    const already = this.pending[key]

    let prom
    if (already) {
      prom = already
    } else {
      prom = promiseFunc()
      this.pending[key] = prom
    }
    try {
      const response = await prom
      return response
    } finally {
      this.pending[key] = null
    }
  }
  /**
   *
   * @param {function(): string} keyFunc - Returns a key to find in cache to find a pending promise.
   * @returns {Promise | null}
   */
  get(keyFunc) {
    const key = keyFunc()
    const already = this.pending[key]
    if (already) return already
    return null
  }
}

export default PromiseCache
