import CozyStackLink from '..'

const FAKE_RESPONSE = {
  offset: 0,
  rows: [{ id: '12345', label: 'Buy bread', done: false }],
  total_rows: 1
}

describe('CozyStackLink', () => {
  describe('fetch', () => {
    const link = new CozyStackLink({
      uri: 'http://cozy.tools:8080',
      token: 'aAbBcCdDeEfFgGhH'
    })

    beforeAll(() => {
      global.fetch = require('jest-fetch-mock')
      fetch.mockResponse(JSON.stringify(FAKE_RESPONSE), {
        headers: { 'Content-Type': 'application/json' }
      })
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

    it('should return JSON', async () => {
      const resp = await link.fetch('GET', '/data/io.cozy.todos')
      expect(resp).toEqual(FAKE_RESPONSE)
    })
  })
})
