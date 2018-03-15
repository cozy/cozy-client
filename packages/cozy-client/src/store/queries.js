import { getDocumentFromSlice } from './documents'
import { isReceivingMutationResult } from './mutations'

const INIT_QUERY = 'INIT_QUERY'
const RECEIVE_QUERY_RESULT = 'RECEIVE_QUERY_RESULT'
const RECEIVE_QUERY_ERROR = 'RECEIVE_QUERY_ERROR'

export const isQueryAction = action =>
  [INIT_QUERY, RECEIVE_QUERY_RESULT, RECEIVE_QUERY_ERROR].indexOf(
    action.type
  ) !== -1

export const isReceivingData = action => action.type === RECEIVE_QUERY_RESULT

// reducers
const queryInitialState = {
  id: null,
  definition: null,
  fetchStatus: 'pending',
  lastFetch: null,
  hasMore: false,
  count: 0,
  ids: []
}

const query = (state = queryInitialState, action) => {
  switch (action.type) {
    case INIT_QUERY:
      return {
        ...state,
        id: action.queryId,
        definition: action.queryDefinition,
        fetchStatus: 'loading'
      }
    case RECEIVE_QUERY_RESULT:
      const response = action.response
      if (!Array.isArray(response.data)) {
        return {
          ...state,
          id: action.queryId,
          fetchStatus: 'loaded',
          lastFetch: Date.now(),
          hasMore: false,
          count: 1,
          ids: [response.data._id]
        }
      }
      return {
        ...state,
        id: action.queryId,
        fetchStatus: 'loaded',
        lastFetch: Date.now(),
        hasMore: response.next !== undefined ? response.next : state.hasMore,
        count:
          response.meta && response.meta.count
            ? response.meta.count
            : response.data.length,
        ids:
          response.skip === 0
            ? response.data.map(doc => doc._id)
            : [...state.ids, ...response.data.map(doc => doc._id)]
      }
    case RECEIVE_QUERY_ERROR:
      return {
        ...state,
        id: action.queryId,
        fetchStatus: 'failed'
      }
    default:
      return state
  }
}

const queries = (state = {}, action, documents = {}) => {
  if (isQueryAction(action)) {
    return {
      ...state,
      [action.queryId]: query(state[action.queryId], action)
    }
  }
  if (isReceivingMutationResult(action) && action.updateQueries) {
    const updated = Object.keys(action.updateQueries)
      .filter(queryId => !!state[queryId])
      .map(queryId => {
        const query = getQueryFromSlice(state, queryId, documents)
        const updater = action.updateQueries[queryId]
        return {
          queryId: query.id,
          newData: updater(query.data, action.response)
        }
      })
      .reduce(
        (acc, update) => ({
          ...acc,
          [update.queryId]: {
            ...state[update.queryId],
            ids: update.newData.map(doc => doc._id),
            count: update.newData.length // TODO: sure ?
          }
        }),
        {}
      )
    return {
      ...state,
      ...updated
    }
  }
  return state
}
export default queries

// actions
export const initQuery = (queryId, queryDefinition) => ({
  type: INIT_QUERY,
  queryId,
  queryDefinition
})

export const receiveQueryResult = (queryId, response) => ({
  type: RECEIVE_QUERY_RESULT,
  queryId,
  response
})

export const receiveQueryError = (queryId, error) => ({
  type: RECEIVE_QUERY_ERROR,
  queryId,
  error
})

// selectors
const mapDocumentsToIds = (documents, doctype, ids, client) =>
  ids.map(id =>
    hydrateRelationships(
      documents,
      getDocumentFromSlice(documents, doctype, id),
      client
    )
  )

export const getQueryFromSlice = (state, queryId, documents, client = null) => {
  if (!state || !state[queryId]) {
    return { ...queryInitialState, data: null }
  }
  const query = state[queryId]
  return {
    ...query,
    data: mapDocumentsToIds(
      documents,
      query.definition.doctype,
      query.ids,
      client
    )
  }
}

const hydrateRelationships = (documents, document, client) => {
  if (!document || !document.relationships) {
    return document
  }
  return Object.keys(document).reduce((result, prop) => {
    if (prop !== 'relationships') {
      result[prop] = document[prop]
    } else {
      const relationships = document[prop]
      Object.keys(relationships).forEach(relName => {
        const relData = relationships[relName].data
        if (!relData) return
        result[relName] = {
          ...relationships[relName],
          data: Array.isArray(relData)
            ? relData.map(d =>
                getDocumentFromSlice(
                  documents,
                  d._type || d.type,
                  d._id || d.id,
                  false
                )
              )
            : getDocumentFromSlice(
                documents,
                relData._type || relData.type,
                relData._id || relData.id,
                false
              ),
          ...enhanceRelationship(relationships[relName], client)
        }
      })
    }
    return result
  }, {})
}

const enhanceRelationship = ({ relationship, data, query }, client) => {
  if (!client || !relationship) return {}
  if (relationship.relationType === 'has-many') {
    return {
      fetchMore: () => client.query(query.offset(data.length))
    }
  }
  return {}
}
