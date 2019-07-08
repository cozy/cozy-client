import omit from 'lodash/omit'
import HasMany from './HasMany'
import { QueryDefinition, Mutations } from '../queries/dsl'
import { getDocumentFromState } from '../store'

/**
 *  This class is only used for photos albums relationships.
 *  Behind the hood, the queries uses a view returning the files sorted
 *  by datetime, with a cursor-based pagination.
 */
export default class HasManyFiles extends HasMany {
  async fetchMore() {
    const queryDef = new QueryDefinition({ doctype: 'io.cozy.files' })
    const relationships = this.getRelationship().data
    // Get last datetime for cursor
    const lastRelationship = relationships[relationships.length - 1]
    await this.dispatch(async (dispatch, getState) => {
      const lastRelDoc = getDocumentFromState(
        getState(),
        lastRelationship._type,
        lastRelationship._id
      )
      // Photos always have a datetime field in metadata
      const lastDatetime = lastRelDoc.attributes.metadata.datetime
      // cursor-based pagination
      const cursorKey = [this.target._type, this.target._id, lastDatetime]
      const startDocId = relationships[relationships.length - 1]._id
      const cursorView = [cursorKey, startDocId]
      const response = await this.query(
        queryDef.referencedBy(this.target).offsetCursor(cursorView)
      )
      // Remove first returned element, used as starting point for the query
      response.data.shift()
      await this.dispatch(
        this.updateRelationshipData(previousRelationshipData => ({
          ...previousRelationshipData,
          data: [...previousRelationshipData.data, ...response.data],
          next: response.next
        }))
      )
    })
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
    const key = [document._type, document._id]
    const cursor = [key, '']
    const queryAll = client.find(assoc.doctype)
    return queryAll.referencedBy(document).offsetCursor(cursor)
  }
}
