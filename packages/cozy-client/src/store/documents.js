import { isReceivingData } from './queries'

const documents = (state = {}, action) => {
  if (!isReceivingData(action)) return state

  const { data } = action.response
  if (data.length === 0) return state
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

export const getDocumentFromStore = (state, doctype, id) =>
  state.cozy.documents[doctype]
    ? state.cozy.documents[doctype][id] || null
    : null
