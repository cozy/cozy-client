import { isReceivingData } from './queries'
import { isReceivingMutationResult } from './mutations'

// reducer
const documents = (state = {}, action) => {
  if (!isReceivingData(action) && !isReceivingMutationResult(action)) {
    return state
  }

  const { data } = action.response
  if (!data || data.length === 0) return state
  const doctype = data[0]._type

  return {
    ...state,
    [doctype]: {
      ...state[doctype],
      ...data.reduce((obj, doc) => ({ ...obj, [doc._id]: doc }), {})
    }
  }
}

export default documents

// selector
export const getDocumentFromSlice = (state = {}, doctype, id) =>
  state[doctype] ? state[doctype][id] || null : null
