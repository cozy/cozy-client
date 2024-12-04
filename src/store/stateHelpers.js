import { getCollectionFromSlice, getDocumentFromSlice } from './documents'
import { getQueryFromSlice } from './queries'

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

export const isQueryExisting = (state, queryId) =>
  getStateRoot(state).queries[queryId] !== undefined
