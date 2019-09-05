/**
 * Delete outdated results from cache
 */
const garbageCollect = (cache, maxDuration) => {
  const now = Date.now()
  for (const key of Object.keys(cache)) {
    const delta = now - cache[key].date
    if (delta > maxDuration) {
      delete cache[key]
    }
  }
}

/**
 * Memoize with maxDuration and custom key
 */
const memoize = (fn, options) => {
  const cache = {}

  return function() {
    const key = options.key.apply(null, arguments)
    garbageCollect(cache, options.maxDuration)
    const existing = cache[key]
    if (existing) {
      return existing.result
    } else {
      const result = fn.apply(this, arguments)
      cache[key] = {
        result,
        date: Date.now()
      }
      /**
       * If the result is a promise and that this promise
       * failed or resolved with a specific key (aka ''), let's remove
       * the result from the cache since we don't want to
       * memoize error
       */

      if (typeof result === 'object') {
        if (typeof result.then === 'function') {
          result
            .then(v => {
              if (v === '') {
                delete cache[key]
              }
            })
            .catch(() => {
              delete cache[key]
            })
        }
      }
      return result
    }
  }
}

export default memoize
