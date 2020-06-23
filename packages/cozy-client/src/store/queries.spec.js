import queries, {
  initQuery,
  receiveQueryResult,
  convert$gtNullSelectors,
  makeSorterFromDefinition
} from './queries'
import { QueryDefinition, Q } from '../queries/dsl'
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
    applyAction(
      initQuery(
        'a',
        new QueryDefinition({
          doctype: 'io.cozy.todos'
        })
      )
    )
    expect(state).toMatchSnapshot()
  })

  describe('updates', () => {
    beforeEach(() => {
      applyAction(
        initQuery(
          'a',
          new QueryDefinition({
            doctype: 'io.cozy.todos'
          })
        )
      )
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
      applyAction(
        initQuery(
          'b',
          new QueryDefinition({
            doctype: 'io.cozy.todos'
          })
        )
      )
      applyAction(
        receiveQueryResult('a', {
          data: [TODO_1, TODO_2]
        })
      )
      expect(state).toMatchSnapshot()
    })

    it('should correctly update a query with a selector', () => {
      const query = new QueryDefinition({
        doctype: 'io.cozy.todos'
      })
      applyAction(initQuery('b', query.where({ done: true })))
      applyAction(
        receiveQueryResult('a', {
          data: [TODO_3]
        })
      )
      expect(state).toMatchSnapshot()
    })

    it('should correctly update a query with a $gt: null selector', () => {
      const query = new QueryDefinition({
        doctype: 'io.cozy.todos'
      })
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
      const query = new QueryDefinition({
        doctype: 'io.cozy.todos'
      })
      applyAction(initQuery('b', query.where({ done: false })))
      applyAction(
        receiveQueryResult('a', {
          data: [TODO_3]
        })
      )
      expect(state).toMatchSnapshot()
    })

    it('should not crash if data is null', () => {
      const query = new QueryDefinition({
        doctype: 'io.cozy.todos',
        id: 'not-existing-doc'
      })
      applyAction(initQuery('b', query))
      applyAction(
        receiveQueryResult('b', {
          data: null
        })
      )
      expect(state).toMatchSnapshot()
    })

    it('should only update queries with the right id selector', () => {
      const query = new QueryDefinition({
        doctype: 'io.cozy.todos',
        id: TODO_3._id
      })
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
      { _id: '4', name: 3, label: 'A' }
    ]
    const sorted = sorter(files)
    expect(sorted.map(x => x._id)).toEqual(['4', '3', '2', '1'])
  })
})
