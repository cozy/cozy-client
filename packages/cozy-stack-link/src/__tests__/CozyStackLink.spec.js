import CozyStackLink, { FetchError } from '../CozyStackLink'
import DocumentCollection from '../DocumentCollection'

const FAKE_RESPONSE = {
  offset: 0,
  rows: [{ id: '12345', label: 'Buy bread', done: false }],
  total_rows: 1
}

const FAKE_INIT_OPTIONS = {
  uri: 'http://cozy.tools:8080',
  token: 'aAbBcCdDeEfFgGhH'
}

describe('CozyStackLink', () => {
  describe('collection', () => {
    const link = new CozyStackLink(FAKE_INIT_OPTIONS)

    it('should return a DocumentCollection by default', () => {
      expect(link.collection('io.cozy.todos')).toBeInstanceOf(
        DocumentCollection
      )
    })
  })

  describe('fetch', () => {
    const link = new CozyStackLink(FAKE_INIT_OPTIONS)

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

    it('should throw a FetchError when the request fails', async () => {
      fetch.mockRejectOnce(new Error('404 (Not found)'))
      expect.assertions(2)
      try {
        await link.fetch('GET', '/foo/bar')
      } catch (e) {
        expect(e).toBeInstanceOf(Error)
        // expect(e.name).toBe('FetchError')
        expect(e.message).toMatch(/Not/)
      }
    })
  })
})
