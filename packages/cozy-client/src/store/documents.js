import keyBy from 'lodash/keyBy'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'
import merge from 'lodash/merge'

import logger from '../logger'

import { isReceivingData } from './queries'
import { MutationTypes } from '../queries/dsl'
import { isReceivingMutationResult } from './mutations'

import { properId } from './helpers'

const storeDocument = (state, document) => {
  const type = document._type
  if (!type) {
    if (process.env.NODE_ENV !== 'production') {
      logger.info('Document without _type', document)
    }
    throw new Error('Document without _type')
  }
  if (!properId(document)) {
    if (process.env.NODE_ENV !== 'production') {
      logger.info('Document without id', document)
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
  /**
   * @type {import("../types").CozyClientDocument}
   */
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

  if (
    action &&
    action.definition &&
    action.definition.mutationType === MutationTypes.DELETE_DOCUMENT
  ) {
    const docId = action.definition.document._id
    const _type = action.definition.document._type
    return {
      ...state,
      [_type]: omit(state[_type], docId)
    }
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

/**
 * Get document from state, by its id
 *
 * @param {import('../types').DocumentsStateSlice} state The documents' slice
 * @param {string} doctype The doctype to target
 * @param {string} id The document id to get
 * @returns {import('../types').CozyClientDocument} the document found by its id
 */
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
      logger.info(
        `getDocumentFromSlice: ${doctype} is absent from the store's documents. State is`,
        state
      )
    }
    return null
  } else if (!state[doctype][id]) {
    if (process.env.NODE_ENV !== 'production') {
      logger.info(
        `getDocumentFromSlice: ${doctype}:${id} is absent from the store documents. State is`,
        state
      )
    }
    return null
  }
  return state[doctype][id]
}

/**
 * Get documents from state, by their ids
 *
 * @param {import('../types').DocumentsStateSlice} state The documents' slice
 * @param {string} doctype The doctype to target
 * @param {Array<string>} ids The list of document ids to get
 * @returns {Array<import('../types').CozyClientDocument>} the list of documents found by their ids
 */
export const getDocumentsFromSlice = (state = {}, doctype, ids) => {
  if (!doctype) {
    throw new Error(
      'getDocumentsFromSlice: Cannot retrieve documents with undefined doctype'
    )
  }
  if (!ids || ids.length < 1) {
    throw new Error(
      'getDocumentsFromSlice: Cannot retrieve documents with undefined ids'
    )
  }
  if (!state[doctype]) {
    if (process.env.NODE_ENV !== 'production') {
      logger.info(
        `getDocumentsFromSlice: ${doctype} is absent from the store's documents. State is`,
        state
      )
    }
    return []
  }
  return ids.map(id => state[doctype][id]).filter(Boolean)
}

export const getCollectionFromSlice = (state = {}, doctype) => {
  if (!doctype) {
    throw new Error(
      'getDocumentFromSlice: Cannot retrieve document with undefined doctype'
    )
  }
  if (!state[doctype]) {
    if (process.env.NODE_ENV !== 'production') {
      logger.info(
        `getCollectionFromSlice: ${doctype} is absent from the store documents. State is`,
        state
      )
    }
    return null
  }

  return Object.values(state[doctype])
}

/*
  This method has been created in order to get a returned object
  in `data` with the full set on information coming potentially from
  `included`

  This method should be somewhere else. The `document` shall not be
  dealt with included / data and so on.

  This method takes `data` and `included` and merge both sources
  together. It should be always up-to-date. The returned object
  will be as full of information as it can be.
*/
export const extractAndMergeDocument = (data, updatedStateWithIncluded) => {
  const doctype = data[0]._type

  if (!doctype) {
    logger.info('Document without _type', data[0])
    throw new Error('Document without _type')
  }
  const sortedData = keyBy(data, properId)

  let mergedData = Object.assign({}, updatedStateWithIncluded)
  mergedData[doctype] = Object.assign({}, updatedStateWithIncluded[doctype])

  Object.values(sortedData).map(data => {
    const id = properId(data)
    if (mergedData[doctype][id]) {
      mergedData[doctype][id] = merge({}, mergedData[doctype][id], data)
    } else {
      mergedData[doctype][id] = data
    }
  })

  return mergedData
}
