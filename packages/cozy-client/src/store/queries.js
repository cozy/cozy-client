import { getDocumentFromStore } from './documents'

const INIT_QUERY = 'INIT_QUERY'
const RECEIVE_QUERY_RESULT = 'RECEIVE_QUERY_RESULT'
const RECEIVE_QUERY_ERROR = 'RECEIVE_QUERY_ERROR'

const isQueryAction = action =>
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
      return {
        ...state,
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
        fetchStatus: 'failed'
      }
    default:
      return state
  }
}

const queries = (state = {}, action) => {
  if (isQueryAction(action)) {
    return {
      ...state,
      [action.queryId]: query(state[action.queryId], action)
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
const mapDocumentsToIds = (state, doctype, ids) =>
  ids.map(id => getDocumentFromStore(state, doctype, id))

export const getQueryFromStore = (state, queryId) => {
  const query = state.cozy.queries[queryId]
  if (!query) {
    return { ...queryInitialState, data: null }
  }
  return {
    ...query,
    data: mapDocumentsToIds(state, query.definition.doctype, query.ids)
  }
}
