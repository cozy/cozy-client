import {
  MutationTypes,
  CozyLink,
  getDoctypeFromOperation,
  BulkEditError
} from 'cozy-client'
import PouchDB from 'pouchdb-browser'
import PouchDBFind from 'pouchdb-find'
import omit from 'lodash/omit'
import defaults from 'lodash/defaults'
import mapValues from 'lodash/mapValues'
import zipWith from 'lodash/zipWith'
import get from 'lodash/get'

import { default as helpers } from './helpers'
import { getIndexNameFromFields, getIndexFields } from './mango'
import * as jsonapi from './jsonapi'
import PouchManager from './PouchManager'
import { PouchLocalStorage } from './localStorage'
import logger from './logger'
import { migratePouch } from './migrations/adapter'
import { platformWeb } from './platformWeb'
import { getDatabaseName, getPrefix } from './utils'

PouchDB.plugin(PouchDBFind)

const { find, allDocs, withoutDesignDocuments } = helpers

const parseMutationResult = (original, res) => {
  if (!res.ok) {
    throw new Error('Pouch response is not OK')
  }
  return { ...original, ...omit(res, 'ok') }
}

const DEFAULT_OPTIONS = {
  replicationInterval: 30 * 1000
}

const addBasicAuth = (url, basicAuth) => {
  return url.replace('//', `//${basicAuth}`)
}

const sanitized = doc => omit(doc, '_type')
export const getReplicationURL = (uri, token, doctype) => {
  const basicAuth = token.toBasicAuth()
  const authenticatedURL = addBasicAuth(uri, basicAuth)
  return `${authenticatedURL}/data/${doctype}`
}

const doNothing = (operation, result = null) => {}
const expiredTokenError = /Expired token/
export const isExpiredTokenError = pouchError => {
  return expiredTokenError.test(pouchError.error)
}

const normalizeAll = (docs, doctype) => {
  return docs.map(doc => jsonapi.normalizeDoc(doc, doctype))
}

/**
 * @typedef {import('cozy-client/src/types').CozyClientDocument} CozyClientDocument
 *
 * @typedef {"idle"|"replicating"} ReplicationStatus
 */

/**
 * Link to be passed to a `CozyClient` instance to support CouchDB. It instantiates
 * PouchDB collections for each doctype that it supports and knows how
 * to respond to queries and mutations.
 */
class PouchLink extends CozyLink {
  /**
   * constructor - Initializes a new PouchLink
   *
   * @param {object} [opts={}]
   * @param {number} [opts.replicationInterval] Milliseconds between replications
   * @param {string[]} opts.doctypes Doctypes to replicate
   * @param {object[]} opts.doctypesReplicationOptions A mapping from doctypes to replication options. All pouch replication options can be used, as well as the "strategy" option that determines which way the replication is done (can be "sync", "fromRemote" or "toRemote")
   * @param {import('./types').LinkPlatform} opts.platform Platform specific adapters and methods
   */

  constructor(opts) {
    const options = defaults({}, opts, DEFAULT_OPTIONS)
    super(options)
    const { doctypes, doctypesReplicationOptions } = options
    this.options = options
    if (!doctypes) {
      throw new Error(
        "PouchLink must be instantiated with doctypes it manages. Ex: ['io.cozy.bills']"
      )
    }
    this.doctypes = doctypes
    this.doctypesReplicationOptions = doctypesReplicationOptions
    this.indexes = {}
    this.storage = new PouchLocalStorage(
      options.platform?.storage || platformWeb.storage
    )

    /** @type {Record<string, ReplicationStatus>} - Stores replication states per doctype */
    this.replicationStatus = this.replicationStatus || {}
  }

  /**
   * Return the PouchDB adapter name.
   * Should be IndexedDB for newest adapters.
   *
   * @param {import('./types').LocalStorage} localStorage Methods to access local storage
   * @returns {Promise<string>} The adapter name
   */
  static getPouchAdapterName = localStorage => {
    const storage = new PouchLocalStorage(localStorage || platformWeb.storage)
    return storage.getAdapterName()
  }

  getReplicationURL(doctype) {
    const url = this.client && this.client.stackClient.uri
    const token = this.client && this.client.stackClient.token

    if (!token) {
      throw new Error(
        "Can't get replication URL since the stack client doesn't have a token"
      )
    }

    if (!url) {
      throw new Error(
        "Can't get replication URL since the stack client doesn't have a URI"
      )
    }

    return getReplicationURL(url, token, doctype)
  }

  async registerClient(client) {
    this.client = client
  }

