import Association from './Association'
import Query from '../dsl'
/**
 * Related documents are stored directly under the attribute with
 * only the ids.
 *
 * @example
 * ```
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
 */
export default class HasManyInPlace extends Association {
  get raw() {
    return this.target[this.name]
  }

  get data() {
    const doctype = this.doctype
    return (this.raw || []).map(_id => this.get(doctype, _id))
  }

  static query() {
    if (this.raw && this.raw.length > 0) {
      return Query({ doctype: this.doctype, ids: this.raw })
    } else {
      return null
    }
  }
}
