import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'
import merge from 'lodash/merge'
import size from 'lodash/size'
import { resolveClass as resolveAssociationClass } from './associations'

/**
 * Returns a normalized schema object from the schema definition.
 *
 * - Relationships are resolved to classes if needed
 * - The name of the relationship (its key in the schema definition)
 *   is included in the relationship
 * - Empty relationships are nulled
 *
 * @private
 */
const normalizeDoctypeSchema = doctypeSchema => {
  const relationships = mapValues(
    doctypeSchema.relationships || {},
    (v, k) => ({
      ...v,
      name: k,
      type: resolveAssociationClass(v.doctype, v.type)
    })
  )

  return {
    ...doctypeSchema,
    relationships: size(relationships) > 0 ? keyBy(relationships, 'name') : null
  }
}

/**
 * Stores information on a particular doctype.
 *
 * - Attribute validation
 * - Relationship access
 *
 * ```js
 * const schema = new Schema({
 *   todos: {
 *     attributes: {
 *       label: {
 *         unique: true
 *       }
 *     },
 *     relationships: {
 *       author: 'has-one-in-place'
 *     }
 *   }
 * }, cozyStackClient)
 * ```
 */
class Schema {
  constructor(schemaDefinition = {}, client = null) {
    this.add(schemaDefinition)
    this.client = client
  }

  add(schemaDefinition = {}) {
    const values = mapValues(schemaDefinition, (obj, name) => ({
      name,
      ...normalizeDoctypeSchema(obj)
    }))

    this.byName = merge(this.byName || {}, keyBy(values, x => x.name))
    this.byDoctype = merge(this.byDoctype || {}, keyBy(values, x => x.doctype))
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

  /**
   * Returns the relationship for a given doctype/name
   */
  getRelationship(doctype, relationshipName) {
    const schema = this.getDoctypeSchema(doctype)
    return schema.relationships[relationshipName]
  }

  /**
   * Validates a document considering the descriptions in schema.attributes.
   */
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
    if (attrProps.unique && this.client) {
      const ret = await this.client
        .collection(document._type)
        .checkUniquenessOf(attrName, document[attrName])
      if (ret !== true) return 'must be unique'
    }
    return true
  }
}

export default Schema
