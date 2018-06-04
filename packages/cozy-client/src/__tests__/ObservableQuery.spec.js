import { createStore, combineReducers } from 'redux'
import CozyClient from '../CozyClient'
import CozyLink from '../CozyLink'
import ObservableQuery from '../ObservableQuery'
import reducer, {
  initQuery,
  receiveQueryResult,
  receiveQueryError,
  receiveMutationResult
} from '../store'

import { TODO_1, TODO_2, TODO_3 } from './fixtures'

describe('ObservableQuery', () => {
  let store
  const requestHandler = jest.fn()
  const link = new CozyLink(requestHandler)
  const client = new CozyClient({ link })
  const def = client.all('io.cozy.todos')
  const observer = jest.fn()

  beforeEach(() => {
    store = createStore(combineReducers({ cozy: client.reducer() }))
    client.setStore(store)
    observer.mockReset()
  })

  it('should notify observers when the fetchStatus change', async () => {
    const query = new ObservableQuery('allTodos', def, client)
    query.subscribe(observer)
    //requestHandler.mockReturnValueOnce(Promise.resolve({ data: 'foo' }))
    await store.dispatch(initQuery('allTodos', {}))
    await store.dispatch(
      receiveQueryResult('allTodos', {
        data: [TODO_1]
      })
    )
    expect(observer).toHaveBeenCalledTimes(2)
  })

  it('should not notify observers when other queries changed', async () => {
    const query = new ObservableQuery('allTodos', def, client)
    query.subscribe(observer)
    await store.dispatch(initQuery('allTodos', def))
    await store.dispatch(
      receiveQueryResult('allTodos', {
        data: [TODO_1, TODO_2],
        meta: { count: 2 },
        skip: 0,
        next: false
      })
    )

    await store.dispatch(
      receiveQueryResult('allAuthors', {
        data: [{ _id: 1234, _type: 'io.cozy.todos.authors', name: 'John Doe' }],
        meta: { count: 1 },
        skip: 0,
        next: false
      })
    )
    expect(observer).toHaveBeenCalledTimes(2)
  })

  it('should return an unsubscribe function', () => {})
  it('should notify observers when a mutation updates the observed query', () => {})
  it('should not notify observers when a mutation updates another query', () => {})
  it('should notify observers when a mutation is executed in the context of the query', () => {})
})
