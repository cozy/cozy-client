/**
 * Template tag function for URIs encoding
 *
 * Will automatically apply `encodeURIComponent` to template literal placeholders
 *
 * @example
 * ```
 * const safe = uri`/data/${doctype}/_all_docs?limit=${limit}`
 * ```
 */
export const uri = (strings, ...values) => {
  const parts = [strings[0]]
  for (let i = 0; i < values.length; i++) {
    parts.push(encodeURIComponent(values[i]) + strings[i + 1])
  }
  return parts.join('')
}

/**
 * Helps to avoid nested try/catch when using async/await
 *
 * Inspired by a Go pattern: http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
 *
 * @example
 * ```
 * if (await attempt(collection.all()) return
 * await sleep(1000)
 * if (await attempt(collection.all()) return
 * await sleep(1000)
 * return
 * ```
 */
export const attempt = promise => promise.then(resp => true).catch(err => false)

export const sleep = (time, args) =>
  new Promise(resolve => {
    setTimeout(resolve, time, args)
  })
