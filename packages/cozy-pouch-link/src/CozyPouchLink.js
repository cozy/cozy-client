import { MutationTypes, CozyLink, getDoctypeFromOperation } from 'cozy-client'
import PouchDB from 'pouchdb-browser'
import PouchDBFind from 'pouchdb-find'
import omit from 'lodash/omit'
import defaults from 'lodash/defaults'
import mapValues from 'lodash/mapValues'

import { default as helpers } from './helpers'
import { getIndexNameFromFields, getIndexFields } from './mango'
import * as jsonapi from './jsonapi'
import PouchManager from './PouchManager'
import logger from './logger'

PouchDB.plugin(PouchDBFind)

const { find, allDocs, withoutDesignDocuments } = helpers

const parseMutationResult = (original, res) => {
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

const doNothing = () => {}
export const isExpiredTokenError = pouchError => {
  return pouchError.error === 'code=400, message=Expired token'
}

const normalizeAll = (docs, doctype) => {
  return docs.map(doc => jsonapi.normalizeDoc(doc, doctype))
}

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
   *
   * @returns {object} The PouchLink instance
   */

  constructor(opts = {}) {
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

  async onLogin() {
    if (!this.client) {
      logger.warn("PouchLink: no client registered, can't login")
      return
    }

    const prefix = this.client.stackClient.uri.replace(/^https?:\/\//, '')

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

    this.pouches = new PouchManager(this.doctypes, {
      pouch: this.options.pouch,
      getReplicationURL: this.getReplicationURL.bind(this),
      doctypesReplicationOptions: this.doctypesReplicationOptions,
      onError: err => this.onSyncError(err),
      onSync: this.handleOnSync.bind(this),
      prefix,
      executeQuery: this.executeQuery.bind(this)
    })

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

  request(operation, result = null, forward = doNothing) {
    const doctype = getDoctypeFromOperation(operation)

    if (!this.pouches) {
      if (process.env.NODE_ENV !== 'production') {
        logger.info(
          `Tried to access local ${doctype} but Cozy Pouch is not initialized yet. Forwarding the operation to next link`
        )
      }

      return forward(operation)
    }

    if (!this.pouches.isSynced(doctype)) {
      if (process.env.NODE_ENV !== 'production') {
        logger.info(
          `Tried to access local ${doctype} but Cozy Pouch is not synced yet. Forwarding the operation to next link`
        )
      }
      return forward(operation)
    }

    if (this.needsToWaitWarmup(doctype)) {
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
  /**
   *
   * Check if there is warmup queries for this doctype
   * and return if those queries are already warmedup or not
   *
   * @param {string} doctype
   * @returns {boolean} the need to wait for the warmup
   */
  needsToWaitWarmup(doctype) {
    if (
      this.doctypesReplicationOptions &&
      this.doctypesReplicationOptions[doctype] &&
      this.doctypesReplicationOptions[doctype].warmupQueries
    ) {
      return !this.pouches.areQueriesWarmedUp(
        doctype,
        this.doctypesReplicationOptions[doctype].warmupQueries
      )
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
        fields,
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

  createDocument(mutation) {
    return this.dbMethod('post', mutation)
  }

  async updateDocument(mutation) {
    return this.dbMethod('put', mutation)
  }

  async deleteDocument(mutation) {
    return this.dbMethod('remove', mutation)
  }

  async dbMethod(method, mutation) {
    const doctype = getDoctypeFromOperation(mutation)
    const { document } = mutation
    const db = this.getPouch(doctype)
    const res = await db[method](sanitized(document))
    if (res.ok) {
      return parseMutationResult(document, res)
    } else {
      throw new Error('Coud not apply mutation')
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
