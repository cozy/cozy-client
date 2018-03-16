import {
  MutationTypes,
  CozyLink,
  getDoctypeFromOperation
} from 'cozy-client'
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import mapValues from 'lodash/mapValues'
import fromPairs from 'lodash/fromPairs'
import omit from 'lodash/omit'

PouchDB.plugin(PouchDBFind)

const pipe = fn => res => {
  try {
    fn(res)
  } catch (e) {}
  return res
}

const pouchResToJSONAPI = (res, isArray) => {
  if (isArray) {
    return {
      data: res.rows
    }
  } else {
    return {
      data: res
    }
  }
}

const createPouches = doctypes => {
  return fromPairs(doctypes.map(
    doctype => [doctype, {
      db: new PouchDB(doctype)
    }]
  ))
}

const sanitized = doc => omit(doc, '_type')

const doNothing = () => {}

/**
 * Link to be passed to cozy-client to support CouchDB.
 * It instantiates PouchDB collections for each doctype
 * that it supports and knows how to respond to queries
 * and mutations.
 */
export default class PouchLink extends CozyLink {
  constructor({
    doctypes,
    client,
    initialSync
  }) {
    super()
    this.doctypes = doctypes
    this.client = client
    this.pouches = createPouches(this.doctypes)
    if (initialSync) {
      this.syncAll()
    }
  }

  getAllDBs () {
    return Object.values(this.pouches).map(x => x.db)
  }

  resetAllDBs () {
    return Promise.all(this.getAllDBs().map(db => db.destroy()))
  }

  getDBInfo (doctype) {
    const dbInfo = this.pouches[doctype]
    if (!dbInfo) {
      throw new Error(`${doctype}" not supported by cozy-pouch-link instance`)
    }
    return dbInfo
  }

  getDB (doctype) {
    return this.getDBInfo(doctype).db
  }

  syncOne (doctype) {
    return new Promise(resolve => {
      const info = this.getDBInfo()
      if (info.syncing) {
        return resolve(info.syncing)
      } else {
        const replication = db.replicate.from(this.getReplicationUrl(doctype))
        info.syncing = replication
          .on('complete', () => {
            info.syncing = null
          })
        resolve(info.syncing)
      }
    })
  }

  syncAll () {
    return Promise.all(this.doctypes.map(doctype => this.syncOne(doctype)))
      .then(pipe(_ => this.synced = true ))
  }

  async getReplicationUrl(doctype) {
    const client = this.client
    const credentials = await client.authorize()
    const basic = credentials.token.toBasicAuth()
    return (client._url + '/data/' + doctype).replace('//', `//${basic}`)
  }

  supportsOperation (operation) {
    const impactedDoctype = getDoctypeFromOperation(operation)
    return !!this.pouches[impactedDoctype]
  }

  request(operation, result=null, forward=doNothing) {
    if (!this.synced) {
      return forward()
    }

    // Forwards if doctype not supported
    if (!this.supportsOperation(operation)) {
      return forward()
    }

    if (operation.mutationType) {
      return this.executeMutation(operation)
    } else {
      return this.executeQuery(operation)
    }
  }

  async executeQuery({
    doctype,
    selector,
    id,
    referenced,
    ...options
  }) {
    const db = this.getDB(doctype)
    const res = await db.allDocs({
      include_docs: true
    })
    return pouchResToJSONAPI(res, true)
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
      case MutationTypes.UPLOAD_FILE:
        return forward()
      default:
        throw new Error(`Unknown mutation type: ${mutationType}`)
    }
    return pouchResToJSONAPI(pouchRes)
  }

  createDocument(mutation) {
    const doctype = getDoctypeFromOperation(mutation)
    const { document } = mutation
    const db = this.getDB(doctype)
    return db.post(sanitized(document))
      .then(res => {
        return {...document, ...omit(res, 'ok')}
      })
  }

  updateDocument(mutation) {
    const doctype = getDoctypeFromOperation(mutation)
    const { document } = mutation
    const db = this.getDB(doctype)
    return db.put(sanitized(document))
      .then(res => {
        return {...document, ...omit(res, 'ok')}
      })
  }

  deleteDocument(mutation) {
    const doctype = getDoctypeFromOperation(mutation)
    const { document } = mutation
    const db = this.getDB(doctype)
    return db.remove(sanitized(document))
      .then(res => {
        return {...document, ...omit(res, 'ok')}
      })
  }
}
