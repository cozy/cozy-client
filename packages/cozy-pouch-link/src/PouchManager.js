import PouchDB from 'pouchdb-browser'
import fromPairs from 'lodash/fromPairs'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'
import zip from 'lodash/zip'
import Loop from './loop'
import { default as helpers } from './helpers'
import { isMobileApp } from 'cozy-device-helper'
import logger from './logger'

const { isDesignDocument, isDeletedDocument } = helpers
const DEFAULT_DELAY = 30 * 1000

const TIME_UNITS = [['ms', 1000], ['s', 60], ['m', 60], ['h', 24]]
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

/* Create a cancellable promise for replication with default options */
const startReplication = (pouch, getReplicationURL) => {
  let replication
  const start = new Date()
  const promise = new Promise((resolve, reject) => {
    const url = getReplicationURL()
    replication = pouch.sync(url, {
      batch_size: 1000 // we have mostly small documents
    })
    const docs = {}
    replication.on('change', ({ change }) => {
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

export const LOCALSTORAGE_SYNCED_KEY = 'cozy-client-pouch-link-synced'

/**
 * Handles the lifecycle of several pouches
 *
 * - Creates/Destroys the pouches
 * - Replicates periodically
 */
class PouchManager {
  constructor(doctypes, options) {
    this.options = options
    const pouchPlugins = get(options, 'pouch.plugins', [])
    const pouchOptions = get(options, 'pouch.options', {})
    forEach(pouchPlugins, plugin => PouchDB.plugin(plugin))
    this.pouches = fromPairs(
      doctypes.map(doctype => [
        doctype,
        new PouchDB(this.getDatabaseName(doctype), pouchOptions)
      ])
    )
    this.syncedDoctypes = this.getPersistedSyncedDoctypes()
    this.getReplicationURL = options.getReplicationURL
    this.listenerLaunched = false

    // We must ensure databases exist on the remote before
    // starting replications
    this.ensureDatabasesExistDone = false

    this.startReplicationLoop = this.startReplicationLoop.bind(this)
    this.stopReplicationLoop = this.stopReplicationLoop.bind(this)
    this.replicateOnce = this.replicateOnce.bind(this)
  }

  addListeners() {
    if (!this.listenerLaunched) {
      if (isMobileApp()) {
        document.addEventListener('pause', this.stopReplicationLoop)
        document.addEventListener('resume', this.startReplicationLoop)
      }
      document.addEventListener('online', this.startReplicationLoop)
      document.addEventListener('offline', this.stopReplicationLoop)
      this.listenerLaunched = true
    }
  }

  removeListeners() {
    if (this.listenerLaunched) {
      if (isMobileApp()) {
        document.removeEventListener('pause', this.stopReplicationLoop)
        document.removeEventListener('resume', this.startReplicationLoop)
      }
      document.removeEventListener('online', this.startReplicationLoop)
      document.removeEventListener('offline', this.stopReplicationLoop)
      this.listenerLaunched = false
    }
  }

  destroy() {
    this.stopReplicationLoop()
    this.removeListeners()
    this.destroySyncedDoctypes()
    return Promise.all(
      Object.values(this.pouches).map(pouch => pouch.destroy())
    )
  }

  /**
   * Via a call to info() we ensure the database exist on the
   * remote side. This is done only once since after the first
   * call, we are sure that the databases have been created.
   */
  async ensureDatabasesExist() {
    if (this.ensureDatabasesExistDone) {
      return Promise.resolve()
    }
    return Promise.all(
      Object.values(this.pouches).map(pouch => pouch.info())
    ).then(() => {
      logger.info('PouchManager: ensure databases exist done')
      this.ensureDatabasesExistDone = true
    })
  }

  /** Starts periodic syncing of the pouches */
  async startReplicationLoop() {
    await this.ensureDatabasesExist()

    if (this.replicationLoop) {
      logger.warn('Replication loop already started')
      return
    }

    if (process.env.NODE_ENV !== 'production') {
      logger.info('PouchManager: Start replication loop')
    }

    const delay = this.options.replicationDelay || DEFAULT_DELAY
    this.replicationLoop = new Loop(this.replicateOnce, delay)
    this.replicationLoop.start()
    this.addListeners()
    return this.replicationLoop
  }

  /** Stop periodic syncing of the pouches */
  stopReplicationLoop() {
    if (this.replicationLoop) {
      logger.info('PouchManager: Stop replication loop')
      this.replicationLoop.stop()
      this.replicationLoop = null
    }
  }

  /**
   * If a replication is currently ongoing, will start a replication
   * just after it has finished. Otherwise it will start a replication
   * immediately
   */
  syncImmediately() {
    if (!this.replicationLoop) {
      logger.warn('No replication loop, cannot syncImmediately')
      return
    }
    this.replicationLoop.scheduleImmediateTask()
  }

  /** Starts replication */
  async replicateOnce() {
    if (!window.navigator.onLine) {
      logger.info(
        'PouchManager: The device is offline so the replication has been skipped'
      )
      return Promise.resolve()
    }

    logger.info('PouchManager: Starting replication iteration')

    // Creating each replication
    this.replications = map(this.pouches, (pouch, doctype) => {
      logger.info('PouchManager: Starting replication for ' + doctype)

      const getReplicationURL = () => this.getReplicationURL(doctype)
      return startReplication(pouch, getReplicationURL).then(res => {
        this.addSyncedDoctype(doctype)

        logger.log('PouchManager: Replication for ' + doctype + ' ended', res)

        return res
      })
    })

    // Waiting on each replication
    const doctypes = Object.keys(this.pouches)
    const promises = Object.values(this.replications)
    try {
      const res = await Promise.all(promises)

      if (process.env.NODE_ENV !== 'production') {
        logger.info('PouchManager: Replication ended')
      }

      if (this.options.onSync) {
        const doctypeUpdates = fromPairs(zip(doctypes, res))
        this.options.onSync(doctypeUpdates)
      }

      res.cancel = this.cancelCurrentReplications

      return res
    } catch (err) {
      this.handleReplicationError(err)
    }
  }

  handleReplicationError(err) {
    logger.warn('PouchManager: Error during replication', err)
    // On error, replication stops, it needs to be started
    // again manually by the owner of PouchManager
    this.stopReplicationLoop()
    if (this.options.onError) {
      this.options.onError(err)
    }
  }

  cancelCurrentReplications() {
    if (!this.replications) {
      logger.warn('PouchManager: No current replications')
      return
    }
    Object.values(this.replications).forEach(replication => {
      return replication.cancel && replication.cancel()
    })
  }

  waitForCurrentReplications() {
    if (!this.replications) {
      return Promise.resolve()
    }
    return Promise.all(Object.values(this.replications))
  }

  getPouch(doctype) {
    return this.pouches[doctype]
  }

  getPersistedSyncedDoctypes() {
    const item = window.localStorage.getItem(LOCALSTORAGE_SYNCED_KEY)

    // We check if the item in local storage is an array because we previously stored a boolean
    if (!item || !Array.isArray(JSON.parse(item))) {
      return []
    }

    return JSON.parse(item)
  }

  persistSyncedDoctypes() {
    window.localStorage.setItem(
      LOCALSTORAGE_SYNCED_KEY,
      JSON.stringify(this.syncedDoctypes)
    )
  }

  addSyncedDoctype(doctype) {
    if (!this.isSynced(doctype)) {
      this.syncedDoctypes.push(doctype)
      this.persistSyncedDoctypes()
    }
  }

  isSynced(doctype) {
    return this.syncedDoctypes.includes(doctype)
  }

  destroySyncedDoctypes() {
    this.syncedDoctypes = []
    window.localStorage.removeItem(LOCALSTORAGE_SYNCED_KEY)
  }

  getDatabaseName(doctype) {
    return `${this.options.prefix}_${doctype}`
  }
}

export default PouchManager
