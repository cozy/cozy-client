import DatabaseQueryInterface from '../dbInterface'

import { open } from '@op-engineering/op-sqlite'

import {
  createIndex,
  deleteIndex,
  executeSQL,
  makeSQLCreateDocIDIndex,
  makeSQLQueryAll,
  makeSQLQueryForId,
  makeSQLQueryForIds,
  makeSQLQueryFromMango,
  parseResults
} from './sql'
import { getIndexFields, getIndexName } from '../../mango'
import { isMissingIndexError } from '../../errors'

//TODO: test skip with queryAll
export default class SQLiteQuery extends DatabaseQueryInterface {
  constructor(pouchManager, client, doctype) {
    super()
    this.db = null
    this.client = client
    this.doctype = doctype
  }

  openDB(dbName) {
    const fileDbName = `${dbName}.sqlite`
    try {
      this.db = open({ name: fileDbName })
      // Create index at db opening if needed
      const sql = makeSQLCreateDocIDIndex()
      executeSQL(this.db, sql)
    } catch (err) {
      console.error(err)
    }
    return this.db
  }

  async allDocs({ limit = null, skip = 0 } = {}) {
    try {
      const sql = makeSQLQueryAll({ limit, skip })
      const result = await executeSQL(this.db, sql)
      const docs = parseResults(this.client, result, this.doctype, {
        limit,
        skip
      })
      return docs
    } catch (err) {
      console.log('err : ', err)
      return null
    }
  }

  async getById(id) {
    try {
      console.log('get by id : ', id)
      const sql = makeSQLQueryForId(id)
      console.log('sql by id : ', sql)
      const result = await executeSQL(this.db, sql)
      //console.log(`result by id for ${id}: ${JSON.stringify(result)}`)
      const doc = parseResults(this.client, result, this.doctype, {
        isSingleDoc: true
      })
      return doc
    } catch (err) {
      console.log('err : ', err)
      return null
    }
  }

  async getByIds(ids) {
    const sql = makeSQLQueryForIds(ids)
    const result = await executeSQL(this.db, sql)
    const docs = parseResults(this.client, result, this.doctype)
    return docs
  }

  async find(options) {
    const {
      selector,
      sort,
      partialFilter,
      limit,
      recreateIndex,
      skip
    } = options
    let { indexedFields } = options

    indexedFields = getIndexFields({
      indexedFields,
      selector,
      sort,
      partialFilter
    })
    console.log('indexed fields : ', indexedFields)

    const indexName = getIndexName({
      selector,
      sort,
      partialFilter,
      indexedFields
    })
    console.log('index name : ', indexName)
    const sql = makeSQLQueryFromMango({
      selector,
      sort,
      indexName,
      limit,
      skip
    })
    let result
    if (recreateIndex) {
      await deleteIndex(this.db, indexName)
    }
    try {
      result = await executeSQL(this.db, sql)
    } catch (err) {
      if (isMissingIndexError(err)) {
        await createIndex(this.db, indexName, indexedFields, { partialFilter })
        result = await executeSQL(this.db, sql)
      }
    }

    const docs = parseResults(this.client, result, this.doctype, {
      skip,
      limit
    })
    console.log('🌈 n docs sqlite', result.rows.length)
    return docs
  }
}
