import React from 'react'
import useClient from './useClient'
import Provider from '../Provider'
import { screen, render } from '@testing-library/react'

describe('useClient', () => {
  const Component = () => {
    const client = useClient()
    return <div>{client.stackClient.uri}</div>
  }
  it('should get the client from the nearest Provider', () => {
    const client = { stackClient: { uri: 'https://test.mycozy.cloud' } }
    render(
      <Provider client={client}>
        <Component />
      </Provider>
    )

    screen.getByText('https://test.mycozy.cloud')
  })
})
