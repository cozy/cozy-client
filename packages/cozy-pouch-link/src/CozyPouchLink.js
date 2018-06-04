import { MutationTypes, CozyLink, getDoctypeFromOperation } from 'cozy-client'
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import mapValues from 'lodash/mapValues'
import fromPairs from 'lodash/fromPairs'
import omit from 'lodash/omit'
import toPairs from 'lodash/toPairs'
import { getIndexNameFromFields, getIndexFields } from './mango'

PouchDB.plugin(PouchDBFind)

const pipe = fn => res => {
  try {
    fn(res)
  } catch (e) {
    console.warn('Error during pipe', e)
  }
  return res
}

const ensureHasBothIds = obj => {
  if (!obj._id && obj.id) {
    obj._id = obj.id
  }
  if (!obj._id && obj.id) {
    obj.id = obj._id
  }
  return obj
}

const addDoctype = (arr, doctype) => arr.map(x => ({ ...x, _type: doctype }))

const pouchResToJSONAPI = (res, isArray, doctype) => {
  if (isArray) {
    const docs = res.rows || res.docs
    const offset = res.offset || 0
    return {
      data: addDoctype(docs, doctype).map(ensureHasBothIds),
      meta: { count: docs.length },
      skip: offset,
      next: offset + docs.length <= res.total_rows
    }
  } else {
    return {
      data: ensureHasBothIds(res)
    }
  }
}

const createPouches = doctypes => {
  return fromPairs(
    doctypes.map(doctype => [
      doctype,
      {
        db: new PouchDB(doctype)
      }
    ])
  )
}

const sanitized = doc => omit(doc, '_type')

const parseMutationResult = (original, res) => {
  return { ...original, ...omit(res, 'ok') }
}

const doNothing = () => {}

/**
 * Link to be passed to cozy-client to support CouchDB.
 * It instantiates PouchDB collections for each doctype
 * that it supports and knows how to respond to queries
 * and mutations.
 */
export default class PouchLink extends CozyLink {
  constructor({ doctypes, client, initialSync } = {}) {
    if (!doctypes) {
      throw new Error(
        "PouchLink must be instantiated with doctypes it manages. Ex: ['io.cozy.bills']"
      )
    }
    if (!client) {
      throw new Error('PouchLink must be instantiated with a client.')
    }
    super()
    this.doctypes = doctypes
    this.client = client
    this.pouches = createPouches(this.doctypes)
    this.indexes = {}
    if (initialSync) {
      this.syncAll()
    }
  }

  getAllDBs() {
    return Object.values(this.pouches).map(x => x.db)
  }

  resetAllDBs() {
    return Promise.all(this.getAllDBs().map(db => db.destroy()))
  }

  getDBInfo(doctype) {
    const dbInfo = this.pouches[doctype]
    if (!dbInfo) {
      throw new Error(`${doctype} not supported by cozy-pouch-link instance`)
    }
    return dbInfo
  }

  getDB(doctype) {
    return this.getDBInfo(doctype).db
  }

  syncOne(doctype) {
    return new Promise((resolve, reject) => {
      const info = this.getDBInfo(doctype)
      if (info.syncing) {
        return resolve(info.syncing)
      } else {
        const replication = info.db.replicate.from(
          this.getReplicationUrl(doctype),
          {
            batch_size: 1000 // we have mostly small documents
          }
        )
        replication.on('error', err => {
          console.warn('Error while syncing', err)
          reject('Error while syncing')
        })
        info.syncing = replication.on('complete', () => {
          info.syncing = null
          resolve()
        })
      }
    })
  }

  syncAll() {
    return Promise.all(
      this.doctypes.map(doctype => this.syncOne(doctype))
    ).then(pipe(() => this.onSync()))
  }

  onSync(res) {
    this.synced = true
  }

  getReplicationUrl(doctype) {
    const client = this.client
    const basicAuth = client.token.toBasicAuth()
    return (client.uri + '/data/' + doctype).replace('//', `//${basicAuth}`)
  }

  supportsOperation(operation) {
    const impactedDoctype = getDoctypeFromOperation(operation)
    return !!this.pouches[impactedDoctype]
  }

  request(operation, result = null, forward = doNothing) {
    if (!this.synced) {
      return forward(operation)
    }

    // Forwards if doctype not supported
    if (!this.supportsOperation(operation)) {
      return forward(operation)
    }

    if (operation.mutationType) {
      return this.executeMutation(operation)
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
    const db = this.getDB(doctype)
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

  async executeQuery({
    doctype,
    selector,
    id,
    referenced,
    sort,
    fields,
    limit
  }) {
    const db = this.getDB(doctype)
    let res
    if (!selector && !fields && !sort) {
      res = await db.allDocs({
        include_docs: true
      })
    } else {
      const findOpts = {
        sort,
        selector,
        fields,
        limit
      }
      const index = await this.ensureIndex(doctype, findOpts)
      res = await db.find(findOpts)
    }
    return pouchResToJSONAPI(res, true, doctype)
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
        return forward(mutation, result)
      default:
        throw new Error(`Unknown mutation type: ${mutationType}`)
    }
    return pouchResToJSONAPI(pouchRes, false, getDoctypeFromOperation(mutation))
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
    const db = this.getDB(doctype)
    const res = await db[method](sanitized(document))
    if (res.ok) {
      return parseMutationResult(document, res)
    } else {
      throw new Error('Coud not apply mutation')
    }
  }
}
