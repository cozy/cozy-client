import { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock'

import {
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

    it('Should return null when 404 error', async () => {
      const remoteUrl =
        'https://user:SOME_TOKEN@claude.mycozy.cloud/data/io.cozy.accounts/_changes?limit=1&descending=true'

      mockDatabaseNotFoundOn(
        'https://claude.mycozy.cloud/data/io.cozy.accounts/_changes?limit=1&descending=true'
      )

      const result = await fetchRemoteInstance(new URL(remoteUrl))

      expect(result).toBeNull()
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

    it('Shoud throw when 404 error', async () => {
      const remoteUrl =
        'https://user:SOME_TOKEN@claude.mycozy.cloud/data/io.cozy.accounts'
      mockDatabaseNotFoundOn(
        'https://claude.mycozy.cloud/data/io.cozy.accounts/_changes?limit=1&descending=true'
      )

      await expect(fetchRemoteLastSequence(remoteUrl)).rejects.toThrow()
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
