export default class Query {
  constructor({ doctype, selector }) {
    this.doctype = doctype
    this.selector = selector
  }

  where(selector) {
    return new Query({ ...this.toDefinition(), selector })
  }

  toDefinition() {
    return {
      doctype: this.doctype,
      selector: this.selector
    }
  }
}

export const all = doctype => new Query({ doctype })

export const find = (doctype, selector = undefined) =>
  new Query({ doctype, selector })
