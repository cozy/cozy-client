import { selectorFilter } from './mango'

describe('mango selector', () => {
  it('should build filter function from mango (simple)', () => {
    const filter = selectorFilter({
      a: 5,
      b: 2
    })
    expect(filter({ a: 5, b: 2 })).toBe(true)
    expect(filter({ a: 5, b: 2, c: 10 })).toBe(true)
    expect(filter({ a: 5 })).toBe(false)
  })

  it('should build filter function from mango (booleans)', () => {
    const filter = selectorFilter({
      a: false,
      b: 2
    })
    expect(filter({ a: false, b: 2 })).toBe(true)
    expect(filter({ a: true, b: 2, c: 10 })).toBe(false)
    expect(filter({ a: 5 })).toBe(false)
  })

  it('should build filter function from mango ($gt and $lt)', () => {
    const filter = selectorFilter({
      a: {
        $gt: 10
      },
      b: {
        $gt: 10,
        $lt: 20
      }
    })
    expect(filter({ a: 20, b: 15 })).toBe(true)
    expect(filter({ a: 20, b: 30 })).toBe(false)
    expect(filter({ a: 5, b: 15 })).toBe(false)
  })

  it('should build filter function from mango ($ne)', () => {
    const filter = selectorFilter({
      a: {
        $ne: 10
      }
    })
    expect(filter({ a: 20 })).toBe(true)
    expect(filter({ a: 10 })).toBe(false)
  })
})
