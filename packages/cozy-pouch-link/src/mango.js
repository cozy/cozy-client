import head from 'lodash/head'

/**
 * Process a partial filter to generate a string key
 *
 * /!\ Warning: this method is similar to cozy-stack-client mangoIndex.makeKeyFromPartialFilter()
 * If you edit this method, please check if the change is also needed in mangoIndex file
 *
 * @param {object} condition - An object representing the partial filter or a sub-condition of the partial filter
 * @returns {string} - The string key of the processed partial filter
 */
export const makeKeyFromPartialFilter = condition => {
  if (typeof condition !== 'object' || condition === null) {
    return String(condition)
  }

  const conditions = Object.entries(condition).map(([key, value]) => {
    if (
      Array.isArray(value) &&
      value.every(subObj => typeof subObj === 'string')
    ) {
      return `${key}_(${value.join('_')})`
    } else if (Array.isArray(value)) {
      return `(${value
        .map(subCondition => `${makeKeyFromPartialFilter(subCondition)}`)
        .join(`)_${key}_(`)})`
    } else if (typeof value === 'object') {
      return `${key}_${makeKeyFromPartialFilter(value)}`
    } else {
      return `${key}_${value}`
    }
  })

  return conditions.join(')_and_(')
}

/**
 * Name an index, based on its indexed fields and partial filter.
 *
 * It follows this naming convention:
 * `by_{indexed_field1}_and_{indexed_field2}_filter_({partial_filter.key1}_{partial_filter.value1})_and_({partial_filter.key2}_{partial_filter.value2})`
 *
 * /!\ Warning: this method is similar to cozy-stack-client mangoIndex.getIndexNameFromFields()
 * If you edit this method, please check if the change is also needed in mangoIndex file
 *
 * @param {Array<string>} fields - The indexed fields
 * @param {object} [partialFilter] - The partial filter
 * @returns {string} The index name, built from the fields
 */
export const getIndexNameFromFields = (fields, partialFilter) => {
  const indexName = `by_${fields.join('_and_')}`

  if (partialFilter) {
    return `${indexName}_filter_(${makeKeyFromPartialFilter(partialFilter)})`
  }

  return indexName
}

/**
 * @function
 * @description Compute fields that should be indexed for a mango
 * query to work
 *
 * @private
 * @param  {import('./types').MangoQueryOptions} options - Mango query options
 * @returns {Array} - Fields to index
 */
const defaultSelector = { _id: { $gt: null } }
export const getIndexFields = (
  /** @type {import('./types').MangoQueryOptions} */ {
    selector = defaultSelector,
    sort = [],
    partialFilter
  }
) => {
  return Array.from(
    new Set([
      ...sort.map(sortOption => head(Object.keys(sortOption))),
      ...(selector ? Object.keys(selector) : []),
      ...(partialFilter ? Object.keys(partialFilter) : [])
    ])
  )
}
