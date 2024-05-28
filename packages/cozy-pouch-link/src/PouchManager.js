import PouchDB from 'pouchdb-browser'
import fromPairs from 'lodash/fromPairs'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'
import zip from 'lodash/zip'
import startsWith from 'lodash/startsWith'
import { isMobileApp } from 'cozy-device-helper'

import { PouchLocalStorage } from './localStorage'
import Loop from './loop'
import logger from './logger'
import { fetchRemoteLastSequence } from './remote'
import { startReplication } from './startReplication'
import * as localStorage from './localStorage'
import { getDatabaseName } from './utils'

const DEFAULT_DELAY = 30 * 1000

/**
 * @param {import('cozy-client/types/types').Query} query The query definition whose name we're getting
 *
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
    this.doctypes = doctypes

    this.storage = new PouchLocalStorage()
  }

  async init() {
    const pouchPlugins = get(this.options, 'pouch.plugins', [])
    const pouchOptions = get(this.options, 'pouch.options', {})

    this.pouches = fromPairs(
      this.doctypes.map(doctype => [
        doctype,
        new PouchDB(getDatabaseName(this.options.prefix, doctype), pouchOptions)
      ])
    )
    this.syncedDoctypes = await this.storage.getPersistedSyncedDoctypes()
    this.warmedUpQueries = await this.storage.getPersistedWarmedUpQueries()
    this.getReplicationURL = this.options.getReplicationURL
    this.doctypesReplicationOptions =
      this.options.doctypesReplicationOptions || {}
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

  async destroy() {
    this.stopReplicationLoop()
    this.removeListeners()
    await this.clearSyncedDoctypes()
    await this.clearWarmedUpQueries()
    await this.storage.destroyAllDoctypeLastSequence()
    await this.storage.destroyAllLastReplicatedDocID()

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

  /**
   * Starts periodic syncing of the pouches
   *
   * @returns {Promise<Loop | void>}
   */
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

    /**
     * Creating each replication
     *
     * @type {import('./types').CancelablePromises}
     */
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
        await this.storage.persistDoctypeLastSequence(doctype, lastSeq)
      } else {
        seq = await this.storage.getDoctypeLastSequence(doctype)
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

      if (this.options.onDoctypeSyncStart) {
        this.options.onDoctypeSyncStart(doctype)
      }
      const res = await startReplication(
        pouch,
        replicationOptions,
        getReplicationURL,
        this.storage
      )
      if (seq) {
        // We only need the sequence for the second replication, as PouchDB
        // will use a local checkpoint for the next runs.
        await this.storage.destroyDoctypeLastSequence(doctype)
      }

      await this.updateSyncInfo(doctype)
      this.checkToWarmupDoctype(doctype, replicationOptions)
      if (this.options.onDoctypeSyncEnd) {
        this.options.onDoctypeSyncEnd(doctype)
      }
      return res
    })

    // Waiting on each replication
    const doctypes = Object.keys(this.pouches)
    const promises = Object.values(this.replications)
    try {
      /** @type {import('./types').CancelablePromises} */
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

  async updateSyncInfo(doctype) {
    this.syncedDoctypes[doctype] = { date: new Date().toISOString() }
    await this.storage.persistSyncedDoctypes(this.syncedDoctypes)
  }

  getSyncInfo(doctype) {
    return this.syncedDoctypes && this.syncedDoctypes[doctype]
  }

  isSynced(doctype) {
    const info = this.getSyncInfo(doctype)
    return info ? !!info.date : false
  }

  async clearSyncedDoctypes() {
    this.syncedDoctypes = {}
    await this.storage.destroySyncedDoctypes()
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
      await this.storage.persistWarmedUpQueries(this.warmedUpQueries)
      logger.log('PouchManager: warmupQueries for ' + doctype + ' are done')
    } catch (err) {
      logger.error(
        'PouchManager: Could not warm up queries for ' + doctype,
        err
      )
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

  async areQueriesWarmedUp(doctype, queries) {
    const persistWarmedUpQueries = await this.storage.getPersistedWarmedUpQueries()
    return queries.every(
      query =>
        persistWarmedUpQueries[doctype] &&
        persistWarmedUpQueries[doctype].includes(getQueryAlias(query))
    )
  }

  async clearWarmedUpQueries() {
    this.warmedUpQueries = {}
    await this.storage.destroyWarmedUpQueries()
  }
}

export default PouchManager
