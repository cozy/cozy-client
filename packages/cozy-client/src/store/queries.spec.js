import queries, {
  initQuery,
  receiveQueryResult,
  convert$gtNullSelectors,
  makeSorterFromDefinition,
  mergeSelectorAndPartialIndex,
  getSelectorFilterFn,
  sortAndLimitDocsIds,
  loadQuery,
  receiveQueryError,
  updateData
} from './queries'
import { Q } from '../queries/dsl'
import { TODO_1, TODO_2, TODO_3 } from '../__tests__/fixtures'

import sift from 'sift'
// const actualSift = jest.requireActual('sift')

// jest.mock('sift', () => ({
//   __esModule: true,
//   default: params => {
//     use: () => {},
//     }))

describe('queries reducer', () => {
  let state
  const response = {
    data: [TODO_1, TODO_2]
  }
  const applyAction = action => {
    state = queries(state, action)
  }
  beforeEach(() => {
    state = {}
    jest.spyOn(Date, 'now').mockReturnValue(1337)
  })
  afterEach(() => {
    Date.now.mockRestore()
  })

  describe('INIT_QUERY', () => {
    it('should init correctly', () => {
      const qdef = Q('io.cozy.todos')
      applyAction(initQuery('a', qdef))
      expect(state).toMatchSnapshot()
    })

    test('init should have no effect after receiveQueryResult', () => {
      const qdef = Q('io.cozy.todos')
      applyAction(initQuery('a', qdef))
      applyAction(receiveQueryResult('a', response))
      let state1 = state
      applyAction(initQuery('a', qdef))
      expect(state1).toBe(state)
    })

    test('init should not set status to loading after receiveQueryResult', () => {
      const qdef = Q('io.cozy.todos')
      applyAction(initQuery('a', qdef))
      applyAction(receiveQueryResult('a', response))
      applyAction(initQuery('a', qdef))
      expect(state.a.fetchStatus).toBe('loaded')
    })
  })

  describe('LOAD_QUERY', () => {
    it('should set isFetching to true and not changing fetchStatus when query has been loaded and background fetching activated', () => {
      // Given
      const queryDefinition = Q('io.cozy.todos')
      applyAction(initQuery('a', queryDefinition))
      applyAction(receiveQueryResult('a', response))
      expect(state.a.fetchStatus).toBe('loaded')

      // When
      applyAction(loadQuery('a', { backgroundFetching: true }))

      // Then
      expect(state.a.fetchStatus).toBe('loaded')
      expect(state.a.isFetching).toBe(true)
    })

    it('should not set isFetching and keep changing fetchStatus when query has been loaded and background fetching deactivated', () => {
      // Given
      const queryDefinition = Q('io.cozy.todos')
      applyAction(initQuery('a', queryDefinition))
      applyAction(receiveQueryResult('a', response))
      expect(state.a.fetchStatus).toBe('loaded')

      // When
      applyAction(loadQuery('a'))

      // Then
      expect(state.a.fetchStatus).toBe('loading')
      expect(state.a.isFetching).toBe(null)
    })
  })

  describe('RECEIVE_QUERY_RESULT', () => {
    it('should set isFetching to false when query has been re-fetched correctly and background fetching activated', () => {
      // Given
      const queryDefinition = Q('io.cozy.todos')
      applyAction(initQuery('a', queryDefinition))

      // When
      applyAction(
        receiveQueryResult('a', response, { backgroundFetching: true })
      )

      // Then
      expect(state.a.isFetching).toBe(false)
    })

    it('should set isFetching to false when query has been re-fetched correctly and background fetching deactivated', () => {
      // Given
      const queryDefinition = Q('io.cozy.todos')
      applyAction(initQuery('a', queryDefinition))

      // When
      applyAction(receiveQueryResult('a', response))

      // Then
      expect(state.a.isFetching).toBe(null)
    })
  })

  describe('RECEIVE_QUERY_ERROR', () => {
    it('should set isFetching to false when query is in error and background fetching activated', () => {
      // Given
      const queryDefinition = Q('io.cozy.todos')
      applyAction(initQuery('a', queryDefinition))
      const error = {}

      // When
      applyAction(receiveQueryError('a', error, { backgroundFetching: true }))

      // Then
      expect(state.a.isFetching).toBe(false)
    })
    it('should not set isFetching when query is in error and background fetching deactivated', () => {
      // Given
      const queryDefinition = Q('io.cozy.todos')
      applyAction(initQuery('a', queryDefinition))
      const error = {}

      // When
      applyAction(receiveQueryError('a', error))

      // Then
      expect(state.a.isFetching).toBe(null)
    })
  })

  describe('updates', () => {
    beforeEach(() => {
      applyAction(initQuery('a', Q('io.cozy.todos')))
    })

    it('should correctly update', () => {
      applyAction(
        receiveQueryResult('a', {
          data: [TODO_1, TODO_2]
        })
      )
      expect(state).toMatchSnapshot()
      expect(state['a'].data).toEqual([TODO_1._id, TODO_2._id])
      applyAction(
        receiveQueryResult('a', {
          data: [TODO_1, TODO_2]
        })
      )
      expect(state['a'].data).toEqual([TODO_1._id, TODO_2._id])
    })

    it('should correctly update two queries', () => {
      applyAction(initQuery('b', Q('io.cozy.todos')))
      applyAction(
        receiveQueryResult('a', {
          data: [TODO_1, TODO_2]
        })
      )
      expect(state).toMatchSnapshot()
    })

    it('should correctly update a query with a selector', () => {
      const query = Q('io.cozy.todos')
      applyAction(initQuery('b', query.where({ done: true })))
      applyAction(
        receiveQueryResult('a', {
          data: [TODO_3]
        })
      )
      expect(state).toMatchSnapshot()
    })

    it('should correctly update a sorted query with a deleted document', () => {
      const query = Q('io.cozy.todos')
      applyAction(
        initQuery(
          'a',
          query
            .indexFields(['date'])
            .sortBy([{ date: 'asc' }])
            .where({ done: false })
        )
      )
      applyAction(initQuery('b', query.where({ done: true })))
      applyAction(
        receiveQueryResult('a', {
          data: [{ ...TODO_3, _deleted: true }]
        })
      )
      expect(state).toMatchSnapshot()
    })

    it('should correctly update a query with several ids', () => {
      const query = Q('io.cozy.todos')
      applyAction(initQuery('b', query.getByIds([TODO_1._id, TODO_2._id])))
      applyAction(
        receiveQueryResult('b', {
          data: [TODO_1, TODO_2]
        })
      )
      expect(state.b.data).toEqual([TODO_1._id, TODO_2._id])
      applyAction(
        receiveQueryResult('a', {
          data: [TODO_3]
        })
      )
      expect(state.b.data).toEqual([TODO_1._id, TODO_2._id]) // TODO_3 does not appear in the results of query b, because it is not part of the specified ids
    })

    it('should correctly update a query with a $gt: null selector', () => {
      const query = Q('io.cozy.todos')
      applyAction(
        initQuery(
          'b',
          query.where({
            done: true,
            _id: {
              $gt: null
            }
          })
        )
      )
      applyAction(
        receiveQueryResult('a', {
          data: [TODO_3]
        })
      )
      expect(state).toMatchSnapshot()
    })

    it('should not update a query not concerned even with a selector', () => {
      const query = Q('io.cozy.todos')
      applyAction(initQuery('b', query.where({ done: false })))
      applyAction(
        receiveQueryResult('a', {
          data: [TODO_3]
        })
      )
      expect(state).toMatchSnapshot()
    })

    it('should not add documents to another query if autoUpdate.add was set to false', () => {
      const query = Q('io.cozy.todos')
      applyAction(
        initQuery('b', query.where({ done: true }), {
          autoUpdate: { add: false }
        })
      )
      applyAction(
        receiveQueryResult('a', {
          data: [TODO_3]
        })
      )
      expect(state.b.data.length).toBe(0)
      expect(state).toMatchSnapshot()
    })

    it('should not remove documents from another query if autoUpdate.remove was set to false', () => {
      const query = Q('io.cozy.todos')
      applyAction(
        initQuery('b', query.where({ done: true }), {
          autoUpdate: { remove: false }
        })
      )
      applyAction(
        receiveQueryResult('a', {
          data: [TODO_3]
        })
      )
      applyAction(
        receiveQueryResult('a', {
          data: [{ ...TODO_3, done: false }]
        })
      )
      expect(state.b.data.length).toBe(1)
      expect(state).toMatchSnapshot()
    })

    it('should not crash if data is null', () => {
      const query = Q('io.cozy.todos').getById('not-existing-doc')
      applyAction(initQuery('b', query))
      applyAction(
        receiveQueryResult('b', {
          data: null
        })
      )
      expect(state).toMatchSnapshot()
    })

    it('should only update queries with the right id selector', () => {
      const query = Q('io.cozy.todos').getById(TODO_3._id)
      applyAction(initQuery('b', query))
      applyAction(
        receiveQueryResult('a', {
          data: [TODO_2]
        })
      )
      expect(state.b.lastUpdate).toBe(null)
      applyAction(
        receiveQueryResult('a', {
          data: [TODO_3]
        })
      )
      expect(state.b.lastUpdate).not.toBe(null)
    })
  })
})

