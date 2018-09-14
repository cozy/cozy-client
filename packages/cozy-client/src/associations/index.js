import HasManyFilesAssociation from './HasManyFilesAssociation'
import HasManyAssociation from './HasManyAssociation'
import HasManyUNSAFEAssociation from './HasManyUNSAFEAssociation'
import Association from './Association'

export { dehydrateDoc, responseToRelationship } from './helpers'

export {
  HasManyUNSAFEAssociation,
  Association,
  HasManyFilesAssociation,
  HasManyAssociation
}

export const getClass = (doctype, type) => {
  if (typeof type !== 'string') {
    return type
  } else {
    switch (type) {
      case 'has-many':
        return doctype === 'io.cozy.files'
          ? HasManyFilesAssociation
          : HasManyAssociation
      case 'has-many-UNSAFE':
        return HasManyUNSAFEAssociation
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

  const cls = getClass(doctype, type)
  return new cls(target, name, doctype, accessors)
}
