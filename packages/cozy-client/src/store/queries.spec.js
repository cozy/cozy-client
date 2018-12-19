import queries, { initQuery, receiveQueryResult } from './queries'
import { QueryDefinition as Q } from '../queries/dsl'
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
        new Q({
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
          new Q({
            doctype: 'io.cozy.todos'
          })
        )
      )
    })
    it('should update correctly', () => {
      applyAction(
        receiveQueryResult('a', {
          data: [TODO_1, TODO_2]
        })
      )
      expect(state).toMatchSnapshot()
    })
    it('should update correctly two queries', () => {
      applyAction(
        initQuery(
          'b',
          new Q({
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

    it('should update correctly a query with a selector', () => {
      const query = new Q({
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

    it('should not update a query not concerned even with a selector', () => {
      const query = new Q({
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
      const query = new Q({
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
      const query = new Q({
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
