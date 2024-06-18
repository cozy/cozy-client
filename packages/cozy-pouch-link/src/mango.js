import head from 'lodash/head'

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
 * @function
 * @description Compute fields that should be indexed for a mango
 * query to work
 *
 * @private
 * @param  {object} options - Mango query options
 * @returns {Array} - Fields to index
 */
const defaultSelector = { _id: { $gt: null } }
export const getIndexFields = ({
  selector = defaultSelector,
  sort = [],
  partialFilter
}) => {
  return Array.from(
    new Set([
      ...sort.map(sortOption => head(Object.keys(sortOption))),
      ...(selector ? Object.keys(selector) : []),
      ...(partialFilter ? Object.keys(partialFilter) : [])
    ])
  )
}
