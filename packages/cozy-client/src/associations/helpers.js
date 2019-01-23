import pick from 'lodash/pick'
import pickBy from 'lodash/pickBy'
import isEqual from 'lodash/isEqual'
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
  if (
    doc.relationships &&
    isEqual(Object.keys(doc.relationships), Object.keys(relationships))
  ) {
    return doc
  }
  return {
    ...doc,
    relationships: relationships || {}
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
