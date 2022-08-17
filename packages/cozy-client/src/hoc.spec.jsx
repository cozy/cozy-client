import React, { useState } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { mount } from 'enzyme'

import { withClient, queryConnect, queryConnectFlat } from './hoc'
import { Q } from './queries/dsl'
import Provider from './Provider'
import logger from './logger'
// At some point __tests__/mocks and testing/utils shall be reconciled
import * as mocks from './__tests__/mocks'
import { setupClient } from './testing/utils'

beforeEach(() => {
  jest.spyOn(logger, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  logger.warn.mockRestore()
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

  it('should be possible to pass props', () => {
    const WithQuery = queryConnect({
      simpson: props => ({
        query: Q('io.cozy.simpsons').getById(props.simpsonId),
        as: `simpsons/${props.simpsonId}`
      })
    })(Component)
    const client = setupClient()
    const Wrapper = ({ client }) => {
      const [id, setId] = useState('marge')
      return (
        <Provider client={client}>
          <div>
            <WithQuery simpsonId={id} />
            <button onClick={() => setId('homer')}>change to homer</button>
          </div>
        </Provider>
      )
    }
    const uut = mount(<Wrapper client={client} />)
    const props = uut.find('Query').props()
    expect(props.query).toEqual(
      expect.objectContaining({
        id: 'marge'
      })
    )
    uut.find('button').simulate('click')
    uut.update()
    const props2 = uut.find('Query').props()
    expect(props2.query).toEqual(
      expect.objectContaining({
        id: 'homer'
      })
    )
  })
})

describe('queryConnectFlat', () => {
  const setup = () => {
    const client = setupClient()
    const WithQueries = queryConnectFlat({
      simpsons: queryConns.simpsons,
      upperSimpsons: queryConns.upperSimpsons
    })(Component)
    return { WithQueries, client }
  }

  it('should give a display name', () => {
    const { WithQueries } = setup()
    expect(WithQueries.displayName).toBe('queryConnectFlat(Component)')
  })

  it('should pass result of query definitions as props', () => {
    const { WithQueries, client } = setup()
    const uut = mount(
      <ReduxProvider store={client.store}>
        <Provider client={client}>
          <WithQueries />
        </Provider>
      </ReduxProvider>
    )
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

  it('should have Component as direct children of queryConnectFlag', () => {
    const { WithQueries, client } = setup()
    const uut = mount(
      <ReduxProvider store={client.store}>
        <Provider client={client}>
          <WithQueries />
        </Provider>
      </ReduxProvider>
    )
    const queryConnectFlatComponent = uut.find('queryConnectFlat(Component)')
    expect(queryConnectFlatComponent.length).toBe(1)
    expect(queryConnectFlatComponent.children().is('Component')).toBe(true)
  })
})
