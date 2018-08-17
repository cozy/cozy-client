import { createStore as createReduxStore, combineReducers } from 'redux'

import documents, { getDocumentFromSlice } from './documents'
import queries, { getQueryFromSlice, isQueryAction } from './queries'
import { isMutationAction } from './mutations'

export class StoreProxy {
  constructor(state) {
    this.state = state
  }

  readDocument(doctype, id) {
    return this.state.documents[doctype][id]
  }

  writeDocument(document) {
    this.setState(state => ({
      ...state,
      documents: {
        ...state.documents,
        [document._type]: {
          ...state.documents[document._type],
          [document._id]: document
        }
      }
    }))
  }

  readQuery(queryId) {
    return this.state.queries[queryId]
  }

  writeQuery(queryId, newValue) {
    this.setState(state => ({
      ...state,
      queries: {
        ...state.queries,
        [queryId]: newValue
      }
    }))
  }

  touchQuery(queryId) {
    this.writeQuery(queryId, {
      ...this.readQuery(queryId),
      lastUpdate: Date.now()
    })
  }

  setState(updaterFn) {
    this.state = updaterFn(this.state)
  }

  getState() {
    return this.state
  }
}

const combinedReducer = (state = { documents: {}, queries: {} }, action) => {
  if (!isQueryAction(action) && !isMutationAction(action)) {
    return state
  }
  if (action.update) {
    const proxy = new StoreProxy(state)
    action.update(proxy, action.response)
    if (action.contextQueryId) {
      proxy.touchQuery(action.contextQueryId)
    }
    return proxy.getState()
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

export const getDocumentFromState = (state, doctype, id) =>
  getDocumentFromSlice(getStateRoot(state).documents, doctype, id)

export const getQueryFromStore = (store, queryId) =>
  getQueryFromState(store.getState(), queryId)

export const getQueryFromState = (state, queryId) =>
  getQueryFromSlice(
    getStateRoot(state).queries,
    queryId,
    getStateRoot(state).documents
  )

export const getRawQueryFromState = (state, queryId) =>
  getQueryFromSlice(getStateRoot(state).queries, queryId)

export { receiveDocumentUpdate } from './documents'

export { initQuery, receiveQueryResult, receiveQueryError } from './queries'

export {
  initMutation,
  receiveMutationResult,
  receiveMutationError
} from './mutations'
