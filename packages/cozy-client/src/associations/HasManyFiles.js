import HasMany from './HasMany'
import { QueryDefinition, Mutations } from '../queries/dsl'

export default class HasManyFiles extends HasMany {
  fetchMore() {
    const skip = this.getRelationship().data.length
    const queryDef = new QueryDefinition({ doctype: 'io.cozy.files' })
    return this.query(queryDef.referencedBy(this.target).offset(skip), {
      update: (store, response) => {
        response.included.forEach(doc => store.writeDocument(doc))
        this.updateTargetRelationship(store, prevRelationship => ({
          data: [...prevRelationship.data, ...response.data],
          next: response.next
        }))
      }
    })
  }

  async add(referencedDocs) {
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
