import Association from './Association'
import Query from '../queries/dsl'
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
class HasManyInPlace extends Association {
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

export default HasManyInPlace
