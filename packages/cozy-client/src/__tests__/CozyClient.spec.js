import configureStore from 'redux-mock-store'

import CozyStackLink from 'cozy-stack-link'

import TODO_1 from './fixtures'

import CozyClient from '../CozyClient'
import { all, find } from '../Query'
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
  const store = configureStore()({})
  const link = new CozyStackLink()
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
      link.collection().all.mockReturnValueOnce(Promise.resolve(fakeResponse))
      await client.query(query, { as: 'allTodos' })
      expect(store.getActions()[1]).toEqual(
        receiveQueryResult('allTodos', fakeResponse)
      )
    })

    it('should dispatch a RECEIVE_QUERY_ERROR action if an error occurs', async () => {
      const error = new Error('Fake error')
      link.collection().all.mockReturnValueOnce(Promise.reject(error))
      await client.query(query, { as: 'allTodos' })
      expect(store.getActions()[1]).toEqual(
        receiveQueryError('allTodos', error)
      )
    })

    it('should resolve to the query response', async () => {
      link.collection().all.mockReturnValueOnce(Promise.resolve(fakeResponse))
      const resp = await client.query(query)
      expect(resp).toEqual(fakeResponse)
    })

    it('should call `document(<doctype>).all() on the link for `all()` queries', async () => {
      link.collection().all.mockReset()
      await client.query(query)
      expect(link.collection().all).toHaveBeenCalledTimes(1)
      expect(link.collection).toHaveBeenCalledWith('io.cozy.todos')
    })

    it('should call `document(<doctype>).find() on the link for `find()` queries', async () => {
      const findQuery = find('io.cozy.todos').where({ checked: true })
      link.collection().find.mockReset()
      await client.query(findQuery)
      expect(link.collection().find).toHaveBeenCalledWith({ checked: true }, {})
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
      link.collection().update.mockReset()
      await client.mutate(mutation, { as: 'updateTodo' })
      expect(link.collection().update).toHaveBeenCalled()
    })

    it('should then dispatch a RECEIVE_MUTATION_RESULT action', async () => {
      link
        .collection()
        .update.mockReturnValueOnce(Promise.resolve(fakeResponse))
      await client.mutate(mutation, { as: 'updateTodo' })
      expect(store.getActions()[1]).toEqual(
        receiveMutationResult('updateTodo', fakeResponse)
      )
    })

    it('should resolve to the mutation response', async () => {
      link
        .collection()
        .update.mockReturnValueOnce(Promise.resolve(fakeResponse))
      const resp = await client.mutate(mutation)
      expect(resp).toEqual(fakeResponse)
    })

    it('should dispatch a RECEIVE_MUTATION_ERROR action if an error occurs', async () => {
      const error = new Error('Fake error')
      link.collection().update.mockReturnValueOnce(Promise.reject(error))
      await client.mutate(mutation, { as: 'updateTodo' })
      expect(store.getActions()[1]).toEqual(
        receiveMutationError('updateTodo', error)
      )
    })
  })
})