describe('selectors', () => {
  it('should convert $gt selectors when their value is null', () => {
    const selector = {
      somefield: 'somevalue',
      convertMe: {
        $gt: null
      },
      nested: {
        convertMeToo: {
          $gt: null
        }
      },
      notNull: {
        $gt: 2
      }
    }
    const converted = convert$gtNullSelectors(selector)
    expect(converted).toEqual({
      somefield: 'somevalue',
      convertMe: {
        $gtnull: null
      },
      nested: {
        convertMeToo: {
          $gtnull: null
        }
      },
      notNull: {
        $gt: 2
      }
    })
  })
})

describe('makeSorterFromDefinition', () => {
  it('should make a sort function from a definition', () => {
    const q = Q('io.cozy.files').sortBy([{ name: 'desc' }, { label: 'asc' }])

    const sorter = makeSorterFromDefinition(q)
    const files = [
      { _id: '1', name: 1, label: 'C' },
      { _id: '2', name: 2, label: 'B' },
      { _id: '3', name: 3, label: 'C' },
      { _id: '4', name: 3, label: 'A' },
      { _id: '5', name: 3, label: 'a' }
    ]
    const sorted = sorter(files)
    expect(sorted.map(x => x._id)).toEqual(['4', '5', '3', '2', '1'])
  })

  it('should handle objects with deep properties', () => {
    const q = Q('io.cozy.files').sortBy([{ 'name.label': 'asc' }])
    const sorter = makeSorterFromDefinition(q)
    const files = [
      { name: { label: 'C' } },
      { name: { label: 'B' } },
      { name: { label: 'a' } },
      { name: { label: 'A' } },
      { name: { label: 'b' } }
    ]
    const sorted = sorter(files)
    expect(sorted.map(x => x.name.label)).toEqual(['a', 'A', 'B', 'b', 'C'])
  })
})

