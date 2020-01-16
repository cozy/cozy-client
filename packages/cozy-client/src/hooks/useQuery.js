import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useClient from './useClient'

const resolveQueryDefinition = query => {
  const value = query.query || query.definition
  return typeof value === 'function' ? value() : value
}

export const useQuery = ({ query }) => {
  if (process.env.NODE_ENV !== 'prod' && !useSelector) {
    throw new Error(
      'You must use react-redux > 7.1.0 to use useQuery (uses useSelector) under the hood'
    )
  }
  if (!query || !query.as) {
    console.warn('Bad query', query)
    throw new Error('query should have the `as` property')
  }

  const definition = resolveQueryDefinition(query)

  if (!definition) {
    throw new Error('query should have as query|definition property')
  }

  const client = useClient()
    return client.getQueryFromState(query.as, {
  const collection = useSelector(() => {
      hydrated: true
    })
  })

  useEffect(() => {
    const shouldFetch = query.fetchPolicy ? query.fetchPolicy(collection) : true
    if (shouldFetch) {
      client.query(definition, { as: query.as })
    }
  }, [query])

  const fetchMore = () => {
    throw new Error('Should be implemented')
  }
  return { ...collection, fetchMore: fetchMore }
}
