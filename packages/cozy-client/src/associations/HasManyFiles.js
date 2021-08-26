import get from 'lodash/get'
import omit from 'lodash/omit'
import { Mutations, Q, QueryDefinition } from '../queries/dsl'
import { getDocumentFromState } from '../store'
import { CozyClientDocument } from '../types'
import { DOCTYPE_FILES } from '../const'
import Association from './Association'
import HasMany from './HasMany'

/**
 *  This class is only used for photos albums relationships.
 *  Behind the hood, the queries uses a view returning the files sorted
 *  by datetime, with a cursor-based pagination.
 */
export default class HasManyFiles extends HasMany {
  async fetchMore() {
    const queryDef = new QueryDefinition({ doctype: DOCTYPE_FILES })
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

  async addById(idsArg) {
    const ids = Array.isArray(idsArg) ? idsArg : [idsArg]
    const relations = ids.map(id => ({
      _id: id,
      _type: this.doctype
    }))
    await this.mutate(this.addReferences(relations))

    await super.addById(ids)
  }

  async removeById(idsArg) {
    const ids = Array.isArray(idsArg) ? idsArg : [idsArg]
    const references = ids.map(id => ({
      _id: id,
      _type: this.doctype
    }))
    await this.mutate(this.removeReferences(references))

    await super.removeById(ids)
  }

  addReferences(referencedDocs) {
    if (this.target._type === DOCTYPE_FILES) {
      return Mutations.addReferencedBy(this.target, referencedDocs)
    } else if (referencedDocs[0]._type === DOCTYPE_FILES) {
      return Mutations.addReferencesTo(this.target, referencedDocs)
    } else {
      throw new Error(
        'Either the document or the references should be io.cozy.files'
      )
    }
  }

  removeReferences(referencedDocs) {
    if (this.target._type === DOCTYPE_FILES) {
      return Mutations.removeReferencedBy(this.target, referencedDocs)
    } else if (referencedDocs[0]._type === DOCTYPE_FILES) {
      return Mutations.removeReferencesTo(this.target, referencedDocs)
    } else {
      throw new Error(
        'Either the document or the references should be io.cozy.files'
      )
    }
  }

  dehydrate(doc) {
    // HasManyFiles relationships are stored on the file doctype, not the document the files are related to
    return omit(doc, [this.name, `relationships.${this.name}`])
  }

  /**
   * @param {CozyClientDocument} document - Document to query
   * @param {object} client - The CozyClient instance
   * @param {Association} assoc - The query params
   *
   * @returns {CozyClientDocument | QueryDefinition}
   */
  static query(document, client, assoc) {
    if (document._type === DOCTYPE_FILES) {
      const refs = get(document, `relationships.referenced_by.data`, [])
      const ids = refs
        .filter(ref => ref.type === assoc.doctype)
        .map(ref => ref.id)

      return ids.length > 0 ? Q(assoc.doctype).getByIds(ids) : null
    } else {
      const key = [document._type, document._id]
      const cursor = [key, '']

      return Q(assoc.doctype)
        .referencedBy(document)
        .offsetCursor(cursor)
    }
  }
}
