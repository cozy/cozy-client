import { cancelable } from './utils'

describe('cancelable', () => {
  const setup = () => {
    let original, resolve, reject
    original = new Promise((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })
    const wrapped = cancelable(original)
    return { resolve, reject, wrapped }
  }

  it('should resolve with the result of the promise', done => {
    const { resolve, wrapped } = setup()
    expect.assertions(1)
    wrapped.then(res => {
      expect(res).toBe(5)
      done()
    })
    resolve(5)
  })

  it('should reject with the rejection of the promise', done => {
    jest.spyOn(console, 'log').mockImplementation()
    const error = 'normal-rejection-from-cancelable-test'
    const { reject, wrapped } = setup()
    expect.assertions(1)
    wrapped.catch(res => {
      expect(res).toBe(error)
      done()
    })
    reject(error)
  })

  it('should reject with canceled: true if canceled', done => {
    const { wrapped } = setup()
    expect.assertions(1)
    wrapped.catch(res => {
      expect(res).toEqual({ canceled: true })
      done()
    })
    wrapped.cancel()
  })
})
