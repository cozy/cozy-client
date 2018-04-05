export default class HasManyAssociation {
  constructor(target, name, doctype, { get, query, mutate, save }) {
    this.target = target
    this.name = name
    this.doctype = doctype
    this.get = get
    this.query = query
    this.mutate = mutate
    this.save = save
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
    if (!this.target.relationships || !this.target.relationships[this.name]) {
      console.warn(
        "You're trying to access data on a relationship that appear to not be loaded yet. You may want to use 'include()' on your query"
      )
      return {
        data: [],
        next: true,
        meta: { count: 0 }
      }
    }
    return this.target.relationships[this.name]
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
}
