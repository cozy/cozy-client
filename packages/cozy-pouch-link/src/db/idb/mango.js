import sift from 'sift'
import isPlainObject from 'lodash/isPlainObject'
import { MAX_LIMIT, queryWithAll, queryWithCursor } from './getDocs'
import orderBy from 'lodash/orderBy'

const IDB_ASC_ORDER = 'next'
const IDB_DESC_ORDER = 'prev'

const RANGE_OP = ['$gt', '$lt', '$gte', '$lte']
const SUPPORTED_CURSOR_OP = [...RANGE_OP, '$eq', '$in']

export const extractFiltersFromSelector = (
  selector,
  indexedFields,
  { forceInMemory = false } = {}
) => {
  const rangeFields = []
  const notCursorFields = []

  // XXX - Here we extract from the selector the predicates that can evaluated through an IDB cursor,
  // and those that should be evaluated directly in-memory.
  for (const [field, condition] of Object.entries(selector)) {
    if (typeof condition === 'object' && condition !== null) {
      const ops = Object.keys(condition)
      if (ops.some(op => RANGE_OP.includes(op))) {
        // Multiple range queries are badly handled by cursors
        rangeFields.push(field)
      }
      if (ops.some(op => !SUPPORTED_CURSOR_OP.includes(op))) {
        // Not supported operators by cursor
        notCursorFields.push(field)
      }
      if (
        ops.some(
          (op, i) => op === '$gt' && Object.values(condition)[i] === null
        )
      ) {
        // $gt: null evaluation is not supported by cursors, and there is no generic value to express
        // "any data" whatever the type. So let's exclude it from cursor evaluation
        // TODO if at least one attribute cannot be evaluated with cursor, all should be in-memory, otherwise
        // the index cannot be used correctly
        console.log('GT NULL')
        notCursorFields.push(field)
      }
    }
  }
  const firstField = indexedFields[0]
  const firstFieldHasRange = rangeFields.includes(firstField)

  let notForCursorFilters = {}
  let cursorFilters = {}

  if (notCursorFields.length > 0) {
    notForCursorFilters = selector
    return { notForCursorFilters, cursorFilters }
  }

  for (const [field, condition] of Object.entries(selector)) {
    const isIndexed = indexedFields.includes(field)
    const indexPos = indexedFields.indexOf(field)
    const hasRange = rangeFields.includes(field)
    const notCursorOp = notCursorFields.includes(field)
    const isNotCursorFriendly =
      !isIndexed ||
      (hasRange && indexPos > 0 && firstFieldHasRange) ||
      notCursorOp

    if (isNotCursorFriendly || forceInMemory) {
      notForCursorFilters[field] = condition
    } else {
      cursorFilters[field] = condition
    }
  }

  return {
    notForCursorFilters,
    cursorFilters
  }
}

const sortInMemory = (docs, sort) => {
  const attributes = sort.map(s => Object.keys(s)[0])
  const orders = sort.map(s => Object.values(s)[0])
  return orderBy(docs, attributes, orders)
}

export const getSortDirection = sort => {
  if (!sort || sort.length < 1) {
    return IDB_ASC_ORDER // default direction
  }
  const sortDir = Object.values(sort[0])[0]
  return sortDir === 'asc' ? IDB_ASC_ORDER : IDB_DESC_ORDER
}

// Adapted from cozy-client
const convert$gtNullSelectors = selector => {
  for (const [key, value] of Object.entries(selector)) {
    const convertedValue = isPlainObject(value)
      ? convert$gtNullSelectors(value)
      : value

    if (
      (key === '$gt' && convertedValue === null) ||
      (key === '$gt' && convertedValue === '')
    ) {
      delete selector[key]
      selector['$exists'] = true
    }
  }

  return selector
}

export const evaluateSelectorInMemory = async (store, data, selector, sort) => {
  let results = data
  if (!data || data.length < 1) {
    // In case there is no given data, query all of them
    results = await queryWithAll(store)
    results.map(res => ({ _id: res.id, _rev: res.rev, ...res }))
  }
  // sift does not work like couchdb when using { $gt: null } as a selector, so we convert the operator
  const convertedSelector = convert$gtNullSelectors(selector)
  const evaluator = sift(convertedSelector)

  if (sort) {
    return sortInMemory(results.filter(evaluator), sort)
  }
  return results.filter(evaluator)
}

const mergeExplicitAndConditions = conditions => {
  const result = {}

  conditions.forEach(condition => {
    for (const key in condition) {
      if (!result[key]) {
        result[key] = {}
      }
      Object.assign(result[key], condition[key])
    }
  })

  return result
}

