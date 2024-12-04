import { checkCountryCode } from './countries'

describe('checkCountryCode', () => {
  it('should return true for valid country codes', () => {
    expect(checkCountryCode('FR')).toBe(true)
    expect(checkCountryCode('fr')).toBe(true)
    expect(checkCountryCode('FRA')).toBe(true)
    expect(checkCountryCode('fra')).toBe(true)
    expect(checkCountryCode('US')).toBe(true)
    expect(checkCountryCode('us')).toBe(true)
  })

  it('should return false for invalid country codes', () => {
    expect(checkCountryCode(undefined)).toBe(false)
    expect(checkCountryCode(null)).toBe(false)
    expect(checkCountryCode('')).toBe(false)
  })
})
