import mapValues from 'lodash/mapValues'
import groupBy from 'lodash/groupBy'
import flatten from 'lodash/flatten'
import uniq from 'lodash/uniq'
import { QueryDefinition } from './dsl'

const isIdQuery = query => query.id || query.ids

/**
 * Optimize queries on a single doctype
 *
 * @param  {Array.QueryDefinition} queries - Queries of a same doctype
 * @return {Array.QueryDefinition} Optimized queries
 */
const optimizeDoctypeQueries = queries => {
  const { idQueries = [], others = [] } = groupBy(
    queries,
    q => (isIdQuery(q) ? 'idQueries' : 'others')
  )
  const groupedIdQueries =
    idQueries.length > 0
      ? new QueryDefinition({
          doctype: queries[0].doctype,
          ids: uniq(flatten(idQueries.map(q => q.id || q.ids)))
        })
      : []
  return others.concat(groupedIdQueries)
}

/**
 * Reduce the number of queries used to fetch documents.
 *
 * - Deduplication of queries
 * - Groups id queries
 *
 * @param  {Array.QueryDefinition} queries - Queries to optimized
 * @return {Array.QueryDefinition} Optimized queries
 */
const optimizeQueries = queries => {
  const byDoctype = groupBy(queries, q => q.doctype)
  return flatten(Object.values(mapValues(byDoctype, optimizeDoctypeQueries)))
}

export default optimizeQueries
