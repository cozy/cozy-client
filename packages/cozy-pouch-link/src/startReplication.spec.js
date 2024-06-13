import MicroEE from 'microee'
import { fetchRemoteLastSequence, fetchRemoteInstance } from './remote'

import { replicateAllDocs, startReplication } from './startReplication'
import { insertBulkDocs } from './helpers'

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

function ReplicationOnMock() {}
MicroEE.mixin(ReplicationOnMock)
const mockReplicationOn = new ReplicationOnMock()

describe('startReplication', () => {
  beforeEach(() => {
    jest.resetAllMocks()
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
      expect(fetchRemoteInstance).toHaveBeenCalledTimes(1)
      expect(insertBulkDocs).toHaveBeenCalledTimes(1)
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
      expect(fetchRemoteInstance).toHaveBeenCalledTimes(2)
      expect(insertBulkDocs).toHaveBeenCalledTimes(2)
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
      expect(fetchRemoteInstance).toHaveBeenCalledTimes(1)
      expect(insertBulkDocs).toHaveBeenCalledTimes(1)
      const expectedDocs = dummyDocs.map(doc => doc.doc).slice(6, 11)
      expect(rep).toEqual(expectedDocs)
    })
  })

  describe('startReplication', () => {
    it('should call replicateAllDocs on initial replication', async () => {
      const replicationOptions = getReplicationOptionsMock()
      replicationOptions.initialReplication = true

      const getReplicationURL = () =>
        'https://user:SOME_TOKEN@claude.mycozy.cloud/data/io.cozy.files'

      const dummyDocs = generateDocs(2)
      fetchRemoteInstance.mockResolvedValue({ rows: dummyDocs })

      const pouch = getPouchMock()

      await startReplication(
        pouch,
        replicationOptions,
        getReplicationURL,
        storage
      )

      expect(fetchRemoteInstance).toHaveBeenCalledWith(
        new URL(
          'https://user:SOME_TOKEN@claude.mycozy.cloud/data/io.cozy.files/_all_docs'
        ),
        { include_docs: true, limit: 1000 }
      )
      expect(pouch.replicate.from).not.toHaveBeenCalled()
      expect(pouch.replicate.to).not.toHaveBeenCalled()
      expect(pouch.sync).not.toHaveBeenCalled()
    })

    it('should call Pouch replication on non-initial replications', async () => {
      const replicationOptions = getReplicationOptionsMock()
      replicationOptions.initialReplication = false

      const getReplicationURL = () =>
        'https://user:SOME_TOKEN@claude.mycozy.cloud/data/io.cozy.files'

      const pouch = getPouchMock()

      const promise = startReplication(
        pouch,
        replicationOptions,
        getReplicationURL,
        storage
      )
      mockReplicationOn.emit('complete')
      await promise

      expect(fetchRemoteInstance).not.toHaveBeenCalled()
      expect(pouch.replicate.from).toHaveBeenCalledWith(
        'https://user:SOME_TOKEN@claude.mycozy.cloud/data/io.cozy.files',
        { batch_size: 1000, selector: { cozyLocalOnly: { $exists: false } } }
      )
    })
  })
})

const getPouchMock = () => {
  const pouch = {
    replicate: {
      from: jest.fn(),
      to: jest.fn()
    },
    sync: jest.fn()
  }
  pouch.replicate.from.mockReturnValue(mockReplicationOn)
  pouch.replicate.to.mockReturnValue(mockReplicationOn)
  pouch.sync.mockReturnValue(mockReplicationOn)

  return pouch
}

const getReplicationOptionsMock = () => ({
  strategy: 'fromRemote',
  initialReplication: false,
  warmupQueries: {},
  doctype: 'io.cozy.files'
})
