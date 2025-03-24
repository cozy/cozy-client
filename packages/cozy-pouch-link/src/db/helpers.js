import fastEqual from 'fast-deep-equal'

/**
 * Retrieve the existing document from Pouch
 *
 * @private
 * @param {string} id - ID of the document to retrieve
 * @param {string} id - ID of the document to retrieve
 * @param {string} doctype - Doctype of the document to retrieve
 * @param {boolean} throwIfNotFound - If true the method will throw when the document is not found. Otherwise it will return null
 * @returns {Promise<CozyClientDocument | null>}
 */
export const getExistingDocument = async (db, id, throwIfNotFound = false) => {
  try {
    const existingDoc = await db.getById(id)
    console.log('existing doc : ', existingDoc)

    if (existingDoc) {
      return existingDoc
    }
    return null
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
    console.log('THEY ARE EQUAL, DO NOT PERSIST')
    return true
  }

  console.log('NOT SAME DOC FOR PERSIST: ', oldDoc, newDoc)
  return false
}
