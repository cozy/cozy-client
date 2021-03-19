import { transform } from './utils'
import head from 'lodash/head'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'

export const normalizeDesignDoc = designDoc => {
  const id = designDoc._id || designDoc.id
  return { id, _id: id, ...designDoc.doc }
}

export const getIndexNameFromFields = fields => {
  return `by_${fields.join('_and_')}`
}

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
 * @param  {object} options - Mango query options
 * @returns {Array} - Fields to index
 */
export const getIndexFields = ({ selector, sort = [] }) => {
  return Array.from(
    new Set([
      ...sort.map(sortOption => head(Object.keys(sortOption))),
      ...(selector ? Object.keys(selector) : [])
    ])
  )
}

/**
 * Check if an index is in an inconsistent state, i.e. its name
 * contains the indexed attributes which are not in correct order.
 *
 * @param {object} index - The index to check
 * @returns {boolean} True if the index is inconsistent
 */
export const isInconsistentIndex = index => {
  const indexId = index._id
  if (!indexId.startsWith('_design/by_')) {
    return false
  }
  const fieldsInName = indexId.split('_design/by_')[1].split('_and_')
  const viewId = Object.keys(get(index, `views`))[0]
  const fieldsInIndex = Object.keys(get(index, `views.${viewId}.map.fields`))
  return !isEqual(fieldsInName, fieldsInIndex)
}

/**
 * Check if an index is matching the given fields
 *
 * @param {object} index - The index to check
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
