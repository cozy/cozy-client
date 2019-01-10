import HasMany from './HasMany'
import { QueryDefinition, Mutations } from '../queries/dsl'

export default class HasManyFiles extends HasMany {
  async fetchMore() {
    const skip = this.getRelationship().data.length
    const queryDef = new QueryDefinition({ doctype: 'io.cozy.files' })
    const response = await this.query(
      queryDef.referencedBy(this.target).offset(skip)
    )
    await this.dispatch(
      this.updateRelationshipData(previousRelationshipData => ({
        ...previousRelationshipData,
        data: [...previousRelationshipData.data, ...response.data],
        next: response.next
      }))
    )
  }

  async addById(ids) {
    ids = Array.isArray(ids) ? ids : [ids]
    const relations = ids.map(id => ({
      _id: id,
      _type: this.doctype
    }))
    await this.mutate(this.insertDocuments(relations))

    await super.addById(ids, { save: true })
  }

  async removeById(ids) {
    ids = Array.isArray(ids) ? ids : [ids]
    const relations = ids.map(id => ({
      _id: id,
      _type: this.doctype
    }))
    await this.mutate(this.removeDocuments(relations))

    await super.removeById(ids, { save: true })
  }

  async add(referencedDocs) {
    console.warn(
      'HasManyFiles.add is deprecated — please use HasManyFiles.addById instead'
    )
    // WARN : here we're trying to check if some files are already referenced,
    // but we possibly haven't loaded all referenced files, so it should be handled by the stack.
    const currentlyReferencedIds = this.getRelationship().data.map(
      ({ _id }) => _id
    )
    const filteredDocs = referencedDocs.filter(
      ({ _id }) => currentlyReferencedIds.indexOf(_id) === -1
    )
    await this.mutate(this.insertDocuments(filteredDocs), {
      update: store => {
        filteredDocs.forEach(doc => store.writeDocument(doc))
        this.updateTargetRelationship(store, prevRelationship => ({
          data: [
            ...prevRelationship.data,
            ...filteredDocs.map(({ _id, _type }) => ({ _id, _type }))
          ],
          meta: { count: prevRelationship.meta.count + filteredDocs.length }
        }))
      }
    })
    return filteredDocs
  }

  remove(referencedDocs) {
    console.warn(
      'HasManyFiles.remove is deprecated — please use HasManyFiles.removeById instead'
    )
    return this.mutate(this.removeDocuments(referencedDocs), {
      update: store => {
        const removedIds = referencedDocs.map(({ _id }) => _id)
        this.updateTargetRelationship(store, prevRelationship => ({
          data: prevRelationship.data.filter(
            ({ _id }) => removedIds.indexOf(_id) === -1
          ),
          meta: { count: prevRelationship.meta.count - referencedDocs.length }
        }))
      }
    })
  }

  insertDocuments(referencedDocs) {
    return Mutations.addReferencesTo(this.target, referencedDocs)
  }

  removeDocuments(referencedDocs) {
    return Mutations.removeReferencesTo(this.target, referencedDocs)
  }

  static query(document, client, assoc) {
    const queryAll = client.find(assoc.doctype)
    return queryAll.referencedBy(document)
  }
}
