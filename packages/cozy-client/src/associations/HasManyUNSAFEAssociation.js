import HasManyAssociation from './HasManyAssociation'

export default class HasManyUNSAFEAssociation extends HasManyAssociation {
  getRelationship() {
    return {
      data: this.getProperty().map(id => ({
        _id: id,
        _type: this.doctype
      })),
      next: false,
      meta: { count: this.getProperty().length }
    }
  }

  addById(id) {
    if (this.getProperty().indexOf(id) === -1) {
      return this.setProperty([...this.getProperty(), id])
    }
  }

  removeById(id) {
    return this.setProperty(this.getProperty().filter(i => i !== id))
  }

  getProperty() {
    return Array.isArray(this.target[this.name]) ? this.target[this.name] : []
  }

  setProperty(value) {
    this.target[this.name] = value
    return this.save(this.target)
  }
}
