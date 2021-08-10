import PouchDB from 'pouchdb-browser'
import fromPairs from 'lodash/fromPairs'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'
import zip from 'lodash/zip'
import startsWith from 'lodash/startsWith'
import Loop from './loop'
import { isMobileApp } from 'cozy-device-helper'
import logger from './logger'
import { fetchRemoteLastSequence } from './remote'
import { startReplication } from './startReplication'
import * as localStorage from './localStorage'

const DEFAULT_DELAY = 30 * 1000

/**
 * @param {QueryDefinition} query
 * @returns {string} alias
 */
const getQueryAlias = query => {
  return query.options.as
}

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
    this.syncedDoctypes = localStorage.getPersistedSyncedDoctypes()
    this.warmedUpQueries = localStorage.getPersistedWarmedUpQueries()
    this.getReplicationURL = options.getReplicationURL
    this.doctypesReplicationOptions = options.doctypesReplicationOptions || {}
    this.listenerLaunched = false

    // We must ensure databases exist on the remote before
    // starting replications
    this.ensureDatabasesExistDone = false

    this.startReplicationLoop = this.startReplicationLoop.bind(this)
    this.stopReplicationLoop = this.stopReplicationLoop.bind(this)
    this.replicateOnce = this.replicateOnce.bind(this)
    this.executeQuery = this.options.executeQuery
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
    this.clearSyncedDoctypes()
    this.clearWarmedUpQueries()
    localStorage.destroyAllDoctypeLastSequence()
    localStorage.destroyAllLastReplicatedDocID()

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
    this.replications = map(this.pouches, async (pouch, doctype) => {
      logger.info('PouchManager: Starting replication for ' + doctype)

      const getReplicationURL = () => this.getReplicationURL(doctype)

      const initialReplication = !this.isSynced(doctype)
      const replicationFilter = doc => {
        return !startsWith(doc._id, '_design')
      }
      let seq = ''
      if (initialReplication) {
        // Before the first replication, get the last remote sequence,
        // which will be used as a checkpoint for the next replication
        const lastSeq = await fetchRemoteLastSequence(getReplicationURL())
        localStorage.persistDoctypeLastSequence(doctype, lastSeq)
      } else {
        seq = localStorage.getDoctypeLastSequence(doctype)
      }

      const replicationOptions = get(
        this.doctypesReplicationOptions,
        doctype,
        {}
      )
      replicationOptions.initialReplication = initialReplication
      replicationOptions.filter = replicationFilter
      replicationOptions.since = seq
      replicationOptions.doctype = doctype

      const res = await startReplication(
        pouch,
        replicationOptions,
        getReplicationURL
      )
      if (seq) {
        // We only need the sequence for the second replication, as PouchDB
        // will use a local checkpoint for the next runs.
        localStorage.destroyDoctypeLastSequence(doctype)
      }

      this.addSyncedDoctype(doctype)
      this.checkToWarmupDoctype(doctype, replicationOptions)
      return res
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

  addSyncedDoctype(doctype) {
    if (!this.isSynced(doctype)) {
      this.syncedDoctypes.push(doctype)
      localStorage.persistSyncedDoctypes(this.syncedDoctypes)
    }
  }

  isSynced(doctype) {
    return this.syncedDoctypes.includes(doctype)
  }

  getDatabaseName(doctype) {
    return `${this.options.prefix}_${doctype}`
  }

  clearSyncedDoctypes() {
    this.syncedDoctypes = []
    localStorage.destroySyncedDoctypes()
  }

  async warmupQueries(doctype, queries) {
    if (!this.warmedUpQueries[doctype]) this.warmedUpQueries[doctype] = []
    try {
      await Promise.all(
        queries.map(async query => {
          const def = getQueryAlias(query)
          if (!this.warmedUpQueries[doctype].includes(def)) {
            await this.executeQuery(query.definition().toDefinition())
            this.warmedUpQueries[doctype].push(def)
          }
        })
      )
      localStorage.persistWarmedUpQueries(this.warmedUpQueries)
      logger.log('PouchManager: warmupQueries for ' + doctype + ' are done')
    } catch (err) {
      logger.error('PouchManager: Could not warm up queries', err)
      delete this.warmedUpQueries[doctype]
    }
  }

  // Queries are warmed up only once per instantiation of the PouchManager. Since
  // the PouchManager lives during the complete lifecycle of the app, warm up
  // happens only on app start / restart.
  checkToWarmupDoctype(doctype, replicationOptions) {
    if (!this.warmedUpQueries[doctype] && replicationOptions.warmupQueries) {
      this.warmupQueries(doctype, replicationOptions.warmupQueries)
    }
  }

  areQueriesWarmedUp(doctype, queries) {
    const persistWarmedUpQueries = localStorage.getPersistedWarmedUpQueries()
    return queries.every(
      query =>
        persistWarmedUpQueries[doctype] &&
        persistWarmedUpQueries[doctype].includes(getQueryAlias(query))
    )
  }

  clearWarmedUpQueries() {
    this.warmedUpQueries = {}
    localStorage.destroyWarmedUpQueries()
  }
}

export default PouchManager
