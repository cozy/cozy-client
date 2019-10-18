import React from 'react'
import useClient from './useClient'
import Provider from '../Provider'
import { mount } from 'enzyme'

describe('useClient', () => {
  const Component = () => {
    const client = useClient()
    return <div>{client.stackClient.uri}</div>
  }
  it('should work', () => {
    const client = { stackClient: { uri: 'https://test.mycozy.cloud' } }
    const root = mount(
      <Provider client={client}>
        <Component />
      </Provider>
    )
    expect(root.html()).toBe('<div>https://test.mycozy.cloud</div>')
  })
})
