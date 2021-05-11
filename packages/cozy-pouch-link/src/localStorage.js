export const LOCALSTORAGE_SYNCED_KEY = 'cozy-client-pouch-link-synced'
export const LOCALSTORAGE_WARMUPEDQUERIES_KEY =
  'cozy-client-pouch-link-warmupedqueries'
export const LOCALSTORAGE_LASTSEQUENCES_KEY =
  'cozy-client-pouch-link-lastreplicationsequence'
export const LOCALSTORAGE_LASTREPLICATEDDOCID_KEY =
  'cozy-client-pouch-link-lastreplicateddocid'

/**
 * Persist the last replicated doc id
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

export const getLastReplicatedDocID = doctype => {
  const docids = getAllLastSequences()
  return docids[doctype]
}

export const destroyAllLastReplicatedDocID = () => {
  window.localStorage.removeItem(LOCALSTORAGE_LASTREPLICATEDDOCID_KEY)
}

export const getPersistedSyncedDoctypes = () => {
  const item = window.localStorage.getItem(LOCALSTORAGE_SYNCED_KEY)

  // We check if the item in local storage is an array because we previously stored a boolean
  if (!item || !Array.isArray(JSON.parse(item))) {
    return []
  }

  return JSON.parse(item)
}

export const persistSyncedDoctypes = syncedDoctypes => {
  window.localStorage.setItem(
    LOCALSTORAGE_SYNCED_KEY,
    JSON.stringify(syncedDoctypes)
  )
}

export const destroySyncedDoctypes = () => {
  window.localStorage.removeItem(LOCALSTORAGE_SYNCED_KEY)
}

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

export const getDoctypeLastSequence = doctype => {
  const seqs = getAllLastSequences()
  return seqs[doctype]
}

export const destroyAllDoctypeLastSequence = () => {
  window.localStorage.removeItem(LOCALSTORAGE_LASTSEQUENCES_KEY)
}

export const destroyDoctypeLastSequence = doctype => {
  const seqs = getAllLastSequences()
  delete seqs[doctype]
  window.localStorage.setItem(
    LOCALSTORAGE_LASTSEQUENCES_KEY,
    JSON.stringify(seqs)
  )
}

export const persistWarmedUpQueries = warmedUpQueries => {
  window.localStorage.setItem(
    LOCALSTORAGE_WARMUPEDQUERIES_KEY,
    JSON.stringify(warmedUpQueries)
  )
}

export const getPersistedWarmedUpQueries = () => {
  const item = window.localStorage.getItem(LOCALSTORAGE_WARMUPEDQUERIES_KEY)
  if (!item) {
    return {}
  }
  return JSON.parse(item)
}

export const destroyWarmedUpQueries = () => {
  window.localStorage.removeItem(LOCALSTORAGE_WARMUPEDQUERIES_KEY)
}
