import pick from 'lodash/pick'
import pickBy from 'lodash/pickBy'
import Association from './Association'
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

const aliases = {
  'io.cozy.files:has-many': HasManyFiles,
  'has-many': HasMany,
  'belongs-to-in-place': HasOneInPlace,
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
