import configureStore from 'redux-mock-store'

import TODO_1 from './fixtures'

import CozyClient from '../CozyClient'
import CozyLink from '../CozyLink'
import { all } from '../Query'
import { update } from '../Mutation'
import reducer, {
  initQuery,
  receiveQueryResult,
  receiveQueryError,
  initMutation,
  receiveMutationResult,
  receiveMutationError
} from '../store'
import { getQueryFromStore } from '../store/queries'

describe('CozyClient', () => {
  const requestHandler = jest.fn()
  const store = configureStore()({})
  const link = new CozyLink(requestHandler)
  const client = new CozyClient({ link })
  client.setStore(store)

  afterEach(() => {
    store.clearActions()
  })

  describe('query', () => {
    const query = all('io.cozy.todos')
    const fakeResponse = { data: 'FAKE!!!' }

    it('should first dispatch a INIT_QUERY action', async () => {
      await client.query(query, { as: 'allTodos' })
      expect(store.getActions()[0]).toEqual(
        initQuery('allTodos', { doctype: 'io.cozy.todos' })
      )
    })

    it('should then dispatch a RECEIVE_QUERY_RESULT action', async () => {
      requestHandler.mockReturnValueOnce(Promise.resolve(fakeResponse))
      await client.query(query, { as: 'allTodos' })
      expect(store.getActions()[1]).toEqual(
        receiveQueryResult('allTodos', fakeResponse)
      )
    })

    it('should dispatch a RECEIVE_QUERY_ERROR action if an error occurs', async () => {
      const error = new Error('Fake error')
      requestHandler.mockReturnValueOnce(Promise.reject(error))
      await client.query(query, { as: 'allTodos' })
      expect(store.getActions()[1]).toEqual(
        receiveQueryError('allTodos', error)
      )
    })

    it('should resolve to the query response', async () => {
      requestHandler.mockReturnValueOnce(Promise.resolve(fakeResponse))
      const resp = await client.query(query)
      expect(resp).toEqual(fakeResponse)
    })

    it('should call the link with the query', async () => {
      requestHandler.mockReset()
      await client.query(query)
      expect(requestHandler).toHaveBeenCalledTimes(1)
      expect(requestHandler).toHaveBeenCalledWith(query)
    })
  })

  describe('mutate', () => {
    const mutation = update({ ...TODO_1, label: 'Buy croissants' })
    const fakeResponse = {
      data: [{ ...TODO_1, label: 'Buy croissants', rev: 2 }]
    }

    it('should first dispatch a INIT_MUTATION action', async () => {
      await client.mutate(mutation, { as: 'updateTodo' })
      expect(store.getActions()[0]).toEqual(initMutation('updateTodo'))
    })

    it('should execute the mutation', async () => {
      requestHandler.mockReset()
      await client.mutate(mutation, { as: 'updateTodo' })
      expect(requestHandler).toHaveBeenCalled()
    })

    it('should then dispatch a RECEIVE_MUTATION_RESULT action', async () => {
      requestHandler.mockReturnValueOnce(Promise.resolve(fakeResponse))
      await client.mutate(mutation, { as: 'updateTodo' })
      expect(store.getActions()[1]).toEqual(
        receiveMutationResult('updateTodo', fakeResponse)
      )
    })

    it('should resolve to the mutation response', async () => {
      requestHandler.mockReturnValueOnce(Promise.resolve(fakeResponse))
      const resp = await client.mutate(mutation)
      expect(resp).toEqual(fakeResponse)
    })

    it('should dispatch a RECEIVE_MUTATION_ERROR action if an error occurs', async () => {
      const error = new Error('Fake error')
      requestHandler.mockReturnValueOnce(Promise.reject(error))
      await client.mutate(mutation, { as: 'updateTodo' })
      expect(store.getActions()[1]).toEqual(
        receiveMutationError('updateTodo', error)
      )
    })
  })
})
