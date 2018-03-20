import flatten from 'lodash/flatten'
import isArray from 'lodash/isArray'

const fieldsComparator = (a, b) => a.localeCompare(b)

export const getIndexNameFromFields = fields => {
  return `by_${fields.sort(fieldsComparator).join('_and_')}`
}

const getSortKeys = sort => {
  if (isArray(sort)) {
    return flatten(sort.map(x => Object.keys(x)))
  } else if (isObject(sort)) {
    return Object.keys(sort)
  }
}

/**
 * Compute fields that should be indexed for a mango
 * query to work
 *
 * @param  {Object} options - Mango query options
 * @return {Array} - Fields to index
 */
const defaultSelector = { _id: {$gt: null}}
export const getIndexFields = ({ selector = defaultSelector, sort = {} }) => {
  return Array.from(new Set([...Object.keys(selector), ...getSortKeys(sort)]))
}
