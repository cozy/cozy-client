import React from 'react'
import { mount } from 'enzyme'
import { withClient, queryConnect } from './hoc'

describe('with client', () => {
  it('should pass the client to its children', () => {
    const fakeClient = {}
    const context = { client: fakeClient }
    class Component extends React.Component {
      render() {
        return <div />
      }
    }
    const WithClientComponent = withClient(Component)
    const uut = mount(<WithClientComponent />, { context })
    expect(uut.find(Component).prop('client')).toBe(fakeClient)
  })
})

describe('queryConnect', () => {
  it('should pass result of query definitions as props', () => {
    const fakeData = {
      'io.cozy.toto': 'hello',
      'io.cozy.tata': 'hello2'
    }
    const queryDefinitionFromDoctype = doctype => ({ doctype })
    const observableQueryFromDefinition = definition => ({
      create: jest.fn(),
      save: jest.fn(),
      destroy: jest.fn(),
      getAssociation: jest.fn(),
      fetchMore: jest.fn(),
      currentResult: () => ({ data: fakeData[definition.doctype] }),
      subscribe: () => jest.fn()
    })
    const context = {
      client: {
        query: () => {},
        all: doctype => queryDefinitionFromDoctype(doctype),
        watchQuery: queryDef => observableQueryFromDefinition(queryDef)
      }
    }
    class Component extends React.Component {
      render() {
        return <div />
      }
    }
    const WithQueries = queryConnect({
      toto: { query: client => client.all('io.cozy.toto') },
      tata: { query: client => client.all('io.cozy.tata') }
    })(Component)
    const uut = mount(<WithQueries />, { context })
    expect(uut.find(Component).prop('toto').data).toBe('hello')
    expect(uut.find(Component).prop('tata').data).toBe('hello2')
  })
})
