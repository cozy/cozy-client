import { applications } from './'
const { getAppDisplayName } = applications

describe('applications model', () => {
  describe('application name', () => {
    it('should return names', () => {
      expect(getAppDisplayName({ name_prefix: 'Test', name: 'App' })).toBe(
        'Test App'
      )
      expect(getAppDisplayName({ name_prefix: '', name: 'App' })).toBe('App')
      expect(getAppDisplayName({ name: 'App' })).toBe('App')
      expect(getAppDisplayName({ name_prefix: '', name: 'My App' })).toBe(
        'My App'
      )
      expect(getAppDisplayName({ name_prefix: 'Cozy', name: 'Cloud' })).toBe(
        'Cloud'
      )
      expect(getAppDisplayName({ name_prefix: 'Cozy', name: 'Cozy' })).toBe(
        'Cozy'
      )
    })

    it('should support translations', () => {
      const lang = 'fr'
      expect(
        getAppDisplayName(
          {
            name_prefix: 'Test',
            name: 'One',
            locales: {
              fr: {
                name_prefix: 'Essai',
                name: 'Un'
              }
            }
          },
          lang
        )
      ).toBe('Essai Un')
      expect(
        getAppDisplayName(
          {
            name_prefix: 'Test',
            name: 'One',
            locales: {
              fr: {
                name: 'Un'
              }
            }
          },
          lang
        )
      ).toBe('Test Un')
      expect(
        getAppDisplayName(
          {
            name_prefix: 'Test',
            name: 'One',
            locales: {
              fr: {
                name_prefix: 'Essai'
              }
            }
          },
          lang
        )
      ).toBe('Essai One')
      expect(
        getAppDisplayName(
          {
            name_prefix: 'Test',
            name: 'One',
            locales: {
              de: {
                name_prefix: 'Versuch'
              }
            }
          },
          lang
        )
      ).toBe('Test One')
    })
  })
})
