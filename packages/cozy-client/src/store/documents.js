import { isReceivingData } from './queries'
import { isReceivingMutationResult } from './mutations'
import keyBy from 'lodash/keyBy'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { properId } from './helpers'

const storeDocument = (state, document) => {
  const type = document._type
  if (!type) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Document without _type', document)
    }
    throw new Error('Document without _type')
  }
  if (!properId(document)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Document without id', document)
    }
    throw new Error('Document without id')
  }

  const existingDoc = get(state, [type, properId(document)])

  if (isEqual(existingDoc, document)) {
    return state
  } else {
    return {
      ...state,
      [type]: {
        ...state[type],
        [properId(document)]: mergeDocumentsWithRelationships(
          existingDoc,
          document
        )
      }
    }
  }
}

export const mergeDocumentsWithRelationships = (
  prevDocument = {},
  nextDocument = {}
) => {
  const merged = {
    ...prevDocument,
    ...nextDocument
  }

  if (prevDocument.relationships || nextDocument.relationships)
    merged.relationships = {
      ...prevDocument.relationships,
      ...nextDocument.relationships
    }

  return merged
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
  return extractAndMergeDocument(data, updatedStateWithIncluded)
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

/*
  This method has been created in order to get a returned object 
  in `data` with the full set on information coming potentielly from 
  ìncluded`

  This method should be somewhere else. The `document` shall not be 
  deal with included / data and so on. 

  This method takes data and included and merge both sources 
  together. It should be always up to date. The returned object 
  will be as full of informations as it can be.
*/
export const extractAndMergeDocument = (data, updatedStateWithIncluded) => {
  const doctype = data[0]._type

  if (!doctype) {
    throw new Error('Document without _type', data[0])
  }
  const sortedData = keyBy(data, properId)

  let mergedData = {}
  if (updatedStateWithIncluded && updatedStateWithIncluded[doctype]) {
    Object.values(updatedStateWithIncluded[doctype]).map(dataState => {
      if (!mergedData[doctype]) mergedData[doctype] = {}
      const id = properId(dataState)
      if (sortedData[id]) {
        mergedData[doctype][id] = {
          ...dataState,
          ...sortedData[id],
          ...mergedData[doctype][id]
        }
      } else {
        mergedData[doctype][id] = {
          ...dataState,
          ...mergedData[doctype][id]
        }
      }
    })
  }
  Object.values(sortedData).map(data => {
    if (!mergedData[doctype]) mergedData[doctype] = {}
    const id = properId(data)
    if (mergedData[doctype][id]) {
      mergedData[doctype][id] = {
        ...mergedData[doctype][id],
        ...data
      }
    } else {
      mergedData[doctype][id] = data
    }
  })

  return {
    ...updatedStateWithIncluded,
    ...mergedData
  }
}
