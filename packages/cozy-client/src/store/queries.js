import mapValues from 'lodash/mapValues'
import groupBy from 'lodash/groupBy'
import difference from 'lodash/difference'
import intersection from 'lodash/intersection'
import concat from 'lodash/concat'
import isPlainObject from 'lodash/isPlainObject'
import uniq from 'lodash/uniq'
import orderBy from 'lodash/orderBy'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import get from 'lodash/get'
import sift from 'sift'

import flag from 'cozy-flags'

import { getDocumentFromSlice } from './documents'
import { isReceivingMutationResult } from './mutations'
import { properId } from './helpers'
import { isAGetByIdQuery, QueryDefinition } from '../queries/dsl'
import logger from '../logger'

const INIT_QUERY = 'INIT_QUERY'
const LOAD_QUERY = 'LOAD_QUERY'
const RECEIVE_QUERY_RESULT = 'RECEIVE_QUERY_RESULT'
const RECEIVE_QUERY_ERROR = 'RECEIVE_QUERY_ERROR'

// Read if the devtools are open to store the execution time
// This is done at runtime to not read the value everytime
// we receive a result. So you have to refresh your page
// in order to get the stats
const executionStatsEnabled = flag('debug')

export const isQueryAction = action =>
  [INIT_QUERY, LOAD_QUERY, RECEIVE_QUERY_RESULT, RECEIVE_QUERY_ERROR].indexOf(
    action.type
  ) !== -1

export const isReceivingData = action => action.type === RECEIVE_QUERY_RESULT

/** @type {import("../types").QueryState} */
const queryInitialState = {
  id: null,
  definition: null,
  fetchStatus: 'pending',
  isFetching: null,
  lastFetch: null,
  lastUpdate: null,
  lastErrorUpdate: null,
  lastError: null,
  hasMore: false,
  count: 0,
  fetchedPagesCount: 0,
  data: [],
  bookmark: null
}

/**
 * Return the docs ids accordingly to the given sort and fetched docs
 *
 * @param {import("../types").QueryState} queryState - Current state
 * @param {import("../types").DocumentsStateSlice} documents - Reference to the documents slice
 * @param {Array<string>} ids - The updated ids after query
 * @param {object} params - The additional params
 * @param {number} params.count - The count of retrieved docs
 * @param {number} params.fetchedPagesCount - The number of pages already fetched
 * @returns {Array<string>} The list of sorted ids
 */
export const sortAndLimitDocsIds = (
  queryState,
  documents,
  ids,
  { count, fetchedPagesCount }
) => {
  let evaluatedIds = [...ids]
  if (queryState.definition.sort && documents) {
    const sorter = makeSorterFromDefinition(queryState.definition)
    const allDocs = documents[queryState.definition.doctype]
    const docs = allDocs
      ? evaluatedIds.map(_id => allDocs[_id]).filter(Boolean)
      : []
    evaluatedIds = sorter(docs).map(properId)
  }
  const limit = queryState.definition.limit
  if (limit) {
    let sliceCount
    if (count < limit) {
      // When there are less results than the limit, this is either the first
      // or last paginated query.
      sliceCount =
        fetchedPagesCount > 1 ? limit * (fetchedPagesCount - 1) + count : count
    } else {
      sliceCount = limit * fetchedPagesCount
    }
    evaluatedIds = evaluatedIds.slice(0, sliceCount)
  }
  return evaluatedIds
}

/**
 * Return the query docs ids, taken from the action response and the documents' slice
 *
 * @param {import("../types").QueryState} queryState - Current state
 * @param {object} response - The action response
 * @param {import("../types").DocumentsStateSlice} documents - Reference to the documents slice
 * @param {object} params - The additional params
 * @param {number} params.count - The count of retrieved docs
 * @param {number} params.fetchedPagesCount - The number of pages already fetched
 * @returns {Array<string>} The list of sorted ids
 */
const updateQueryDataFromResponse = (
  queryState,
  response,
  documents,
  { count, fetchedPagesCount }
) => {
  let updatedIds = uniq([...queryState.data, ...response.data.map(properId)])
  return sortAndLimitDocsIds(queryState, documents, updatedIds, {
    count,
    fetchedPagesCount
  })
}

/**
 * Reducer for a query slice
 *
 * @param  {import("../types").QueryState} state - Current state
 * @param  {any} action - Redux action
 * @param  {import("../types").DocumentsStateSlice} documents - Reference to the next documents slice
 * @returns {import("../types").QueryState} - Next state
 */
