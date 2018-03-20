import HasManyAssociation from './HasManyAssociation'
import { Mutations } from '../dsl'

export default class HasManyFilesAssociation extends HasManyAssociation {
  fetchMore() {
    const skip = this.getRelationship().data.length
    return this.query(
      client =>
        client
          .find(this.doctype)
          .referencedBy(this.target)
          .offset(skip),
      {
        update: (store, response) => {
          response.included.forEach(doc => store.writeDocument(doc))
          this.updateTargetRelationship(store, prevRelationship => ({
            data: [...prevRelationship.data, ...response.data],
            next: response.next
          }))
        }
      }
    )
  }

  add(referencedDocs) {
    return this.mutate(this.insertDocuments(referencedDocs), {
      update: (store, response) => {
        referencedDocs.forEach(doc => store.writeDocument(doc))
        this.updateTargetRelationship(store, prevRelationship => ({
          data: [
            ...prevRelationship.data,
            ...referencedDocs.map(({ _id, _type }) => ({ _id, _type }))
          ],
          meta: { count: prevRelationship.meta.count + referencedDocs.length }
        }))
      }
    })
  }

  remove(referencedDocs) {
    return this.mutate(this.removeDocuments(referencedDocs), {
      update: (store, response) => {
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
}
