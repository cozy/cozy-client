import { default as helpers } from './helpers'
import startsWith from 'lodash/startsWith'
import logger from './logger'
import { fetchRemoteInstance } from './remote'
import {
  getLastReplicatedDocID,
  persistLastReplicatedDocID
} from './localStorage'
const { isDesignDocument, isDeletedDocument } = helpers

const BATCH_SIZE = 1000 // we have mostly small documents

const humanTimeDelta = timeMs => {
  let cur = timeMs
  let unitIndex = 0
  let str = ''
  while (cur >= TIME_UNITS[unitIndex][1]) {
    let unit = TIME_UNITS[unitIndex]
    const int = Math.round(cur / unit[1])
    const rest = cur % unit[1]
    str = `${rest}${unit[0]}` + str
    cur = int
    unitIndex++
  }
  const lastUnit = TIME_UNITS[unitIndex]
  str = `${cur}${lastUnit[0]}` + str
  return str
}
const TIME_UNITS = [['ms', 1000], ['s', 60], ['m', 60], ['h', 24]]

/**
 * startReplication - Create a cancellable promise for replication with default options
 *
 * @private
 * @param {object} pouch                 Pouch database instance
 * @param {object} replicationOptions Any option supported by the Pouch replication API (https://pouchdb.com/api.html#replication)
 * @param {string} replicationOptions.strategy The direction of the replication. Can be "fromRemote",  "toRemote" or "sync"
 * @param {boolean} replicationOptions.initialReplication Whether or not this is an initial replication
 * @param {string} replicationOptions.doctype The doctype to replicate
 * @param {Function} getReplicationURL A function that should return the remote replication URL
 *
 * @returns {Promise} A cancelable promise that resolves at the end of the replication
 */
export const startReplication = (
  pouch,
  replicationOptions,
  getReplicationURL
) => {
  let replication
  let docs = {}
  const start = new Date()
  const promise = new Promise((resolve, reject) => {
    const url = getReplicationURL()
    const {
      strategy,
      initialReplication,
      warmupQueries,
      doctype,
      ...customReplicationOptions
    } = replicationOptions
    const options = {
      batch_size: BATCH_SIZE,
      ...customReplicationOptions
    }
    let replication
    if (initialReplication && strategy !== 'toRemote') {
      ;(async () => {
        // For the first remote->local replication, we manually replicate all docs
        // as it avoids to replicate all revs history, which can lead to
        // performances issues
        docs = await replicateAllDocs(pouch, url, doctype)
        const end = new Date()
        if (process.env.NODE_ENV !== 'production') {
          logger.info(
            `PouchManager: initial replication with all_docs for ${url} took ${humanTimeDelta(
              end - start
            )}`
          )
        }
        return resolve(docs)
      })()
    }
    if (strategy === 'fromRemote') {
      replication = pouch.replicate.from(url, options)
    } else if (strategy === 'toRemote') {
      replication = pouch.replicate.to(url, options)
    } else {
      replication = pouch.sync(url, options)
    }

    replication.on('change', infos => {
      //! Since we introduced the concept of strategy we can use
      // PouchDB.replicate or PouchDB.sync. But both don't share the
      // same API for the change's event.
      // See https://pouchdb.com/api.html#replication
      // and https://pouchdb.com/api.html#sync (see example response)
      const change = infos.change ? infos.change : infos
      if (change.docs) {
        change.docs
          .filter(doc => !isDesignDocument(doc) && !isDeletedDocument(doc))
          .forEach(doc => {
            docs[doc._id] = doc
          })
      }
    })
    replication.on('error', reject).on('complete', () => {
      const end = new Date()
      if (process.env.NODE_ENV !== 'production') {
        logger.info(
          `PouchManager: replication for ${url} took ${humanTimeDelta(
            end - start
          )}`
        )
      }
      resolve(Object.values(docs))
    })
  })

  const cancel = () => {
    if (replication) {
      replication.cancel()
    }
  }

  promise.cancel = cancel
  return promise
}
const filterDocs = docs => {
  return docs
    .map(doc => doc.doc)
    .filter(doc => !doc._deleted && !startsWith(doc._id, '_design'))
}

/**
 * Replicate all docs locally from a remote URL.
 *
 * It uses the _all_docs view, and bulk insert the docs.
 * Note it saves the last replicated _id for each run and
 * starts from there in case the process stops before the end.
 *
 * @param {object} db - Pouch instance
 * @param {string} baseUrl - The remote instance
 * @param {string} doctype - The doctype to replicate
 * @returns {Array} The retrieved documents
 */
export const replicateAllDocs = async (db, baseUrl, doctype) => {
  const remoteUrlAllDocs = new URL(`${baseUrl}/_all_docs`)
  const batchSize = BATCH_SIZE
  let hasMore = true
  let startDocId = getLastReplicatedDocID(doctype) // Get last replicated _id in localStorage
  let docs = []

  while (hasMore) {
    if (!startDocId) {
      // No startDocId set: this is the first time we replicate
      const res = await fetchRemoteInstance(remoteUrlAllDocs, {
        limit: batchSize,
        include_docs: true
      })
      docs = filterDocs(res.rows)
      if (docs.length === 0) {
        hasMore = false
      } else {
        startDocId = docs[docs.length - 1]._id
        if (docs.length < batchSize) {
          hasMore = false
        }
        await helpers.insertBulkDocs(db, docs)
        persistLastReplicatedDocID(doctype, startDocId)
      }
    } else {
      const res = await fetchRemoteInstance(remoteUrlAllDocs, {
        include_docs: true,
        limit: batchSize,
        startkey_docid: startDocId
      })
      const filteredDocs = filterDocs(res.rows)
      if (filteredDocs.length < 2) {
        return docs
      }
      filteredDocs.shift() // Remove first element, already included in previous request
      startDocId = filteredDocs[filteredDocs.length - 1]._id
      await helpers.insertBulkDocs(db, filteredDocs)
      persistLastReplicatedDocID(doctype, startDocId)
      docs = docs.concat(filteredDocs)

      if (res.rows.length < batchSize) {
        hasMore = false
      }
    }
  }
  return docs
}
