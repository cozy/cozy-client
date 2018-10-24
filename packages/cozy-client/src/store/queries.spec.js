import queries, { initQuery, receiveQueryResult } from './queries'
import { QueryDefinition as Q } from '../queries/dsl'
import { TODO_1, TODO_2 } from '../__tests__/fixtures'

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
  })
})
