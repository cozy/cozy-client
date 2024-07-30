import { Q } from 'cozy-client'

import { getIndexFields } from './mango'

describe('mango utils', () => {
  it('should be able to get the fields from the selector', () => {
    const query = Q('io.cozy.rockets').sortBy([{ label: true }, { _id: true }])
    const fields = getIndexFields(query)
    expect(fields).toEqual(['label', '_id'])
  })
})
