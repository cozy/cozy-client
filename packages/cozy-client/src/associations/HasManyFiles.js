import omit from 'lodash/omit'
import HasMany from './HasMany'
import { QueryDefinition, Mutations } from '../queries/dsl'

export default class HasManyFiles extends HasMany {
  async fetchMore(withCursor) {
    const queryDef = new QueryDefinition({ doctype: 'io.cozy.files' })
    const relationships = this.getRelationship().data
    let response
    if (withCursor) {
      // cursor-based pagination
      const cursorKey = [this.target._type, this.target._id]
      const startDocId = relationships[relationships.length - 1]._id
      const cursor = [cursorKey, startDocId]
      response = await this.query(
        queryDef.referencedBy(this.target).offsetCursor(cursor)
      )
      // Remove first returned element, used as starting point for the query
      response.data.shift()
    } else {
      // skip-based pagination
      const skip = relationships.length
      response = await this.query(
        queryDef.referencedBy(this.target).offset(skip)
      )
    }
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

  static query(document, client, assoc, cursor) {
    const queryAll = client.find(assoc.doctype)
    return cursor
      ? queryAll.referencedBy(document).offsetCursor(cursor)
      : queryAll.referencedBy(document)
  }
}
