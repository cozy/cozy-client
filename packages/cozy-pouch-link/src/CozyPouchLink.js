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
  constructor(opts = {}) {
    const options = defaults({}, opts, DEFAULT_OPTIONS)
    super(options)
    const { doctypes } = options
    this.options = options
    if (!doctypes) {
      throw new Error(
        "PouchLink must be instantiated with doctypes it manages. Ex: ['io.cozy.bills']"
      )
    }
    this.doctypes = doctypes
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
      onError: err => this.onSyncError(err),
      onSync: this.handleOnSync.bind(this),
      prefix
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
  }

  /**
   * User of the link can call this to start ongoing replications.
   * Typically, it can be used when the application regains focus.
   *
   * @public
   * @return {void}
   */
  startReplication() {
    this.pouches.startReplicationLoop()
    if (this.options.onStartReplication) {
      this.options.onStartReplication.apply(this)
    }
  }

  /**
   * User of the link can call this to stop ongoing replications.
   * Typically, it can be used when the applications loses focus.
   *
   * @public
   * @return {void}
   */
  stopReplication() {
    this.pouches.stopReplicationLoop()
    if (this.options.onStopReplication) {
      this.options.onStopReplication.apply(this)
    }
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

  hasIndex(name) {
    return Boolean(this.indexes[name])
  }

  async ensureIndex(doctype, query) {
    const fields = getIndexFields(query)
    const name = getIndexNameFromFields(fields)
    const absName = `${doctype}/${name}`
    const db = this.pouches.getPouch(doctype)
    if (this.indexes[absName]) {
      return this.indexes[absName]
    } else {
      const index = await db.createIndex({
        index: {
          fields: fields
        }
      })
      this.indexes[absName] = index
      return index
    }
  }

  async executeQuery({ doctype, selector, sort, fields, limit, id }) {
    const db = this.getPouch(doctype)
    let res, withRows
    if (id) {
      res = await db.get(id)
      withRows = false
    } else if (!selector && !fields && !sort) {
      res = await allDocs(db, { include_docs: true, limit })
      res = withoutDesignDocuments(res)
      withRows = true
    } else {
      const findOpts = {
        sort,
        selector,
        fields,
        limit
      }
      await this.ensureIndex(doctype, findOpts)
      res = await find(db, findOpts)
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
