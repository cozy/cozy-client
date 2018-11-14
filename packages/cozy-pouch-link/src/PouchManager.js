/** Handles the lifecycle of several pouches */

import PouchDB from 'pouchdb'
import fromPairs from 'lodash/fromPairs'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'
import zip from 'lodash/zip'
import * as promises from './promises'
import { isDesignDocument, isDeletedDocument } from './helpers'
import { isMobileApp } from 'cozy-device-helper'

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
        console.info(
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
 * - Creates/Destroys the pouches
 * - Replicates periodically
 */
export default class PouchManager {
  constructor(doctypes, options) {
    this.options = options
    const pouchPlugins = get(options, 'pouch.plugins', [])
    const pouchOptions = get(options, 'pouch.options', {})
    forEach(pouchPlugins, plugin => PouchDB.plugin(plugin))
    this.pouches = fromPairs(
      doctypes.map(doctype => [
        doctype,
        new PouchDB(this.getDatabaseName(doctype, options.prefix), pouchOptions)
      ])
    )
    this.syncedDoctypes = this.getPersistedSyncedDoctypes()
    this.getReplicationURL = options.getReplicationURL
    this.listenerLaunched = false

    // We must ensure databases exist on the remote before
    // starting replications
    this.ensureDatabasesExistDone = false
  }

  addListener() {
    if (isMobileApp() && !this.listenerLaunched) {
      document.addEventListener(
        'pause',
        () => this.stopReplicationLoop(),
        false
      )
      document.addEventListener(
        'resign',
        () => this.stopReplicationLoop(),
        false
      )
      document.addEventListener(
        'resume',
        () => this.startReplicationLoop(),
        false
      )
      this.listenerLaunched = true
    }
  }

  removeListener() {
    if (this.listenerLaunched) {
      document.removeEventListener(
        'pause',
        () => this.stopReplicationLoop(),
        false
      )
      document.removeEventListener(
        'resign',
        () => this.stopReplicationLoop(),
        false
      )
      document.removeEventListener(
        'resume',
        () => this.startReplicationLoop(),
        false
      )
      this.listenerLaunched = false
    }
  }

  destroy() {
    this.stopReplicationLoop()
    this.removeListener()
    this.destroyPersistedSyncedDoctypes()
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
      if (process.env.NODE_ENV !== 'production') {
        console.info('PouchManager: ensure databases exist done')
      }
      this.ensureDatabasesExistDone = true
    })
  }

  /** Starts periodic syncing of the pouches */
  async startReplicationLoop(delay) {
    await this.ensureDatabasesExist()

    if (this._stopReplicationLoop) {
      return this._stopReplicationLoop
    }

    if (process.env.NODE_ENV !== 'production') {
      console.info('PouchManager: Start replication loop')
    }

    delay = delay || this.options.replicationDelay || DEFAULT_DELAY
    this._stopReplicationLoop = promises.setInterval(() => {
      if (window.navigator.onLine) {
        return this.replicateOnce()
      } else {
        if (process.env.NODE_ENV !== 'production') {
          console.info(
            'PouchManager: The device is offline so the replication has been skipped'
          )
        }

        return Promise.resolve()
      }
    }, delay)
    this.addListener()
    return this._stopReplicationLoop
  }

  /** Stop periodic syncing of the pouches */
  stopReplicationLoop() {
    if (this._stopReplicationLoop) {
      if (process.env.NODE_ENV !== 'production') {
        console.info('PouchManager: Stop replication loop')
      }

      this.cancelCurrentReplications()
      this._stopReplicationLoop()
      this._stopReplicationLoop = null
    }
  }

  /** Starts replication */
  async replicateOnce() {
    if (process.env.NODE_ENV !== 'production') {
      console.info('PouchManager: Starting replication iteration')
    }

    this.replications = map(this.pouches, (pouch, doctype) => {
      if (process.env.NODE_ENV !== 'production') {
        console.info('PouchManager: Starting replication for ' + doctype)
      }

      const getReplicationURL = () => this.getReplicationURL(doctype)
      return startReplication(pouch, getReplicationURL).then(res => {
        this.addSyncedDoctype(doctype)

        if (process.env.NODE_ENV !== 'production') {
          console.log(
            'PouchManager: Replication for ' + doctype + ' ended',
            res
          )
        }

        return res
      })
    })
    const doctypes = Object.keys(this.pouches)
    const promises = Object.values(this.replications)
    try {
      const res = await Promise.all(promises)

      if (process.env.NODE_ENV !== 'production') {
        console.info('PouchManager: Replication ended')
      }

      if (this.options.onSync) {
        const doctypeUpdates = fromPairs(zip(doctypes, res))
        this.options.onSync(doctypeUpdates)
      }
      return res
    } catch (err) {
      // On error, replication stops, it needs to be started
      // again manually by the owner of PouchManager
      this.stopReplicationLoop()
      console.warn('PouchManager: Error during replication', err)
      if (this.options.onError) {
        this.options.onError(err)
      }
    }
  }

  cancelCurrentReplications() {
    if (!this.replications) {
      console.warn('PouchManager: No current replications')
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

  destroyPersistedSyncedDoctypes() {
    window.localStorage.removeItem(LOCALSTORAGE_SYNCED_KEY)
  }

  getDatabaseName(doctype, prefix) {
    if (!prefix) {
      return doctype
    }

    return `${prefix}_${doctype}`
  }
}
