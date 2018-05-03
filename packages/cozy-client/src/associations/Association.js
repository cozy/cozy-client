import HasManyAssociation from './HasManyAssociation'
import HasManyFilesAssociation from './HasManyFilesAssociation'
import HasManyUNSAFEAssociation from './HasManyUNSAFEAssociation'

export default class Association {
  static create = (
    target,
    { name, type, doctype },
    { get, query, mutate, save }
  ) => {
    const accessors = { get, query, mutate, save }
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
}