describe('mergeSelectorAndPartialIndex', () => {
  it('should return a selector even if no partial index', () => {
    const query = Q('io.cozy.files').where({
      _id: {
        $gt: null
      }
    })

    const result = {
      _id: { $gt: null }
    }

    expect(mergeSelectorAndPartialIndex(query)).toMatchObject(result)
  })

  it('should return a selector with partial index', () => {
    const query = Q('io.cozy.files')
      .where({
        _id: {
          $gt: null
        }
      })
      .partialIndex({
        specificAttributes: {
          $exists: false
        }
      })

    const result = {
      _id: { $gt: null },
      specificAttributes: { $exists: false }
    }

    expect(mergeSelectorAndPartialIndex(query)).toMatchObject(result)
  })

  it('should return a selector even if only partial index', () => {
    const query = Q('io.cozy.files').partialIndex({
      specificAttributes: {
        $exists: false
      }
    })

    const result = {
      specificAttributes: {
        $exists: false
      }
    }

    expect(mergeSelectorAndPartialIndex(query)).toMatchObject(result)
  })
})

// jest.mock('sift', () => {
//   const mockSift = param => param

//   mockSift.use = () => {}

//   return mockSift
// })

describe('getSelectorFilterFn', () => {

  beforeEach(() => {

  })

  afterEach(() => {
    jest.rest
    //jest.clearAllMocks()
  })

  it('abcd', () => {
    const spySift = jest.spyOn(sift, 'default')

    // const mockSift = param => param
    
    // mockSift.use = () => {}

    spySift.mockImplementation(param => param)

    const query = Q('io.cozy.files').partialIndex({
      specificAttributes: {
        $exists: false
      }
    })

    const result = {
      specificAttributes: {
        $exists: false
      }
    }

    expect(getSelectorFilterFn(query)).toMatchObject(result)
  })
})

