import { createStore as createReduxStore, combineReducers } from 'redux'

import documents, { getDocumentFromSlice, isDocumentAction } from './documents'
import queries, { getQueryFromSlice, isQueryAction } from './queries'
import { isMutationAction } from './mutations'

const combinedReducer = (state = { documents: {}, queries: {} }, action) => {
  if (
    !isQueryAction(action) &&
    !isDocumentAction(action) &&
    !isMutationAction(action)
  ) {
    return state
  }
  return {
    documents: documents(state.documents, action),
    queries: queries(state.queries, action, state.documents)
  }
}
export default combinedReducer

export const createStore = () =>
  createReduxStore(combineReducers({ cozy: combinedReducer }))

export const getStateRoot = state => state.cozy || {}

export const getDocumentFromStore = (state, doctype, id) =>
  getDocumentFromSlice(getStateRoot(state).documents, doctype, id)

export const getQueryFromStore = (state, queryId) =>
  getQueryFromSlice(
    getStateRoot(state).queries,
    queryId,
    getStateRoot(state).documents
  )

export { receiveDocumentUpdate } from './documents'

export { initQuery, receiveQueryResult, receiveQueryError } from './queries'

export {
  initMutation,
  receiveMutationResult,
  receiveMutationError
} from './mutations'
