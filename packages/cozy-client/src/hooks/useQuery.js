import { useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import get from 'lodash/get'
import useClient from './useClient'
import logger from '../logger'

const resolveToValue = fnOrValue => {
  return typeof resolveToValue === 'function' ? fnOrValue() : fnOrValue
}

const generateFetchMoreQueryDefinition = queryResult => {
  return queryResult.bookmark
    ? queryResult.definition.offsetBookmark(queryResult.bookmark)
    : queryResult.definition.offset(queryResult.data.length)
}

/**
 * Fetches a queryDefinition and returns the queryState
 *
 * @param  {object} queryDefinition - Definition created with Q()
 *
 * @param  {object} options - Options
 * @param  {object} options.as - Name for the query [required]
 * @param  {object} options.fetchPolicy - Fetch policy
 *
 * @returns {object}
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
  const as = options.as

  if (!as) {
    throw new Error('You must specify options.as when using useQuery')
  }

  const client = useClient()
  const queryState = useSelector(() => {

    if (options.singleDocData === undefined) {
      logger.warn('useQuery options.singleDocData will pass to true in a next version of cozy-client, please add it now to prevent any problem in the future.')
    }

    return client.getQueryFromState(as, {
      hydrated: get(options, 'hydrated', true),
      singleDocData: get(options, 'singleDocData', false)
    })
  })

  useEffect(
    () => {
      client.query(definition, options)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [as]
  )

  const fetchMore = useCallback(() => {
    const queryState = client.getQueryFromState(as)
    return client.query(generateFetchMoreQueryDefinition(queryState), { as })
  }, [as, client])

  return { ...queryState, fetchMore: fetchMore }
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