const query = (state = queryInitialState, action, documents) => {
  switch (action.type) {
    case INIT_QUERY:
      if (
        state.lastUpdate &&
        state.id === action.queryId &&
        state.definition === action.queryDefinition
      ) {
        return state
      }
      return {
        ...state,
        id: action.queryId,
        definition: action.queryDefinition,
        options: action.options,
        fetchStatus: state.lastUpdate ? state.fetchStatus : 'pending'
      }
    case LOAD_QUERY:
      if (state.fetchStatus === 'loading') {
        return state
      }
      if (state.fetchStatus === 'loaded' && action.backgroundFetching) {
        return {
          ...state,
          fetchStatus: 'loaded',
          isFetching: true
        }
      }
      return {
        ...state,
        fetchStatus: 'loading'
      }
    case RECEIVE_QUERY_RESULT: {
      const response = action.response
      // Data can be null when we get a 404 not found
      // see Collection.get()
      // but we still need to update the fetchStatus.
      if (!response.data) {
        return {
          ...state,
          fetchStatus: 'loaded',
          isFetching: action.backgroundFetching ? false : null,
          lastFetch: Date.now(),
          lastUpdate: Date.now()
        }
      }

      /** @type {Partial<import("../types").QueryState>} */
      const common = {
        fetchStatus: 'loaded',
        isFetching: action.backgroundFetching ? false : null,
        lastFetch: Date.now(),
        lastUpdate: Date.now(),
        ...(executionStatsEnabled && {
          execution_stats: response.execution_stats
        })
      }

      if (!Array.isArray(response.data)) {
        return {
          ...state,
          ...common,
          hasMore: false,
          count: 1,
          data: [properId(response.data)]
        }
      }
      const count =
        response.meta && response.meta.count
          ? response.meta.count
          : response.data.length
      const fetchedPagesCount = state.fetchedPagesCount + 1
      const data = updateQueryDataFromResponse(state, response, documents, {
        count,
        fetchedPagesCount
      })
      return {
        ...state,
        ...common,
        bookmark: response.bookmark || null,
        hasMore: response.next !== undefined ? response.next : state.hasMore,
        count,
        fetchedPagesCount,
        data
      }
    }
    case RECEIVE_QUERY_ERROR:
      return {
        ...state,
        id: action.queryId,
        fetchStatus: 'failed',
        isFetching: action.backgroundFetching ? false : null,
        lastError: action.error,
        lastErrorUpdate: Date.now()
      }
    default:
      return state
  }
}

/**
 * Normalize sift selector
 *
 * @returns {object}
 */
export const convert$gtNullSelectors = selector => {
  const result = {}
  for (const [key, value] of Object.entries(selector)) {
    const convertedValue = isPlainObject(value)
      ? convert$gtNullSelectors(value)
      : value
    const convertedKey =
      key === '$gt' && convertedValue === null ? '$gtnull' : key

    result[convertedKey] = convertedValue
  }
  return result
}

/**
 * Merges query selectors with query partial indexes
 *
 * @param {object} queryDefinition - A query definition
 * @returns {object} A query definition selector
 */
export const mergeSelectorAndPartialIndex = queryDefinition => ({
  ...get(queryDefinition, 'selector'),
  ...get(queryDefinition, 'partialFilter')
})

/**
 * @param  {QueryDefinition} queryDefinition - A query definition
 * @returns {function(import("../types").CozyClientDocument): boolean}
 */
const getSelectorFilterFn = queryDefinition => {
  if (queryDefinition.selector || queryDefinition.partialFilter) {
    const selectors = mergeSelectorAndPartialIndex(queryDefinition)
    // sift does not work like couchdb when using { $gt: null } as a selector, so we use a custom operator
    sift.use({
      $gtnull: (_selectorValue, actualValue) => {
        return !!actualValue
      }
    })
    return sift(convert$gtNullSelectors(selectors))
  } else if (queryDefinition.id) {
    /** @type {object} */
    const siftQuery = { _id: queryDefinition.id }
    return sift(siftQuery)
  } else if (queryDefinition.ids) {
    /** @type {object} */
    const siftQuery = { _id: { $in: queryDefinition.ids } }
    return sift(siftQuery)
  } else {
    return null
  }
}

/**
 *
 * Returns a predicate function that checks if a document should be
 * included in the result of the query.
 *
 * @param  {import("../types").QueryState} query - Definition of the query
 * @returns {function(import("../types").CozyClientDocument): boolean} Predicate function
 */
const getQueryDocumentsChecker = query => {
  const qdoctype = query.definition.doctype
  const selectorFilterFn = getSelectorFilterFn(query.definition)
  return datum => {
    const ddoctype = datum._type
    if (ddoctype !== qdoctype) return false
    if (datum._deleted) return false
    if (!selectorFilterFn) return true
    return !!selectorFilterFn(datum)
  }
}

