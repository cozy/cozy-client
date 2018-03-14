import CozyLink, { chain } from '../CozyLink'

describe('CozyLink', () => {
  it('should be chainable', () => {
    const link = chain([
      new CozyLink((operation, result = '', forward) => {
        return forward(operation, result + 'foo')
      }),
      new CozyLink((operation, result, forward) => {
        return forward(operation, result + 'bar')
      }),
      (operation, result) => {
        return result + 'baz'
      }
    ])
    expect(link.request('dummyOperation')).toBe('foobarbaz')
  })
})
