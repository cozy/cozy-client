import merge from 'lodash/merge'
import startsWith from 'lodash/startsWith'

import logger from './logger'

const helpers = {}

// https://github.com/pouchdb/pouchdb/issues/7011
export const LIMIT_BUG = 999
const ADAPTERS_WITH_LIMIT_BUG = ['websql']

helpers.isAdapterBugged = adapterName => {
  return ADAPTERS_WITH_LIMIT_BUG.includes(adapterName)
}

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
          $gt: '' // See https://github.com/pouchdb/pouchdb/issues/7192
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
          $gt: '' // See https://github.com/pouchdb/pouchdb/issues/7192
        }
      }
    }
  }

  const mergedSelector = partialFilter
    ? merge({ ...findSelector }, partialFilter)
    : findSelector

  return Object.keys(mergedSelector).length > 0
    ? mergedSelector
    : { _id: { $gt: '' } } // PouchDB does not accept empty selector
}

export default helpers
