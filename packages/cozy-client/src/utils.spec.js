import { cancelable, ResolvablePromise } from './utils'

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

describe('ResolvablePromise', () => {
  it('can resolve', async () => {
    const promise = new ResolvablePromise(resolve => resolve(345))
    await expect(promise).resolves.toBe(345)
  })

  it('can reject', async () => {
    const promise = new ResolvablePromise((resolve, reject) => reject(345))
    await expect(promise).rejects.toBe(345)
  })

  describe('resolve', () => {
    it('resolves the promise', async () => {
      const promise = new ResolvablePromise()
      promise.resolve(345)
      await expect(promise).resolves.toBe(345)
    })

    it('does not change an existing result', async () => {
      const promise = new ResolvablePromise(resolve => resolve(345))
      promise.resolve(999)
      await expect(promise).resolves.toBe(345)
    })

    it('does not resolve a rejected promise', async () => {
      const promise = new ResolvablePromise((resolve, reject) => reject(345))
      promise.resolve(999)
      await expect(promise).rejects.toBe(345)
    })

    it('result is not changed by an internal resolution', async () => {
      let internalResolve
      const promise = new ResolvablePromise(resolve => {
        internalResolve = resolve
      })
      promise.resolve(345)
      internalResolve(999)
      await expect(promise).resolves.toBe(345)
    })

    it('result is not changed by an internal rejection', async () => {
      let internalReject
      const promise = new ResolvablePromise((resolve, reject) => {
        internalReject = reject
      })
      promise.resolve(345)
      internalReject(999)
      await expect(promise).resolves.toBe(345)
    })
  })
  describe('reject', () => {
    it('rejects the promise', async () => {
      const promise = new ResolvablePromise()
      promise.reject(345)
      await expect(promise).rejects.toBe(345)
    })

    it('does not change an existing result', async () => {
      const promise = new ResolvablePromise((resolve, reject) => reject(345))
      promise.reject(999)
      await expect(promise).rejects.toBe(345)
    })

    it('does not resolve a resolved promise', async () => {
      const promise = new ResolvablePromise(resolve => resolve(345))
      promise.reject(999)
      await expect(promise).resolves.toBe(345)
    })

    it('result is not changed by an internal resolution', async () => {
      let internalResolve
      const promise = new ResolvablePromise(resolve => {
        internalResolve = resolve
      })
      promise.reject(345)
      internalResolve(999)
      await expect(promise).rejects.toBe(345)
    })

    it('result is not changed by an internal rejection', async () => {
      let internalReject
      const promise = new ResolvablePromise((resolve, reject) => {
        internalReject = reject
      })
      promise.reject(345)
      internalReject(999)
      await expect(promise).rejects.toBe(345)
    })
  })

  describe('hasResolved', () => {
    it('returns true for an externally resolved promise', () => {
      const promise = new ResolvablePromise()
      promise.resolve()
      expect(promise.hasResolved()).toBeTruthy()
    })

    it('returns true for an internally rejected promise', () => {
      const promise = new ResolvablePromise(resolve => resolve())
      expect(promise.hasResolved()).toBeTruthy()
    })

    it('returns false for a rejected promise', () => {
      const promise = new ResolvablePromise()
      promise.reject()
      expect(promise.hasResolved()).toBeFalsy()
    })

    it('returns false if the resolve comes after a reject', () => {
      const promise = new ResolvablePromise()
      promise.reject()
      promise.resolve()
      expect(promise.hasResolved()).toBeFalsy()

      const secondPromise = new ResolvablePromise((resolve, reject) => reject())
      secondPromise.resolve()
      expect(secondPromise.hasResolved()).toBeFalsy()
    })

    it('returns false if the promise has not resolved', () => {
      const promise = new ResolvablePromise()
      expect(promise.hasResolved()).toBeFalsy()
      promise.resolve()
      expect(promise.hasResolved()).toBeTruthy()
    })
  })

  describe('hasRejected', () => {
    it('returns true for an externally rejected promise', () => {
      const promise = new ResolvablePromise()
      promise.reject()
      expect(promise.hasRejected()).toBeTruthy()
    })

    it('returns true for an internally rejected promise', () => {
      const promise = new ResolvablePromise((resolve, reject) => reject())
      expect(promise.hasRejected()).toBeTruthy()
    })

    it('returns false for a resolved promise', () => {
      const promise = new ResolvablePromise()
      promise.resolve()
      expect(promise.hasRejected()).toBeFalsy()
    })

    it('returns false if the reject comes after a resolve', () => {
      const promise = new ResolvablePromise()
      promise.resolve()
      promise.reject()
      expect(promise.hasRejected()).toBeFalsy()

      const secondPromise = new ResolvablePromise(resolve => resolve())
      secondPromise.reject()
      expect(secondPromise.hasRejected()).toBeFalsy()
    })

    it('returns false if the promise has not rejected', () => {
      const promise = new ResolvablePromise()
      expect(promise.hasRejected()).toBeFalsy()
      promise.reject()
      expect(promise.hasRejected()).toBeTruthy()
    })
  })

  describe('isStillWaiting', () => {
    it('returns true not resolved not rejected promise', () => {
      const promise = new ResolvablePromise()
      expect(promise.isStillWaiting()).toBeTruthy()
      promise.resolve()
    })

    it('returns false for an internally resolved promise', () => {
      const promise = new ResolvablePromise(resolve => resolve())
      expect(promise.isStillWaiting()).toBeFalsy()
    })

    it('returns false for an internally rejected promise', () => {
      const promise = new ResolvablePromise((resolve, reject) => reject())
      expect(promise.isStillWaiting()).toBeFalsy()
    })

    it('returns false for an externally resolved promise', () => {
      const promise = new ResolvablePromise()
      promise.resolve()
      expect(promise.isStillWaiting()).toBeFalsy()
    })

    it('returns false for an externally rejected promise', () => {
      const promise = new ResolvablePromise()
      promise.reject()
      expect(promise.isStillWaiting()).toBeFalsy()
    })
  })
})
