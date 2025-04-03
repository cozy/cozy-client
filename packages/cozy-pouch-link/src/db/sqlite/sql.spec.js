import {
  mangoSelectorToSQL,
  makeWhereClause,
  makeSortClause,
  makeSQLQueryFromMango,
  keepDocWitHighestRev,
  makeSQLQueryAll,
  parseResults
} from './sql'

describe('mangoSelectorToSQL', () => {
  it('should return empty string for empty selector', () => {
    const selector = {}
    expect(mangoSelectorToSQL(selector)).toBe('')
  })

  it('should handle implicit equality selector', () => {
    const selector = { status: 'active' }
    expect(mangoSelectorToSQL(selector)).toBe(
      "json_extract(data, '$.status') = 'active'"
    )
  })

  it('should handle explicit $eq operator', () => {
    const selector = { status: { $eq: 'active' } }
    expect(mangoSelectorToSQL(selector)).toBe(
      "json_extract(data, '$.status') = 'active'"
    )
  })

  it('should handle $neq operator', () => {
    const selector = { status: { $ne: 'active' } }
    expect(mangoSelectorToSQL(selector)).toBe(
      "json_extract(data, '$.status') != 'active'"
    )
  })

  it('should handle $in and $nin operator', () => {
    const selector = {
      status: { $in: ['active', 'pending'] },
      other_status: { $nin: ['maintenance', 'failing'] }
    }
    expect(mangoSelectorToSQL(selector)).toBe(
      "json_extract(data, '$.status') IN ('active', 'pending') AND json_extract(data, '$.other_status') NOT IN ('maintenance', 'failing')"
    )
  })

  it('should handle $exists operator', () => {
    const selector1 = { status: { $exists: true } }
    expect(mangoSelectorToSQL(selector1)).toBe(
      "json_extract(data, '$.status') IS NOT NULL"
    )

    const selector2 = { status: { $exists: false } }
    expect(mangoSelectorToSQL(selector2)).toBe(
      "json_extract(data, '$.status') IS NULL"
    )
  })

  it('should handle implicit $and operator', () => {
    const selector = {
      age: 18,
      status: 'active',
      date: '2025-01-01'
    }
    expect(mangoSelectorToSQL(selector)).toBe(
      "json_extract(data, '$.age') = 18 AND json_extract(data, '$.status') = 'active' AND json_extract(data, '$.date') = '2025-01-01'"
    )
  })

  it('should handle range operators', () => {
    const selector1 = { date: { $gt: '2025-01-01', $lt: '2026-01-01' } }
    expect(mangoSelectorToSQL(selector1)).toBe(
      "json_extract(data, '$.date') > '2025-01-01' AND json_extract(data, '$.date') < '2026-01-01'"
    )

    const selector2 = {
      startDate: { $gte: '2025-01-01' },
      endDate: { $lte: '2026-01-01' }
    }
    expect(mangoSelectorToSQL(selector2)).toBe(
      "json_extract(data, '$.startDate') >= '2025-01-01' AND json_extract(data, '$.endDate') <= '2026-01-01'"
    )
  })

  it('should handle $gt: null cases', () => {
    const selector = { date: { $gt: null } }
    expect(mangoSelectorToSQL(selector)).toBe(
      "json_extract(data, '$.date') IS NOT NULL"
    )
  })

  it('should handle explicit $and operator', () => {
    const selector = { $and: [{ age: { $gte: 18 } }, { status: 'active' }] }
    expect(mangoSelectorToSQL(selector)).toBe(
      "(json_extract(data, '$.age') >= 18) AND (json_extract(data, '$.status') = 'active')"
    )
  })

  it('should handle explicit $or operator', () => {
    const selector = { $or: [{ status: 'active' }, { status: 'pending' }] }
    expect(mangoSelectorToSQL(selector)).toBe(
      "(json_extract(data, '$.status') = 'active') OR (json_extract(data, '$.status') = 'pending')"
    )
  })
})

