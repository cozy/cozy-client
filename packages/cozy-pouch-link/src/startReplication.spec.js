import { fetchRemoteLastSequence, fetchRemoteInstance } from './remote'

import { replicateAllDocs } from './startReplication'

jest.mock('./remote', () => ({
  fetchRemoteLastSequence: jest.fn(),
  fetchRemoteInstance: jest.fn()
}))

jest.mock('./helpers', () => ({
  insertBulkDocs: jest.fn()
}))

const url = 'http://test.local'

const generateDocs = nDocs => {
  let docs = []
  for (let i = 0; i < nDocs; i++) {
    docs.push({ doc: { _id: i.toString() } })
  }
  return docs
}

const storage = {
  getLastReplicatedDocID: jest.fn(),
  persistLastReplicatedDocID: jest.fn()
}

describe('startReplication', () => {
  beforeEach(() => {
    fetchRemoteLastSequence.mockResolvedValue('10-xyz')
  })

  describe('replication through _all_docs', () => {
    it('should replicate all docs', async () => {
      storage.getLastReplicatedDocID.mockReturnValue(null)
      const dummyDocs = generateDocs(2)
      fetchRemoteInstance.mockResolvedValue({ rows: dummyDocs })

      const rep = await replicateAllDocs(null, url, undefined, storage)
      const expectedDocs = dummyDocs.map(doc => doc.doc)
      expect(rep).toEqual(expectedDocs)
    })

    it('should replicate all docs when it gets more docs than the batch limit', async () => {
      storage.getLastReplicatedDocID.mockReturnValue(null)
      const dummyDocs = generateDocs(1002)
      fetchRemoteInstance.mockResolvedValueOnce({
        rows: dummyDocs.slice(0, 1001)
      })
      fetchRemoteInstance.mockResolvedValueOnce({
        rows: dummyDocs.slice(1000, 1002)
      })

      const rep = await replicateAllDocs(null, url, undefined, storage)
      const expectedDocs = dummyDocs.map(doc => doc.doc)
      expect(rep).toEqual(expectedDocs)
    })

    it('should replicate from the last saved doc id', async () => {
      storage.getLastReplicatedDocID.mockReturnValue('5')
      const dummyDocs = generateDocs(10)
      fetchRemoteInstance.mockResolvedValue({ rows: dummyDocs.slice(5, 11) })

      const rep = await replicateAllDocs(null, url, undefined, storage)

      const calledUrl = new URL(`${url}/_all_docs`)
      expect(fetchRemoteInstance).toHaveBeenCalledWith(calledUrl, {
        include_docs: true,
        limit: 1000,
        startkey_docid: '5'
      })
      const expectedDocs = dummyDocs.map(doc => doc.doc).slice(6, 11)
      expect(rep).toEqual(expectedDocs)
    })
  })
})
