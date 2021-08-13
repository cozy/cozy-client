import { uri } from './utils'

describe('uri template tag function', () => {
  it('should encode URI components', () => {
    const doctype = '#foo'
    expect(uri`/data/${doctype}/_all_docs`).toBe('/data/%23foo/_all_docs')
  })
})
