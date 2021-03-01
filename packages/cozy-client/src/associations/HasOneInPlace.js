import Association from './Association'
import { Q, QueryDefinition } from '../queries/dsl'
import { QueryState } from '../types'

/**
 * Here the id of the document is directly set in the attribute
 * of the document, not in the relationships attribute
 */
export default class HasOneInPlace extends Association {
  get raw() {
    return this.target[this.name]
  }

  get data() {
    return this.get(this.doctype, this.raw)
  }

  /**
   * @returns {QueryState | QueryDefinition}
   */
  static query(doc, client, assoc) {
    const id = doc[assoc.name]
    return (
      client.getDocumentFromState(assoc.doctype, id) ||
      Q(assoc.doctype).getById(id)
    )
  }

  dehydrate(doc) {
    return {
      ...doc,
      [this.name]: this.raw || undefined
    }
  }
}

export const BelongsToInPlace = HasOneInPlace
