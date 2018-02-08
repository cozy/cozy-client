import { createStore as createReduxStore } from 'redux'

import documents, { getDocumentFromSlice } from './documents'
import queries, { getQueryFromSlice, isQueryAction } from './queries'
import { isMutationAction } from './mutations'

const combinedReducer = (state = { documents: {}, queries: {} }, action) => {
  if (!isQueryAction(action) && !isMutationAction(action)) {
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

export const getDocumentFromStore = (state, doctype, id) =>
  getDocumentFromSlice(state.cozy.documents, doctype, id)

export const getQueryFromStore = (state, queryId) =>
  getQueryFromSlice(state.cozy.queries, queryId, state.cozy.documents)

export { initQuery, receiveQueryResult, receiveQueryError } from './queries'

export {
  initMutation,
  receiveMutationResult,
  receiveMutationError
} from './mutations'
