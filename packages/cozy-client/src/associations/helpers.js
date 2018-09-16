import pick from 'lodash/pick'
import pickBy from 'lodash/pickBy'
import Association from './Association'
import HasMany from './HasManyAssociation'
import HasManyFiles from './HasManyFilesAssociation'

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

export const getClass = (doctype, type) => {
  if (typeof type !== 'string') {
    return type
  } else {
    switch (type) {
      case 'has-many':
        return doctype === 'io.cozy.files'
          ? HasManyFilesAssociation
          : HasManyAssociation
    }
  }
  throw new Error(`Unknown association '${type}'`)
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
