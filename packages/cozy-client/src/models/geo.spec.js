const { geodesicDistance, computeSpeed } = require('./geo')

describe('geodesicDistance', () => {
  it('should return 0 for 2 points with same coordinates', () => {
    const p1 = { lat: 0.0, lon: 0.0 }
    const p2 = { lat: 0.0, lon: 0.0 }
    expect(geodesicDistance(p1, p2)).toEqual(0)
  })

  it('should return null when points are not properly formatted', () => {
    expect(geodesicDistance(null, null)).toEqual(null)
    expect(geodesicDistance({ lat: 1.0 }, { lon: 5.6 })).toEqual(null)
  })

  it('should return the correct Paris-NY distance', () => {
    const paris = { lat: 48.8566, lon: 2.3522 }
    const NY = { lat: 40.7128, lon: -74.006 }
    expect(geodesicDistance(paris, NY)).toEqual(5837240.9)
  })
})

describe('speed', () => {
  it('should return 0 when the speed or distance is not set or 0', () => {
    expect(computeSpeed(0, 0)).toEqual(0)
    expect(computeSpeed(10, 0)).toEqual(0)
    expect(computeSpeed(0, 10)).toEqual(0)
    expect(computeSpeed()).toEqual(0)
  })
  it('should return the correct running speed of the developer', () => {
    expect(computeSpeed(10000, 1800)).toEqual(5.56)
  })
})
