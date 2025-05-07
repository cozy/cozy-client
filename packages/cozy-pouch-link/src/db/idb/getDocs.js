import logger from '../../logger'

import { isMissingIDBIndexError } from '../../errors'
import { executeIDBFind } from './mango'
import { getCozyPouchData, keepDocWitHighestRev } from '../helpers'
import { normalizeDoc } from '../../jsonapi'

export const MAX_LIMIT = Math.pow(2, 32) - 2

export const parseResults = (
  client,
  result,
  doctype,
  { isSingleDoc = false, skip = 0, limit = MAX_LIMIT } = {}
) => {
  let parsedResults = []
  for (let i = 0; i < result.length; i++) {
    const doc = result[i].data || result[i]
    if (!doc._id) {
      doc._id = result[i].id
    }
    if (!doc._rev) {
      doc._rev = result[i].rev
    }

    // Handle special case for docs with `cozyPouchData`
    const cozyPouchData = getCozyPouchData(doc)
    if (cozyPouchData) {
      return { data: cozyPouchData }
    }

    normalizeDoc(client, doctype, doc)
    parsedResults.push(doc)
  }
  if (parsedResults.length === 0) {
    return { data: [] }
  }
  if (isSingleDoc) {
    if (parsedResults.length > 1) {
      const doc = keepDocWitHighestRev(parsedResults)
      return { data: doc }
    }
    return { data: parsedResults[0] }
  }
  // XXX - Ideally we should have the total number of rows in the database to have a reliable
  // next parameter, but we prefer to avoid this computation for performances.
  // So let's rely on the total number of returned rows - if next is true, the last paginated
  // query should have less results than the limit, thanks to the offset
  let next = false
  if (limit !== MAX_LIMIT && parsedResults.length >= limit) {
    next = true
  }
  return {
    data: parsedResults,
    meta: { count: parsedResults.length },
    skip,
    next
  }
}

export const queryWithCursor = async (
  index,
  idbKeyRange,
  { offset = 0, limit = MAX_LIMIT, sortDirection = 'next' } = {}
) => {
  return new Promise((resolve, reject) => {
    const result = []
    let advanced = false
    //let cursorRequest = index.openCursor() // TODO: 1st param is key range, 2nd param is direction, for sort
    const cursorRequest = idbKeyRange
      ? index.openCursor(idbKeyRange, sortDirection)
      : index.openCursor(null, sortDirection)

    cursorRequest.onsuccess = event => {
      const cursor = event.target.result
      if (!cursor || result.length >= limit) {
        resolve(result)
        return
      }

      if (!advanced && offset > 0) {
        cursor.advance(offset)
        advanced = true
      } else {
        result.push(cursor.value)
        cursor.continue()
      }
    }

    cursorRequest.onerror = event => {
      reject(event.target.error)
    }
  })
}

export const queryWithAll = async (store, { limit = MAX_LIMIT } = {}) => {
  return new Promise((resolve, reject) => {
    const request = store.getAll(null, limit)

    request.onsuccess = event => {
      const docs = event.target.result
      resolve(docs)
    }

    request.onerror = event => {
      reject(event.target.error)
    }
  })
}

export const getAllData = async (
  store,
  { limit = MAX_LIMIT, skip = 0 } = {}
) => {
  let results = []
  const startQ = performance.now()
  if (skip === 0) {
    results = await queryWithAll(store, { limit })
  } else {
    results = await queryWithCursor(store, null, { limit, offset: skip })
  }
  const endQ = performance.now()
  console.log(`All data took : ${endQ - startQ} ms`)
  console.log('length : ', results.length)

  return results
}

export const findData = async (store, findOpts) => {
  const startQ = performance.now()
  const results = await executeIDBFind(store, findOpts)
  const endQ = performance.now()
  console.log(`Find data took : ${endQ - startQ} ms`)
  return results
}

export const getSingleDoc = (store, id) => {
  return new Promise((resolve, reject) => {
    const startQ = performance.now()
    const request = store.get(id)

    request.onsuccess = event => {
      const doc = event.target.result
      const endQ = performance.now()
      console.log(`Single data took : ${endQ - startQ} ms`)
      resolve(doc)
    }

    request.onerror = event => {
      console.error('Error getting data:', event.target.error)
      reject(event.target.error)
    }
  })
}

export const createIDBIndex = async (
  queryEngine,
  { indexName, indexedFields, shouldRecreateIndex = false }
) => {
  const dbName = queryEngine.db.name
  // See https://github.com/pouchdb/pouchdb/blob/f2c665a2a885437b9cea80dda62c02a93a137c1e/packages/node_modules/pouchdb-adapter-indexeddb/src/setup.js#L38C1-L40C75
  const newVersion = Math.pow(10, 13) * 2 + new Date().getTime()

  // We need to first close the db to upgrade it with index creation, with new db version
  queryEngine.db.close()

  const indexedDB =
    typeof window == 'object' ? window.indexedDB : self.indexedDB
  const upgradeRequest = indexedDB.open(dbName, newVersion)

  return new Promise((resolve, reject) => {
    upgradeRequest.onupgradeneeded = async event => {
      const store = upgradeRequest.transaction.objectStore(
        queryEngine.storeName
      )

      if (shouldRecreateIndex) {
        // Useful for testing
        try {
          store.deleteIndex(indexName)
        } catch (err) {
          if (!isMissingIDBIndexError(err)) {
            throw err
          }
        }
      }

      let idx
      const fields = indexedFields.map(field => `data.${field}`) // indexeddb adapter put data in doc.data
      if (indexedFields.length === 1) {
        idx = store.createIndex(indexName, fields[0], { unique: false })
      } else {
        idx = store.createIndex(indexName, fields, { unique: false })
      }
      resolve(idx)
    }

    upgradeRequest.onsuccess = () => {
      queryEngine.db = upgradeRequest.result
    }

    upgradeRequest.onerror = err => {
      logger.error(`Error during db upgrade: `, err)
      reject(err)
    }
  })
}
