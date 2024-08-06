import flag from 'cozy-flags'

import {
  createStore as createReduxStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux'
import thunk from 'redux-thunk'

import documents from './documents'
import queries, { isQueryAction } from './queries'
import { isMutationAction } from './mutations'

const RESET_ACTION_TYPE = 'COZY_CLIENT.RESET_STATE'

const resetState = () => ({ type: RESET_ACTION_TYPE })

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

  setState(updaterFn) {
    this.state = updaterFn(this.state)
  }

  getState() {
    return this.state
  }
}

const initialState = { documents: {}, queries: {} }

const combinedReducer = (state = initialState, action) => {
  if (action.type == RESET_ACTION_TYPE) {
    return initialState
  }
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

const composedEnhancer =
  // @ts-ignore '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' doesn't exist 'Window & typeof globalThis'.ts(2339)
  // should be (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ in ts file
  // see https://github.com/reduxjs/redux-devtools/tree/main/extension#11-basic-store
  (flag('debug') && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export const createStore = () =>
  createReduxStore(
    combineReducers({ cozy: combinedReducer }),
    composedEnhancer(applyMiddleware(thunk))
  )

export {
  getStateRoot,
  getCollectionFromState,
  getDocumentFromState,
  getQueryFromStore,
  getQueryFromState,
  getRawQueryFromState,
  isQueryExisting
} from './stateHelpers'

export {
  initQuery,
  loadQuery,
  resetQuery,
  receiveQueryResult,
  receiveQueryError,
  executeQueryFromState
} from './queries'

export { resetState }

export {
  initMutation,
  receiveMutationResult,
  receiveMutationError
} from './mutations'
