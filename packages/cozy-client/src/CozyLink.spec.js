import CozyLink, { chain } from './CozyLink'

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

  describe('default last link', () => {
    it('should throw an error when called without result', () => {
      const link = chain([
        new CozyLink((operation, result = '', forward) => {
          return forward(operation)
        })
      ])
      expect(() =>
        link.request('dummyOperation')
      ).toThrowErrorMatchingSnapshot()
    })

    it('should return the final result if tehre is one', () => {
      const link = chain([
        new CozyLink((operation, result, forward) => {
          return forward(operation, 'foo')
        })
      ])

      expect(link.request('dummyOperation')).toBe('foo')
    })

    it('should call the custom execution function', () => {
      const link = chain([
        new CozyLink((operation, result = '', forward) => {
          return forward(operation)
        })
      ])
      const spyFn = jest.fn(() => 'bar')
      expect(
        link.request({
          type: 'dummyOperation',
          execute: spyFn
        })
      ).toBe('bar')
      expect(spyFn).toHaveBeenCalled()
    })
  })
})
