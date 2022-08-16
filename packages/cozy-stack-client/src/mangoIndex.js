import { transform } from './utils'
import head from 'lodash/head'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'

/**
 * @typedef {object} MangoPartialFilter
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
 */

export const normalizeDesignDoc = designDoc => {
  const id = designDoc._id || designDoc.id
  return { id, _id: id, ...designDoc.doc }
}

/**
 * Name an index, based on its indexed fields and partial filter.
 *
 * It follows this naming convention:
 * `by_{indexed_field1}_and_{indexed_field2}_filter_{partial_filter_field1}_and_{partial_filter_field2}
 *
 * @param {Array<string>} fields - The indexed fields
 * @param {object} params - The additional params
 * @param {Array<string>} params.partialFilterFields - The partial filter fields
 * @returns {string} The index name, built from the fields
 */
export const getIndexNameFromFields = (
  fields,
  { partialFilterFields } = {}
) => {
  const indexName = `by_${fields.join('_and_')}`
  return partialFilterFields
    ? `${indexName}_filter_${partialFilterFields.join('_and_')}`
    : indexName
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
  console.warn(
    'Passing an object to the "sort" is deprecated, please use an array instead.'
  )
  return transform(
    sort,
    (acc, order, field) => acc.push({ [field]: order }),
    []
  )
}

/**
 * Compute fields that should be indexed for a mango
 * query to work
 *
 * @param {MangoQueryOptions} options - Mango query options
 * @param {MangoSelector|null} options.selector - Mango selector
 * @param {MangoPartialFilter|null} options.partialFilter - An optional partial filter
 * @param {MangoSort} [options.sort] - The sorting parameters
 *
 * @returns {Array} - Fields to index
 */
export const getIndexFields = ({ selector, partialFilter, sort = [] }) => {
  return Array.from(
    new Set([
      ...sort.map(sortOption => head(Object.keys(sortOption))),
      ...(selector ? Object.keys(selector) : []),
      ...(partialFilter ? Object.keys(partialFilter) : [])
    ])
  )
}

/**
 * Check if an index is in an inconsistent state, i.e. it evaluates one of these:
 * - its name contains the indexed attributes which are not in correct order
 * - it contains a partial filter, but the fields are not in the name
 *
 * @param {DesignDoc} index - The index to check
 * @returns {boolean} True if the index is inconsistent
 */
export const isInconsistentIndex = index => {
  const indexId = index._id
  if (!indexId.startsWith('_design/by_')) {
    return false
  }
  const fieldsInName = indexId
    .split('_design/by_')[1]
    .split('_filter_')[0]
    .split('_and_')
  const viewId = Object.keys(get(index, `views`))[0]
  const fieldsInIndex = Object.keys(get(index, `views.${viewId}.map.fields`))
  if (!isEqual(fieldsInName, fieldsInIndex)) {
    return true
  }
  const partialFilter = get(
    index,
    `views.${viewId}.map.partial_filter_selector`
  )
  const partialFilterFields = partialFilter ? Object.keys(partialFilter) : []
  const filteredName = indexId.split('_filter_')
  const partialFilterFieldsInName =
    filteredName.length > 1 ? filteredName[1].split('_and_') : []

  return !isEqual(partialFilterFields, partialFilterFieldsInName)
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
    if (!partialFilter) {
      return true
    }
    const partialFilterInIndex = get(
      index,
      `views.${viewId}.map.partial_filter_selector`
    )
    if (isEqual(partialFilter, partialFilterInIndex)) {
      return true
    }
  }
  return false
}
