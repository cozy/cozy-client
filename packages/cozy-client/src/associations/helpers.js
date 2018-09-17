import pick from 'lodash/pick'
import pickBy from 'lodash/pickBy'
import Association from './Association'
import HasOneInPlace from './HasOneInPlace'
import HasMany from './HasMany'
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
  'has-one-in-place': HasOneInPlace
}


export const getClass = (doctype, type) => {
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

export const create = (
  target,
  { name, type, doctype },
  { get, query, mutate, save }
) => {
  const accessors = { get, query, mutate, save }

  if (target[name] instanceof Association) {
    throw new Error(`Association ${name} already exists`)
  }

  return new type(target, name, doctype, accessors)
}
