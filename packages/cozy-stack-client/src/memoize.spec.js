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
    c = 0
    const counter = async () => {
      c++
      return new Promise(function(resolve, reject) {
        resolve(new ErrorReturned())
      })
    }
    const mcounter = memoize(counter, { key: () => 'A', maxDuration: 5 })
    mcounter()
    expect(c).toEqual(1)
    mcounter()
    //Let's wait the promise resolution
    setTimeout(() => {
      expect(c).toEqual(2)
    }, 10)
  })
})
