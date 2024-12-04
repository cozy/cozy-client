import { equalityCheckForQuery } from './utils'

const mapIdsToDocuments = (state, doctype, ids) => {
  return ids.map(id => state[doctype][id])
}

describe('equalityCheckForQuery', () => {
  const state = {
    documents: {
      'io.cozy.files': {
        doc1: {
          _id: 'doc1'
        },
        doc2: {
          _id: 'doc2'
        },
        doc3: {
          _id: 'doc3'
        }
      }
    },
    queries: {
      query1: {
        id: 'query1',
        data: ['doc1', 'doc2']
      },
      query2: {
        id: 'query2',
        data: ['doc2']
      }
    }
  }

  const queryResultA1 = {
    id: 1,
    data: mapIdsToDocuments(state.documents, 'io.cozy.files', ['doc1', 'doc2'])
  }
  const queryResultA2 = {
    id: 1,
    data: mapIdsToDocuments(state.documents, 'io.cozy.files', ['doc1', 'doc2'])
  }
  const queryResultA3 = {
    id: 1,
    data: mapIdsToDocuments(state.documents, 'io.cozy.files', [
      'doc1',
      'doc2',
      'doc3'
    ])
  }
  const queryResultA4 = {
    id: 1,
    data: mapIdsToDocuments(state.documents, 'io.cozy.files', ['doc2', 'doc3'])
  }
  const queryResultB1 = {
    id: 2,
    data: mapIdsToDocuments(state.documents, 'io.cozy.files', ['doc2'])
  }
  const queryResultB2 = {
    id: 2,
    data: mapIdsToDocuments(state.documents, 'io.cozy.files', ['doc3'])
  }

  it('should return true for referential equality', () => {
    expect(equalityCheckForQuery(queryResultA1, queryResultA1)).toBe(true)
    expect(equalityCheckForQuery(null, null)).toBe(true)
  })

  it('should return false if one object is null', () => {
    expect(equalityCheckForQuery(null, queryResultA1)).toBe(false)
    expect(equalityCheckForQuery(queryResultA1, null)).toBe(false)
  })

  it('should return false if one or both objects are not objects', () => {
    expect(equalityCheckForQuery('notAnObject', queryResultA1)).toBe(false)
    expect(equalityCheckForQuery(queryResultA1, 'notAnObject')).toBe(false)
  })

  it('should return false if `id` properties are different', () => {
    expect(equalityCheckForQuery(queryResultA1, queryResultB1)).toBe(false)
  })

  it('should return false if one or both objects lack `data`', () => {
    expect(equalityCheckForQuery({ id: 1 }, queryResultA1)).toBe(false)
    expect(equalityCheckForQuery(queryResultA1, { id: 1 })).toBe(false)
  })

  it('should return false if `data` lengths are different', () => {
    expect(equalityCheckForQuery(queryResultA1, queryResultA3)).toBe(false)
  })

  it('should return false if elements in `data` are different', () => {
    expect(equalityCheckForQuery(queryResultA1, queryResultA3)).toBe(false)
    expect(equalityCheckForQuery(queryResultA3, queryResultA4)).toBe(false)
    expect(equalityCheckForQuery(queryResultB1, queryResultB2)).toBe(false)
  })

  it('should return true for matching data array, with equal references ', () => {
    expect(equalityCheckForQuery(queryResultA1, queryResultA2)).toBe(true)
  })

  it('should return false for matching data array, with different references ', () => {
    const queryResShallowCopyA1 = {
      ...queryResultA1,
      data: { ...queryResultA1.data }
    }
    expect(equalityCheckForQuery(queryResultA1, queryResShallowCopyA1)).toBe(
      false
    )
  })
})
