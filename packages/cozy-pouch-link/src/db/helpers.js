import fastEqual from 'fast-deep-equal'
import DatabaseQueryEngine from './dbInterface'

/**
 * Retrieve the existing document from Pouch
 *
 * @param {DatabaseQueryEngine} queryEngine - The query engine
 * @param {string} id - ID of the document to retrieve
 * @param {boolean} throwIfNotFound - If true the method will throw when the document is not found. Otherwise it will return null
 * @returns {Promise<import('./dbInterface').QueryResponseSingleDoc>}
 */
export const getExistingDocument = async (
  queryEngine,
  id,
  throwIfNotFound = false
) => {
  try {
    const existingDoc = await queryEngine.getById(id)
    return existingDoc
  } catch (err) {
    if (err.name === 'not_found' && !throwIfNotFound) {
      return null
    } else {
      throw err
    }
  }
}

export const areDocsEqual = async (oldDoc, newDoc) => {
  // Do not rely on revisions as they can be missing or wrong
  newDoc._rev = undefined
  oldDoc._rev = undefined

  if (fastEqual(oldDoc, newDoc)) {
    return true
  }
  return false
}
