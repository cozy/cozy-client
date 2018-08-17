import { union, difference, intersection } from './setUtils'

describe('set utils', () => {
  it('should do union', () => {
    const s1 = new Set([1, 2, 3])
    const s2 = new Set([4, 5, 6])
    expect(Array.from(union(s1, s2)).sort()).toEqual([1, 2, 3, 4, 5, 6])
  })
  it('should do difference', () => {
    const s1 = new Set([1, 2, 3, 4])
    const s2 = new Set([2, 3])
    expect(Array.from(difference(s1, s2)).sort()).toEqual([1, 4])
  })
  it('should do difference', () => {
    const s1 = new Set([1, 2, 3, 4])
    const s2 = new Set([2, 3])
    expect(Array.from(intersection(s1, s2)).sort()).toEqual([2, 3])
  })
})
