import { normalizeDoc } from '../../jsonapi'

const MANGO_TO_SQL_OP = {
  $eq: '=',
  $ne: '!=',
  $gt: '>',
  $gte: '>=',
  $lt: '<',
  $lte: '<=',
  $in: 'IN',
  $nin: 'NOT IN',
  $exists: 'IS'
}

const extractRevPrefix = rev => {
  if (!rev) {
    return 0
  }
  const prefixStr = rev.split('-')[0]
  return prefixStr ? parseInt(prefixStr) : 0
}

export const keepDocWitHighestRev = docs => {
  if (!docs || docs.length < 1) {
    return null
  }
  let highestDocRev = {
    doc: docs[0],
    revPrefix: extractRevPrefix(docs[0]._rev)
  }
  for (let i = 0; i < docs.length; i++) {
    const revPrefix = extractRevPrefix(docs[i]._rev)
    if (revPrefix > highestDocRev.revPrefix) {
      highestDocRev = { doc: docs[i], revPrefix }
    }
  }
  return highestDocRev.doc
}

export const parseResults = (
  client,
  result,
  doctype,
  { isSingleDoc = false, skip = 0, limit = -1 } = {}
) => {
  let parsedResults = []

  for (let i = 0; i < result.rows.length; i++) {
    const item = result.rows.item(i)
    const doc = JSON.parse(item['data'])
    doc._id = item.doc_id
    doc._rev = item.rev
    doc._type = doctype
    normalizeDoc(client, doctype, doc)
    parsedResults.push(doc)
  }
  if (parsedResults.length === 0) {
    return { data: [] }
  }
  if (isSingleDoc) {
    if (parsedResults.length > 1) {
      const doc = keepDocWitHighestRev(parsedResults)
      return { data: doc }
    }
    return { data: parsedResults[0] }
  }
  // XXX - Ideally we should have the total number of rows in the database to have a reliable
  // next parameter, but we prefer to avoid this computation for performances.
  // So let's rely on the total number of returned rows - if next is true, the last paginated
  // query should have less results than the limit, thanks to the offset
  const next = limit ? parsedResults.length >= limit : false
  return {
    data: parsedResults,
    meta: { count: parsedResults.length },
    skip,
    next
  }
}

const parseCondition = (field, condition) => {
  const conditions = []

  const sqlField = transformMangoFieldInJSONSQL(field)
  if (typeof condition === 'object' && !Array.isArray(condition)) {
    for (const operator in condition) {
      let sqlOp = MANGO_TO_SQL_OP[operator]

      if (operator === '$in' || operator === '$nin') {
        const values = condition[operator]
          .map(v => (typeof v === 'string' ? `'${v}'` : v))
          .join(', ')
        conditions.push(`${sqlField} ${sqlOp} (${values})`)
      } else if (operator === '$exists') {
        const value = condition[operator]
        if (value) {
          sqlOp += ' NOT NULL'
        } else {
          sqlOp += ' NULL'
        }
        conditions.push(`${sqlField} ${sqlOp}`)
      } else {
        const value =
          typeof condition[operator] === 'string'
            ? `'${condition[operator]}'`
            : condition[operator]
        if (operator === '$gt' && value === null) {
          // Special case for $gt: null conditions
          conditions.push(`${sqlField} IS NOT NULL`)
        } else {
          conditions.push(`${sqlField} ${sqlOp} ${value}`)
        }
      }
    }
  } else {
    const value = typeof condition === 'string' ? `'${condition}'` : condition
    conditions.push(`${sqlField} = ${value}`)
  }

  return conditions.join(' AND ')
}

const parseLogicalOperator = (operator, conditionsArray) => {
  const sqlOperator = operator === '$and' ? 'AND' : 'OR'
  const parsedConditions = conditionsArray.map(
    cond => `(${mangoSelectorToSQL(cond).replace(/^WHERE /, '')})`
  )
  return parsedConditions.join(` ${sqlOperator} `)
}

const transformMangoFieldInJSONSQL = (field, columnName = 'data') => {
  return `json_extract(${columnName}, '$.${field}')`
}

export const mangoSelectorToSQL = selector => {
  const conditions = []

  for (const key in selector) {
    if (key === '$and' || key === '$or') {
      conditions.push(parseLogicalOperator(key, selector[key]))
    } else {
      conditions.push(parseCondition(key, selector[key]))
    }
  }

  return conditions.length > 0 ? `${conditions.join(' AND ')}` : ''
}

