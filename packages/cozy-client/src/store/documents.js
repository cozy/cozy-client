import keyBy from 'lodash/keyBy'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'
import merge from 'lodash/merge'
import deepmerge from '@fastify/deepmerge'

import logger from '../logger'

import { isReceivingData } from './queries'
import { MutationTypes } from '../queries/dsl'
import { isReceivingMutationResult } from './mutations'

import { properId } from './helpers'

const storeDocument = (state, document) => {
  console.log('🏪 storeDocument')
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
  console.log('🏪 mergeDocumentsWithRelationships')
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
  // console.log('🏪 documents reducer')
  // const begin = performance.now()
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

    // const end = performance.now()
    // console.log('🏪 documents reducer 1 took', (end - begin), 'ms')
    return {
      ...state,
      [_type]: omit(state[_type], docId)
    }
  }

  const { data, included } = action.response
  if (!data || (Array.isArray(data) && data.length === 0)) {
    // const end = performance.now()
    // console.log('🏪 documents reducer 2 took', (end - begin), 'ms')
    return state
  }

  const updatedStateWithIncluded = included
    ? included.reduce(storeDocument, state)
    : state
  if (!Array.isArray(data)) {
    // const end = performance.now()
    // console.log('🏪 documents reducer 3 took', (end - begin), 'ms')
    return storeDocument(updatedStateWithIncluded, data)
  }
  // const end = performance.now()
  // console.log('🏪 documents reducer 4 took', (end - begin), 'ms')
  return extractAndMergeDocument(data, updatedStateWithIncluded)
}

export default documents

// selector
export const getDocumentFromSlice = (state = {}, doctype, id) => {
  // console.log('🏪 getDocumentFromSlice')
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

export const getCollectionFromSlice = (state = {}, doctype) => {
  // console.log('🏪 getCollectionFromSlice')
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
  // console.log('🏪 extractAndMergeDocument DeepMerge')
  const begin = performance.now()
  const doctype = data[0]._type

  if (!doctype) {
    logger.info('Document without _type', data[0])
    throw new Error('Document without _type')
  }
  // const beginKeyBy = performance.now()
  const sortedData = keyBy(data, properId)
  // const endKeyBy = performance.now()
  // console.log('🏪 extractAndMergeDocument KeyBy took', (endKeyBy - beginKeyBy), 'ms')
  const deeppmerge = deepmerge()
  // const beginMergeData = performance.now()
  let mergedData = Object.assign({}, updatedStateWithIncluded)
  mergedData[doctype] = Object.assign({}, updatedStateWithIncluded[doctype])

  // console.log('🌈🌈🌈 sortedData: ', sortedData)
  // console.log('🌈🌈🌈 mergedData: ', mergedData)

  /*
  mergedData[doctype] = deeppmerge(mergedData[doctype], sortedData)
  /*/
  // const endMergeData = performance.now()
  // console.log('🏪 extractAndMergeDocument MergeData took', (endMergeData - beginMergeData), 'ms')
  // const beginMapSorted = performance.now()
  // let lodashMergeCount = 0
  // let lodashMergeDuration = 0
  Object.values(sortedData).map(data => {
    // const beginProperId = performance.now()
    const id = properId(data)
    // const endProperId = performance.now()
    // console.log('🏪 extractAndMergeDocument ProperId took', (endProperId - beginProperId), 'ms')
    if (mergedData[doctype][id]) {
      if (JSON.stringify(data) !== JSON.stringify(mergedData[doctype][id])) {
        // const beginLodashMerge = performance.now()
        // mergedData[doctype][id] = merge({}, mergedData[doctype][id], data)
        const temp = Object.assign({}, mergedData[doctype][id])
        mergedData[doctype][id] = deeppmerge(temp, data)
        // console.log('mergedData[doctype][id]', mergedData[doctype][id])
        // const endLodashMerge = performance.now()
        // lodashMergeCount += 1
        // lodashMergeDuration += (endLodashMerge - beginLodashMerge)
      }
      // console.log('🏪 extractAndMergeDocument LodashMerge took', (endLodashMerge - beginLodashMerge), 'ms')
    } else {
      // const beginRawData = performance.now()
      mergedData[doctype][id] = data
      // const endRawData = performance.now()
      // console.log('🏪 extractAndMergeDocument RawData took', (endRawData - beginRawData), 'ms')
    }
  })
  //*/
  // console.log(`🏪🌈 lodashMerge called ${lodashMergeCount} times for ${lodashMergeDuration}ms`)
  // const endMapSorted = performance.now()
  // console.log('🏪 extractAndMergeDocument MapSorted took', (endMapSorted - beginMapSorted), 'ms')

  const end = performance.now()
  console.log('🏪 extractAndMergeDocument took', (end - begin), 'ms')
  return mergedData
}
