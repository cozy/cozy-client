import { applications } from './'
const {
  getAppDisplayName,
  getStoreURL,
  getStoreInstallationURL,
  sortApplicationsList
} = applications

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
      expect(getAppDisplayName({ name_prefix: 'Twake', name: 'Cloud' })).toBe(
        'Cloud'
      )
      expect(getAppDisplayName({ name_prefix: 'Twake', name: 'Twake' })).toBe(
        'Twake'
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
          slug: 'store',
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
          slug: 'store',
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

  describe('sort applications list', () => {
    it('should sort apps according to the given order', () => {
      const availableApps = [
        { slug: 'drive', name: 'Drive' },
        { slug: 'chat', name: 'Chat' },
        { slug: 'mail', name: 'Mail' },
        { slug: 'contacts', name: 'Contacts' },
        { slug: 'password', name: 'Password' }
      ]
      const order = ['chat', 'drive', 'mail', 'password', 'contacts']

      const expected = [
        { slug: 'chat', name: 'Chat' },
        { slug: 'drive', name: 'Drive' },
        { slug: 'mail', name: 'Mail' },
        { slug: 'password', name: 'Password' },
        { slug: 'contacts', name: 'Contacts' }
      ]

      const result = sortApplicationsList(availableApps, order)
      expect(result).toEqual(expected)
    })

    it('should handle apps not in the order array', () => {
      const availableApps = [
        { slug: 'drive', name: 'Drive' },
        { slug: 'chat', name: 'Chat' },
        { slug: 'store', name: 'Store' },
        { slug: 'mail', name: 'Mail' },
        { slug: 'contacts', name: 'Contacts' },
        { slug: 'password', name: 'Password' },
        { slug: 'calendar', name: 'Calendar' }
      ]
      const order = ['chat', 'drive', 'mail', 'password', 'contacts']

      const expected = [
        { slug: 'chat', name: 'Chat' },
        { slug: 'drive', name: 'Drive' },
        { slug: 'mail', name: 'Mail' },
        { slug: 'password', name: 'Password' },
        { slug: 'contacts', name: 'Contacts' },
        { slug: 'store', name: 'Store' },
        { slug: 'calendar', name: 'Calendar' }
      ]

      const result = sortApplicationsList(availableApps, order)
      expect(result).toEqual(expected)
    })

    it('should handle an empty apps array', () => {
      const availableApps = []
      const order = ['chat', 'drive', 'mail', 'password', 'notes', 'contacts']

      const expected = []

      const result = sortApplicationsList(availableApps, order)
      expect(result).toEqual(expected)
    })

    it('should handle an empty order array', () => {
      const availableApps = [
        { slug: 'drive', name: 'Drive' },
        { slug: 'chat', name: 'Chat' },
        { slug: 'store', name: 'Store' },
        { slug: 'mail', name: 'Mail' },
        { slug: 'contacts', name: 'Contacts' },
        { slug: 'password', name: 'Password' }
      ]
      const order = []

      const expected = [
        { slug: 'drive', name: 'Drive' },
        { slug: 'chat', name: 'Chat' },
        { slug: 'store', name: 'Store' },
        { slug: 'mail', name: 'Mail' },
        { slug: 'contacts', name: 'Contacts' },
        { slug: 'password', name: 'Password' }
      ]

      const result = sortApplicationsList(availableApps, order)
      expect(result).toEqual(expected)
    })
  })
})
