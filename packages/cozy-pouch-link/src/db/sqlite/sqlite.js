import {
  makeSQLQueryAll,
  makeSQLQueryForId,
  makeSQLQueryForIds,
  makeSQLQueryFromMango,
  executeSQL,
  createIndex,
  deleteIndex
} from './sql'

import { open } from '@op-engineering/op-sqlite'

export const openDB = (url, doctype) => {
  const dbName = `${url}_${doctype}.sqlite`
  console.log('🐶 openDB locally : ', dbName)
  try {
    const db = open({ name: dbName })
    return db
  } catch (err) {
    throw err
  }
}

const parseSqliteResults = (result, { isSingleDoc = false } = {}) => {
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

export const queryDocById = async (db, id) => {
  const sql = makeSQLQueryForId(id)
  const result = await executeSQL(db, sql)
  const doc = parseSqliteResults(result, { isSingleDoc: true })
  return doc
}

export const queryDocsByIds = async (db, ids) => {
  const sql = makeSQLQueryForIds(ids)
  const result = await executeSQL(db, sql)
  const docs = parseSqliteResults(result)
  return docs
}

export const queryAllDocs = async (db, { limit = null } = {}) => {
  const sql = makeSQLQueryAll(limit)
  const result = await executeSQL(db, sql)
  const docs = parseSqliteResults(result)

  return docs
}

export const queryWithSelector = async (
  db,
  { selector, sort, indexName, fieldsToIndex, limit = 100 },
  { recreate_index = false } = {}
) => {
  const sql = makeSQLQueryFromMango({ selector, sort, indexName, limit })
  let result
  if (recreate_index) {
    await deleteIndex(db, indexName)
  }
  try {
    result = await executeSQL(db, sql)
  } catch (err) {
    // retry with index creation
    // TODO: catch correct err
    console.log('err : ', err)
    await createIndex(db, indexName, fieldsToIndex)
    result = await executeSQL(db, sql)
  }

  const docs = parseSqliteResults(result)
  console.log('🌈 n docs sqlite', result.rows.length)
  return docs
}
