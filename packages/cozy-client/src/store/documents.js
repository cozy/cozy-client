import { isReceivingData } from './queries'
import { isReceivingMutationResult } from './mutations'

const storeDocument = (state, document) => {
  const type = document._type
  if (!type) {
    throw new Error('Document without _type', document)
  }
  return {
    ...state,
    [type]: {
      ...state[type],
      [document._id]: document
    }
  }
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
      ...data.reduce((obj, doc) => ({ ...obj, [doc._id]: doc }), {})
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
  if (!state[doctype]) {
    console.warn(
      `getDocumentFromSlice: ${doctype} is absent from the store documents`
    )
    return null
  } else if (!state[doctype][id]) {
    console.warn(
      `getDocumentFromSlice: ${doctype}:${id} is absent from the store documents`
    )
    return null
  }
  return state[doctype][id]
}
