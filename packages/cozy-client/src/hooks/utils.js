/**
 * Equality check
 *
 * Note we do not make a shallow equality check on documents, as it is less efficient and should
 * not be necessary: the queryResult.data is built by extracting documents from the state, thus
 * preserving references.
 *
 * @param {import("../types").QueryStateResult} queryResA - A query result to compare
 * @param {import("../types").QueryStateResult} queryResB - A query result to compare
 * @returns
 */
export const equalityCheckForQuery = (queryResA, queryResB) => {
  //console.log('Call equality check : ', queryResA, queryResB)
  if (queryResA === queryResB) {
    // Referential equality
    return true
  }

  if (
    typeof queryResA !== 'object' ||
    queryResA === null ||
    typeof queryResB !== 'object' ||
    queryResB === null
  ) {
    // queryResA or queryResB is not an object or null
    return false
  }

  if (queryResA.id !== queryResB.id) {
    return false
  }
  if (queryResA.fetchStatus !== queryResB.fetchStatus) {
    return false
  }

  const docsA = queryResA.storeData
  const docsB = queryResB.storeData
  if (!docsA || !docsB) {
    // No data to check
    return false
  }
  if (!Array.isArray(docsA) && !Array.isArray(docsB) && docsA !== docsB) {
    // Only one doc
    return false
  }

  if (
    Array.isArray(docsA) &&
    Array.isArray(docsB) &&
    !arraysHaveSameLength(docsA, docsB)
  ) {
    // A document was added or removed
    return false
  }

  if (Array.isArray(docsA) && Array.isArray(docsB)) {
    for (let i = 0; i < docsA.length; i++) {
      if (docsA[i] !== docsB[i]) {
        // References should be the same for non-updated documents
        return false
      }
    }
  }

  if (queryResA.relationshipNames) {
    // In case of relationships, we cannot check referential equality, because we
    // "hydrate" the data by creating a new instance of the related relationship class.
    // Thus, we check the document revision instead.
    const hydratedDataA = queryResA.data
    const hydratedDataB = queryResB.data
    if (!Array.isArray(hydratedDataA) && !Array.isArray(hydratedDataB)) {
      // One doc with changed relationship
      return revsAreEqual(hydratedDataA, hydratedDataB)
    }
    if (!arraysHaveSameLength(hydratedDataA, hydratedDataB)) {
      // A relationship have been added or removed
      return false
    }
    if (Array.isArray(hydratedDataA) && Array.isArray(hydratedDataB)) {
      for (let i = 0; i < hydratedDataA.length; i++) {
        for (const name of queryResA.relationshipNames) {
          // Check hydrated relationship
          const includedA = hydratedDataA[i][name]
          const includedB = hydratedDataB[i][name]
          if (includedA && includedB) {
            if (!revsAreEqual(includedA, includedB)) {
              return false
            }
          }
        }
      }
    }
  }
  return true
}

const revsAreEqual = (docA, docB) => {
  return docA?._rev === docB?._rev
}

const arraysHaveSameLength = (arrayA, arrayB) => {
  return (
    Array.isArray(arrayA) &&
    Array.isArray(arrayB) &&
    arrayA.length === arrayB.length
  )
}
