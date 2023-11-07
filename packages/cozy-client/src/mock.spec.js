import { createMockClient } from './mock'

import { Q } from 'cozy-client'

describe('createMockClient', () => {
  const simpsonsFixture = [
    { _id: 'homer', name: 'Homer' },
    { _id: 'marge', name: 'Marge' }
  ]

  it('should mock queries inside the store', () => {
    const client = createMockClient({
      queries: {
        simpsons: {
          data: simpsonsFixture,
          doctype: 'io.cozy.simpsons'
        },
        simpsonsError: {
          doctype: 'io.cozy.simpsons',
          queryError: new Error('some error')
        }
      }
    })
    expect(
      client.getCollectionFromState('io.cozy.simpsons').map(x => x._id)
    ).toEqual(['homer', 'marge'])
    expect(client.getQueryFromState('simpsons').data.map(x => x._id)).toEqual([
      'homer',
      'marge'
    ])
    const errorQuery = client.getQueryFromState('simpsonsError')
    expect(errorQuery.fetchStatus).toBe('failed')
    expect(errorQuery.lastError).toStrictEqual(new Error('some error'))
  })

  it('should mock query with data passed in "remote" option', async () => {
    const client = createMockClient({
      remote: {
        'io.cozy.simpsons': simpsonsFixture
      }
    })
    const simpsons = await client.query(Q('io.cozy.simpsons'))
    await expect(simpsons.data.map(x => x._id)).toEqual(['homer', 'marge'])
  })

  it('should mock query even if the doctype has not been mocked', async () => {
    const client = createMockClient({
      remote: {
        'io.cozy.simpsons': simpsonsFixture
      }
    })
    const simpsons = await client.query(Q('io.cozy.adams'))
    await expect(simpsons.data.map(x => x._id)).toEqual([])
  })
})
