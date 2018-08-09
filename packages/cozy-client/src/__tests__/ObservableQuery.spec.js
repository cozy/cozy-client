import { createStore, combineReducers } from 'redux'
import CozyClient from '../CozyClient'
import CozyLink from '../CozyLink'
import ObservableQuery from '../ObservableQuery'
import { initQuery, receiveQueryResult } from '../store'

import { TODO_1, TODO_2 } from './fixtures'

const queryResultFromData = (data, opts = {}) => ({
  data: data,
  meta: { count: data.length },
  skip: 0,
  next: false,
  ...opts
})

const AUTHORS = [
  {
    _id: 1234,
    _type: 'io.cozy.todos.authors',
    name: 'John Doe'
  }
]

describe('ObservableQuery', () => {
  let store
  const requestHandler = jest.fn()
  const link = new CozyLink(requestHandler)
  const client = new CozyClient({ link })

  beforeEach(() => {
    store = createStore(combineReducers({ cozy: client.reducer() }))
    client.setStore(store)
  })

  describe('notifications', () => {
    let query
    const def = client.all('io.cozy.todos')
    const observer = jest.fn()

    beforeEach(async () => {
      observer.mockReset()
      query = new ObservableQuery('allTodos', def, client)
      query.subscribe(observer)
      await store.dispatch(initQuery('allTodos', def))
    })

    it('should notify observers when the fetchStatus change', async () => {
      await store.dispatch(
        receiveQueryResult('allTodos', queryResultFromData([TODO_1]))
      )
      expect(observer).toHaveBeenCalledTimes(2)
    })

    it('should not notify observers when other queries changed', async () => {
      await store.dispatch(
        receiveQueryResult('allTodos', queryResultFromData([TODO_1, TODO_2]))
      )

      await store.dispatch(
        receiveQueryResult('allAuthors', queryResultFromData(AUTHORS))
      )
      expect(observer).toHaveBeenCalledTimes(2)
      query.currentResult()
    })
  })


  })

  it('should return an unsubscribe function', () => {})
  it('should notify observers when a mutation updates the observed query', () => {})
  it('should not notify observers when a mutation updates another query', () => {})
  it('should notify observers when a mutation is executed in the context of the query', () => {})
})
