import flatten from 'lodash/flatten'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'

export const getIndexNameFromFields = fields => {
  return `by_${fields.join('_and_')}`
}

const getSortKeys = sort => {
  if (isArray(sort)) {
    return flatten(sort.map(x => Object.keys(x)))
  } else if (isObject(sort)) {
    return Object.keys(sort)
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
