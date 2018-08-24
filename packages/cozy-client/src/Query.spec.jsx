import React from 'react'
import { mount } from 'enzyme'
import CozyProvider from './Provider'

import Query from './Query'
import { createTestAssets, queryResultFromData } from './__tests__/utils'
import { initQuery, receiveQueryResult } from './store'
import { TODOS } from './__tests__/fixtures'

describe('Query', () => {
  const fakeQuery = () => ({
    create: jest.fn(),
    save: jest.fn(),
    destroy: jest.fn(),
    getAssociation: jest.fn(),
    fetchMore: jest.fn(),
    currentResult: jest.fn(),
    subscribe: jest.fn().mockReturnValue(() => {})
  })
  const queryDef = client => ({ doctype: 'io.cozy.todos' })
  const client = {
    watchQuery: queryDef => fakeQuery(),
    query: jest.fn()
  }
  const context = { client }

  beforeEach(() => {
    client.query.mockClear()
  })

  describe('lifecycle', () => {
    it('should fire a query fetch when mounted', () => {
      mount(<Query query={queryDef}>{() => null}</Query>, {
        context
      })
      expect(client.query).toHaveBeenCalled()
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
  })
})