const makeCaseInsensitiveStringSorter = attrName => item => {
  const attrValue = get(item, attrName)
  return isString(attrValue) ? attrValue.toLowerCase() : attrValue
}

/**
 * Creates a sort function from a definition.
 *
 * Used to sort query results inside the store when creating a file or
 * receiving updates.
 *
 * @param {QueryDefinition} definition - A query definition
 * @returns {function(Array<import("../types").CozyClientDocument>): Array<import("../types").CozyClientDocument>}
 *
 * @private
 */
export const makeSorterFromDefinition = definition => {
  const sort = definition.sort
  if (!sort) {
    return docs => docs
  } else if (!isArray(definition.sort)) {
    logger.warn(
      'Correct update of queries with a sort that is not an array is not supported. Use an array as argument of QueryDefinition::sort'
    )
    return docs => docs
  } else {
    const attributeOrders = sort.map(x => Object.entries(x)[0])
    const attrs = attributeOrders
      .map(x => x[0])
      .map(makeCaseInsensitiveStringSorter)
    const orders = attributeOrders.map(x => x[1])
    return docs => orderBy(docs, attrs, orders)
  }
}

/**
 * Updates query state when new data comes in
 *
 * @param  {import("../types").QueryState} query - Current query state
 * @param  {Array<import("../types").CozyClientDocument>} newData - New documents (in most case from the server)
 * @param  {import("../types").DocumentsStateSlice} documents - A reference to the documents slice
 * @returns {import("../types").QueryState} - Updated query state
 */
export const updateData = (query, newData, documents) => {
  const belongsToQuery = getQueryDocumentsChecker(query)
  const res = mapValues(groupBy(newData, belongsToQuery), docs =>
    docs.map(properId)
  )
  const { true: matchedIds = [], false: unmatchedIds = [] } = res
  const originalIds = query.data

  const autoUpdate = query.options && query.options.autoUpdate
  const shouldRemove = !autoUpdate || autoUpdate.remove !== false
  const shouldAdd = !autoUpdate || autoUpdate.add !== false
  const shouldUpdate = !autoUpdate || autoUpdate.update !== false

  const toRemove = shouldRemove ? intersection(originalIds, unmatchedIds) : []
  const toAdd = shouldAdd ? difference(matchedIds, originalIds) : []
  const toUpdate = shouldUpdate ? intersection(originalIds, matchedIds) : []

  const changed = toRemove.length || toAdd.length || toUpdate.length

  // concat doesn't check duplicates (contrarily to union), which is ok as
  // toAdd does not contain any id present in originalIds, by construction.
  // It is also faster than union.
  let updatedData = difference(concat(originalIds, toAdd), toRemove)
  const { fetchedPagesCount } = query
  const docsIds = sortAndLimitDocsIds(query, documents, updatedData, {
    count: updatedData.length,
    fetchedPagesCount
  })
  return {
    ...query,
    data: docsIds,
    count: docsIds.length,
    fetchedPagesCount,
    lastUpdate: changed ? Date.now() : query.lastUpdate
  }
}

/**
 * Creates a function that returns an updated query state
 * from an action
 *
 * @param  {object} action - A redux action
 * @param  {import("../types").DocumentsStateSlice} documents - Reference to documents slice
 * @returns {function(import("../types").QueryState): import("../types").QueryState} - Updater query state
 */
const autoQueryUpdater = (action, documents) => query => {
  let data = get(action, 'response.data') || get(action, 'definition.document')

  if (!data) return query

  if (!Array.isArray(data)) {
    data = [data]
  }
  if (!data.length) {
    return query
  }

  if (query.definition.doctype !== data[0]._type) {
    return query
  }

  return updateData(query, data, documents)
}

/**
 * Creates a function that returns an updated query state
 * from an action
 *
 * @param  {object} action - A redux action
 * @param  {import("../types").DocumentsStateSlice} documents - Reference to documents slice
 * @returns {function(import("../types").QueryState): import("../types").QueryState} - Updater query state
 */
const manualQueryUpdater = (action, documents) => query => {
  const updateQueries = action.updateQueries
  const response = action.response
  const updater = updateQueries[query.id]
  if (!updater) {
    return query
  }

  const doctype = query.definition.doctype
  const oldData = query.data
  const oldDocs = mapIdsToDocuments(documents, doctype, oldData)
  const newData = updater(oldDocs, response)
  const newDataIds = newData.map(properId)
  return {
    ...query,
    data: newDataIds,
    count: newDataIds.length,
    lastUpdate: Date.now()
  }
}

