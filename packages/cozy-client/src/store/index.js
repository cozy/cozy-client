import {
  createStore as createReduxStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'

import documents, {
  getCollectionFromSlice,
  getDocumentFromSlice
} from './documents'
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
    return {
      documents: proxy.getState().documents,
      queries: queries(
        proxy.getState().queries,
        action,
        proxy.getState().documents
      )
    }
  }
  const nextDocuments = documents(state.documents, action)
  const haveDocumentsChanged = nextDocuments !== state.documents

  return {
    documents: nextDocuments,
    queries: queries(state.queries, action, nextDocuments, haveDocumentsChanged)
  }
}
export default combinedReducer

export const createStore = () =>
  createReduxStore(
    combineReducers({ cozy: combinedReducer }),
    applyMiddleware(thunk)
  )

export const getStateRoot = state => state.cozy || {}

export const getCollectionFromState = (state, doctype) =>
  getCollectionFromSlice(getStateRoot(state).documents, doctype)

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

export { initQuery, receiveQueryResult, receiveQueryError } from './queries'

export {
  initMutation,
  receiveMutationResult,
  receiveMutationError
} from './mutations'
