import { useEffect, useCallback } from 'react'
import { createSelectorHook } from 'react-redux'
import get from 'lodash/get'
import useClient from './useClient'
import logger from '../logger'
import { UseQueryReturnValue } from '../types'
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
 * @param  {QueryDefinition} queryDefinition - Definition created with Q()
 *
 * @typedef {object} UseQueryOptions
 * @property  {object} as - Name for the query [required]
 * @property  {boolean} enabled - If set to false, the query won't be executed
 * @property  {object} fetchPolicy - Fetch policy
 * @property  {object} singleDocData - If true, the "data" returned will be
 * a single doc instead of an array for single doc queries. Defaults to false for backward
 * compatibility but will be set to true in the future.
 * @property {Function} onError - Callback if the query is errored
 *
 * @returns {UseQueryReturnValue}
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

  const definition = resolveToValue(queryDefinition)
  const { as, enabled = true } = options

  if (!as) {
    throw new Error('You must specify options.as when using useQuery')
  }

  const client = useClient()
  const queryState = useSelector(() => {
    if (options.singleDocData === undefined && queryDefinition.id) {
      logger.warn(
        'useQuery options.singleDocData will pass to true in a next version of cozy-client, please add it now to prevent any problem in the future.'
      )
    }

    return client.getQueryFromState(as, {
      hydrated: get(options, 'hydrated', true),
      singleDocData: get(options, 'singleDocData', false)
    })
  })

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