export const makeWhereClause = selector => {
  let baseWhere = 'DELETED = 0'
  if (!selector) {
    return baseWhere
  }
  const mangoWhere = mangoSelectorToSQL(selector)
  baseWhere += ` AND ${mangoWhere}`
  return baseWhere
}

export const makeSortClause = mangoSortBy => {
  if (!mangoSortBy || !Array.isArray(mangoSortBy) || mangoSortBy.length < 1) {
    return null
  }
  const firstSortEntry = mangoSortBy[0]
  const sortOrder = Object.values(firstSortEntry)[0].toUpperCase()
  const sortFields = mangoSortBy
    .map(sort => {
      const attribute = Object.keys(sort)[0]
      return `json_extract(data, '$.${attribute}')`
    })
    .join(', ')
  const sortClause = `${sortFields} ${sortOrder}`
  return sortClause
}

export const makeSQLQueryFromMango = ({
  selector,
  sort,
  indexName,
  limit = -1,
  skip = 0
}) => {
  const whereClause = makeWhereClause(selector)
  const sortClause = makeSortClause(sort)

  let sql = [
    `SELECT json AS data, doc_id, rev`,
    `FROM 'by-sequence' INDEXED BY ${indexName}`,
    `WHERE ${whereClause}`
  ].join(' ')

  if (skip > 0) {
    sql += ` OFFSET ${skip}`
  }
  if (sortClause) {
    sql += ` ORDER BY ${sortClause}`
  }
  sql += ` LIMIT ${limit}`

  sql += ';'
  return sql
}

export const makeSQLQueryForId = id => {
  const sql = [
    `SELECT json AS data, doc_id, rev`,
    `FROM 'by-sequence'`,
    `WHERE doc_id="${id}" AND deleted=0`,
    `;`
  ].join(' ')
  return sql
}

export const makeSQLQueryForIds = ids => {
  const doc_ids = ids.join(',')
  const sql = `
    SELECT json AS data, doc_id, rev
    FROM 'by-sequence'
    WHERE doc_id IN ("${doc_ids}") AND deleted = 0;
  `
  return sql
}

export const makeSQLQueryAll = ({ limit = -1, skip = 0 } = {}) => {
  let sql = [
    `SELECT json AS data, doc_id, rev`,
    `FROM 'by-sequence'`,
    `WHERE deleted=0`,
    `LIMIT ${limit}`
  ].join(' ')
  if (skip > 0) {
    sql += ` OFFSET ${skip}`
  }
  sql += ';'
  return sql
}

export const makeSQLDropIndex = indexName => {
  return `DROP INDEX IF EXISTS '${indexName}';`
}

export const makeSQLCreateMangoIndex = (
  indexName,
  fieldsToIndex,
  { partialFilter }
) => {
  const jsonAttributes = fieldsToIndex.map(
    field => `json_extract(json, '$.${field}')`
  )
  const jsonIndex = jsonAttributes.join(',')

  let sql = `
    CREATE INDEX IF NOT EXISTS '${indexName}'
    ON 'by-sequence'
    (${jsonIndex})
  `
  if (partialFilter) {
    const whereClause = makeWhereClause(partialFilter)
    sql += ` WHERE ${whereClause}`
  }
  sql += ';'
  return sql
}

export const makeSQLCreateDocIDIndex = () => {
  // This index is useful for docid queries
  const sql = `
    CREATE UNIQUE INDEX IF NOT EXISTS 'by_docid_and_deleted'
    ON 'by-sequence'
    (doc_id, deleted);
  `
  return sql
}

export const makeSQLCreateDeletedIndex = () => {
  // This index is useful for allDocs queries
  const sql = `
    CREATE INDEX IF NOT EXISTS 'by_deleted'
    ON 'by-sequence'
    (deleted);
  `
  return sql
}

export const createMangoIndex = async (
  db,
  indexName,
  fieldsToIndex,
  { partialFilter }
) => {
  const sql = makeSQLCreateMangoIndex(indexName, fieldsToIndex, {
    partialFilter
  })
  const result = await executeSQL(db, sql)
  return result
}

export const deleteIndex = async (db, indexName) => {
  const sql = makeSQLDropIndex(indexName)
  await executeSQL(db, sql)
}

export const executeSQL = async (db, sql) => {
  const result = await new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeAsync(sql)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  })
  return result
}
