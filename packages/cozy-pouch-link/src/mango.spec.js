import CozyClient from 'cozy-client'

import { getIndexFields } from './mango'
import { SCHEMA } from './__tests__/fixtures'

describe('mango utils', () => {
  const client = new CozyClient({
    schema: SCHEMA
  })

  it('should be able to get the fields from the selector', () => {
    const query = client
      .all('io.cozy.rockets')
      .sortBy([{ label: true }, { _id: true }])
    const fields = getIndexFields(query)
    expect(fields).toEqual(['_id', 'label'])
  })
})
