import { createStore, combineReducers } from 'redux'

import reducer, {
  getDocumentFromStore,
  getQueryFromStore,
  initQuery,
  receiveQueryResult,
  receiveQueryError
} from '../store'

import { TODO_1, TODO_2, TODO_3 } from './fixtures'

describe('Store', () => {
  let store
  beforeEach(() => {
    store = createStore(combineReducers({ cozy: reducer }))
  })

  describe('getDocumentFromStore', () => {
    it('should return null when the store is empty', () => {
      expect(
        getDocumentFromStore(store.getState(), 'io.cozy.todos', TODO_1._id)
      ).toBe(null)
    })

    it('should return the document if in store', async () => {
      store.dispatch(
        receiveQueryResult('allTodos', {
          data: [TODO_1, TODO_2],
          meta: { count: 2 },
          skip: 0,
          next: false
        })
      )
      expect(
        getDocumentFromStore(store.getState(), 'io.cozy.todos', TODO_1._id)
      ).toEqual(TODO_1)
      expect(
        getDocumentFromStore(store.getState(), 'io.cozy.todos', 'WXYZ')
      ).toBe(null)
    })
  })

  describe('getQueryFromStore', () => {
    it('should return a default state when the store is empty', () => {
      expect(getQueryFromStore(store.getState(), 'allTodos')).toEqual({
        definition: null,
        id: null,
        fetchStatus: 'pending',
        lastFetch: null,
        hasMore: false,
        count: 0,
        ids: [],
        data: null
      })
    })

    it('should have a `loading` status when the query has been initiated', async () => {
      await store.dispatch(initQuery('allTodos', {}))
      const query = getQueryFromStore(store.getState(), 'allTodos')
      expect(query.fetchStatus).toBe('loading')
    })

    it('should have a `failed` status when an error occur', async () => {
      await store.dispatch(initQuery('allTodos', {}))
      await store.dispatch(
        receiveQueryError('allTodos', new Error('fake error'))
      )
      const query = getQueryFromStore(store.getState(), 'allTodos')
      expect(query.fetchStatus).toBe('failed')
    })

    describe('when query results are received', () => {
      beforeEach(async () => {
        await store.dispatch(
          initQuery('allTodos', {
            doctype: 'io.cozy.todos'
          })
        )
        await store.dispatch(
          receiveQueryResult('allTodos', {
            data: [TODO_1, TODO_2],
            meta: { count: 3 },
            skip: 0,
            next: true
          })
        )
      })

      it('should have a `loaded` status', () => {
        const query = getQueryFromStore(store.getState(), 'allTodos')
        expect(query.fetchStatus).toBe('loaded')
      })

      it('should have a `count` that reflect the `meta.count` in the response', () => {
        const query = getQueryFromStore(store.getState(), 'allTodos')
        expect(query.count).toBe(3)
      })

      it('should have a `hasMore` that reflect the `next` in the response', () => {
        const query = getQueryFromStore(store.getState(), 'allTodos')
        expect(query.hasMore).toBe(true)
      })

      it('should have a `data` property containing the actual documents', () => {
        const query = getQueryFromStore(store.getState(), 'allTodos')
        expect(query.data).toEqual([TODO_1, TODO_2])
      })

      describe('when more query results are received', () => {
        beforeEach(async () => {
          await store.dispatch(
            receiveQueryResult('allTodos', {
              data: [TODO_3],
              meta: { count: 3 },
              skip: 2,
              next: false
            })
          )
        })

        it('should have a `hasMore` that reflect the `next` in the response', () => {
          const query = getQueryFromStore(store.getState(), 'allTodos')
          expect(query.hasMore).toBe(false)
        })

        it('should have a `data` property containing all received documents', async () => {
          const query = getQueryFromStore(store.getState(), 'allTodos')
          expect(query.data).toEqual([TODO_1, TODO_2, TODO_3])
        })
      })
    })
  })
})
