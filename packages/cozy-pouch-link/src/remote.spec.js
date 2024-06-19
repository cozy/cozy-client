import { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock'

import {
  DATABASE_NOT_FOUND_ERROR,
  fetchRemoteInstance,
  fetchRemoteLastSequence
} from './remote'

describe('remote', () => {
  beforeAll(() => {
    enableFetchMocks()
  })

  beforeEach(() => {
    fetch.resetMocks()
  })

  afterAll(() => {
    disableFetchMocks()
  })

  describe('fetchRemoteInstance', () => {
    it(`Should add Authorization header based on URL's password`, async () => {
      const remoteUrl =
        'https://user:SOME_TOKEN@claude.mycozy.cloud/data/io.cozy.accounts/_changes'

      mockDatabaseOn(
        'https://claude.mycozy.cloud/data/io.cozy.accounts/_changes'
      )

      await fetchRemoteInstance(new URL(remoteUrl))

      const expectedHeaders = new Headers()
      expectedHeaders.append('Accept', 'application/json')
      expectedHeaders.append('Content-Type', 'application/json')
      expectedHeaders.append('Authorization', 'Bearer SOME_TOKEN')

      expect(fetch).toHaveBeenCalledWith(
        'https://claude.mycozy.cloud/data/io.cozy.accounts/_changes',
        {
          headers: expectedHeaders
        }
      )
    })

    it('Should return data when found', async () => {
      const remoteUrl =
        'https://user:SOME_TOKEN@claude.mycozy.cloud/data/io.cozy.accounts/_changes?limit=1&descending=true'
      mockDatabaseOn(
        'https://claude.mycozy.cloud/data/io.cozy.accounts/_changes?limit=1&descending=true'
      )

      const result = await fetchRemoteInstance(new URL(remoteUrl))

      expect(result).toStrictEqual({
        last_seq: '97-SOME_SEQ_VALUE',
        pending: -1,
        results: [
          {
            id: 'SOME_ID',
            seq: '97-SOME_SEQ_VALUE',
            doc: null,
            changes: [{ rev: '3-SOME_REV' }]
          }
        ]
      })
    })

    it('Should add parameters when given', async () => {
      const remoteUrl =
        'https://user:SOME_TOKEN@claude.mycozy.cloud/data/io.cozy.accounts/_changes'

      mockDatabaseOn(
        'https://claude.mycozy.cloud/data/io.cozy.accounts/_changes?limit=1&descending=true'
      )

      await fetchRemoteInstance(new URL(remoteUrl), {
        limit: 1,
        descending: true
      })

      const expectedHeaders = new Headers()
      expectedHeaders.append('Accept', 'application/json')
      expectedHeaders.append('Content-Type', 'application/json')
      expectedHeaders.append('Authorization', 'Bearer SOME_TOKEN')

      expect(fetch).toHaveBeenCalledWith(
        'https://claude.mycozy.cloud/data/io.cozy.accounts/_changes?limit=1&descending=true',
        expect.anything()
      )
    })

    it('Should throw when 404 error', async () => {
      const remoteUrl =
        'https://user:SOME_TOKEN@claude.mycozy.cloud/data/io.cozy.accounts/_changes?limit=1&descending=true'

      mockDatabaseNotFoundOn(
        'https://claude.mycozy.cloud/data/io.cozy.accounts/_changes?limit=1&descending=true'
      )

      await expect(fetchRemoteInstance(new URL(remoteUrl))).rejects.toThrow(
        DATABASE_NOT_FOUND_ERROR
      )
    })
  })

  describe('fetchRemoteLastSequence', () => {
    it('Should return data when found', async () => {
      const remoteUrl =
        'https://user:SOME_TOKEN@claude.mycozy.cloud/data/io.cozy.accounts'
      mockDatabaseOn(
        'https://claude.mycozy.cloud/data/io.cozy.accounts/_changes?limit=1&descending=true'
      )

      const result = await fetchRemoteLastSequence(remoteUrl)

      expect(result).toBe('97-SOME_SEQ_VALUE')
    })

    it('Shoud throw when HTTP error', async () => {
      const remoteUrl =
        'https://user:SOME_TOKEN@claude.mycozy.cloud/data/io.cozy.accounts'
      mockUnknownErrorOn(
        'https://claude.mycozy.cloud/data/io.cozy.accounts/_changes?limit=1&descending=true'
      )

      await expect(fetchRemoteLastSequence(remoteUrl)).rejects.toThrow(
        'Error (503) while fetching remote instance: {"error":"code=503, message=SOME UNKNOWN ERROR"}'
      )
    })

    it('Shoud throw dedicated error when 404 error', async () => {
      const remoteUrl =
        'https://user:SOME_TOKEN@claude.mycozy.cloud/data/io.cozy.accounts'
      mockDatabaseNotFoundOn(
        'https://claude.mycozy.cloud/data/io.cozy.accounts/_changes?limit=1&descending=true'
      )

      await expect(fetchRemoteLastSequence(remoteUrl)).rejects.toThrow(
        DATABASE_NOT_FOUND_ERROR
      )
    })

  })
})

const mockDatabaseNotFoundOn = url => {
  fetch.mockOnceIf(url, JSON.stringify({}), {
    error: 'not_found',
    ok: false,
    reason: 'Database does not exist.',
    status: 404
  })
}

const mockUnknownErrorOn = url => {
  fetch.mockOnceIf(
    url,
    JSON.stringify({
      error: 'code=503, message=SOME UNKNOWN ERROR'
    }),
    {
      ok: false,
      status: 503
    }
  )
}

const mockDatabaseOn = url => {
  fetch.mockOnceIf(
    url,
    JSON.stringify({
      last_seq: '97-SOME_SEQ_VALUE',
      pending: -1,
      results: [
        {
          id: 'SOME_ID',
          seq: '97-SOME_SEQ_VALUE',
          doc: null,
          changes: [{ rev: '3-SOME_REV' }]
        }
      ]
    }),
    {
      ok: true,
      status: 200
    }
  )
}