const createMergedIDBKeyRange = ({ conditions, fields }) => {
  const lower = []
  let upper = []
  let lowerOpen = false,
    upperOpen = false

  fields.forEach((field, idx) => {
    let condition = conditions[field]

    if (!condition) {
      return
    }

    if (typeof condition !== 'object') {
      // Special case for implicit equality
      condition = { $eq: conditions[field] }
    }
    let fieldLower,
      fieldUpper,
      fieldLowerOpen = false,
      fieldUpperOpen = false

    for (const [op, value] of Object.entries(condition)) {
      switch (op) {
        case '$gt':
          if (fieldLower === undefined || value > fieldLower) {
            fieldLower = value
            fieldLowerOpen = true
          }
          break
        case '$gte':
          if (
            fieldLower === undefined ||
            value > fieldLower ||
            (value === fieldLower && fieldLowerOpen)
          ) {
            fieldLower = value
            fieldLowerOpen = false
          }
          break
        case '$lt':
          if (fieldUpper === undefined || value < fieldUpper) {
            fieldUpper = value
            fieldUpperOpen = true
          }
          break
        case '$lte':
          if (
            fieldUpper === undefined ||
            value < fieldUpper ||
            (value === fieldUpper && fieldUpperOpen)
          ) {
            fieldUpper = value
            fieldUpperOpen = false
          }
          break
        case '$eq':
          fieldLower = value
          fieldUpper = value
          fieldLowerOpen = false
          fieldUpperOpen = false
          break
        case '$in':
        case '$exists':
        case '$ne':
          break
        default:
          throw new Error(`Operator not supported: ${op}`)
      }
    }

    lower.push(fieldLower)
    upper.push(fieldUpper)
    lowerOpen = lowerOpen || fieldLowerOpen
    upperOpen = upperOpen || fieldUpperOpen
  })
  if (lower.every(v => v === undefined) && upper.every(v => v === undefined)) {
    return null
  }

  if (fields.length === 1) {
    // Single-field index
    if (
      lower[0] !== undefined &&
      upper[0] !== undefined &&
      lower[0] === upper[0]
    ) {
      return IDBKeyRange.only(lower[0])
    }
    if (lower[0] === null || upper[0] === null) {
      // Special case to handle null range predicates, e.g. { $gt: null }
      // IDB does not work on null values
      return null
    }
    if (lower[0] !== undefined && upper[0] !== undefined) {
      return IDBKeyRange.bound(lower[0], upper[0], lowerOpen, upperOpen)
    }
    if (lower[0] !== undefined) {
      return IDBKeyRange.lowerBound(lower[0], lowerOpen)
    }
    if (upper[0] !== undefined) {
      return IDBKeyRange.upperBound(upper[0], upperOpen)
    }
  }

  if (lower[0] === undefined) {
    return IDBKeyRange.upperBound(upper, upperOpen)
  }
  if (upper[0] === undefined) {
    return IDBKeyRange.lowerBound(lower, lowerOpen)
  }
  return IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen)
}

const queryByField = async (
  index,
  fields,
  conditions,
  sort,
  { offset = 0, limit = Infinity, forceInMemory = false } = {}
) => {
  const sortDirection = getSortDirection(sort)

  const { cursorFilters, notForCursorFilters } = extractFiltersFromSelector(
    conditions,
    fields,
    { forceInMemory }
  )
  let allResults = []

  for (const attribute of Object.keys(cursorFilters)) {
    const filter = cursorFilters[attribute]
    if (typeof filter === 'object' && '$in' in filter) {
      let results = []
      for (const val of filter['$in']) {
        const idbKeyRange = IDBKeyRange.only(val)
        const res = await queryWithCursor(index, idbKeyRange, {
          offset,
          limit,
          sortDirection
        })
        if (res && res.length > 0) {
          results = results.concat(res)
        }
      }
      allResults = Array.from(results)
      delete cursorFilters[attribute]
    }
  }
  if (Object.keys(cursorFilters).length > 0) {
    const idbKeyRange = createMergedIDBKeyRange({
      conditions: cursorFilters,
      fields: Array.isArray(fields) ? fields : [fields]
    })
    const results = await queryWithCursor(index, idbKeyRange, {
      offset,
      limit,
      sortDirection
    })
    allResults = allResults.concat(results)
  }

  if (notForCursorFilters && Object.keys(notForCursorFilters).length > 0) {
    allResults = await evaluateSelectorInMemory(
      index,
      allResults,
      notForCursorFilters,
      sort
    )
  }
  return allResults
}

export const executeIDBFind = async (
  store,
  {
    selector,
    indexedFields,
    sort,
    forceInMemory = false,
    limit = MAX_LIMIT,
    offset = 0
  }
) => {
  if ('$or' in selector) {
    const subQueries = await Promise.all(
      selector['$or'].map(cond =>
        executeIDBFind(store, {
          selector: cond,
          indexedFields,
          sort,
          limit,
          offset,
          forceInMemory: true
        })
      )
    )
    const seen = new Set()
    return subQueries.flat().filter(doc => {
      const key = doc.id || JSON.stringify(doc)
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }

  let evalSelector = selector
  if ('$and' in selector) {
    evalSelector = mergeExplicitAndConditions(selector['$and'])
  }

  if (Object.keys(evalSelector).length > 0) {
    return queryByField(store, indexedFields, evalSelector, sort, {
      offset,
      limit,
      forceInMemory
    })
  }

  // fallback for empty selector
  const sortDirection = getSortDirection(sort)
  return queryWithCursor(store, null, { offset, limit, sortDirection })
}
