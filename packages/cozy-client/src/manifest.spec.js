import { sanitizeCategories, sanitize as sanitizeManifest } from './manifest'

describe('sanitizeCategories', () => {
  it('should return the list of the provided expected categories correctly', () => {
    // all of these categories is authorized by config/categories.json
    // so it won't be filtered
    const categories = [
      'cozy',
      'isp',
      'partners',
      'press',
      'shopping',
      'telecom'
    ]
    expect(sanitizeCategories(categories)).toEqual(categories)
  })
  it('should filter unwanted categories', () => {
    // pressingggg is not allowed as category
    const categories = [
      'cozy',
      'isp',
      'partners',
      'pressingggg',
      'shopping',
      'telecom'
    ]
    expect(sanitizeCategories(categories)).toEqual(
      categories.filter(c => c !== 'pressingggg')
    )
  })
  it('should return "others" as category if no categories provided', () => {
    expect(sanitizeCategories([])).toEqual(['others'])
    expect(sanitizeCategories(null)).toEqual(['others'])
  })
  it('should return "others" as category if categories after filtering is empty', () => {
    // pressingggg is not allowed as category
    expect(sanitizeCategories(['pressingggg'])).toEqual(['others'])
  })
})

describe('sanitizeManifest', () => {
  const baseMan = { slug: 'mock' }

  it('should handle legacy category property', () => {
    const testCategory = 'cozy'
    expect(
      sanitizeManifest({ slug: 'mock', category: testCategory })
    ).toStrictEqual({
      slug: 'mock',
      categories: [testCategory]
    })
  })
  it('should handle legacy name property locales ("en" only)', () => {
    const testName = 'Mock'
    expect(
      sanitizeManifest({
        slug: 'mock',
        name: {
          en: testName
        }
      })
    ).toEqual(
      expect.objectContaining({
        slug: 'mock',
        name: testName
      })
    )
  })

  it('should transform available_version property to availableVersion', () => {
    const testVersion = '3.0.0'
    const man = sanitizeManifest({
      slug: 'mock',
      available_version: testVersion
    })
    expect(man.availableVersion).toBe('3.0.0')
    expect(man).not.toHaveProperty('available_version')
  })

  describe('terms', () => {
    it('should remove incomplete terms', () => {
      const incompleteTerms = {
        id: 'mock-terms'
      }
      expect(
        sanitizeManifest({ ...baseMan, terms: incompleteTerms })
      ).not.toHaveProperty('terms')
      expect(sanitizeManifest({ ...baseMan, terms: {} })).not.toHaveProperty(
        'terms'
      )
    })

    it('should keep complete terms', () => {
      const completeTerms = {
        id: 'mock-terms',
        url: 'mock://terms',
        version: 'mock001'
      }
      const man = { ...baseMan, terms: completeTerms }

      expect(sanitizeManifest(man)).toEqual(expect.objectContaining(man))
    })
  })

  describe('partnership', () => {
    it('should remove incomplete', () => {
      const incompletePartnership = {
        icon: 'icon.svg' // icon is optional
      }

      expect(
        sanitizeManifest({
          ...baseMan,
          partnership: {}
        })
      ).not.toHaveProperty('partnership')

      expect(
        sanitizeManifest({
          ...baseMan,
          partnership: incompletePartnership
        })
      ).not.toHaveProperty('partnership')
    })

    it('should keep complete', () => {
      const completePartnership = {
        description: 'A partnership text here' // description is mandatory
      }

      const man = { ...baseMan, partnership: completePartnership }
      expect(sanitizeManifest(man)).toEqual(expect.objectContaining(man))
    })
  })
})
