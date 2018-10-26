import { isReceivingData } from './queries'
import { isReceivingMutationResult } from './mutations'
import keyBy from 'lodash/keyBy'
import isEqual from 'lodash/isEqual'
import mapValues from 'lodash/mapValues'
import groupBy from 'lodash/groupBy'

const hasChanged = state => doc => {
  const type = doc._type
  const existingDoc = state[type] && state[type][doc._id]
  return !existingDoc || !isEqual(doc, existingDoc)
}

const properId = doc => {
  if (!doc._id) {
    throw new Error('Cannot index document as it has no id')
  }
  return doc.id || doc._id
}

const byDoctype = x => x._type

/**
 * Inserts the documents into a document store
 *
 * @param  {Object} state - (documents keyed by id) keyed by doctype
 * @param  {Object} docsByDoctypeById - (documents keyed by id) keyed by doctype
 */
const batchInsertDocuments = (state, docsByDoctypeById) => {
  const update = mapValues(docsByDoctypeById, (docsById, doctype) => {
    return state[doctype]
      ? {
          ...state[doctype],
          ...docsById
        }
      : docsById
  })
  return {
    ...state,
    ...update
  }
}

const documents = (state = {}, action) => {
  if (!isReceivingData(action) && !isReceivingMutationResult(action)) {
    return state
  }

  const { data, included } = action.response
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return state
  }

  const docs = Array.isArray(data) ? data : [data]

  const docsWithIncluded = included ? docs.concat(included) : docs
  const docsWithChanges = docsWithIncluded.filter(hasChanged(state))

  if (docsWithChanges.length === 0) {
    return state
  }

  const docsByDoctype = groupBy(docsWithChanges, byDoctype)
  const docsByDoctypeById = mapValues(docsByDoctype, docs =>
    keyBy(docs, properId)
  )

  return batchInsertDocuments(state, docsByDoctypeById)
}

export default documents

// selector
export const getDocumentFromSlice = (state = {}, doctype, id) => {
  if (!doctype) {
    throw new Error(
      'getDocumentFromSlice: Cannot retrieve document with undefined doctype'
    )
  }
  if (!id) {
    throw new Error(
      'getDocumentFromSlice: Cannot retrieve document with undefined id'
    )
  }
  if (!state[doctype]) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `getDocumentFromSlice: ${doctype} is absent from the store documents`
      )
    }
    return null
  } else if (!state[doctype][id]) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `getDocumentFromSlice: ${doctype}:${id} is absent from the store documents`
      )
    }
    return null
  }
  return state[doctype][id]
}
