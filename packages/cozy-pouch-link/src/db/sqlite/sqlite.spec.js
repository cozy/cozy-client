jest.mock('./sql')
import {
  makeSQLQueryFromMango,
  deleteIndex,
  createIndex,
  executeSQL
} from './sql'
import { queryWithSelector } from './sqlite'

const mockSqlQuery = 'SELECT ... FROM ...'
const mockSqlResult = {
  rows: {
    _array: [
      { data: JSON.stringify({ name: 'a' }), doc_id: 1, rev: 1 },
      { data: JSON.stringify({ name: 'b' }), doc_id: 2, rev: 1 }
    ],
    length: 2
  }
}
mockSqlResult.rows.item = idx => mockSqlResult.rows?._array[idx]

const mockParsedDocs = [
  { _id: 1, _rev: 1, name: 'a' },
  { _id: 2, _rev: 1, name: 'b' }
]

describe('queryWithSelector', () => {
  const mockDb = {
    executeAsync: jest.fn().mockResolvedValue(mockSqlResult)
  }

  const params = {
    selector: { name: { $gt: 'aaaa' } },
    sort: [{ name: 'asc' }],
    indexName: 'by_name',
    fieldsToIndex: ['name'],
    limit: 100
  }

  beforeEach(() => {
    //jest.clearAllMocks()
    makeSQLQueryFromMango.mockReturnValue(mockSqlQuery)
    executeSQL.mockResolvedValue(mockSqlResult)
    //parseSqliteResults.mockReturnValue(mockParsedDocs)
  })

  it('should execute SQL query and return parsed results', async () => {
    const docs = await queryWithSelector(mockDb, params)

    expect(makeSQLQueryFromMango).toHaveBeenCalledWith({
      selector: params.selector,
      sort: params.sort,
      indexName: params.indexName,
      limit: params.limit
    })
    expect(docs).toEqual(mockParsedDocs)
  })

  it('should recreate index if recreate_index is true', async () => {
    const docs = await queryWithSelector(mockDb, params, {
      recreate_index: true
    })

    expect(deleteIndex).toHaveBeenCalled()
    expect(docs).toEqual(mockParsedDocs)
  })

  it('should create index and retry on SQL execution error', async () => {
    executeSQL
      .mockRejectedValueOnce(new Error('SQL error'))
      .mockResolvedValueOnce(mockSqlResult)

    const docs = await queryWithSelector(mockDb, params)

    expect(createIndex).toHaveBeenCalledWith(
      mockDb,
      params.indexName,
      params.fieldsToIndex
    )
    expect(docs).toEqual(mockParsedDocs)
  })
})
