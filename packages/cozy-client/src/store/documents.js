import { isReceivingData } from './queries'
import { isReceivingMutationResult } from './mutations'

const storeDocument = (state, document) => ({
  ...state,
  [document._type]: {
    ...state[document._type],
    [document._id]: document
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
export const getDocumentFromSlice = (
  state = {},
  doctype,
  id,
  shouldHydrate = true
) => {
  const document = state[doctype] ? state[doctype][id] || null : null
  if (document && shouldHydrate && document.relationships) {
    return hydrateRelationships(state, document)
  }
  return document
}

const hydrateRelationships = (state, document) =>
  Object.keys(document).reduce((result, prop) => {
    if (prop !== 'relationships') {
      result[prop] = document[prop]
    } else {
      const relationships = document[prop]
      Object.keys(relationships).forEach(relName => {
        const relData = relationships[relName].data
        if (!relData) return
        result[relName] = {
          ...relationships[relName],
          data: Array.isArray(relData)
            ? relData.map(d =>
                getDocumentFromSlice(
                  state,
                  d._type || d.type,
                  d._id || d.id,
                  false
                )
              )
            : getDocumentFromSlice(
                state,
                relData._type || relData.type,
                relData._id || relData.id,
                false
              )
        }
      })
    }
    return result
  }, {})
