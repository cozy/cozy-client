import { isReceivingData } from './queries'
import { isReceivingMutationResult } from './mutations'
import keyBy from 'lodash/keyBy'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'

const storeDocument = (state, document) => {
  const type = document._type
  if (!type) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Document without _type', document)
    }
    throw new Error('Document without _type')
  }
  if (!document._id) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Document without _id', document)
    }
    throw new Error('Document without _id')
  }

  const existingDoc = get(state, [type, document._id])

  if (isEqual(existingDoc, document)) {
    return state
  } else {
    return {
      ...state,
      [type]: {
        ...state[type],
        [document._id]: {
          ...existingDoc,
          ...document
        }
      }
    }
  }
}

const properId = doc => {
  if (!doc._id) {
    throw new Error('Cannot index document as it has no id')
  }
  return doc.id || doc._id
}

// reducer
const documents = (state = {}, action) => {
  if (!isReceivingData(action) && !isReceivingMutationResult(action)) {
    return state
  }

  const { data, included } = action.response
  if (!data || (Array.isArray(data) && data.length === 0)) return state

  const updatedStateWithIncluded = included
    ? included.reduce(storeDocument, state)
    : state

  if (!Array.isArray(data)) {
    return storeDocument(updatedStateWithIncluded, data)
  }

  const doctype = data[0]._type

  if (!doctype) {
    throw new Error('Document without _type', data[0])
  }

  return {
    ...updatedStateWithIncluded,
    [doctype]: {
      ...updatedStateWithIncluded[doctype],
      ...keyBy(data, properId)
    }
  }
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
