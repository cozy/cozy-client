import HasManyFilesAssociation from './HasManyFilesAssociation'
import HasManyAssociation from './HasManyAssociation'
import HasManyUNSAFEAssociation from './HasManyUNSAFEAssociation'
import Association from './Association'

export {
  dehydrateDoc,
  associationsFromModel,
  responseToRelationship
} from './helpers'

export {
  HasManyUNSAFEAssociation,
  Association,
  HasManyFilesAssociation,
  HasManyAssociation
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

  switch (type) {
    case 'has-many':
      return doctype === 'io.cozy.files'
        ? new HasManyFilesAssociation(target, name, doctype, accessors)
        : new HasManyAssociation(target, name, doctype, accessors)
    case 'has-many-UNSAFE':
      return new HasManyUNSAFEAssociation(target, name, doctype, accessors)
    default:
      throw new Error(`Can't handle ${type} associations`)
  }
}
