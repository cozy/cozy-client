export const LOCALSTORAGE_SYNCED_KEY = 'cozy-client-pouch-link-synced'
export const LOCALSTORAGE_WARMUPEDQUERIES_KEY =
  'cozy-client-pouch-link-warmupedqueries'
export const LOCALSTORAGE_LASTSEQUENCES_KEY =
  'cozy-client-pouch-link-lastreplicationsequence'
export const LOCALSTORAGE_LASTREPLICATEDDOCID_KEY =
  'cozy-client-pouch-link-lastreplicateddocid'
export const LOCALSTORAGE_ADAPTERNAME = 'cozy-client-pouch-link-adaptername'

export class PouchLocalStorage {
  constructor(storageEngine) {
    checkStorageEngine(storageEngine)
    this.storageEngine = storageEngine
  }

  /**
   * Persist the last replicated doc id for a doctype
   *
   * @param {string} doctype - The replicated doctype
   * @param {string} id - The docid
   *
   * @returns {Promise<void>}
   */
  async persistLastReplicatedDocID(doctype, id) {
    const docids = await this.getAllLastReplicatedDocID()
    docids[doctype] = id

    await this.storageEngine.setItem(
      LOCALSTORAGE_LASTREPLICATEDDOCID_KEY,
      JSON.stringify(docids)
    )
  }

  /**
   * @returns {Promise<Record<string, string>>}
   */
  async getAllLastReplicatedDocID() {
    const item = await this.storageEngine.getItem(
      LOCALSTORAGE_LASTREPLICATEDDOCID_KEY
    )
    return item ? JSON.parse(item) : {}
  }

  /**
   * Get the last replicated doc id for a doctype
   *
   * @param {string} doctype - The doctype
   * @returns {Promise<string>} The last replicated docid
   */
  async getLastReplicatedDocID(doctype) {
    const docids = await this.getAllLastReplicatedDocID()
    return docids[doctype]
  }

  /**
   * Destroy all the replicated doc id
   *
   * @returns {Promise<void>}
   */
  async destroyAllLastReplicatedDocID() {
    await this.storageEngine.removeItem(LOCALSTORAGE_LASTREPLICATEDDOCID_KEY)
  }

  /**
   * Persist the synchronized doctypes
   *
   * @param {Record<string, import("./types").SyncInfo>} syncedDoctypes - The sync doctypes
   *
   * @returns {Promise<void>}
   */
  async persistSyncedDoctypes(syncedDoctypes) {
    await this.storageEngine.setItem(
      LOCALSTORAGE_SYNCED_KEY,
      JSON.stringify(syncedDoctypes)
    )
  }

  /**
   * Get the persisted doctypes
   *
   * @returns {Promise<object>} The synced doctypes
   */
  async getPersistedSyncedDoctypes() {
    const item = await this.storageEngine.getItem(LOCALSTORAGE_SYNCED_KEY)
    const parsed = item ? JSON.parse(item) : {}
    if (typeof parsed !== 'object') {
      return {}
    }
    return parsed
  }

  /**
   * Destroy the synced doctypes
   *
   * @returns {Promise<void>}
   */
  async destroySyncedDoctypes() {
    await this.storageEngine.removeItem(LOCALSTORAGE_SYNCED_KEY)
  }

  /**
   * Persist the last CouchDB sequence for a synced doctype
   *
   * @param {string} doctype - The synced doctype
   * @param {string} sequence - The sequence hash
   *
   * @returns {Promise<void>}
   */
  async persistDoctypeLastSequence(doctype, sequence) {
    const seqs = await this.getAllLastSequences()
    seqs[doctype] = sequence

    await this.storageEngine.setItem(
      LOCALSTORAGE_LASTSEQUENCES_KEY,
      JSON.stringify(seqs)
    )
  }

  /**
   * @returns {Promise<object>}
   */
  async getAllLastSequences() {
    const item = await this.storageEngine.getItem(
      LOCALSTORAGE_LASTSEQUENCES_KEY
    )
    return item ? JSON.parse(item) : {}
  }

  /**
   * Get the last CouchDB sequence for a doctype
   *
   * @param {string} doctype - The doctype
   *
   * @returns {Promise<string>} the last sequence
   */
  async getDoctypeLastSequence(doctype) {
    const seqs = await this.getAllLastSequences()
    return seqs[doctype]
  }

  /**
   * Destroy all the last sequence
   *
   * @returns {Promise<void>}
   */
  async destroyAllDoctypeLastSequence() {
    await this.storageEngine.removeItem(LOCALSTORAGE_LASTSEQUENCES_KEY)
  }

  /**
   * Destroy the last sequence for a doctype
   *
   * @param {string} doctype - The doctype
   *
   * @returns {Promise<void>}
   */
  async destroyDoctypeLastSequence(doctype) {
    const seqs = await this.getAllLastSequences()
    delete seqs[doctype]
    await this.storageEngine.setItem(
      LOCALSTORAGE_LASTSEQUENCES_KEY,
      JSON.stringify(seqs)
    )
  }

  /**
   * Persist the warmed up queries
   *
   * @param {object} warmedUpQueries - The warmedup queries
   *
   * @returns {Promise<void>}
   */
  async persistWarmedUpQueries(warmedUpQueries) {
    await this.storageEngine.setItem(
      LOCALSTORAGE_WARMUPEDQUERIES_KEY,
      JSON.stringify(warmedUpQueries)
    )
  }

  /**
   * Get the warmed up queries
   *
   * @returns {Promise<object>} the warmed up queries
   */
  async getPersistedWarmedUpQueries() {
    const item = await this.storageEngine.getItem(
      LOCALSTORAGE_WARMUPEDQUERIES_KEY
    )
    if (!item) {
      return {}
    }
    return JSON.parse(item)
  }

  /**
   * Destroy the warmed queries
   *
   * @returns {Promise<void>}
   */
  async destroyWarmedUpQueries() {
    await this.storageEngine.removeItem(LOCALSTORAGE_WARMUPEDQUERIES_KEY)
  }

  /**
   * Get the adapter name
   *
   * @returns {Promise<string>} The adapter name
   */
  async getAdapterName() {
    return await this.storageEngine.getItem(LOCALSTORAGE_ADAPTERNAME)
  }

  /**
   * Persist the adapter name
   *
   * @param {string} adapter - The adapter name
   *
   * @returns {Promise<void>}
   */
  async persistAdapterName(adapter) {
    await this.storageEngine.setItem(LOCALSTORAGE_ADAPTERNAME, adapter)
  }
}

/**
 * Throw if the given storage engine does not implement the expected Interface
 *
 * @param {*} storageEngine - Object containing storage access methods
 */
const checkStorageEngine = storageEngine => {
  const requiredMethods = ['setItem', 'getItem', 'removeItem']

  const missingMethods = requiredMethods.filter(
    requiredMethod => !storageEngine[requiredMethod]
  )

  if (missingMethods.length > 0) {
    const missingMethodsString = missingMethods.join(', ')
    throw new Error(
      `Provided storageEngine is missing the following methods: ${missingMethodsString}`
    )
  }
}
