import PromiseCache from './promise-cache'

const sleep = delay => new Promise(resolve => setTimeout(resolve, delay))

describe('PromiseCache', () => {
  it('should dedupe several queries with same key', async () => {
    let i = 0
    const cache = new PromiseCache()

    const keyFunc1 = () => 'a'
    const keyFunc2 = () => 'b'

    const promiseFunc = async () => {
      await sleep(1)
      i++
      return i
    }
    const p1 = cache.exec(promiseFunc, keyFunc1)
    const p2 = cache.exec(promiseFunc, keyFunc1)
    const p3 = cache.exec(promiseFunc, keyFunc2)
    const [r1, r2, r3] = await Promise.all([p1, p2, p3])
    expect(r1).toEqual(1)
    expect(r2).toEqual(1)
    expect(r3).toEqual(2)
  })

  it('should return the pending promise if present', () => {
    const cache = new PromiseCache()
    const keyFunc1 = () => 'a'

    const promiseFunc = async () => {
      await sleep(5)
      return 5
    }
    const p1 = cache.exec(promiseFunc, keyFunc1)
    const get = cache.get(keyFunc1)
    expect(p1).toStrictEqual(get)
  })

  it('should return null if there is no pending promise with the key', () => {
    const cache = new PromiseCache()
    const keyFunc1 = () => 'a'

    const get = cache.get(keyFunc1)
    expect(get).toEqual(null)
  })
})
