export default class Query {
  constructor({ doctype, selector, fields, sort }) {
    this.doctype = doctype
    this.selector = selector
    this.fields = fields
    this.sort = sort
  }

  where(selector) {
    return new Query({ ...this.toDefinition(), selector })
  }

  select(fields) {
    return new Query({ ...this.toDefinition(), fields })
  }

  sortBy(sort) {
    return new Query({ ...this.toDefinition(), sort })
  }

  toDefinition() {
    return {
      doctype: this.doctype,
      selector: this.selector,
      fields: this.fields,
      sort: this.sort
    }
  }
}

export const all = doctype => new Query({ doctype })

export const find = (doctype, selector = undefined) =>
  new Query({ doctype, selector })
