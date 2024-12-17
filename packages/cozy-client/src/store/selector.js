/**
 * Perform an equality check to determine whether or not two query results are equal.
 *
 * This is typically called by a `useSelector`, to determine if a render should be made because
 * the query result has changed.
 * See https://react-redux.js.org/api/hooks#equality-comparisons-and-updates
 *
 * We cannot use the default strict reference comparison here, because a new reference for the query
 * result is made every time. However, the query result itself, in `storeData`, preserves references.
 *
 * Note we do not make a shallow equality check on documents, as it is much less efficient.
 * It is however different for relationships: because of their hydratation, the references change
 * even if the data is the same.
 *
 * @param {import("../types").QueryState} queryResA - A query result to compare
 * @param {import("../types").QueryState} queryResB - A query result to compare
 * @returns {boolean} whether or not the two query are equal
 */
export const equalityCheckForQuery = (queryResA, queryResB) => {
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
  // The query results are indeed equal
  return true
}

const revsAreEqual = (docA, docB) => {
  if (!docA._rev || !docB._rev) {
    return false
  }
  return docA?._rev === docB?._rev
}

const arraysHaveSameLength = (arrayA, arrayB) => {
  return (
    Array.isArray(arrayA) &&
    Array.isArray(arrayB) &&
    arrayA.length === arrayB.length
  )
}
