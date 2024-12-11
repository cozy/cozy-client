import { useEffect, useCallback } from 'react'
import { createSelectorHook } from 'react-redux'
import get from 'lodash/get'
import useClient from './useClient'
import logger from '../logger'
import { clientContext } from '../context'
import { QueryDefinition } from '../queries/dsl'

const useSelector = createSelectorHook(clientContext)

const resolveToValue = fnOrValue => {
  return typeof fnOrValue === 'function' ? fnOrValue() : fnOrValue
}

const generateFetchMoreQueryDefinition = queryResult => {
  return queryResult.bookmark
    ? queryResult.definition.offsetBookmark(queryResult.bookmark)
    : queryResult.definition.offset(queryResult.data.length)
}

/**
 * Fetches a queryDefinition and returns the queryState
 *
 * @param {QueryDefinition|(() => QueryDefinition)} queryDefinition - Definition created with Q()
 * @param {import("../types").QueryOptions} options - Options created with Q()
 * @returns {import("../types").UseQueryReturnValue}
 */
const useQuery = (queryDefinition, options) => {
  if (!useSelector) {
    throw new Error(
      'You must use react-redux > 7.1.0 to use useQuery (uses useSelector) under the hood'
    )
  }

  if (!queryDefinition) {
    logger.warn('Bad query', queryDefinition)
    throw new Error('Bad query')
  }

  const { as, enabled = true } = options
  // If the query is not enabled, no need to call the queryDefinition
  // because sometimes, we can have a getById(null) since we want to
  // enabled the query only when the specific id is defined. And since
  // Q() can throw error when some checks are KO we don't call Q() if
  // enabled is not true
  const definition = enabled ? resolveToValue(queryDefinition) : null

  if (!as) {
    throw new Error('You must specify options.as when using useQuery')
  }

  const client = useClient()
  const equalityCheckForQuery = (queryResA, queryResB) => {
    //console.log('Call equality check : ', queryResA, queryResB)
    if (queryResA === queryResB) {
      // Referential equality
      return true
    }
  
    if (
      typeof queryResA !== 'object' ||
      queryResA === null ||
      typeof queryResB !== 'object' ||
      queryResB === null
    ) {
      // queryResA or queryResB is not an object or null
      return false
    }
  
    if (queryResA.id !== queryResB.id) {
      return false
    }
    if (queryResA.fetchStatus !== queryResB.fetchStatus) {
      return false
    }
  
    const docsA = queryResA.data
    const docsB = queryResB.data
    if (!docsA || !docsB) {
      // No data to check
      return false
    }
  
    if (docsA.length !== docsB.length) {
      // A document was added or removed
      return false
    }
  
    for (let i = 0; i < docsA.length; i++) {
      if (docsA[i]._rev !== docsB[i]._rev) {
        // Let's rely on revision
        console.log('docs are not the same !', docsA[i], docsB[i]);
        return false
      }
      // if (docsA[i] !== docsB[i]) {
      //   // References should be the same for non-updated documents
      //   return false
      // }
    }
    //console.log('docs are same')
    return true
  }
  const queryState = useSelector(() => {
    if (options.singleDocData === undefined && definition?.id) {
      logger.warn(
        'useQuery options.singleDocData will pass to true in a next version of cozy-client, please add it now to prevent any problem in the future.'
      )
    }

    return client.getQueryFromState(as, {
      hydrated: get(options, 'hydrated', true),
      singleDocData: get(options, 'singleDocData', false)
    })
  }, equalityCheckForQuery)

  useEffect(
    () => {
      if (enabled === false) {
        return
      }
      client.query(definition, options)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [as, enabled]
  )

  const fetchMore = useCallback(() => {
    const queryState = client.getQueryFromState(as)
    return client.query(generateFetchMoreQueryDefinition(queryState), { as })
  }, [as, client])

  const fetch = useCallback(() => {
    return client.query(definition, options)
  }, [client, definition, options])

  return {
    ...queryState,
    fetchMore: fetchMore,
    fetch: fetch
  }
}

export const useQueries = querySpecs => {
  const res = {}
  for (const [queryAttrName, queryOpts] of Object.entries(querySpecs)) {
    // eslint-disable-next-line
    res[queryAttrName] = useQuery(queryOpts.query, queryOpts)
  }
  return res
}

export default useQuery
