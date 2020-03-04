import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import useClient from './useClient'
import logger from '../logger'

const resolveQueryDefinition = query => {
  const value = query.query || query.definition
  return typeof value === 'function' ? value() : value
}

const uniqueValue = () => {
  return Date.now().toString(36) + (Math.random() * 10 ** 18).toString(36)
}

const generateFetchMoreQueryDefinition = collection => {
  return collection.definition.offsetBookmark(collection.bookmark)
}

const useQuery = ({ query }) => {
  if (!useSelector) {
    throw new Error(
      'You must use react-redux > 7.1.0 to use useQuery (uses useSelector) under the hood'
    )
  }

  if (!query) {
    logger.warn('Bad query', query)
    throw new Error('Bad query')
  }

  const as = useMemo(() => query.as || uniqueValue(), [query])

  const definition = resolveQueryDefinition(query)

  if (!definition) {
    throw new Error('query should have as query|definition property')
  }

  const client = useClient()
  const collection = useSelector(() => {
    return client.getQueryFromState(as, {
      hydrated: true
    })
  })

  useEffect(
    () => {
      client.query(definition, { as })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, as]
  )

  const fetchMore = () => {
    client.query(generateFetchMoreQueryDefinition(collection), { as })
  }
  return { ...collection, fetchMore: fetchMore }
}

export default useQuery
