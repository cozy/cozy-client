/**
 * Get the database name based on prefix and doctype
 *
 * @param {string} prefix - The URL prefix
 * @param {string} doctype - The database doctype
 *
 * @returns {string} The database name
 */
export const getDatabaseName = (prefix, doctype) => {
  return `${prefix}_${doctype}`
}

/**
 * Get the URI prefix
 *
 * @param {string} uri - The Cozy URI
 * @returns {string} The URI prefix
 */
export const getPrefix = uri => {
  return uri.replace(/^https?:\/\//, '')
}

export const formatAggregatedError = aggregatedError => {
  const strings = aggregatedError.errors.map((e, index) => {
    return '\n[' + index + ']: ' + e.message + '\n' + e.stack
  })

  return strings.join('\n')
}
