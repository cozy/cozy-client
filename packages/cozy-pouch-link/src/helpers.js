import merge from 'lodash/merge'
import startsWith from 'lodash/startsWith'

import logger from './logger'

const helpers = {}

// https://github.com/pouchdb/pouchdb/issues/7011
const LIMIT_BUG = 999
const ADAPTERS_WITH_LIMIT_BUG = ['websql']

helpers.isAdapterBugged = adapterName => {
  return ADAPTERS_WITH_LIMIT_BUG.includes(adapterName)
}

helpers.withoutDesignDocuments = res => {
  const rows = res.rows.filter(doc => !startsWith(doc.id, '_design/'))

  return {
    ...res,
    rows,
    total_rows: rows.length
  }
}

helpers.getDocs = async (db, fct, options = {}) => {
  // allDocs return an error when limit is null
  if (options.limit === null) delete options.limit

  const limit = options.limit
  const field = fct === 'allDocs' ? 'rows' : 'docs'

  if (helpers.isAdapterBugged(db.adapter)) {
    if (limit === undefined || limit > LIMIT_BUG) {
      options.limit = LIMIT_BUG
      options.skip = options.skip || 0
    }
  }

  const data = await db[fct](options)

  if (data[field].length === options.limit) {
    options.skip = (options.skip ? options.skip : 0) + options.limit
    options.limit = limit ? limit - options.limit : undefined
    if (options.limit > 0 || options.limit === undefined) {
      const next = await helpers.getDocs(db, fct, options)

      return { ...data, [field]: [...data[field], ...next[field]] }
    }
  }

  return data
}

helpers.allDocs = async (db, options = {}) =>
  helpers.getDocs(db, 'allDocs', options)
helpers.find = async (db, options = {}) => helpers.getDocs(db, 'find', options)

helpers.isDesignDocument = doc => startsWith(doc._id, '_design')

helpers.isDeletedDocument = doc => doc._deleted

helpers.insertBulkDocs = async (db, docs) => {
  return db.bulkDocs(docs, { new_edits: false })
}

helpers.normalizeFindSelector = ({
  selector,
  sort,
  indexedFields,
  partialFilter
}) => {
  let findSelector = selector || {}
  if (indexedFields) {
    for (const indexedField of indexedFields) {
      if (!Object.keys(findSelector).includes(indexedField)) {
        const selectorJson = JSON.stringify(selector)
        logger.warn(
          `${indexedField} was missing in selector, it has been automatically added from indexed fields. Please consider adding this field to your query's selector as required by PouchDB. The query's selector is: ${selectorJson}`
        )
        findSelector[indexedField] = {
          $gt: null
        }
      }
    }
  }

  if (sort) {
    const sortedFields = sort.flatMap(s => Object.keys(s))
    for (const sortedField of sortedFields) {
      if (!Object.keys(findSelector).includes(sortedField)) {
        const selectorJson = JSON.stringify(selector)
        logger.warn(
          `${sortedField} was missing in selector, it has been automatically added from sorted fields. Please consider adding this field to your query's selector as required by PouchDB. The query's selector is: ${selectorJson}`
        )
        findSelector[sortedField] = {
          $gt: null
        }
      }
    }
  }

  const mergedSelector = partialFilter
    ? merge({ ...findSelector }, partialFilter)
    : findSelector

  return Object.keys(mergedSelector).length > 0
    ? mergedSelector
    : { _id: { $gt: null } } // PouchDB does not accept empty selector
}

export default helpers
