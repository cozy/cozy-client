import CozyStackLink from '..'

describe('CozyStackLink', () => {
  describe('fetch', () => {
    const link = new CozyStackLink({
      uri: 'http://cozy.tools:8080',
      token: 'aAbBcCdDeEfFgGhH'
    })

    beforeAll(() => {
      global.fetch = jest.fn(() => Promise.resolve())
    })

    it('should ask for JSON by default', async () => {
      const resp = await link.fetch('GET', '/data/io.cozy.todos')
      expect(fetch).toHaveBeenCalledWith(
        'http://cozy.tools:8080/data/io.cozy.todos',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer aAbBcCdDeEfFgGhH'
          }
        }
      )
    })
  })
})
