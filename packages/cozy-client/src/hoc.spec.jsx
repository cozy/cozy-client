import React from 'react'
import { mount } from 'enzyme'
import { withClient, queryConnect } from './hoc'
import * as mocks from './__tests__/mocks'
import Provider from './Provider'

import { setupClient } from './testing/utils'
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

const queryConns = {
  simpsons: { query: client => Q('io.cozy.simpsons'), as: 'simpsons' },
  upperSimpsons: {
    query: client => Q('io.cozy.simpsons-upper'),
    as: 'upperSimpsons'
  }
}

describe('queryConnect', () => {
  const setup = () => {
    const client = setupClient()
    const WithQueries = queryConnect({
      simpsons: queryConns.simpsons,
      upperSimpsons: queryConns.upperSimpsons
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
    expect(
      uut
        .find(Component)
        .prop('simpsons')
        .data.map(x => x.name)
    ).toEqual(['Homer', 'Marge'])
    expect(
      uut
        .find(Component)
        .prop('upperSimpsons')
        .data.map(x => x.name)
    ).toEqual(['HOMER', 'MARGE'])
  })
})
