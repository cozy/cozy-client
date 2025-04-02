import DatabaseQueryEngine from '../dbInterface'

// @ts-ignore
import { open } from '@op-engineering/op-sqlite'

import {
  createMangoIndex,
  makeSQLCreateDeletedIndex,
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
import { isMissingSQLiteIndexError } from '../../errors'
import logger from '../../logger'

export default class SQLiteQueryEngine extends DatabaseQueryEngine {
  constructor(pouchManager, doctype) {
    super()
    this.db = null
    this.client = pouchManager?.client
    this.doctype = doctype
  }

  openDB(dbName) {
    const fileDbName = `${dbName}.sqlite`
    try {
      this.db = open({ name: fileDbName })
      // Create index at db opening if needed
      const docIdIndexSql = makeSQLCreateDocIDIndex()
      const deletedIndexSql = makeSQLCreateDeletedIndex()
      executeSQL(this.db, docIdIndexSql)
      executeSQL(this.db, deletedIndexSql)
    } catch (err) {
      logger.error(err)
    }
    return this.db
  }

  async allDocs({ limit = -1, skip = 0 } = {}) {
    try {
      const sql = makeSQLQueryAll({ limit, skip })
      const result = await executeSQL(this.db, sql)
      const docs = parseResults(this.client, result, this.doctype, {
        limit,
        skip
      })
      return docs
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  async getById(id) {
    try {
      const sql = makeSQLQueryForId(id)
      const result = await executeSQL(this.db, sql)
      const doc = parseResults(this.client, result, this.doctype, {
        isSingleDoc: true
      })
      return doc
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  async getByIds(ids) {
    try {
      const sql = makeSQLQueryForIds(ids)
      const result = await executeSQL(this.db, sql)
      const docs = parseResults(this.client, result, this.doctype)
      return docs
    } catch (err) {
      logger.error(err)
      return null
    }
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
    const indexName = getIndexName({
      selector,
      sort,
      partialFilter,
      indexedFields
    })
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
      if (isMissingSQLiteIndexError(err)) {
        await createMangoIndex(this.db, indexName, indexedFields, {
          partialFilter
        })
        result = await executeSQL(this.db, sql)
      } else {
        logger.error(err)
        return null
      }
    }

    const docs = parseResults(this.client, result, this.doctype, {
      skip,
      limit
    })
    return docs
  }
}
