import queries, {
  initQuery,
  receiveQueryResult,
  convert$gtNullSelectors,
  makeSorterFromDefinition,
  mergeSelectorAndPartialIndex
} from './queries'
import { Q } from '../queries/dsl'
import { TODO_1, TODO_2, TODO_3 } from '../__tests__/fixtures'

describe('queries reducer', () => {
  let state

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

  it('should init correctly', () => {
    const qdef = Q('io.cozy.todos')
    applyAction(initQuery('a', qdef))
    expect(state).toMatchSnapshot()
  })

  test('init should have no effect after receiveQueryResult', () => {
    const qdef = Q('io.cozy.todos')
    applyAction(initQuery('a', qdef))
    applyAction(
      receiveQueryResult('a', {
        data: [TODO_1, TODO_2]
      })
    )
    let state1 = state
    applyAction(initQuery('a', qdef))
    expect(state1).toBe(state)
  })

  test('init should not set status to loading after receiveQueryResult', () => {
    const qdef = Q('io.cozy.todos')
    applyAction(initQuery('a', qdef))
    applyAction(
      receiveQueryResult('a', {
        data: [TODO_1, TODO_2]
      })
    )
    applyAction(initQuery('a', qdef))
    expect(state.a.fetchStatus).toBe('loaded')
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
})
