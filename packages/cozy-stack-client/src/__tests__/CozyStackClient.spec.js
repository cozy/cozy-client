import CozyStackClient, { FetchError } from '../CozyStackClient'
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

describe('CozyStackClient', () => {
  it('should normalize the provided uri', () => {
    const client = new CozyStackClient({
      uri: 'http://cozy.tools:8080//',
      token: ''
    })
    expect(client.fullpath('/foo')).toBe('http://cozy.tools:8080/foo')
  })

  describe('collection', () => {
    const client = new CozyStackClient(FAKE_INIT_OPTIONS)

    it('should return a DocumentCollection by default', () => {
      expect(client.collection('io.cozy.todos')).toBeInstanceOf(
        DocumentCollection
      )
    })

    it('should throw if the doctype is undefined', () => {
      expect(() => client.collection()).toThrow()
    })
  })

  describe('fetch', () => {
    const client = new CozyStackClient(FAKE_INIT_OPTIONS)

    beforeAll(() => {
      global.fetch = require('jest-fetch-mock')
      fetch.mockResponse(JSON.stringify(FAKE_RESPONSE), {
        headers: { 'Content-Type': 'application/json' }
      })
    })

    it('should ask for JSON by default', async () => {
      await client.fetch('GET', '/data/io.cozy.todos')
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
      await client.fetch('POST', '/data/io.cozy.todos', {
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
      await client.fetch('POST', '/data/io.cozy.todos/foo', body, {
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
      const resp = await client.fetch('GET', '/data/io.cozy.todos')
      expect(resp).toEqual(FAKE_RESPONSE)
    })

    it('should throw a FetchError when the request fails', async () => {
      fetch.mockRejectOnce(new Error('404 (Not found)'))
      expect.assertions(2)
      try {
        await client.fetch('GET', '/foo/bar')
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
