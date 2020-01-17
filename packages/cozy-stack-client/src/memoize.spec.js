import memoize, { ErrorReturned } from './memoize'

describe('memoize', () => {
  let now
  let c
  beforeEach(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => now)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should remember results ', () => {
    now = 0
    c = 0
    const counter = () => c++
    const mcounter = memoize(counter, { key: () => 'A', maxDuration: 5 })
    expect(mcounter()).toBe(0)
    expect(mcounter()).toBe(0)
    now = 6
    expect(mcounter()).toBe(1)
    expect(mcounter()).toBe(1)
  })

  it('should not memoize the result if an error occurs', async () => {
    now = 0
    let callCounter = 0

    // This counter always returns an error, so it will never be memoized
    const counter = async () => {
      callCounter++
      return new ErrorReturned()
    }
    const mcounter = memoize(counter, { key: () => 'A', maxDuration: 5 })
    await mcounter()
    expect(callCounter).toEqual(1)
    await mcounter()
    expect(callCounter).toEqual(2)
  })
})
