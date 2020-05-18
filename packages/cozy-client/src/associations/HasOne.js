import get from 'lodash/get'
import set from 'lodash/set'
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
    if (!relationship || !relationship._id) {
      return null
    }
    return client.get(assoc.doctype, relationship._id)
  }

  set(doc) {
    if (doc && doc._type !== this.doctype) {
      throw new Error(
        `Tried to associate a ${doc._type} document to a HasOne relationship on ${this.doctype} document`
      )
    }

    const path = `relationships[${this.name}].data`

    if (doc) {
      set(this.target, path, {
        _id: doc._id,
        _type: doc._type
      })
    } else {
      set(this.target, path, undefined)
    }
  }

  unset() {
    this.set(undefined)
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
}