describe('sortAndLimitDocsIds', () => {
  const docs = {
    'io.cozy.files': {
      doc1: {
        _id: 'doc1',
        name: 'toto'
      },
      doc2: {
        _id: 'doc2',
        name: 'tata'
      },
      doc3: {
        _id: 'doc3',
        name: 'tutu'
      },
      doc4: {
        _id: 'doc4',
        name: 'tutu'
      }
    }
  }
  it('should return ids as is, when no sort', () => {
    const query = Q('io.cozy.files')
    const ids = sortAndLimitDocsIds(
      { definition: query.toDefinition() },
      docs,
      ['doc1', 'doc2', 'doc3'],
      {
        count: 0,
        fetchedPagesCount: 0
      }
    )
    expect(ids).toEqual(['doc1', 'doc2', 'doc3'])
  })
  it('should return ids as is, when no documents in the documents slice', () => {
    const query = Q('io.cozy.files').sortBy([{ name: 'asc' }])

    const ids = sortAndLimitDocsIds(
      { definition: query.toDefinition() },
      null,
      ['doc1', 'doc2', 'doc3'],
      {
        count: 0,
        fetchedPagesCount: 0
      }
    )
    expect(ids).toEqual(['doc1', 'doc2', 'doc3'])
  })
  it('should return sorted ids', () => {
    const query = Q('io.cozy.files').sortBy([{ name: 'asc' }])

    const ids = sortAndLimitDocsIds(
      { definition: query.toDefinition() },
      docs,
      ['doc1', 'doc2', 'doc3'],
      {
        count: 3,
        fetchedPagesCount: 1
      }
    )
    expect(ids).toEqual(['doc2', 'doc1', 'doc3'])
  })
  it('should return sorted ids, accordingly to limitBy', () => {
    const query1 = Q('io.cozy.files')
      .sortBy([{ name: 'asc' }])
      .limitBy(2)

    const ids1 = sortAndLimitDocsIds(
      { definition: query1.toDefinition() },
      docs,
      ['doc1', 'doc2', 'doc3'],
      {
        count: 2,
        fetchedPagesCount: 1
      }
    )
    expect(ids1).toEqual(['doc2', 'doc1'])

    const query2 = Q('io.cozy.files')
      .sortBy([{ name: 'asc' }])
      .limitBy(1)

    const ids2 = sortAndLimitDocsIds(
      { definition: query2.toDefinition() },
      docs,
      ['doc1', 'doc2', 'doc3'],
      {
        count: 1,
        fetchedPagesCount: 2
      }
    )
    expect(ids2).toEqual(['doc2', 'doc1'])
  })

  it('should correctly handle count inferior to limit', () => {
    const query1 = Q('io.cozy.files')
      .sortBy([{ name: 'asc' }])
      .limitBy(2)

    const ids1 = sortAndLimitDocsIds(
      { definition: query1.toDefinition() },
      docs,
      ['doc1', 'doc2'],
      {
        count: 1,
        fetchedPagesCount: 1
      }
    )
    expect(ids1.length).toEqual(1)

    const query2 = Q('io.cozy.files')
      .sortBy([{ name: 'asc' }])
      .limitBy(2)

    const ids2 = sortAndLimitDocsIds(
      { definition: query2.toDefinition() },
      docs,
      ['doc1', 'doc2', 'doc3'],
      {
        count: 1,
        fetchedPagesCount: 2
      }
    )
    expect(ids2.length).toEqual(3)
  })
})

describe('updateData', () => {
  it('should update correctly the data after a create mutation', () => {
    const queryState = {
      definition: {
        doctype: 'io.cozy.files',
        selector: {
          dir_id: 'd6fa040d335c5f49e8c4b674a001849a',
          type: 'file',
          name: {
            $gt: null
          },
          _id: {
            $ne: 'io.cozy.files.trash-dir'
          }
        },
        sort: [
          {
            dir_id: 'asc'
          }
        ],
        limit: 100
      }
    }

    const createdDocument = {
      id: 'd6fa040d335c5f49e8c4b674a00216d2',
      _type: 'io.cozy.files',
      type: 'file',
      _id: 'd6fa040d335c5f49e8c4b674a00216d2',
      _rev: '1-b8663df3d2a468171ceaccc7049421ba',
      name: 'cozy.url',
      dir_id: 'd6fa040d335c5f49e8c4b674a001849a',
      created_at: '2022-09-01T10:39:01.759905+02:00',
      updated_at: '2022-09-01T10:39:01.759905+02:00'
    }
    const newData = [createdDocument]

    const documents = {
      'io.cozy.files': {
        d6fa040d335c5f49e8c4b674a001849a: {
          id: 'd6fa040d335c5f49e8c4b674a001849a',
          _id: 'd6fa040d335c5f49e8c4b674a001849a',
          _type: 'io.cozy.files',
          type: 'directory',
          attributes: {
            type: 'directory',
            name: 'test',
            dir_id: 'io.cozy.files.root-dir',
            created_at: '2022-08-31T13:07:19.976349+02:00',
            updated_at: '2022-08-31T13:07:19.976349+02:00',
            path: '/test'
          },
          name: 'test',
          dir_id: 'io.cozy.files.root-dir'
        },
        [createdDocument.id]: {
          ...createdDocument
        }
      }
    }
    const updatedDataToCheck = updateData(queryState, newData, documents)
    expect(updatedDataToCheck.data.length).toEqual(1)
    expect(updatedDataToCheck.count).toEqual(1)
  })
})
