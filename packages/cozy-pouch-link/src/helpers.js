import startsWith from 'lodash/startsWith'

const helpers = {}

// https://github.com/pouchdb/pouchdb/issues/7011
const LIMIT_BUG = 999
const ADAPTERS_WITH_LIMIT_BUG = ['cordova-sqlite', 'websql']

helpers.isAdapterBugged = adapterName => {
  return ADAPTERS_WITH_LIMIT_BUG.includes(adapterName)
}

helpers.find = async (db, options = {}) => {
  if (options.selector === undefined) {
    options.selector = { _id: { $exists: true } }
  }
  const limit = options.limit

  if (helpers.isAdapterBugged(db.adapter)) {
    if (limit === undefined || limit > LIMIT_BUG) {
      options.limit = LIMIT_BUG
    }
  }

  const data = await db.find(options)

  if (data.docs.length === options.limit) {
    options.skip = (options.skip ? options.skip : 0) + options.limit
    options.limit = limit ? limit - options.limit : undefined
    if (options.limit > 0 || options.limit === undefined) {
      const next = await helpers.find(db, options)

      return { docs: [...data.docs, ...next.docs] }
    }
  }

  return data
}

helpers.isDesignDocument = doc => startsWith(doc._id, '_design')

helpers.isDeletedDocument = doc => doc._deleted

export default helpers
