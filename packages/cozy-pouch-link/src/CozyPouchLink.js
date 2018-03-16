import {
  MutationTypes,
  CozyLink
} from 'cozy-client'
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import mapValues from 'lodash/mapValues'
import fromPairs from 'lodash/fromPairs'

PouchDB.plugin(PouchDBFind)

const pipe = fn => res => {
  try {
    fn(res)
  } catch (e) {}
  return res
}

const pouchResToJSONAPI = res => {
  return {
    data: res.rows
  }
}

const createPouches = doctypes => {
  return fromPairs(doctypes.map(
    doctype => [doctype, {
      db: new PouchDB(doctype)
    }]
  ))
}



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

  request(operation, result, forward) {
    if (!this.synced) {
      console.log('not synced: forwarding...')
      return forward()
    }

    // Forwards if doctype not supported
    console.log(this.doctypes, operation.doctype)
    if (!this.pouches[operation.doctype]) {
      console.log('doctype not supported: forwarding...')
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
    console.log('ouaich', res)
    return pouchResToJSONAPI(res)
  }

  executeMutation({
    mutationType,
    ...props
  }) {
    // TODO
  }
}
