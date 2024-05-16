import {
  checkCountryCode,
  getAllCountries,
  getAllCountryNames,
  getAllNationalities,
  getCountryNameByCodeISO,
  getEmojiByCountry
} from './countries'

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

describe('getCountryNameByCodeISO', () => {
  it('should return the country name for valid country codes', () => {
    expect(getCountryNameByCodeISO('FR')).toBe('France')
    expect(getCountryNameByCodeISO('fr')).toBe('France')
    expect(getCountryNameByCodeISO('FRA')).toBe('France')
    expect(getCountryNameByCodeISO('fra')).toBe('France')
    expect(getCountryNameByCodeISO('250')).toBe('France')
    expect(getCountryNameByCodeISO('us', { lang: 'fr' })).toBe(
      "États-Unis d'Amérique"
    )
  })

  it('should return null for invalid country codes', () => {
    expect(getCountryNameByCodeISO(undefined)).toBe(null)
    expect(getCountryNameByCodeISO(null)).toBe(null)
    expect(getCountryNameByCodeISO('')).toBe(null)
    expect(getCountryNameByCodeISO('Mercure')).toBe(null)
    expect(getCountryNameByCodeISO('1234')).toBe(null)
  })
})

describe('getAllCountries', () => {
  it('should return array of country names', () => {
    const countries = getAllCountries()
    expect(countries).toEqual(
      expect.arrayContaining([
        {
          code2: 'FR',
          code3: 'FRA',
          number: '250',
          name: 'France',
          nationality: 'French'
        },
        {
          code2: 'US',
          code3: 'USA',
          number: '840',
          name: 'United States of America',
          nationality: 'American'
        }
      ])
    )
  })

  it('should return array of country names in spécific lang', () => {
    const countries = getAllCountries('fr')
    expect(countries).toEqual(
      expect.arrayContaining([
        {
          code2: 'FR',
          code3: 'FRA',
          number: '250',
          name: 'France',
          nationality: 'Français'
        },
        {
          code2: 'US',
          code3: 'USA',
          number: '840',
          name: "États-Unis d'Amérique",
          nationality: 'Américain'
        }
      ])
    )
  })
})

describe('getAllCountryNames', () => {
  it('should return array of country names', () => {
    const countryNames = getAllCountryNames()
    expect(countryNames).toEqual(
      expect.arrayContaining(['Andorra', 'United States of America'])
    )
  })

  it('should return array of country names in spécific lang', () => {
    const countryNames = getAllCountryNames('fr')
    expect(countryNames).toEqual(
      expect.arrayContaining(['Andorre', "États-Unis d'Amérique"])
    )
  })
})

describe('getAllNationalities', () => {
  it('should return array of country names', () => {
    const nationalities = getAllNationalities()
    expect(nationalities).toEqual(
      expect.arrayContaining(['French', 'American'])
    )
  })

  it('should return array of country names in spécific lang', () => {
    const nationalities = getAllNationalities('fr')
    expect(nationalities).toEqual(
      expect.arrayContaining(['Français', 'Américain'])
    )
  })
})
