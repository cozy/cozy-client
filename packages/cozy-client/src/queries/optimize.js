import mapValues from 'lodash/mapValues'
import groupBy from 'lodash/groupBy'
import flatten from 'lodash/flatten'
import uniq from 'lodash/uniq'
import { QueryDefinition } from './dsl'

const isIdQuery = query => query.id || query.ids

/**
 * Reduce the number of queries used to fetch documents.
 *
 * - Deduplication of queries
 * - Groups id queries
 *
 * @param  {QueryDefinition[]} queries - Queries to optimized
 * @return {QueryDefinition[]} Optimized queries
 * @private
 */
const optimizeQueries = queries => {
  console.debug('optimizeQueries', { queries })
  const optimizedQueryMap = new Map()
  const byDoctype = groupBy(queries, q => q.doctype)

  for (const queries of Object.values(byDoctype)) {
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

    optimizedQueryMap.set(groupedIdQueries, idQueries)

    for (const query in others) {
      optimizedQueryMap.set(query, [query])
    }
  }

  return optimizedQueryMap
}

export default optimizeQueries
