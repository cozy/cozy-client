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
  return state[doctype] ? state[doctype][id] || null : null
}
