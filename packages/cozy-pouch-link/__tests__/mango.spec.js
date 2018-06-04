import { getIndexFields } from '../src/mango'
import CozyClient from 'cozy-client'
import { TODO_SCHEMA } from './fixtures'

describe('mango utils', () => {
  const client = new CozyClient({
    schema: TODO_SCHEMA
  })

  it('should be able to get the fields from the selector', () => {
    const query = client
      .all('io.cozy.rockets')
      .sortBy([{ label: true }, { _id: true }])
    const fields = getIndexFields(query)
    expect(fields).toEqual(['_id', 'label'])
  })
})
