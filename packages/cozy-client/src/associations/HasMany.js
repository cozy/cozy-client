import get from 'lodash/get'
import Association from './Association'
import { QueryDefinition } from '../queries/dsl'
import { receiveQueryResult, getDocumentFromState } from '../store'

const empty = () => ({
  data: [],
  next: true,
  meta: { count: 0 }
})

}

/**
 * Related documents are stored in the relationships attribute of the object,
 * following the JSON API spec.
 *
 * Responsible for
 *
 * - Creating relationships
 * - Removing relationships
 *
 * @description
 *
 * ```
 * const schema = {
 *   todos: {
 *      doctype: 'io.cozy.todos',
 *      relationships: {
 *        tasks: {
 *          doctype: 'io.cozy.tasks',
 *          type: 'has-many'
 *        }
 *      }
 *    }
 * }
 *
 * const todo = {
 *   label: "Protect people's privacy",
 *   relationships: {
 *     tasks: {
 *       data: [
 *         {_id: 1, _type: 'io.cozy.tasks'},
 *         {_id: 2, _type: 'io.cozy.tasks'}
 *       ]
 *     }
 *   }
 * }
 * ```
 */
class HasMany extends Association {
  get raw() {
    return this.getRelationship().data
  }

  get data() {
    return this.getRelationship()
      .data.map(({ _id, _type }) => this.get(_type, _id))
      .filter(Boolean)
  }

  get hasMore() {
    return this.getRelationship().next
  }

  /**
   * Returns the total number of documents in the relationship.
   * Does not handle documents absent from the store. If you want
   * to do that, you can use .data.length.
   *
   * @returns {number} - Total number of documents in the relationships
   */
  get count() {
    const relationship = this.getRelationship()
    return relationship.meta
      ? relationship.meta.count
      : relationship.data.length
  }

  fetchMore() {
    throw 'Not implemented'
  }

  exists(document) {
    return this.existsById(document._id)
  }

  containsById(id) {
    return (
      this.getRelationship().data.find(({ _id }) => id === _id) !== undefined
    )
  }

  existsById(id) {
    return this.containsById(id) && Boolean(this.get(this.doctype, id))
  }

  /**
   * Add a referenced document by id. You need to call save()
   * in order to synchronize your document with the store.
   *
   * @todo We shouldn't create the array of relationship manually since
   * it'll not be present in the store as well.
   * We certainly should use something like `updateRelationship`
   *
   */
  addById(idsArg) {
    if (!this.target.relationships) this.target.relationships = {}
    if (!this.target.relationships[this.name]) {
      this.target.relationships[this.name] = { data: [] }
    }

    const ids = Array.isArray(idsArg) ? idsArg : [idsArg]

    const newRelations = ids
      .filter(id => !this.existsById(id))
      .map(id => ({
        _id: id,
        _type: this.doctype
      }))

    this.target.relationships[this.name].data.push(...newRelations)
    this.updateMetaCount()

    return this.save(this.target)
  }

  removeById(idsArg) {
    const ids = Array.isArray(idsArg) ? idsArg : [idsArg]

    this.target.relationships[this.name].data = this.target.relationships[
      this.name
    ].data.filter(({ _id }) => !ids.includes(_id))
    this.updateMetaCount()

    return this.save(this.target)
  }

  updateMetaCount() {
    if (get(this.target.relationships[this.name], 'meta.count') !== undefined) {
      this.target.relationships[this.name].meta = {
        ...this.target.relationships[this.name].meta,
        count: this.target.relationships[this.name].data.length
      }
    }
  }

  getRelationship() {
    const rawData = this.target[this.name]
    const relationship = get(this.target, `relationships.${this.name}`)
    if (!relationship) {
      if (rawData && rawData.length) {
        console.warn(
          "You're trying to access data on a relationship that appear to not be loaded yet. You may want to use 'include()' on your query"
        )
      }
      return empty()
    }
    return relationship
  }

  updateTargetRelationship(store, updateFn) {
    // TODO See if updateTargetRelationship is still used, removing it would enable us
    // to remove store.readDocument and store.writeDocument and the StoreProxy
    const prevTarget = store.readDocument(this.target._type, this.target._id)
    store.writeDocument(this.updateRelationship(prevTarget, updateFn))
  }

  updateRelationship(target, updateFn) {
    return HasMany.updateRelationship(target, this.name, updateFn)
  }

  updateRelationshipData = getUpdatedRelationshipData => (
    dispatch,
    getState
  ) => {
    const previousRelationship = getDocumentFromState(
      getState(),
      this.target._type,
      this.target._id
    )
    dispatch(
      receiveQueryResult(null, {
        data: {
          ...previousRelationship,
          relationships: {
            ...previousRelationship.relationships,
            [this.name]: getUpdatedRelationshipData(
              previousRelationship.relationships[this.name]
            )
          }
        }
      })
    )
  }

  dehydrate(doc) {
    return {
      ...doc,
      relationships: {
        ...doc.relationships,
        [this.name]: {
          data: this.raw
        }
      }
    }
  }

  static query(document, client, assoc) {
    const relationships = get(document, `relationships.${assoc.name}.data`, [])
    const ids = relationships.map(assoc => assoc._id)
    return new QueryDefinition({ doctype: assoc.doctype, ids })
  }
}


HasMany.updateRelationship = (doc, relName, updateFn) => {
  return {
    ...doc,
    relationships: {
      ...doc.relationships,
      [relName]: {
        ...doc.relationships[relName],
        ...updateFn(doc.relationships[name])
      }
    }
  }
}

export default HasMany
