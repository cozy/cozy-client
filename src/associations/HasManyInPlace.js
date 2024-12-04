import { Q, QueryDefinition } from '../queries/dsl'
import Association from './Association'

/**
 *
 * Used when related documents are stored directly under the attribute with
 * only the ids.
 *
 * @property {Function} get
 *
 * @description
 *
 * An example document representing a TODO. See as the related
 * tasks are represented via ids.
 *
 * ```js
 * const todo = {
 *   label: "Protect people's privacy",
 *   tasks: [1, 2]
 * }
 * ```
 *
 * Here is the `Schema` that would represent this kind of document.
 * Components receiving todos via `Query`s would have an instance of `HasManyInPlace`
 * as their `tasks` attribute.
 *
 * ```js
 * const schema = {
 *   todos: {
 *      doctype: 'io.cozy.todos',
 *      relationships: {
 *        tasks: {
 *          doctype: 'io.cozy.tasks',
 *          type: 'has-many-in-place'
 *        }
 *      }
 *    }
 * }
 *
 * const todo = {
 *   label: "Get rich",
 *   tasks: [1, 2]
 * }
 * ```
 *
 */
class HasManyInPlace extends Association {
  /**
   * Raw property
   *
   * @type {Array<string>}
   */
  get raw() {
    return this.target[this.name]
  }

  addById(id) {
    const rel = this.getRelationship()
    rel.push(id)
  }

  removeById(id) {
    const rel = this.getRelationship()
    const index = rel.indexOf(id)
    if (index !== -1) {
      rel.splice(index, 1)
    }
  }

  existsById(id) {
    const rel = this.getRelationship()
    return rel.indexOf(id) !== -1
  }

  getRelationship() {
    this.target[this.name] = this.target[this.name] || []
    return this.target[this.name]
  }

  dehydrate(doc) {
    return {
      ...doc,
      [this.name]: this.raw || []
    }
  }

  get data() {
    const doctype = this.doctype
    return (this.raw || []).map(_id => this.get(doctype, _id))
  }

  /**
   * @param {import("../types").CozyClientDocument} document - Document to query
   * @param {object} client - The CozyClient instance
   * @param {Association} assoc - The query params
   *
   * @returns {import("../types").CozyClientDocument | QueryDefinition}
   */
  static query(document, client, assoc) {
    const ids = document[assoc.name]
    if (ids && ids > 0) {
      return Q(assoc.doctype).getByIds(ids)
    } else {
      return null
    }
  }
}

export default HasManyInPlace
