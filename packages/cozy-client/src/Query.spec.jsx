import React from 'react'
import { mount } from 'enzyme'
import CozyProvider from './Provider'

import Query from './Query'
import { createTestAssets, queryResultFromData } from './__tests__/utils'
import {
  initQuery,
  receiveQueryResult,
  receiveMutationResult,
  getQueryFromState
} from './store'
import { TODOS, TODO_WITH_RELATION, FILE_1 } from './__tests__/fixtures'
import * as mocks from './__tests__/mocks'

describe('Query', () => {
  const queryDef = client => ({ doctype: 'io.cozy.todos' })
  let observableQuery
  const client = mocks.client({
    makeObservableQuery: queryDef => observableQuery
  })

  const context = { client }

  beforeEach(() => {
    client.query.mockClear()
    observableQuery = mocks.observableQuery()
  })

  describe('lifecycle', () => {
    it('should fire a query fetch when mounted', () => {
      mount(<Query query={queryDef}>{() => null}</Query>, {
        context
      })
      expect(observableQuery.fetch).toHaveBeenCalled()
    })

    it('should not fire a query fetch when mounted with initialFetch=false', () => {
      mount(
        <Query query={queryDef} as="allTodos" fetchPolicy="cache-only">
          {() => null}
        </Query>,
        { context }
      )
      expect(client.query).not.toHaveBeenCalled()
    })

    it('should create a single query', () => {
      const assets = createTestAssets()
      const store = assets.store
      const client = assets.client
      const spy = jest.spyOn(store, 'dispatch')
      mount(
        <CozyProvider client={client}>
          <Query query={queryDef}>{() => null}</Query>
        </CozyProvider>
      )
      const initQueryDispatch = {
        queryDefinition: { doctype: 'io.cozy.todos' },
        queryId: 1,
        type: 'INIT_QUERY'
      }
      expect(spy).toHaveBeenNthCalledWith(1, initQueryDispatch)
      expect(spy).toHaveBeenNthCalledWith(2, initQueryDispatch)
      expect(spy).toHaveBeenCalledTimes(2)
    })
  })

  describe('data reactions', () => {
    let store, client, uut
    beforeEach(async () => {
      const assets = createTestAssets()
      store = assets.store
      client = assets.client
      await store.dispatch(initQuery('allTodos', queryDef(client)))
      uut = mount(
        <CozyProvider client={client}>
          <Query fetchPolicy="cache-only" query={queryDef}>
            {({ data }) => (
              <ul>
                {data.map(x => (
                  <li key={x._id}>{x.label}</li>
                ))}
              </ul>
            )}
          </Query>
        </CozyProvider>
      )
    })

    it('should be refreshed when relevant results are updated', async () => {
      expect(uut.html()).not.toContain('Build stuff')
      const response = queryResultFromData(TODOS)
      const action = receiveQueryResult('allTodos', response)
      await store.dispatch(action)
      expect(uut.html()).toContain('Build stuff')
    })

    it('should refresh queries concerned by a REMOVE_REFERENCE_TO mutation', async () => {
      const response = { data: TODO_WITH_RELATION }

      const action1 = receiveQueryResult('allTodos', response)
      await store.dispatch(action1)

      const definition = {
        document: TODO_WITH_RELATION,
        mutationType: 'REMOVE_REFERENCES_TO',
        referencedDocuments: [
          {
            ...FILE_1
          }
        ]
      }
      const UPDATED_AT = 2000
      jest.spyOn(Date, 'now').mockReturnValue(UPDATED_AT)
      const action = receiveMutationResult('allTodos', '', {}, definition)
      await store.dispatch(action)
      const state = store.getState()

      expect(getQueryFromState(state, 'allTodos').lastUpdate).toEqual(
        UPDATED_AT
      )
    })
  })

  describe('props', () => {
    let store, client, query
    beforeEach(async () => {
      const assets = createTestAssets()
      store = assets.store
      client = assets.client
      query = queryDef(client)
      await store.dispatch(initQuery('allTodos', query))
    })

    const setup = ({ children }) => {
      mount(
        <CozyProvider client={client}>
          <Query fetchPolicy="cache-only" query={queryDef}>
            {children}
          </Query>
        </CozyProvider>
      )
    }

    it('should provide the render prop children with methods', () => {
      const children = jest.fn().mockImplementation(() => null)
      setup({
        children
      })
      expect(children).toHaveBeenCalledWith(
        {
          count: 0,
          data: [],
          definition: { doctype: 'io.cozy.todos' },
          fetch: expect.any(Function),
          fetchMore: expect.any(Function),
          fetchStatus: 'loading',
          hasMore: false,
          id: 1,
          lastError: null,
          lastFetch: null,
          lastUpdate: null
        },
        expect.any(Object)
      )
    })

    it('should work with a client not providing fetch', () => {
      client.makeObservableQuery = () => ({
        subscribe: () => {},
        fetchMore: () => {},
        currentResult: () => {}
      })
      const children = jest.fn().mockImplementation(() => null)
      setup({
        children
      })
      expect(children).toHaveBeenCalledWith(
        {
          fetch: undefined,
          fetchMore: expect.any(Function)
        },
        expect.any(Object)
      )
    })
  })

  describe('mutations', () => {
    let store, client, mutations, mutationsArgument, query
    beforeEach(async () => {
      const assets = createTestAssets()
      store = assets.store
      client = assets.client
      query = queryDef(client)
      await store.dispatch(initQuery('allTodos', query))

      mutations = jest.fn().mockReturnValue({
        create: jest.fn(),
        update: jest.fn()
      })

      mount(
        <CozyProvider client={client}>
          <Query
            fetchPolicy="cache-only"
            query={queryDef}
            mutations={mutations}
          >
            {(result, mutations) => {
              mutationsArgument = mutations
              return null
            }}
          </Query>
        </CozyProvider>
      )
    })

    it('should call mutation function with client', () => {
      expect(mutations.mock.calls.length).toBe(1)
      expect(mutations.mock.calls[0][0]).toBe(client)
    })

    it('should pass mutations', () => {
      expect(typeof mutationsArgument.create).toBe('function')
      expect(typeof mutationsArgument.update).toBe('function')
    })

    it('should pass mutations as object', () => {
      const mutations = {
        create: jest.fn(),
        update: jest.fn()
      }

      mount(
        <CozyProvider client={client}>
          <Query
            fetchPolicy="cache-only"
            query={queryDef}
            mutations={mutations}
          >
            {(result, mutations) => {
              mutationsArgument = mutations
              return null
            }}
          </Query>
        </CozyProvider>
      )

      expect(typeof mutationsArgument.create).toBe('function')
      expect(typeof mutationsArgument.update).toBe('function')
    })
  })
})