  /**
   * Migrate the current adapter
   *
   * @typedef {object} MigrationParams
   * @property {string} [fromAdapter] - The current adapter type, e.g. 'idb'
   * @property {string} [toAdapter] - The new adapter type, e.g. 'indexeddb'
   * @property {string} [url] - The Cozy URL
   * @property {Array<object>} [plugins] - The PouchDB plugins
   *
   * @param {MigrationParams} params - Migration params
   */
  async migrateAdapter({ fromAdapter, toAdapter, url, plugins }) {
    try {
      for (const plugin of plugins) {
        PouchDB.plugin(plugin)
      }
      const doctypes = await this.storage.getPersistedSyncedDoctypes()
      for (const doctype of Object.keys(doctypes)) {
        const prefix = getPrefix(url)
        const dbName = getDatabaseName(prefix, doctype)

        await migratePouch({ dbName, fromAdapter, toAdapter })
        await this.storage.destroyWarmedUpQueries() // force recomputing indexes
      }
      await this.storage.persistAdapterName('indexeddb')
    } catch (err) {
      console.error('PouchLink: PouchDB migration failed. ', err)
    }
  }

  async onLogin() {
    if (!this.client) {
      logger.warn("PouchLink: no client registered, can't login")
      return
    }

    const prefix = getPrefix(this.client.stackClient.uri)

    const shouldDestroyDatabases =
      this.pouches &&
      this.pouches.options &&
      this.pouches.options.prefix !== prefix

    if (shouldDestroyDatabases) {
      if (process.env.NODE_ENV !== 'production') {
        logger.info('PouchLink: URI changed, destroy pouches')
      }
      try {
        await this.pouches.destroy()
      } catch (e) {
        logger.warn('Error while destroying pouch DBs', e)
      }
    }

    if (!prefix) {
      throw new Error('PouchLink: Prefix is required')
    }

    if (process.env.NODE_ENV !== 'production') {
      logger.log('Create pouches with ' + prefix + ' prefix')
    }

    if (!(await this.storage.getAdapterName())) {
      const adapter = get(this.options, 'pouch.options.adapter')
      await this.storage.persistAdapterName(adapter)
    }

    this.pouches = new PouchManager(this.doctypes, {
      pouch: this.options.pouch,
      getReplicationURL: this.getReplicationURL.bind(this),
      doctypesReplicationOptions: this.doctypesReplicationOptions,
      onError: err => this.onSyncError(err),
      onSync: this.handleOnSync.bind(this),
      onDoctypeSyncStart: this.handleDoctypeSyncStart.bind(this),
      onDoctypeSyncEnd: this.handleDoctypeSyncEnd.bind(this),
      prefix,
      executeQuery: this.executeQuery.bind(this),
      platform: this.options.platform
    })
    await this.pouches.init()

    if (this.client && this.options.initialSync) {
      this.startReplication()
    }
  }

  async reset() {
    if (this.pouches) {
      await this.pouches.destroy()
    }

    this.pouches = null
    this.client = null
  }

  /**
   * Receives PouchDB updates (documents grouped by doctype).
   * Normalizes the data (.id -> ._id, .rev -> _rev).
   * Passes the data to the client and to the onSync handler.
   *
   * Emits an event (pouchlink:sync:end) when the sync (all doctypes) is done
   */
  handleOnSync(doctypeUpdates) {
    const normalizedData = mapValues(doctypeUpdates, normalizeAll)
    if (this.client) {
      this.client.setData(normalizedData)
    }
    if (this.options.onSync) {
      this.options.onSync.call(this, normalizedData)
    }
    if (process.env.NODE_ENV !== 'production') {
      logger.info('Pouch synced')
    }
    this.client.emit('pouchlink:sync:end')
  }

  handleDoctypeSyncStart(doctype) {
    this.replicationStatus[doctype] = 'replicating'
    this.client.emit('pouchlink:doctypesync:start', doctype)
  }

  handleDoctypeSyncEnd(doctype) {
    this.replicationStatus[doctype] = 'idle'
    this.client.emit('pouchlink:doctypesync:end', doctype)
  }

  /**
   * User of the link can call this to start ongoing replications.
   * Typically, it can be used when the application regains focus.
   *
   * Emits pouchlink:sync:start event when the replication begins
   *
   * @public
   * @returns {void}
   */
  startReplication() {
    this.client.emit('pouchlink:sync:start')
    this.pouches.startReplicationLoop()
    if (this.options.onStartReplication) {
      this.options.onStartReplication.apply(this)
    }
  }

  /**
   * User of the link can call this to stop ongoing replications.
   * Typically, it can be used when the applications loses focus.
   *
   * Emits pouchlink:sync:stop event
   *
   * @public
   * @returns {void}
   */
  stopReplication() {
    this.pouches.stopReplicationLoop()
    if (this.options.onStopReplication) {
      this.options.onStopReplication.apply(this)
    }
    this.client.emit('pouchlink:sync:stop')
  }

