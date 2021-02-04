import { transform } from './utils'
import head from 'lodash/head'
import get from 'lodash/get'
import difference from 'lodash/difference'
import isEqual from 'lodash/difference'

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
