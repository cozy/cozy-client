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
 * Get a matching index based on the given parameters
 *
 * @param {Array} indexes - The list of indexes to search
 * @param {object} fields  - The index fields
 * @param {object} partialFilter - A partial filter selector
 * @returns {object} A matching index
 */
export const getMatchingIndex = (indexes, fields, partialFilter) => {
  return indexes.find(index => {
    const viewId = Object.keys(get(index, `views`))[0]
    const fieldsInIndex = get(index, `views.${viewId}.map.fields`)
    const sortedFields = fields.sort()
    const sortedFieldsInIndex = Object.keys(fieldsInIndex).sort()
    if (isEqual(sortedFieldsInIndex, sortedFields)) {
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
  })
}
