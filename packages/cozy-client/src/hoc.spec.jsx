import React from 'react'
import { mount } from 'enzyme'
import { withClient, queryConnect } from './hoc'
import * as mocks from './__tests__/mocks'
import Provider from './Provider'

import { Q } from 'cozy-client'

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  console.warn.mockRestore()
})

class Component extends React.Component {
  render() {
    return <div />
  }
}

describe('with client', () => {
  it('should give a display name', () => {
    const WithClientComponent = withClient(Component)
    expect(WithClientComponent.displayName).toBe('withClient(Component)')
  })

  it('should work with Provider', () => {
    const client = mocks.client()
    const store = {
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      getState: jest.fn()
    }
    const WithClientComponent = withClient(Component)
    const uut = mount(
      <Provider client={client} store={store}>
        <WithClientComponent />
      </Provider>
    )
    expect(uut.find(Component).prop('client')).toBe(client)
  })
})

describe('queryConnect', () => {
  const setup = () => {
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
      makeObservableQuery: queryDef => observableQueryFromDefinition(queryDef)
    })

    const WithQueries = queryConnect({
      toto: { query: client => Q('io.cozy.toto') },
      tata: { query: client => Q('io.cozy.tata') }
    })(Component)

    return { WithQueries, client }
  }

  it('should give a display name', () => {
    const { WithQueries } = setup()
    expect(WithQueries.displayName).toBe('withQuery(withQuery(Component))')
  })

  it('should pass result of query definitions as props', () => {
    const { WithQueries, client } = setup()
    const context = {
      client
    }
    const uut = mount(<WithQueries />, { context })
    expect(uut.find(Component).prop('toto').data).toBe('hello')
    expect(uut.find(Component).prop('tata').data).toBe('hello2')
  })
})
