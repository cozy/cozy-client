import React from 'react'
import { mount } from 'enzyme'

import Query from './Query' 

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
  const queryDef = client => ({ doctype: 'io.cozy.unused' })
  const client = {
    watchQuery: queryDef => fakeQuery(),
    query: jest.fn()
  }
  const context = { client }

  beforeEach(() => {
    client.query.mockClear()
  })

  it('should fire a query fetch when mounted', () => {
    const uut = mount(<Query query={queryDef} children={() => null}/>, { context })
    expect(client.query).toHaveBeenCalled()
  })

  it('should not fire a query fetch when mounted with initialFetch=false', () => {
    const uut = mount(<Query query={queryDef} children={() => null} fetchPolicy='cache-only' />, { context })
    expect(client.query).not.toHaveBeenCalled()
  })

  it('should be refreshed when relevant results are updated', () => {

  })
})
