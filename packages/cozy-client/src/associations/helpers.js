import pick from 'lodash/pick'
import pickBy from 'lodash/pickBy'
import zip from 'lodash/zip'
import Association from './Association'
import HasOne from './HasOne'
import HasOneInPlace from './HasOneInPlace'
import HasMany from './HasMany'
import HasManyInPlace from './HasManyInPlace'
import HasManyFiles from './HasManyFiles'

export const pickTypeAndId = x => pick(x, '_type', '_id')

const applyHelper = (fn, objOrArr) =>
  Array.isArray(objOrArr) ? objOrArr.map(fn) : fn(objOrArr)

export const responseToRelationship = response =>
  pickBy({
    data: applyHelper(pickTypeAndId, response.data),
    meta: response.meta,
    next: response.next,
    skip: response.skip
  })

const attachRelationship = (doc, relationships) => {
  return {
    ...doc,
    relationships: {
      ...doc.relationships,
      ...relationships
    }
  }
}

export const attachRelationships = (response, relationshipsByDocId) => {
  if (Array.isArray(response.data)) {
    return {
      ...response,
      data: response.data.map(doc =>
        attachRelationship(doc, relationshipsByDocId[doc._id])
      )
    }
  } else {
    const doc = response.data
    return {
      ...response,
      data: attachRelationship(doc, relationshipsByDocId[doc._id])
    }
  }
}

export const reconstructRelationships = (
  queryDefToDocIdAndRel,
  documents,
  definitions,
  responses
) => {
  // Some relationships have the relationship data on the other side of the
  // relationship (ex: io.cozy.photos.albums do not have photo inclusion information,
  // it is on the io.cozy.files side).
  // Here we take the data received from the relationship queries, and group
  // it so that we can fill the `relationships` attribute of each doc before
  // storing the document. This makes the data easier to manipulate for the front-end.
  const relationshipsByDocId = {}

  for (const def of documents) {
    const docIdAndRels = queryDefToDocIdAndRel.get(def)
    for (const docIdAndRel of docIdAndRels) {
      if (docIdAndRel) {
        const [docId, relName] = docIdAndRel
        relationshipsByDocId[docId] = relationshipsByDocId[docId] || {}
        relationshipsByDocId[docId][relName] = responseToRelationship({
          data: def
        })
      }
    }
  }

  for (const [def, resp] of zip(definitions, responses)) {
    const docIdAndRels = queryDefToDocIdAndRel.get(def)
    for (const docIdAndRel of docIdAndRels) {
      if (docIdAndRel) {
        const [docId, relName] = docIdAndRel
        relationshipsByDocId[docId] = relationshipsByDocId[docId] || {}
        relationshipsByDocId[docId][relName] = responseToRelationship(resp)
      }
    }
  }

  return relationshipsByDocId
}

const aliases = {
  'io.cozy.files:has-many': HasManyFiles,
  'has-many': HasMany,
  'belongs-to-in-place': HasOneInPlace,
  'has-one': HasOne,
  'has-one-in-place': HasOneInPlace,
  'has-many-in-place': HasManyInPlace
}

/**
 * Returns the relationship class for a given doctype/type.
 *
 * In the schema definition, some classes have string aliases
 * so you do not have to import directly the association.
 *
 * Some doctypes can have built-in overriden relationships.
 *
 * @private
 */
export const resolveClass = (doctype, type) => {
  if (type === undefined) {
    throw new Error('Undefined type for ' + doctype)
  }
  if (typeof type !== 'string') {
    return type
  } else {
    const qualified = `${doctype}:${type}`
    const cls = aliases[qualified] || aliases[type]
    if (!cls) {
      throw new Error(`Unknown association '${type}'`)
    } else {
      return cls
    }
  }
}

export const create = (target, { name, type, doctype }, accessors) => {
  if (target[name] instanceof Association) {
    throw new Error(`Association ${name} already exists`)
  }
  return new type(target, name, doctype, accessors)
}
