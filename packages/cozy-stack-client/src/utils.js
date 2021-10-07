/**
 * @function
 * @description Template tag function for URIs encoding
 *
 * Will automatically apply `encodeURIComponent` to template literal placeholders
 *
 * @example
 * ```
 * const safe = uri`/data/${doctype}/_all_docs?limit=${limit}`
 * ```
 *
 * @private
 */
export const uri = (strings, ...values) => {
  const parts = [strings[0]]
  for (let i = 0; i < values.length; i++) {
    parts.push(encodeURIComponent(values[i]) + strings[i + 1])
  }
  return parts.join('')
}

/**
 * @function
 * @description Helps to avoid nested try/catch when using async/await
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
 *
 * @private
 */
export const attempt = promise => promise.then(() => true).catch(() => false)

/**
 * @function
 * @description Helps to avoid nested try/catch when using async/await — see documentation for attempt
 * @private
 */
export const sleep = (time, args) =>
  new Promise(resolve => {
    setTimeout(resolve, time, args)
  })

export const slugify = text =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
