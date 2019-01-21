import get from 'lodash/get'
import Association from './Association'
import { QueryDefinition } from '../queries/dsl'
import { receiveQueryResult, getDocumentFromState } from '../store'

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
   * in order to synchronize your document with the store.
   *
   * @todo We shouldn't create the array of relationship manually since
   * it'll not be present in the store as well.
   * We certainly should use something like `updateRelationship`
   *
   */
  addById(ids, { save = false } = {}) {
    if (!this.target.relationships) this.target.relationships = {}
    if (!this.target.relationships[this.name]) {
      this.target.relationships[this.name] = { data: [] }
    }

    ids = Array.isArray(ids) ? ids : [ids]

    const newRelations = ids.filter(id => !this.existsById(id)).map(id => ({
      _id: id,
      _type: this.doctype
    }))

    this.target.relationships[this.name].data.push(...newRelations)
    this.updateMetaCount()

    if (save) return this.save(this.target)
    else
      console.warn(
        'HasMany.addById will automatically perform a save operation in the next version.'
      )
  }

  removeById(ids, { save = false } = {}) {
    ids = Array.isArray(ids) ? ids : [ids]

    this.target.relationships[this.name].data = this.target.relationships[
      this.name
    ].data.filter(({ _id }) => !ids.includes(_id))
    this.updateMetaCount()

    if (save) return this.save(this.target)
    else
      console.warn(
        'HasMany.removeById will automatically perform a save operation in the next version.'
      )
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

export default HasMany
