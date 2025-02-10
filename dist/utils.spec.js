import { uri, encodePath } from './utils'

describe('uri template tag function', () => {
  it('should encode URI components', () => {
    const doctype = '#foo'
    expect(uri`/data/${doctype}/_all_docs`).toBe('/data/%23foo/_all_docs')
  })
})

describe('encodePath', () => {
  it('should correctly encode a path', () => {
    const path = 'my/path (with special characters)'
    const expected = 'my/path%20%28with%20special%20characters%29'
    expect(encodePath(path)).toBe(expected)
  })

  it('should return an empty string when the path is empty', () => {
    const path = ''
    const expected = ''
    expect(encodePath(path)).toBe(expected)
  })

  it('should correctly encode a path with multiple segments', () => {
    const path = 'my/path/with/multiple/segments (and special characters)'
    const expected =
      'my/path/with/multiple/segments%20%28and%20special%20characters%29'
    expect(encodePath(path)).toBe(expected)
  })
})