  async onSyncError(error) {
    if (isExpiredTokenError(error)) {
      try {
        await this.client.stackClient.refreshToken()
        this.startReplication()
        return
      } catch (err) {
        logger.warn('Could not refresh token, replication has stopped', err)
        if (this.options.onSyncError) {
          this.options.onSyncError.call(this, err)
        }
      }
    } else {
      logger.warn('CozyPouchLink: Synchronization error', error)
      if (this.options.onSyncError) {
        this.options.onSyncError.call(this, error)
      }
    }
  }

  getSyncInfo(doctype) {
    return this.pouches.getSyncInfo(doctype)
  }

  getPouch(doctype) {
    return this.pouches.getPouch(doctype)
  }

  supportsOperation(operation) {
    const impactedDoctype = getDoctypeFromOperation(operation)
    // If the Pouch is configured only to replicate from the remote,
    // we don't want to apply the mutation on it, but to forward
    // to the next link
    if (
      operation.mutationType &&
      this.doctypesReplicationOptions &&
      this.doctypesReplicationOptions[impactedDoctype] &&
      this.doctypesReplicationOptions[impactedDoctype].strategy === 'fromRemote'
    )
      return false
    return !!this.getPouch(impactedDoctype)
  }

  async request(operation, result = null, forward = doNothing) {
    const doctype = getDoctypeFromOperation(operation)

    if (!this.pouches) {
      if (process.env.NODE_ENV !== 'production') {
        logger.info(
          `Tried to access local ${doctype} but Cozy Pouch is not initialized yet. Forwarding the operation to next link`
        )
      }

      return forward(operation)
    }

    if (this.pouches.getSyncStatus(doctype) === 'not_synced') {
      if (process.env.NODE_ENV !== 'production') {
        logger.info(
          `Tried to access local ${doctype} but Cozy Pouch is not synced yet. Forwarding the operation to next link`
        )
      }
      return forward(operation)
    }

    if (await this.needsToWaitWarmup(doctype)) {
      if (process.env.NODE_ENV !== 'production') {
        logger.info(
          `Tried to access local ${doctype} but not warmuped yet. Forwarding the operation to next link`
        )
      }
      return forward(operation)
    }

    // Forwards if doctype not supported
    if (!this.supportsOperation(operation)) {
      if (process.env.NODE_ENV !== 'production') {
        logger.info(
          `The doctype '${doctype}' is not supported. Forwarding the operation to next link`
        )
      }
      return forward(operation)
    }

    if (operation.mutationType) {
      return this.executeMutation(operation, result, forward)
    } else {
      return this.executeQuery(operation)
    }
  }

  async persistData(data, forward = doNothing) {
    const docWithoutType = sanitized(data)
    docWithoutType.cozyLocalOnly = true

    const oldDoc = await this.getExistingDocument(data._id, data._type)
    if (oldDoc) {
      docWithoutType._rev = oldDoc._rev
    }

    const db = this.pouches.getPouch(data._type)
    await db.put(docWithoutType)
  }

  /**
   * Retrieve the existing document from Pouch
   *
   * @private
   * @param {*} id - ID of the document to retrieve
   * @param {*} type - Doctype of the document to retrieve
   * @param {*} throwIfNotFound - If true the method will throw when the document is not found. Otherwise it will return null
   * @returns {Promise<CozyClientDocument | null>}
   */
  async getExistingDocument(id, type, throwIfNotFound = false) {
    try {
      const db = this.pouches.getPouch(type)
      const existingDoc = await db.get(id)

      return existingDoc
    } catch (err) {
      if (err.name === 'not_found' && !throwIfNotFound) {
        return null
      } else {
        throw err
      }
    }
  }

  /**
   *
   * Check if there is warmup queries for this doctype
   * and return if those queries are already warmed up or not
   *
   * @param {string} doctype - Doctype to check
   * @returns {Promise<boolean>} the need to wait for the warmup
   */
  async needsToWaitWarmup(doctype) {
    if (
      this.doctypesReplicationOptions &&
      this.doctypesReplicationOptions[doctype] &&
      this.doctypesReplicationOptions[doctype].warmupQueries
    ) {
      return !(await this.pouches.areQueriesWarmedUp(
        doctype,
        this.doctypesReplicationOptions[doctype].warmupQueries
      ))
    }
    return false
  }

  hasIndex(name) {
    return Boolean(this.indexes[name])
  }

  // This merge is necessary because PouchDB does not support partial indexes
  mergePartialIndexInSelector(selector, partialFilter) {
    if (partialFilter) {
      logger.info(
        `PouchLink: The query contains a partial index but PouchDB does not support it. ` +
          `Hence, the partial index definition is used in the selector for in-memory evaluation, ` +
          `which might impact expected performances. If this support is important in your use-case, ` +
          `please let us know or help us contribute to PouchDB!`
      )
      return { ...selector, ...partialFilter }
    }
    return selector
  }

