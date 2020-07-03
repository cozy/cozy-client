import { renderHook } from '@testing-library/react-hooks'

import useQuery, { useQueries } from './useQuery'
import { Q } from '../queries/dsl'

import { setupClient, makeWrapper } from '../testing/utils'
import simpsonsFixture from '../testing/simpsons.json'

const setupQuery = ({ queryDefinition, queryOptions, storeQueries }) => {
  const client = setupClient({ queries: storeQueries })
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

  it('fetches more results with bookmark', async () => {
    const bookmark = 'bookmark-123'
    const queryDefinition = Q('io.cozy.simpsons').offsetBookmark(bookmark)
    const {
      hookResult: {
        result: { current }
      },
      client
    } = setupQuery({
      queryOptions: {
        as: 'simpsonsBookmarked'
      },
      queryDefinition: () => queryDefinition,
      storeQueries: {
        simpsonsBookmarked: {
          data: simpsonsFixture,
          doctype: 'io.cozy.simpsons',
          definition: queryDefinition
        }
      }
    })

    const fetchMoreResult = await current.fetchMore()
    const lastCallArgs =
      client.query.mock.calls[client.query.mock.calls.length - 1][0]
    expect(lastCallArgs).toMatchObject({ bookmark: 'bookmark-123' })
    expect(fetchMoreResult).toEqual({ data: null })
  })

  it('fetches more results with skip', async () => {
    const {
      hookResult: {
        result: { current }
      },
      client
    } = setupQuery({
      queryOptions: {
        as: 'simpsons'
      },
      queryDefinition: () => Q('io.cozy.simpsons')
    })

    const fetchMoreResult = await current.fetchMore()
    const lastCallArgs =
      client.query.mock.calls[client.query.mock.calls.length - 1][0]
    expect(lastCallArgs).toMatchObject({ skip: current.data.length })
    expect(fetchMoreResult).toEqual({ data: null })
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
