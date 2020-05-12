import React from 'react'
import { renderHook } from '@testing-library/react-hooks'

import useQuery, { useQueries } from './useQuery'
import { Q } from '../queries/dsl'
import ClientProvider from '../Provider'
import { Provider as ReduxProvider } from 'react-redux'

import { createMockClient } from '../mock'
import simpsonsFixture from '../testing/simpsons.json'

const setupClient = () => {
  const client = createMockClient({
    queries: {
      simpsons: {
        data: simpsonsFixture,
        doctype: 'io.cozy.simpsons'
      },
      upperSimpsons: {
        data: simpsonsFixture.map(x => ({ ...x, name: x.name.toUpperCase() })),
        doctype: 'io.cozy.simpsons-upper'
      }
    }
  })
  client.ensureStore()
  return client
}

const makeWrapper = client => ({ children }) => (
  <ReduxProvider store={client.store}>
    <ClientProvider client={client}>{children}</ClientProvider>
  </ReduxProvider>
)

const setupQuery = ({ queryDefinition, queryOptions }) => {
  const client = setupClient()
  const hookResult = renderHook(() => useQuery(queryDefinition, queryOptions), {
    wrapper: makeWrapper(client)
  })
  return { client, hookResult }
}

const setupQueries = ({ querySpecs }) => {
  const client = setupClient()
  const hookResult = renderHook(() => useQueries(querySpecs), {
    wrapper: makeWrapper(client)
  })
  return { client, hookResult }
}

describe('use query', () => {
  it('should return the correct data', () => {
    const {
      hookResult: {
        result: { current }
      }
    } = setupQuery({
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

describe('use queries', () => {
  it('should return the correct data', () => {
    const {
      hookResult: {
        result: { current }
      }
    } = setupQueries({
      querySpecs: {
        simpsons: {
          query: () => Q('io.cozy.simpsons'),
          as: 'simpsons'
        },
        upperSimpsons: {
          query: () => Q('io.cozy.simpsons-upper'),
          as: 'upperSimpsons'
        }
      }
    })
    expect(current).toMatchObject({
      simpsons: {
        data: [
          expect.objectContaining({ name: 'Homer' }),
          expect.objectContaining({ name: 'Marge' })
        ],
        definition: expect.objectContaining({
          doctype: 'io.cozy.simpsons'
        })
      },
      upperSimpsons: {
        data: [
          expect.objectContaining({ name: 'HOMER' }),
          expect.objectContaining({ name: 'MARGE' })
        ],
        definition: expect.objectContaining({
          doctype: 'io.cozy.simpsons-upper'
        })
      }
    })
  })
})
