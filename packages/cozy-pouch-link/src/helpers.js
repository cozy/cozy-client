import startsWith from 'lodash/startsWith'

//import pouchWorker from './pouchWorker.js'
//const worker = new PouchWorker(PouchWorker)
import PouchWorker from 'worker-loader!./pouchWorker.js'
const helpers = {}

const worker = PouchWorker()

// https://github.com/pouchdb/pouchdb/issues/7011
const ADAPTERS_WITH_LIMIT_BUG = ['cordova-sqlite', 'websql']

helpers.isAdapterBugged = adapterName => {
  return ADAPTERS_WITH_LIMIT_BUG.includes(adapterName)
}

helpers.withoutDesignDocuments = res => {
  const rows = res.rows.filter(doc => !startsWith(doc.id, '_design/'))

  return {
    ...res,
    rows,
    total_rows: rows.length
  }
}

helpers.queryPouch = (db, query, options) =>
  new Promise((resolve, reject) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = ({ data }) => {
      channel.port1.close()
      if (data.error) {
        reject(data.error)
      } else {
        console.log('data res : ', data.result)
        resolve(data.result)
      }
    }
    const pouchOptions = {
      adapter: db.adapter
    }
    worker.postMessage(
      {
        dbName: db.name,
        pouchOptions,
        query,
        options
      },
      [channel.port2]
    )
  })

helpers.createIndex = async (db, index) => {
  return helpers.queryPouch(db, 'createIndex', index)
}

helpers.allDocs = async (db, options = {}) => {
  return helpers.queryPouch(db, 'allDocs', options)
}
helpers.find = async (db, options = {}) => {
  return helpers.queryPouch(db, 'find', options)
}

helpers.isDesignDocument = doc => startsWith(doc._id, '_design')

helpers.isDeletedDocument = doc => doc._deleted

export default helpers
