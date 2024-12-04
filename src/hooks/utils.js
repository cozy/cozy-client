/**
 * Equality check
 *
 * Note we do not make a shallow equality check on documents, as it is less efficient and should
 * not be necessary: the queryResult.data is built by extracting documents from the state, thus
 * preserving references.
 *
 * @param {*} queryResA
 * @param {*} queryResB
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

  if (docsA.length !== docsB.length) {
    // A document was added or removed
    return false
  }

  for (let i = 0; i < docsA.length; i++) {
    if (docsA[i] !== docsB[i]) {
      // References should be the same for non-updated documents
      return false
    }
  }
  if (queryResA.relationshipNames) {
    const hydratedA = queryResA.data
    const hydratedB = queryResB.data
    if (hydratedA.length !== hydratedB.length) {
      return false
    }
    for (let i = 0; i < hydratedA.length; i++) {
      for (const name of queryResA.relationshipNames) {
        if (hydratedA[i][name] && hydratedB[i][name]) {
          const includedA = hydratedA[i][name]
          const includedB = hydratedB[i][name]
          if (
            includedA._rev &&
            includedB._rev &&
            includedA._rev !== includedB._rev
          ) {
            return false
          }
        }
      }
    }
  }
  //console.log('docs are same')
  return true
}
