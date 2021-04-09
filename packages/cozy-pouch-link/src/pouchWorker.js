import PouchDB from 'pouchdb-browser'
import PouchDBFind from 'pouchdb-find'
import { getIndexNameFromFields, getIndexFields } from './mango'
PouchDB.plugin(PouchDBFind)

// https://github.com/pouchdb/pouchdb/issues/7011
const LIMIT_BUG = 999
const ADAPTERS_WITH_LIMIT_BUG = ['cordova-sqlite', 'websql']

const isAdapterBugged = adapterName => {
  return ADAPTERS_WITH_LIMIT_BUG.includes(adapterName)
}

const getDocs = async (db, fct, options = {}) => {
  console.log('get docs worker')
  // allDocs return an error when limit is null
  if (options.limit === null) delete options.limit

  const limit = options.limit
  const field = fct === 'allDocs' ? 'rows' : 'docs'

  if (isAdapterBugged(db.adapter)) {
    if (limit === undefined || limit > LIMIT_BUG) {
      options.limit = LIMIT_BUG
      options.skip = options.skip || 0
    }
  }
  console.log('options in worker  : ', options)
  console.log('db in worker : ', db)
  const startFind = new Date()
  const data = await db[fct](options)
  const endFind = new Date()
  console.log(`PouchWorker: find took ${endFind - startFind} ms for ${data.docs.length} docs on query ${JSON.stringify(options)}`)
  if (data[field].length === options.limit) {
    options.skip = (options.skip ? options.skip : 0) + options.limit
    options.limit = limit ? limit - options.limit : undefined
    if (options.limit > 0 || options.limit === undefined) {
      console.log('should next')
      const next = await getDocs(db, fct, options)

      return { ...data, [field]: [...data[field], ...next[field]] }
    }
  }

  return data
}

const ensureIndex = async (db, options) => {
  const startIdx = new Date()
  const index = await db.createIndex({ index: options.index })
  const endIdx = new Date()
  console.log(`PouchWorker: index took ${endIdx - startIdx} ms for ${JSON.stringify(index)}}`)
  return index
}

onmessage = async function(e) {
  console.log('receive message : ', e.data)
  if (e.data.pouchOptions.adapter === 'indexeddb') {
    PouchDB.plugin(require('pouchdb-adapter-indexeddb').default)
  }
  const db = new PouchDB(e.data.dbName, e.data.pouchOptions)

  const query = e.data.query
  const options = e.data.options
  try {
    let res
    if (query === 'find' || query === 'allDocs') {
      res = await getDocs(db, query, options)
      e.ports[0].postMessage({ result: res })
    } else if (query === 'createIndex') {
      res = await ensureIndex(db, options)
    }
    console.log('resworker  : ', res)
    e.ports[0].postMessage({ result: res })
  } catch (error) {
    e.ports[0].postMessage({ error })
  }
}
