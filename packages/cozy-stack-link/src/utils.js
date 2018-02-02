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
 * let err, data
 * [err, data] = await attempt(collection.all())
 * if (data) return data
 * await sleep(1000)
 * [err, data] = await attempt(collection.all())
 * if (err) return []
 * return data
 * ```
 */
export const attempt = promise => promise.then(resp => true).catch(err => false)

export const sleep = (time, args) =>
  new Promise(resolve => {
    setTimeout(resolve, time, args)
  })
