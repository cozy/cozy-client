import Association from './Association'
import { QueryDefinition } from '../dsl'

const empty = () => ({
  data: [],
  next: true,
  meta: { count: 0 }
})

/**
 * Related documents are stored in the relationships attribute of the object,
 * following the JSON API spec.
 *
 * Responsible for
 *
 * - creating relationship
 * - adding / removing relationship
 *
 * @example
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
 *   label: "Get rich",
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
export default class HasMany extends Association {
  get raw() {
    return this.getRelationship().data
  }

  get data() {
    return this.getRelationship().data.map(({ _id, _type }) =>
      this.get(_type, _id)
    )
  }

  get hasMore() {
    return this.getRelationship().next
  }

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

  existsById(id) {
    return (
      this.getRelationship().data.find(({ _id }) => id === _id) !== undefined
    )
  }
  /**
   * Add a referenced document by id. You need to call save()
   * in order to synchronize your document with the store
   *
   * @todo We shouldn't create the array of relationship manually since
   * it'll not be present in the store as well.
   * We certainly should use something like `updateRelationship`
   *
   */

  addById(id) {
    if (this.existsById(id)) return
    if (!this.target.relationships) this.target.relationships = {}
    if (!this.target.relationships[this.name]) {
      this.target.relationships[this.name] = { data: [] }
    }
    this.target.relationships[this.name].data.push({
      _id: id,
      _type: this.doctype
    })
  }

  removeById(id) {
    if (this.existsById(id)) {
      this.target.relationships[this.name].data = this.target.relationships[
        this.name
      ].data.filter(({ _id }) => id !== _id)
    }
  }

  getRelationship() {
    const rawData = this.target[this.name]
    const relationship =
      this.target.relationships && this.target.relationships[this.name]
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
    const prevTarget = store.readDocument(this.target._type, this.target._id)
    store.writeDocument(this.updateRelationship(prevTarget, updateFn))
  }

  updateRelationship(target, updateFn) {
    return {
      ...target,
      relationships: {
        ...target.relationships,
        [this.name]: {
          ...target.relationships[this.name],
          ...updateFn(target.relationships[this.name])
        }
      }
    }
  }

  static query(document, client, assoc) {
    const ids = document[assoc.name]
    return new QueryDefinition({ doctype: assoc.doctype, ids })
  }
}
