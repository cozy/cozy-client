import flatten from 'lodash/flatten'
import isObject from 'lodash/isObject'

export const getIndexNameFromFields = fields => {
  return `by_${fields.join('_and_')}`
}

const getSortKeys = sort => {
  if (Array.isArray(sort)) {
    return flatten(sort.map(x => Object.keys(x)))
  } else if (isObject(sort)) {
    return Object.keys(sort)
  } else {
    throw new Error('Get sort key can only be called on Arrays or Objects')
  }
}

/**
 * @function
 * @description Compute fields that should be indexed for a mango
 * query to work
 *
 * @private
 * @param  {object} options - Mango query options
 * @returns {Array} - Fields to index
 */
const defaultSelector = { _id: { $gt: null } }
export const getIndexFields = ({ selector = defaultSelector, sort = {} }) => {
  return Array.from(new Set([...Object.keys(selector), ...getSortKeys(sort)]))
}
