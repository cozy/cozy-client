import HasManyAssociation from './HasManyAssociation'
import HasManyFilesAssociation from './HasManyFilesAssociation'

export default class Association {
  static create = (target, { name, type, doctype }, { get, query, mutate }) => {
    switch (type) {
      case 'has-many':
        return doctype === 'io.cozy.files'
          ? new HasManyFilesAssociation(target, name, { get, query, mutate })
          : new HasManyAssociation(target, name, { get, query, mutate })
      default:
        throw new Error(`Can't handle ${type} associations`)
    }
  }
}
