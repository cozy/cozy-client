import { useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import useClient from './useClient'
import logger from '../logger'

const resolveToValue = fnOrValue => {
  return typeof resolveToValue === 'function' ? fnOrValue() : fnOrValue
}

const generateFetchMoreQueryDefinition = collection => {
  return collection.definition.offsetBookmark(collection.bookmark)
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
    return client.getQueryFromState(as, {
      hydrated: true
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
    client.query(generateFetchMoreQueryDefinition(queryState), { as })
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
