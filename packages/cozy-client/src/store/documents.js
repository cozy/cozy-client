import { isReceivingData } from './queries'
import { isReceivingMutationResult } from './mutations'

const storeDocument = (state, document) => ({
  ...state,
  [document._type]: {
    ...state[document._type],
    [document._id]: document
  }
})

const updateDocument = (state, { _id, _type }, response, updateFn) => ({
  ...state,
  [_type]: {
    ...state[_type],
    [_id]: updateFn(state[_type][_id], response)
  }
})

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
