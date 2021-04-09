import { default as helpers } from './helpers'
import logger from './logger'

const { isDesignDocument, isDeletedDocument } = helpers
export const humanTimeDelta = timeMs => {
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
  const start = new Date()
  const promise = new Promise((resolve, reject) => {
    const url = getReplicationURL()
    const {
      strategy,
      warmupQueries,
      ...customReplicationOptions
    } = replicationOptions
    const options = {
      batch_size: 1000, // we have mostly small documents
      ...customReplicationOptions
    }
    console.log('start replication with opts ', replicationOptions)
    let replication
    if (strategy === 'fromRemote')
      replication = pouch.replicate.from(url, options)
    else if (strategy === 'toRemote')
      replication = pouch.replicate.to(url, options)
    else replication = pouch.sync(url, options)

    const docs = {}

    replication.on('change', infos => {
      //! Since we introduced the concept of strategy we can use
      // PouchDB.replicate or PouchDB.sync. But both don't share the
      // same API for the change's event.
      // See https://pouchdb.com/api.html#replication
      // and https://pouchdb.com/api.html#sync (see example response)
      const change = infos.change ? infos.change : infos
      console.log('change : ', change)
      if (change.docs) {
        change.docs
          .filter(doc => !isDesignDocument(doc) && !isDeletedDocument(doc))
          .forEach(doc => {
            docs[doc._id] = doc
          })
      }
    })
    replication.on('error', reject).on('complete', infos => {
      const end = new Date()
      console.log(
        `PouchManager: replication console for ${url} took ${humanTimeDelta(
          end - start
        )} for ${docs.length} docs`
      )
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
