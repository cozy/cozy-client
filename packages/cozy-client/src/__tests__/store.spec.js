import { createStore, combineReducers } from 'redux'
import sortBy from 'lodash/sortBy'

import reducer, {
  initQuery,
  getDocumentFromState,
  getQueryFromStore,
  receiveQueryResult,
  receiveQueryError,
  receiveMutationResult,
  StoreProxy
} from '../store'
import { QueryDefinition as Q } from '../dsl'
import {
  TODO_1,
  TODO_2,
  TODO_3,
  TODO_4
} from './fixtures'

describe('Store', () => {
  let store
  beforeEach(() => {
    store = createStore(combineReducers({ cozy: reducer }))
  })

  describe('getDocumentFromState', () => {
    it('should return null when the store is empty', () => {
      expect(
        getDocumentFromState(store.getState(), 'io.cozy.todos', TODO_1._id)
      ).toBe(null)
    })

    it('should return the document if in store', () => {
      store.dispatch(
        receiveQueryResult('allTodos', {
          data: [TODO_1, TODO_2],
          meta: { count: 2 },
          skip: 0,
          next: false
        })
      )
      expect(
        getDocumentFromState(store.getState(), 'io.cozy.todos', TODO_1._id)
      ).toEqual(TODO_1)
      expect(
        getDocumentFromState(store.getState(), 'io.cozy.todos', 'WXYZ')
      ).toBe(null)
    })

    it('should return a newly created doc received in a mutation result', () => {
      store.dispatch(
        receiveMutationResult('foo', {
          data: [TODO_1]
        })
      )
      expect(
        getDocumentFromState(store.getState(), 'io.cozy.todos', TODO_1._id)
      ).toEqual(TODO_1)
    })

    it('should return an updated rev of a doc received in a mutation result', () => {
      store.dispatch(
        receiveMutationResult('foo', {
          data: [TODO_1]
        })
      )
      store.dispatch(
        receiveMutationResult('bar', {
          data: [{ ...TODO_1, label: 'Buy croissants' }]
        })
      )
      expect(
        getDocumentFromState(store.getState(), 'io.cozy.todos', TODO_1._id)
          .label
      ).toBe('Buy croissants')
    })
  })

  describe('getQueryFromStore', () => {
    it('should return a default state when the store is empty', () => {
      expect(getQueryFromStore(store, 'allTodos')).toEqual({
        definition: null,
        id: null,
        fetchStatus: 'pending',
        lastFetch: null,
        lastUpdate: null,
        lastError: null,
        hasMore: false,
        count: 0,
        data: null
      })
    })

    it('should have a `loading` status when the query has been initiated', async () => {
      const queryDef = { doctype: 'io.cozy.todos' }
      await store.dispatch(initQuery('allTodos', queryDef))
      const query = getQueryFromStore(store, 'allTodos')
      expect(query.fetchStatus).toBe('loading')
    })

    it('should have a `failed` status when an error occur', async () => {
      const queryDef = { doctype: 'io.cozy.todos' }
      await store.dispatch(initQuery('allTodos', queryDef))
      await store.dispatch(
        receiveQueryError('allTodos', new Error('fake error'))
      )
      const query = getQueryFromStore(store, 'allTodos')
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
            meta: { count: 2 },
            skip: 0,
            next: true
          })
        )
      })

      it('should have a `loaded` status', () => {
        const query = getQueryFromStore(store, 'allTodos')
        expect(query.fetchStatus).toBe('loaded')
      })

      it('should have a `count` that reflect the `meta.count` in the response', () => {
        const query = getQueryFromStore(store, 'allTodos')
        expect(query.count).toBe(2)
      })

      it('should have a `hasMore` that reflect the `next` in the response', () => {
        const query = getQueryFromStore(store, 'allTodos')
        expect(query.hasMore).toBe(true)
      })

      it('should have a `data` property containing the actual documents', () => {
        const query = getQueryFromStore(store, 'allTodos')
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
          const query = getQueryFromStore(store, 'allTodos')
          expect(query.hasMore).toBe(false)
        })

        it('should have a `data` property containing all received documents', () => {
          const query = getQueryFromStore(store, 'allTodos')
          expect(query.data).toEqual([TODO_1, TODO_2, TODO_3])
        })
      })

      describe('when a `update` option is given', () => {
        it('should be applied instead of the regular update', async () => {
          await store.dispatch(
            receiveQueryResult('allTodos', 'BAR!', {
              update: (store, response) =>
                store.writeQuery('allTodos', {
                  ...store.readQuery('allTodos'),
                  foo: response
                })
            })
          )
          expect(getQueryFromStore(store, 'allTodos').foo).toEqual(
            'BAR!'
          )
        })
      })

      describe('when the query result have a `included` property', () => {
        beforeEach(async () => {
          await store.dispatch(
            receiveQueryResult('allTodos', {
              data: [
                {
                  ...TODO_1,
                  relationships: {
                    attachments: {
                      data: [
                        { _id: 'abc', _type: 'io.cozy.files' },
                        { _id: 'def', _type: 'io.cozy.files' }
                      ]
                    }
                  }
                },
                {
                  ...TODO_2,
                  relationships: {
                    attachments: {
                      data: [{ _id: 'xyz', _type: 'io.cozy.files' }]
                    }
                  }
                }
              ],
              included: [
                { _id: 'abc', _type: 'io.cozy.files', name: 'abc.png' },
                { _id: 'def', _type: 'io.cozy.files', name: 'def.png' },
                { _id: 'xyz', _type: 'io.cozy.files', name: 'xyz.png' }
              ],
              meta: { count: 2 },
              skip: 0,
              next: false
            })
          )
        })

        it('should persist `included` docs into the store', () => {
          expect(
            getDocumentFromState(store.getState(), 'io.cozy.files', 'abc')
          ).toEqual({ _id: 'abc', _type: 'io.cozy.files', name: 'abc.png' })
        })
      })
    })
  })

  describe('Mutations', () => {
    beforeEach(async () => {
      await store.dispatch(
        initQuery('allTodos', new Q({ doctype: 'io.cozy.todos' }))
      )
      await store.dispatch(
        initQuery('allTodos2', new Q({ doctype: 'io.cozy.todos2' }))
      )
      await store.dispatch(
        receiveQueryResult('allTodos', {
          data: [TODO_1, TODO_2],
          meta: { count: 2 },
          skip: 0,
          next: true
        })
      )
      await store.dispatch(
        receiveQueryResult('allTodos2', {
          data: [{...TODO_1, _type: 'io.cozy.todos2'}],
          meta: { count: 2 },
          skip: 0,
          next: true
        })
      )
    })

    const MOCKED_DATE = -14159040000 // a small step for man...

    beforeEach(() => {
      jest.spyOn(Date, 'now').mockReturnValue(MOCKED_DATE)
    })

    afterEach(() => {
      Date.now.mockRestore()
    })

    describe('auto update', () => {
      it('should update all the queries that can contain the document (creation)', async () => {
        const result = { data: { ...TODO_1, done: true, _id: '1337', id: '1337' } }
        await store.dispatch(receiveMutationResult('foo', result))
        const query1 = getQueryFromStore(store, 'allTodos')
        const query2 = getQueryFromStore(store, 'allTodos2')
        expect(query1.data.find(doc => doc._id == '1337')).not.toBeUndefined()
        expect(query1.lastUpdate).toBe(MOCKED_DATE)
        expect(query2.lastUpdate).not.toBe(MOCKED_DATE)
      })

      it('should update all queries containing the documents (update)', async () => {
        const result = { data: { ...TODO_1, done: true, id: TODO_1._id } }
        await store.dispatch(receiveMutationResult('foo', result))
        const query1 = getQueryFromStore(store, 'allTodos')
        const query2 = getQueryFromStore(store, 'allTodos2')
        expect(query1.lastUpdate).toBe(MOCKED_DATE)
        expect(query2.lastUpdate).not.toBe(MOCKED_DATE)
      })

      it('should only update relevant queries (where)', async () => {
        const baseQuery = new Q({ doctype: 'io.cozy.todos' })
        await store.dispatch(
          initQuery('doneTodos', baseQuery.where({ done: true }))
        )
        await store.dispatch(
          initQuery('undoneTodos', baseQuery.where({ done: false }))
        )
        const data = [TODO_1, TODO_2, TODO_3, TODO_4]
        await store.dispatch(
          receiveQueryResult('allTodos', {
            data: data,
            meta: { count: 4 },
            skip: 0,
            next: true
          })
        )
        const query1 = getQueryFromStore(store, 'doneTodos')
        const query2 = getQueryFromStore(store, 'undoneTodos')
        const sortById = arr => sortBy(arr, '_id')
        expect(sortById(query1.data)).toEqual(sortById([TODO_3, TODO_4]))
        expect(query1.lastUpdate).toBe(MOCKED_DATE)
        expect(sortById(query2.data)).toEqual(sortById([TODO_1, TODO_2]))
        expect(query2.lastUpdate).toBe(MOCKED_DATE)
      })
    })

    describe('updateQueries', () => {
      const NEW_TODO = {
        _id: 'azerty',
        _type: 'io.cozy.todos',
        label: 'Jettison boosters',
        done: false
      }

      it('should apply the updater function to the query existing data and the mutation result', async () => {
        const updater = jest.fn(() => [])
        const result = { data: [NEW_TODO] }
        await store.dispatch(
          receiveMutationResult('foo', result, {
            updateQueries: {
              allTodos: updater
            }
          })
        )
        expect(updater).toHaveBeenCalledWith([TODO_1, TODO_2], result)
      })

      it('should apply the update to the query data', async () => {
        const updater = (previousData, result) => [
          ...previousData.slice(0, 1),
          result.data[0],
          ...previousData.slice(1)
        ]
        const result = { data: [NEW_TODO] }
        await store.dispatch(
          receiveMutationResult('foo', result, {
            updateQueries: {
              allTodos: updater
            }
          })
        )
        const query = getQueryFromStore(store, 'allTodos')
        expect(query.data).toEqual([TODO_1, NEW_TODO, TODO_2])
      })
    })
  })

  describe('StoreProxy', () => {
    let proxy
    const QUERY = {
      definition: {
        doctype: 'io.cozy.todos'
      },
      data: [TODO_1._id, TODO_2._id],
      fetchStatus: 'loaded',
      hasMore: false,
      count: 2
    }

    beforeEach(() => {
      proxy = new StoreProxy({
        documents: {
          'io.cozy.todos': {
            [TODO_1._id]: TODO_1,
            [TODO_2._id]: TODO_2
          },
          'io.cozy.files': {
            abc: { _id: 'abc', _type: 'io.cozy.files', name: 'abc.pdf' },
            def: { _id: 'def', _type: 'io.cozy.files', name: 'def.png' }
          }
        },
        queries: {
          allTodos: QUERY
        }
      })
    })

    it('should read queries', () => {
      expect(proxy.readQuery('allTodos')).toEqual(QUERY)
    })

    it('should write queries', () => {
      proxy.writeQuery('allTodos', { ...proxy.readQuery('allTodos'), count: 3 })
      expect(proxy.getState().queries.allTodos.count).toEqual(3)
    })

    it('should read documents', () => {
      expect(proxy.readDocument('io.cozy.todos', TODO_1._id)).toEqual(TODO_1)
    })

    it('should write new documents', () => {
      proxy.writeDocument(TODO_3)
      expect(proxy.getState().documents['io.cozy.todos'][TODO_3._id]).toBe(
        TODO_3
      )
    })
  })
})
