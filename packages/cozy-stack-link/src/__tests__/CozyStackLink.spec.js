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
  it('should normalize the provided uri', () => {
    const link = new CozyStackLink({
      uri: 'http://cozy.tools:8080//',
      token: ''
    })
    expect(link.fullpath('/foo')).toBe('http://cozy.tools:8080/foo')
  })

  describe('collection', () => {
    const link = new CozyStackLink(FAKE_INIT_OPTIONS)

    it('should return a DocumentCollection by default', () => {
      expect(link.collection('io.cozy.todos')).toBeInstanceOf(
        DocumentCollection
      )
    })

    it('should throw if the doctype is undefined', () => {
      expect(() => link.collection()).toThrow()
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

    it('should stringify a JSON payload', async () => {
      const resp = await link.fetch('POST', '/data/io.cozy.todos', {
        label: 'Buy bread'
      })
      expect(fetch).toHaveBeenCalledWith(
        'http://cozy.tools:8080/data/io.cozy.todos',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer aAbBcCdDeEfFgGhH',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            label: 'Buy bread'
          })
        }
      )
    })

    it('should not transform the payload if a Content-Type header has been set', async () => {
      const body = 'foo=bar'
      const resp = await link.fetch('POST', '/data/io.cozy.todos/foo', body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      expect(fetch).toHaveBeenCalledWith(
        'http://cozy.tools:8080/data/io.cozy.todos/foo',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer aAbBcCdDeEfFgGhH',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body
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

describe('FetchError', () => {
  it('should have HTTP info about the error', () => {
    const error = new FetchError(
      {
        url: 'http://cozy.tools:8080/data/io.cozy.todos',
        status: 400
      },
      'Bad request'
    )
    expect(error).toHaveProperty('status', 400)
    expect(error).toHaveProperty(
      'url',
      'http://cozy.tools:8080/data/io.cozy.todos'
    )
  })
})
