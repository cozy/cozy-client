import DatabaseQueryInterface from '../dbInterface'

import { open } from '@op-engineering/op-sqlite'
import { makeSQLQueryAll } from '../sqlite/sql'

class IDBDatabase extends DatabaseQueryInterface {
  constructor() {
    super()
    this.db = null
  }

  openDB(url, doctype) {
    const dbName = `${url}_${doctype}.sqlite`
    console.log('🐶 openDB locally : ', dbName)
    try {
      const db = open({ name: dbName })
      this.db = db
      return db
    } catch (err) {
      throw err
    }
  }

  parseResults(result, { isSingleDoc = false } = {}) {
    let parsedResults = []
    const startParse = performance.now()

    for (let i = 0; i < result.rows.length; i++) {
      const item = result.rows.item(i)
      console.log('item : ', item)
      const doc = JSON.parse(item['data'])
      console.log('doc : ', doc)
      doc._rev = item.rev
      doc._id = item.doc_id
      parsedResults.push(doc)
    }
    const endParse = performance.now()
    console.log(`Parse data took ${endParse - startParse}`)
    if (parsedResults.length === 0) {
      return null
    }
    if (isSingleDoc) {
      return parsedResults[0]
    }
    return parsedResults
  }

  allDocs = async ({ limit = null } = {}) => {
    
  }
}

export default IDBDatabase
