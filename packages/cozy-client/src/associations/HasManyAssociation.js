import Association from './Association'
import { QueryDefinition } from '../dsl'

const empty = () => ({
  data: [],
  next: true,
  meta: { count: 0 }
})

export default class HasManyAssociation extends Association {
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
    return (
      this.getRelationship().data.find(({ _id }) => document._id === _id) !==
      undefined
    )
  }

  getRelationship() {
    const rawData = this.target[this.name]
    const data =
      this.target.relationships && this.target.relationships[this.name]
    if (!data) {
      if (rawData && rawData.length) {
        console.warn(
          "You're trying to access data on a relationship that appear to not be loaded yet. You may want to use 'include()' on your query"
        )
      }
      return empty()
    }
    return data
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
