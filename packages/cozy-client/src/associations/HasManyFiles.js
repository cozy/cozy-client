import omit from 'lodash/omit'
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

    await super.addById(ids)
  }

  async removeById(ids) {
    ids = Array.isArray(ids) ? ids : [ids]
    const relations = ids.map(id => ({
      _id: id,
      _type: this.doctype
    }))
    await this.mutate(this.removeDocuments(relations))

    await super.removeById(ids)
  }

  insertDocuments(referencedDocs) {
    return Mutations.addReferencesTo(this.target, referencedDocs)
  }

  removeDocuments(referencedDocs) {
    return Mutations.removeReferencesTo(this.target, referencedDocs)
  }

  dehydrate(doc) {
    // HasManyFiles relationships are stored on the file doctype, not the document the files are related to
    return omit(doc, [this.name, `relationships.${this.name}`])
  }

  static query(document, client, assoc) {
    const queryAll = client.find(assoc.doctype)
    return queryAll.referencedBy(document)
  }
}
