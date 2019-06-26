import get from 'lodash/get'
import Association from './Association'

export default class HasOne extends Association {
  get raw() {
    return get(this.target, `relationships[${this.name}].data`, null)
  }

  get data() {
    if (!this.raw) {
      return null
    }

    return this.get(this.doctype, this.raw._id)
  }

  static query(doc, client, assoc) {
    const relationship = get(doc, `relationships.${assoc.name}.data`, {})
    return client.get(assoc.doctype, relationship._id)
  }
}