  async ensureIndex(doctype, query) {
    const fields = query.indexedFields || getIndexFields(query)
    const name = getIndexNameFromFields(fields)
    const absName = `${doctype}/${name}`
    const db = this.pouches.getPouch(doctype)
    if (this.indexes[absName]) {
      return this.indexes[absName]
    } else {
      const index = await db.createIndex({
        index: {
          fields
        }
      })
      this.indexes[absName] = index
      return index
    }
  }

  async executeQuery({
    doctype,
    selector,
    sort,
    fields,
    limit,
    id,
    ids,
    skip,
    indexedFields,
    partialFilter
  }) {
    const db = this.getPouch(doctype)
    // The partial index is not supported by PouchDB, so we ensure the selector includes it
    const mergedSelector = this.mergePartialIndexInSelector(
      selector,
      partialFilter
    )
    let res, withRows
    if (id) {
      res = await db.get(id)
      withRows = false
    } else if (ids) {
      res = await allDocs(db, { include_docs: true, keys: ids })
      res = withoutDesignDocuments(res)
      res.total_rows = null // pouch indicates the total number of docs in res.total_rows, even though we use "keys". Setting it to null avoids cozy-client thinking there are more docs to fetch.
      withRows = true
    } else if (!mergedSelector && !fields && !sort) {
      res = await allDocs(db, { include_docs: true, limit })
      res = withoutDesignDocuments(res)
      withRows = true
    } else {
      const findOpts = {
        sort,
        selector: mergedSelector,
        // same selector as Document Collection. We force _id.
        // Fix https://github.com/cozy/cozy-client/issues/985
        fields: fields ? [...fields, '_id', '_type', 'class'] : undefined,
        limit,
        skip
      }
      const index = await this.ensureIndex(doctype, {
        ...findOpts,
        indexedFields
      })
      findOpts.use_index = index.id
      res = await find(db, findOpts)
      res.offset = skip
      res.limit = limit
      withRows = true
    }
    return jsonapi.fromPouchResult(res, withRows, doctype)
  }

  async executeMutation(mutation, result, forward) {
    let pouchRes
    switch (mutation.mutationType) {
      case MutationTypes.CREATE_DOCUMENT:
        pouchRes = await this.createDocument(mutation)
        break
      case MutationTypes.UPDATE_DOCUMENT:
        pouchRes = await this.updateDocument(mutation)
        break
      case MutationTypes.UPDATE_DOCUMENTS:
        pouchRes = await this.updateDocuments(mutation)
        break
      case MutationTypes.DELETE_DOCUMENT:
        pouchRes = await this.deleteDocument(mutation)
        break
      case MutationTypes.ADD_REFERENCES_TO:
        pouchRes = await this.addReferencesTo(mutation)
        break
      default:
        return forward(mutation, result)
    }

    return jsonapi.fromPouchResult(
      pouchRes,
      false,
      getDoctypeFromOperation(mutation)
    )
  }

  async createDocument(mutation) {
    const res = await this.dbMethod('post', mutation)
    return parseMutationResult(mutation.document, res)
  }

  async updateDocument(mutation) {
    const res = await this.dbMethod('put', mutation)
    return parseMutationResult(mutation.document, res)
  }

  async updateDocuments(mutation) {
    const docs = mutation.documents
    const bulkResponse = await this.dbMethod('bulkDocs', mutation)
    const updatedDocs = zipWith(
      bulkResponse,
      docs,
      (bulkResult, originalDoc) => ({
        ...originalDoc,
        _id: bulkResult.id,
        _rev: bulkResult.rev
      })
    )
    if (bulkResponse.find(x => !x.ok)) {
      throw new BulkEditError(bulkResponse, updatedDocs)
    }
    return updatedDocs
  }

  async deleteDocument(mutation) {
    const res = await this.dbMethod('remove', mutation)
    const document = {
      ...mutation.document,
      _id: res.id,
      _rev: res.rev,
      _deleted: true
    }
    return parseMutationResult(document, res)
  }

  async addReferencesTo(mutation) {
    throw new Error('addReferencesTo is not implemented in CozyPouchLink')
  }

  async dbMethod(method, mutation) {
    const doctype = getDoctypeFromOperation(mutation)
    const { document: doc, documents: docs } = mutation
    const db = this.getPouch(doctype)
    let res

    try {
      if (docs) {
        res = await db[method](docs.map(doc => sanitized(doc)))
      } else if (doc) {
        res = await db[method](sanitized(doc))
      } else {
        throw new Error(
          'A mutation should either have document or documents member.'
        )
      }
      return res
    } catch (e) {
      throw new Error(`Coud not apply mutation: ${e.message}`)
    }
  }

  async syncImmediately() {
    if (!this.pouches) {
      logger.warn('Cannot sync immediately, no PouchManager')
      return
    }
    this.pouches.syncImmediately()
  }
}

export default PouchLink