describe('makeWhereClause', () => {
  it('should return only deleted clause when no mango selector', () => {
    expect(makeWhereClause(undefined)).toEqual('DELETED = 0')
  })

  it('should return deleted and mango clauses when there is a mango selector', () => {
    const selector = { status: 'active' }
    expect(makeWhereClause(selector)).toEqual(
      "DELETED = 0 AND json_extract(data, '$.status') = 'active'"
    )
  })
})

describe('makeSortClause', () => {
  it('should return null when no mango sort', () => {
    const sortBy = undefined
    expect(makeSortClause(sortBy)).toBe(null)
  })

  it('should return correct order by, with one sorting attribute', () => {
    const sortBy = [{ date: 'asc' }]
    expect(makeSortClause(sortBy)).toEqual("json_extract(data, '$.date') ASC")
  })

  it('should return correct order by, with multiple sorting attribute', () => {
    const sortBy = [{ date: 'asc' }, { name: 'asc' }, { type: 'asc' }]
    expect(makeSortClause(sortBy)).toEqual(
      "json_extract(data, '$.date'), json_extract(data, '$.name'), json_extract(data, '$.type') ASC"
    )
  })

  it('should deal with ascending and descending order', () => {
    const sortBy1 = [{ date: 'asc' }]
    expect(makeSortClause(sortBy1)).toEqual("json_extract(data, '$.date') ASC")
    const sortBy2 = [{ date: 'desc' }]
    expect(makeSortClause(sortBy2)).toEqual("json_extract(data, '$.date') DESC")
  })
})

describe('makeSQLQueryFromMango', () => {
  it('should return a correct SQL query with no sort', () => {
    const selector = { date: { $gt: '2025-01-01' } }
    const indexName = 'by_name'
    const limit = 100
    const sql = makeSQLQueryFromMango({ selector, indexName, limit })

    const expectedSql = [
      `SELECT json AS data, doc_id, rev`,
      `FROM 'by-sequence' INDEXED BY by_name`,
      `WHERE DELETED = 0 AND json_extract(data, '$.date') > '2025-01-01'`,
      `LIMIT 100;`
    ].join(' ')
    expect(sql).toEqual(expectedSql)
  })

  it('should return a correct SQL query with sort', () => {
    const selector = { date: { $gt: '2025-01-01' } }
    const sort = [{ date: 'asc' }]
    const indexName = 'by_name'
    const limit = 100
    const sql = makeSQLQueryFromMango({ selector, sort, indexName, limit })

    const expectedSql = [
      `SELECT json AS data, doc_id, rev`,
      `FROM 'by-sequence' INDEXED BY by_name`,
      `WHERE DELETED = 0 AND json_extract(data, '$.date') > '2025-01-01'`,
      `ORDER BY json_extract(data, '$.date') ASC`,
      `LIMIT 100;`
    ].join(' ')
    expect(sql).toEqual(expectedSql)
  })

  it('should handle the skip and limit', () => {
    const selector = { date: { $gt: '2025-01-01' } }
    const indexName = 'by_name'
    const limit = 200
    const skip = 100
    const sql = makeSQLQueryFromMango({
      selector,
      indexName,
      limit,
      skip
    })

    const expectedSql = [
      `SELECT json AS data, doc_id, rev`,
      `FROM 'by-sequence' INDEXED BY by_name`,
      `WHERE DELETED = 0 AND json_extract(data, '$.date') > '2025-01-01'`,
      `OFFSET 100`,
      `LIMIT 200;`
    ].join(' ')
    expect(sql).toEqual(expectedSql)
  })
})

describe('makeSQLQueryAll', () => {
  it('should return a correct sql query to get all docs', () => {
    const sql = makeSQLQueryAll()
    const expectedSql = [
      `SELECT json AS data, doc_id, rev`,
      `FROM 'by-sequence'`,
      `WHERE deleted=0`,
      `LIMIT -1;`
    ].join(' ')
    expect(sql).toEqual(expectedSql)
  })

  it('should handle limit and skip', () => {
    const sql = makeSQLQueryAll({ limit: 10, skip: 100 })
    const expectedSql = [
      `SELECT json AS data, doc_id, rev`,
      `FROM 'by-sequence'`,
      `WHERE deleted=0`,
      `LIMIT 10`,
      `OFFSET 100;`
    ].join(' ')
    expect(sql).toEqual(expectedSql)
  })
})

