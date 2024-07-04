import head from 'lodash/head'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'

/**
 * @typedef {Object} MangoPartialFilter
 */

/**
 * @typedef {object} MangoSelector
 */

/**
 * @typedef {Array<object>} MangoSort
 */

/**
 * @typedef {object} MangoQueryOptions
 * @property {MangoSelector} [selector] Selector
 * @property {MangoSort} [sort] The sorting parameters
 * @property {Array<string>} [fields] The fields to return
 * @property {Array<string>} [partialFilterFields] The partial filter fields
 * @property {number|null} [limit] For pagination, the number of results to return
 * @property {number|null} [skip] For skip-based pagination, the number of referenced files to skip
 * @property {string|null} [indexId] The _id of the CouchDB index to use for this request
 * @property {string|null} [bookmark] For bookmark-based pagination, the document _id to start from
 * @property {Array<string>} [indexedFields]
 * @property {string} [use_index] Name of the index to use
 * @property {boolean} [execution_stats] If true, we request the stats from Couch
 * @property {MangoPartialFilter|null} [partialFilter] An optional partial filter
 */

/**
 * Attributes representing a design doc
 *
 * @typedef {object} DesignDoc
 *
 * @property {string} _id - Id of the design doc. Can be named, e.g. '_design/by_indexed_attribute' or not, e.g. '_design/12345'
 * @property {string} language - The index language. Can be 'query' for mango index or 'javascript' for views.
 * @property {object} views - Views definition, i.e. the index.
 * @property {string} _rev - Rev version
 */

export const normalizeDesignDoc = designDoc => {
  const id = designDoc._id || designDoc.id
  return { id, _id: id, ...designDoc.doc }
}

/**
 * Process a partial filter to generate a string key
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
 * Transform sort into Array
 *
 * @param {MangoSort} sort - The sorting parameters
 * @returns {MangoSort}
 */
export const transformSort = sort => {
  if (!sort || Array.isArray(sort)) {
    return sort
  }
  throw Error('Passing an object to the "sort" is not supported')
}

/**
 * Compute fields that should be indexed for a mango
 * query to work
 *
 *
 * @returns {Array} - Fields to index
 */
export const getIndexFields = (
  /** @type {MangoQueryOptions} */ { selector, partialFilter, sort = [] }
) => {
  return Array.from(
    new Set([
      ...sort.map(sortOption => head(Object.keys(sortOption))),
      ...(selector ? Object.keys(selector) : []),
      ...(partialFilter ? Object.keys(partialFilter) : [])
    ])
  )
}

/**
 * Check if an index is matching the given fields
 *
 * @param {DesignDoc} index - The index to check
 * @param {Array} fields - The fields that the index must have
 * @param {object} partialFilter - An optional partial filter
 * @returns {boolean} True if the index is matches the given fields
 */
export const isMatchingIndex = (index, fields, partialFilter) => {
  const viewId = Object.keys(get(index, `views`))[0]
  const fieldsInIndex = Object.keys(get(index, `views.${viewId}.map.fields`))
  if (isEqual(fieldsInIndex, fields)) {
    const partialFilterInIndex = get(
      index,
      `views.${viewId}.map.partial_filter_selector`
    )
    if (!partialFilter && !partialFilterInIndex) {
      return true
    }
    if (isEqual(partialFilter, partialFilterInIndex)) {
      return true
    }
  }
  return false
}
