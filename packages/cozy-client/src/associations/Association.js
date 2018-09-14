export default class Association {
  constructor(target, name, doctype, { get, query, mutate, save }) {
    this.target = target
    this.name = name
    this.doctype = doctype
    this.get = get
    this.query = query
    this.mutate = mutate
    this.save = save
  }

  static query() {
    throw new Error('A custom relationship must define its query() function')
  }
}
