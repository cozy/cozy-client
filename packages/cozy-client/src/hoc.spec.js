import React from 'react'
import { mount } from 'enzyme'
import { withClient, queryConnect } from './hoc'
import * as mocks from './__tests__/mocks'

class Component extends React.Component {
  render() {
    return <div />
  }
}

describe('with client', () => {
  it('should pass the client to its children', () => {
    const fakeClient = mocks.client()
    const context = { client: fakeClient }
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
    const observableQueryFromDefinition = definition => {
      return mocks.observableQuery({
        currentResult: () => ({
          data: fakeData[definition.doctype]
        })
      })
    }

    const client = mocks.client({
      all: doctype => queryDefinitionFromDoctype(doctype),
      watchQuery: queryDef => observableQueryFromDefinition(queryDef)
    })

    const context = {
      client
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
