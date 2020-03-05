import React from 'react'
import { renderHook } from '@testing-library/react-hooks'

import useQuery from './useQuery'
import { Q } from '../queries/dsl'
import ClientProvider from '../Provider'
import { Provider as ReduxProvider } from 'react-redux'

import { createMockClient } from '../mock'
import simpsonsFixture from '../testing/simpsons.json'

describe('use query', () => {
  const setup = ({ queryDefinition, queryOptions }) => {
    const client = createMockClient({
      queries: {
        simpsons: {
          data: simpsonsFixture,
          doctype: 'io.cozy.simpsons'
        }
      }
    })
    client.ensureStore()
    const wrapper = ({ children }) => (
      <ReduxProvider store={client.store}>
        <ClientProvider client={client}>{children}</ClientProvider>
      </ReduxProvider>
    )
    const hookResult = renderHook(
      () => useQuery(queryDefinition, queryOptions),
      {
        wrapper
      }
    )
    return { client, hookResult }
  }

  it('should return the correct data', () => {
    const {
      hookResult: {
        result: { current }
      }
    } = setup({
      queryOptions: {
        as: 'simpsons'
      },
      queryDefinition: () => Q('io.cozy.simpsons')
    })
    expect(current).toMatchObject({
      data: [
        expect.objectContaining({ name: 'Homer' }),
        expect.objectContaining({ name: 'Marge' })
      ],
      definition: expect.objectContaining({
        doctype: 'io.cozy.simpsons'
      })
    })
  })
})
