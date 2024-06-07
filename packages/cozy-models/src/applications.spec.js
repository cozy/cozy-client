import { applications } from './'
const { getAppDisplayName, getStoreURL, getStoreInstallationURL } = applications

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

  describe('get store url', () => {
    const contactsApp = { slug: 'contacts' }

    describe('when the store app is not installed', () => {
      it('should return null', () => {
        expect(getStoreURL([], contactsApp)).toBe(null)
      })
    })

    describe('when the store app is installed', () => {
      it('should return the store url for the given app', () => {
        const storeApp = {
          attributes: {
            slug: 'store'
          },
          links: {
            related: 'http://store.cozy.tools:8080/'
          }
        }
        expect(getStoreURL([storeApp], contactsApp)).toBe(
          'http://store.cozy.tools:8080/#/discover/contacts'
        )
      })
    })
  })

  describe('get store installation url', () => {
    const contactsApp = { slug: 'contacts' }

    describe('when the store app is not installed', () => {
      it('should return null', () => {
        expect(getStoreInstallationURL([], contactsApp)).toBe(null)
      })
    })

    describe('when the store app is installed', () => {
      it('should return the store installation url for the given app', () => {
        const storeApp = {
          attributes: {
            slug: 'store'
          },
          links: {
            related: 'http://store.cozy.tools:8080/'
          }
        }
        expect(getStoreInstallationURL([storeApp], contactsApp)).toBe(
          'http://store.cozy.tools:8080/#/discover/contacts/install'
        )
      })
    })
  })
})
