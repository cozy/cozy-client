export const LOCALSTORAGE_SYNCED_KEY = 'cozy-client-pouch-link-synced'
export const LOCALSTORAGE_WARMUPEDQUERIES_KEY =
  'cozy-client-pouch-link-warmupedqueries'
export const LOCALSTORAGE_LASTSEQUENCES_KEY =
  'cozy-client-pouch-link-lastreplicationsequence'
export const LOCALSTORAGE_LASTREPLICATEDDOCID_KEY =
  'cozy-client-pouch-link-lastreplicateddocid'
export const LOCALSTORAGE_ADAPTERNAME = 'cozy-client-pouch-link-adaptername'

/**
 * Persist the last replicated doc id for a doctype
 *
 * @param {string} doctype - The replicated doctype
 * @param {string} id - The docid
 */
export const persistLastReplicatedDocID = (doctype, id) => {
  const docids = getAllLastReplicatedDocID()
  docids[doctype] = id

  window.localStorage.setItem(
    LOCALSTORAGE_LASTREPLICATEDDOCID_KEY,
    JSON.stringify(docids)
  )
}

export const getAllLastReplicatedDocID = () => {
  const item = window.localStorage.getItem(LOCALSTORAGE_LASTREPLICATEDDOCID_KEY)
  return item ? JSON.parse(item) : {}
}

/**
 * Get the last replicated doc id for a doctype
 *
 * @param {string} doctype - The doctype
 * @returns {string} The last replicated docid
 */
export const getLastReplicatedDocID = doctype => {
  const docids = getAllLastSequences()
  return docids[doctype]
}

/**
 * Destroy all the replicated doc id
 */
export const destroyAllLastReplicatedDocID = () => {
  window.localStorage.removeItem(LOCALSTORAGE_LASTREPLICATEDDOCID_KEY)
}

/**
 * Persist the synchronized doctypes
 *
 * @param {object} syncedDoctypes - The sync doctypes
 */
export const persistSyncedDoctypes = syncedDoctypes => {
  window.localStorage.setItem(
    LOCALSTORAGE_SYNCED_KEY,
    JSON.stringify(syncedDoctypes)
  )
}

/**
 * Get the persisted doctypes
 *
 * @returns {object} The synced doctypes
 */
export const getPersistedSyncedDoctypes = () => {
  const item = window.localStorage.getItem(LOCALSTORAGE_SYNCED_KEY)

  // We check if the item in local storage is an array because we previously stored a boolean
  if (!item || !Array.isArray(JSON.parse(item))) {
    return []
  }

  return JSON.parse(item)
}

/**
 * Destroy the synced doctypes
 *
 */
export const destroySyncedDoctypes = () => {
  window.localStorage.removeItem(LOCALSTORAGE_SYNCED_KEY)
}

/**
 * Persist the last CouchDB sequence for a synced doctype
 *
 * @param {string} doctype - The synced doctype
 * @param {string} sequence - The sequence hash
 */
export const persistDoctypeLastSequence = (doctype, sequence) => {
  const seqs = getAllLastSequences()
  seqs[doctype] = sequence

  window.localStorage.setItem(
    LOCALSTORAGE_LASTSEQUENCES_KEY,
    JSON.stringify(seqs)
  )
}

export const getAllLastSequences = () => {
  const item = window.localStorage.getItem(LOCALSTORAGE_LASTSEQUENCES_KEY)
  return item ? JSON.parse(item) : {}
}

/**
 * Get the last CouchDB sequence for a doctype
 *
 * @param {string} doctype - The doctype
 * @returns {string} the last sequence
 */
export const getDoctypeLastSequence = doctype => {
  const seqs = getAllLastSequences()
  return seqs[doctype]
}

/**
 * Destroy all the last sequence
 */
export const destroyAllDoctypeLastSequence = () => {
  window.localStorage.removeItem(LOCALSTORAGE_LASTSEQUENCES_KEY)
}

/**
 * Destroy the last sequence for a doctype
 *
 * @param {string} doctype - The doctype
 */
export const destroyDoctypeLastSequence = doctype => {
  const seqs = getAllLastSequences()
  delete seqs[doctype]
  window.localStorage.setItem(
    LOCALSTORAGE_LASTSEQUENCES_KEY,
    JSON.stringify(seqs)
  )
}

/**
 * Persist the warmed up queries
 *
 * @param {object} warmedUpQueries - The warmedup queries
 */
export const persistWarmedUpQueries = warmedUpQueries => {
  window.localStorage.setItem(
    LOCALSTORAGE_WARMUPEDQUERIES_KEY,
    JSON.stringify(warmedUpQueries)
  )
}

/**
 * Get the warmed up queries
 *
 * @returns {object} the warmed up queries
 */
export const getPersistedWarmedUpQueries = () => {
  const item = window.localStorage.getItem(LOCALSTORAGE_WARMUPEDQUERIES_KEY)
  if (!item) {
    return {}
  }
  return JSON.parse(item)
}

/**
 * Destroy the warmed queries
 *
 */
export const destroyWarmedUpQueries = () => {
  window.localStorage.removeItem(LOCALSTORAGE_WARMUPEDQUERIES_KEY)
}

/**
 * Get the adapter name
 *
 * @returns {string} The adapter name
 */
export const getAdapterName = () => {
  return window.localStorage.getItem(LOCALSTORAGE_ADAPTERNAME)
}

/**
 * Persist the adapter name
 *
 * @param {string} adapter - The adapter name
 */
export const persistAdapterName = adapter => {
  window.localStorage.setItem(LOCALSTORAGE_ADAPTERNAME, adapter)
}
