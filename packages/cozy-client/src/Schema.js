import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'
import size from 'lodash/size'

const prepareDoctypeSchema = doctypeSchema => {
  const relationships = mapValues(
    doctypeSchema.relationships || {},
    (v, k) => ({
      name: k,
      ...v
    })
  )

  return {
    ...doctypeSchema,
    relationships: size(relationships) > 0 ? keyBy(relationships, 'name') : null
  }
}

/**
 * Store information on a particular doctype.
 *
 * - Attribute validation
 * - Relationship access
 */
export default class Schema {
  constructor(schema = {}) {
    const values = mapValues(schema, (obj, name) => ({
      name,
      ...prepareDoctypeSchema(obj)
    }))
    this.byName = keyBy(values, x => x.name)
    this.byDoctype = keyBy(values, x => x.doctype)
  }

  /**
   * Returns the schema for a doctype
   */
  getDoctypeSchema(doctype) {
    const schema = this.byDoctype[doctype]
    if (!schema) {
      throw new Error(`No schema found for '${doctype}' doctype`)
    }
    return schema
  }

  getRelationship(doctype, associationName) {
    const schema = this.getDoctypeSchema(doctype)
    return schema.relationships[associationName]
  }

  async validate(document) {
    let errors = {}
    const schema = this.byDoctype[document._type]
    if (!schema) {
      return true
    }
    if (!schema.attributes) return true
    for (const n in schema.attributes) {
      const ret = await this.validateAttribute(
        document,
        n,
        schema.attributes[n]
      )
      if (ret !== true) errors[n] = ret
    }
    if (Object.keys(errors).length === 0) return true
    return errors
  }

  async validateAttribute(document, attrName, attrProps) {
    if (attrProps.unique) {
      const ret = await this.collection(document._type).checkUniquenessOf(
        attrName,
        document[attrName]
      )
      if (ret !== true) return 'must be unique'
    }
    return true
  }
}