describe('keepDocWitHighestRev', () => {
  it('should return null if no docs', () => {
    expect(keepDocWitHighestRev([])).toBeNull()
    expect(keepDocWitHighestRev(undefined)).toBeNull()
  })

  it('should return the single document when only one is provided', () => {
    const doc = { _rev: '1-a', name: 'Single Doc' }
    const docs = [doc]
    expect(keepDocWitHighestRev(docs)).toBe(doc)
  })

  it('should return the document with the highest revision prefix', () => {
    const docs = [
      { _rev: '1-a', name: 'Doc 1' },
      { _rev: '3-c', name: 'Doc 3' },
      { _rev: '2-b', name: 'Doc 2' }
    ]
    expect(keepDocWitHighestRev(docs)).toEqual(docs[1])
  })

  it('should work correctly even if the documents are unsorted', () => {
    const docs = [
      { _rev: '5-zzz', name: 'Doc 5' },
      { _rev: '2-aaa', name: 'Doc 2' },
      { _rev: '10-xxx', name: 'Doc 10' },
      { _rev: '7-bbb', name: 'Doc 7' }
    ]
    expect(keepDocWitHighestRev(docs)).toEqual(docs[2])
  })
})

describe('parseResults', () => {
  const client = {}
  const doctype = 'testdoctype'

  it('should parse results correctly for multiple documents', () => {
    const result = {
      rows: {
        length: 2,
        item: jest.fn().mockImplementation(i => ({
          data: JSON.stringify({ name: `doc${i}` }),
          doc_id: `id${i}`,
          rev: `rev${i}`
        }))
      }
    }

    const parsed = parseResults(client, result, doctype)

    expect(parsed.data.length).toBe(2)
    expect(parsed.meta.count).toBe(2)
    expect(parsed.skip).toBe(0)
    expect(parsed.next).toBe(false)

    expect(parsed.data[0]).toEqual({
      _id: 'id0',
      id: 'id0',
      _rev: 'rev0',
      _type: doctype,
      name: 'doc0'
    })
  })

  it('should handle isSingleDoc correctly with multiple docs', () => {
    const result = {
      rows: {
        length: 2,
        item: jest.fn().mockImplementation(i => ({
          data: JSON.stringify({ name: `doc${i}` }),
          doc_id: `id${i}`,
          rev: `rev${i}`
        }))
      }
    }

    const parsed = parseResults(client, result, doctype, { isSingleDoc: true })

    expect(parsed.data).toEqual({
      _id: 'id0',
      id: 'id0',
      _rev: 'rev0',
      _type: doctype,
      name: 'doc0'
    })
  })

  it('should return empty data array when no rows are present', () => {
    const result = { rows: { length: 0, item: jest.fn() } }

    const parsed = parseResults(client, result, doctype)

    expect(parsed).toEqual({ data: [] })
  })

  it('should set next=true when limit matches parsed length', () => {
    const result = {
      rows: {
        length: 3,
        item: jest.fn().mockImplementation(i => ({
          data: JSON.stringify({ name: `doc${i}` }),
          doc_id: `id${i}`,
          rev: `rev${i}`
        }))
      }
    }

    const parsed = parseResults(client, result, doctype, { limit: 3 })

    expect(parsed.next).toBe(true)
    expect(parsed.data.length).toBe(3)
  })



  it('should handle single document correctly', () => {
    const result = {
      rows: {
        length: 1,
        item: jest.fn().mockReturnValue({
          data: JSON.stringify({ name: 'single_doc' }),
          doc_id: 'single_id',
          rev: 'single_rev'
        })
      }
    }

    const parsed = parseResults(client, result, doctype, { isSingleDoc: true })

    expect(parsed.data).toEqual({
      _id: 'single_id',
      id: 'single_id',
      _rev: 'single_rev',
      _type: doctype,
      name: 'single_doc'
    })
  })


})
