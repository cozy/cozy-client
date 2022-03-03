jest.mock('../CozyClient')

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import configureStore from 'redux-mock-store'
import { mount, shallow } from 'enzyme'

import Provider from '../Provider'
import CozyClient from '../CozyClient'

describe('Provider', () => {
  const client = new CozyClient()
  const store = configureStore()({})

  it('should renders children when passed in', () => {
    const wrapper = shallow(
      <Provider client={client} store={store}>
        <div className="unique" />
      </Provider>
    )
    expect(wrapper.contains(<div className="unique" />)).toBe(true)
  })

  it('should provide the client in the context', () => {
    class FakeComponent extends Component {
      static contextTypes = {
        client: PropTypes.object
      }
      onClick = () => {
        this.context.client.query('foo')
      }
      render() {
        return <button onClick={this.onClick} />
      }
    }
    const wrapper = mount(
      <Provider client={client} store={store}>
        <FakeComponent />
      </Provider>
    )
    wrapper.find('button').simulate('click')
    expect(client.query).toHaveBeenCalledWith('foo')
  })
})
