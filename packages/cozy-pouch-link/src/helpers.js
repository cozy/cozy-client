import startsWith from 'lodash/startsWith'

const helpers = {}

// https://github.com/pouchdb/pouchdb/issues/7011
const LIMIT_BUG = 999
const ADAPTERS_WITH_LIMIT_BUG = ['cordova-sqlite', 'websql']

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

helpers.normalizeFindSelector = (selector, indexedFields) => {
  let findSelector = selector || {}
  if (indexedFields) {
    for (const indexedField of indexedFields) {
      if (!Object.keys(findSelector).includes(indexedField)) {
        findSelector[indexedField] = {
          $gt: null
        }
      }
    }
  }

  return Object.keys(findSelector).length > 0
    ? findSelector
    : { _id: { $gt: null } } // PouchDB does not accept empty selector
}

export default helpers
