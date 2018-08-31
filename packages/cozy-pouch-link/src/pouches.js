import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
PouchDB.plugin(PouchDBFind)

import fromPairs from 'lodash/fromPairs'

const pouches = {
  create: doctype => {
    return { db: new PouchDB(doctype) }
  },

  createAll: doctypes => {
    return fromPairs(
      doctypes.map(doctype => [doctype, pouches.create(doctype)])
    )
  },

  getInfo: (pouches, doctype) => {
    return pouches[doctype]
  },

  getDB: (pouches, doctype) => {
    return pouches.getInfo(pouches, doctype).db
  }
}

export default pouches