/**
 * @param  {import("../types").QueriesStateSlice}  state - Redux slice containing all the query states indexed by name
 * @param  {object}  action - Income redux action
 * @param  {import("../types").DocumentsStateSlice}  documents - Reference to documents slice
 * @param  {boolean} haveDocumentsChanged - Has the document slice changed with current action
 * @returns {import("../types").QueriesStateSlice}
 */
const queries = (
  state = {},
  action,
  documents = {},
  haveDocumentsChanged = true
) => {
  if (action.type == INIT_QUERY) {
    const newQueryState = query(state[action.queryId], action, documents)
    // Do not create new object unnecessarily
    if (newQueryState === state[action.queryId]) {
      return state
    }
    return {
      ...state,
      [action.queryId]: newQueryState
    }
  }
  if (isQueryAction(action)) {
    const updater = autoQueryUpdater(action, documents)
    return mapValues(state, queryState => {
      if (queryState.id == action.queryId) {
        return query(queryState, action, documents)
      } else if (haveDocumentsChanged) {
        return updater(queryState)
      } else {
        return queryState
      }
    })
  }
  if (isReceivingMutationResult(action)) {
    const updater = action.updateQueries
      ? manualQueryUpdater(action, documents)
      : autoQueryUpdater(action, documents)
    return mapValues(state, updater)
  }
  return state
}
export default queries

/**
 * Create the query states in the store. Queries are indexed
 * in the store by queryId
 *
 * @param  {string} queryId  Name/id of the query
 * @param  {QueryDefinition} queryDefinition - Definition of the created query
 * @param  {import("../types").QueryOptions} [options] - Options for the created query
 * @returns {object} Redux action to dispatch
 */
export const initQuery = (queryId, queryDefinition, options = null) => {
  if (!queryDefinition.doctype) {
    throw new Error('Cannot init query with no doctype')
  }
  return {
    type: INIT_QUERY,
    queryId,
    queryDefinition,
    options
  }
}

/**
 * Update the fetchStatus when the query is loading
 *
 * @param  {string} queryId - id of the query
 * @param  {import("../types").QueryOptions} [options] - Options for the created query
 * @returns {object} Redux action to dispatch
 */
export const loadQuery = (queryId, options) => {
  return {
    type: LOAD_QUERY,
    queryId,
    ...options
  }
}

/**
 * Update the fetchStatus when the query is loading
 *
 * @param  {string} queryId - id of the query
 * @param {object} response - The action response
 * @param  {import("../types").QueryOptions} [options] - Options for the created query
 * @returns {object} Redux action to dispatch
 */
export const receiveQueryResult = (queryId, response, options = {}) => ({
  type: RECEIVE_QUERY_RESULT,
  queryId,
  response,
  ...options
})

/**
 * Update the fetchStatus when the query is loading
 *
 * @param  {string} queryId - id of the query
 * @param {object} error - The action error
 * @param  {import("../types").QueryOptions} [options] - Options for the created query
 * @returns {object} Redux action to dispatch
 */
export const receiveQueryError = (queryId, error, options = {}) => ({
  type: RECEIVE_QUERY_ERROR,
  queryId,
  error,
  ...options
})

// selectors
const mapIdsToDocuments = (documents, doctype, ids) =>
  ids.map(id => getDocumentFromSlice(documents, doctype, id))

export const getQueryFromSlice = (state, queryId, documents) => {
  if (!state || !state[queryId]) {
    return { ...queryInitialState, id: queryId, data: null }
  }
  const query = state[queryId]
  return documents
    ? {
        ...query,
        data: mapIdsToDocuments(documents, query.definition.doctype, query.data)
      }
    : query
}

export class QueryIDGenerator {
  constructor() {
    this.idCounter = 1
  }

  /**
   * Generates a random id for unamed queries
   */
  generateRandomId() {
    const id = this.idCounter
    this.idCounter++
    return id.toString()
  }

  /**
   * Generates an id for queries
   * If the query is a getById only query,
   * we can generate a name for it.
   *
   * If not, let's generate a random id
   *
   * @param {QueryDefinition} queryDefinition The query definition
   * @returns {string}
   */
  generateId(queryDefinition) {
    if (!isAGetByIdQuery(queryDefinition)) {
      return this.generateRandomId()
    } else {
      const { id, doctype } = queryDefinition
      return `${doctype}/${id}`
    }
  }
}

QueryIDGenerator.UNNAMED = 'unnamed'
