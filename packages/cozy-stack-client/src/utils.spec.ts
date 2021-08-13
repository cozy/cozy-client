import { uri, formatBytes } from './utils'

describe('uri template tag function', () => {
  it('should encode URI components', () => {
    const doctype = '#foo'
    expect(uri`/data/${doctype}/_all_docs`).toBe('/data/%23foo/_all_docs')
  })
  it('should convert bytes to a better unit', () => {
    expect(formatBytes('1024')).toEqual('1 KB')
    expect(formatBytes('1026')).toEqual('1 KB')
    expect(formatBytes('1024000')).toEqual('1000 KB')
    expect(formatBytes('1024040')).toEqual('1000.04 KB')
    expect(formatBytes('102404500404')).toEqual('95.37 GB')
  })
  it('should give the right decimal', () => {
    expect(formatBytes('102404500404', 5)).toEqual('95.37162 GB')
  })
})
