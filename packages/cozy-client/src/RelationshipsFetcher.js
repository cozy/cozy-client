import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'

import { QueryDefinition } from './queries/dsl'
import { ensureArray } from './utils'
import optimizeQueries from './queries/optimize'
import { responseToRelationship } from './associations/helpers'

const isSameDocument = (docA, docB) =>
  docA._id === docB._id && docA._type === docB._type

/**
 * A Relationships fetcher is in charge of fetching relationships
 * for a given query response and given relationships indexed by
 * their name.
 */
export class RelationshipsFetcher {
  /**
   * Object where all queries values from Association.query() will be stored,
   * indexed by a key built on document type and id. Will contain one object
   * per relationship name.
   *
   * @example
   * ```
   * {
   *   'io.cozy.author/70333b...2438219': {
   *      'books:' {
   *        'query': QueryDefinition,
   *        'optimized': QueryDefinition
   *      },
   *      'novels': {
   *        'value': [doc1, doc2]
   *      }
   *   }
   * }
   * ```
   *
   * @type {Object}
   */
  queriesValues = null
  queryMap = null

  constructor(client, response = {}, relationshipsByName = {}) {
    this.client = client
    this.response = response
    this.responseDocs = ensureArray(response.data)
    this.relationshipsByName = relationshipsByName

    this.queryMap = new Map()
  }

  /**
   * Return the original response hydrated with relationships
   * for every document
   * @return {Promise} Promise of hydrated response
   */
  async getHydratedResponse() {
    if (!this.responseDocs.length) return this.response
    await this._prepareQueries()
    //console.debug({ queryMap: this.queryMap })
    this._optimizeQueries()
    //console.debug({ optimizedQueries: this._optimizedQueries })
    await this._executeQueries()
    console.debug({ optimizedQueryResponses: this._optimizedQueryResponses })
    const response = this._attachRelationships()
    console.debug({ response })
    const included = this._getIncluded()
    console.debug({ included })
    return { ...response, included }
  }

  _attachRelationship(targetDoc, relationshipName) {
    const initialQuery = [...this.queryMap.entries()]
      .filter(({ 1: { doc, relationship } }) => {
        console.debug({ doc, targetDoc, relationship, relationshipName })
        return (
          isSameDocument(doc, targetDoc) && relationship === relationshipName
        )
      })
      .map(([key]) => key)[0]

    console.debug('_attachRelationship', { initialQuery })

    const optimizedQuery = [...this._optimizedQueries.entries()]
      .filter(({ 1: initialQueries }) => initialQueries.includes(initialQuery))
      .map(([key]) => key)

    console.debug('_attachRelationship', { optimizedQuery })

    const response = this._optimizedQueryResponses.get(optimizedQuery)

    // for (const [optimizedQuery, response] of this._optimizedQueryResponses) {
    //   for (const initialQuery of this._optimizedQueries.get(optimizedQuery)) {
    //     const { doc, relationship } = this.queryMap.get(initialQuery)
    //
    //     documentsWithRelationships.push(doc)
    //   }
    // }
    // console.debug('_attachRelationships', { documentsWithRelationships })

    console.debug('_attachRelationships', {
      targetDoc,
      relationshipName,
      response
    })
    targetDoc.relationships[relationshipName] = responseToRelationship(response)
    return targetDoc
  }

  _attachRelationships() {
    const documentsWithRelationships = []

    for (const doc of this.responseDocs) {
      for (const relationship in doc.relationships) {
        documentsWithRelationships.push(
          this._attachRelationship(doc, relationship)
        )
      }
    }

    return { data: documentsWithRelationships }
  }

  _getIncluded() {
    const included = []
    for (const response of this._optimizedQueryResponses.values()) {
      included.push(...ensureArray(response.data))
    }
    return uniqWith(included, isSameDocument)
  }

  /**
   * Retrieves all query definitions and document from all document associations
   * Store query values into `queriesValues` Map.
   */
  async _prepareQueries() {
    console.debug({ responseDocs: this.responseDocs })
    for (const doc of this.responseDocs) {
      await this._prepareDocQueries(doc)
    }
  }

  /**
   * For a given document, return an object indexed by relationships names
   * and containing the query value.
   *
   * A Query value is obtained by calling the `query` static method of and
   * Association class. Query value can either be a QueryDefinition
   * instance or a document.
   *
   * If the value is a QueryDefinition it is stored under the `query` property.
   * If its an array of documents it is directly stored under the `value`
   * property.
   *
   * @example
   * ```
   * {
   *   'books': {
   *      'query': QueryDefinition
   *   },
   *   'novels': {
   *      'value': [doc1, doc2]
   *   }
   * }
   * ```
   *
   * @param  {Object}  doc Document
   * @return {Promise}     The promise of the query values indexed by
   * relationships names.
   */
  async _prepareDocQueries(doc) {
    console.debug('_prepareDocQueries', {
      doc,
      relationshipsByName: this.relationshipsByName
    })
    for (const relationshipName in this.relationshipsByName) {
      console.debug({ relationshipName })
      const query = await this._getQueryFromRelationship(doc, relationshipName)
      console.debug({ query })
      this.queryMap.set(query, { doc: doc, relationship: relationshipName })
    }
  }

  /**
   * Get relationship query value by calling static method `query` on
   * Association class
   *
   * query method may be asynchronous
   *
   * @param  {Object}  doc          The document to get association query value
   * @param  {Object}  relationship A relationship object
   * @return {Promise}              Promise of the value returned by Association
   * query method. It may either be a QueryDefinition or an array of document.
   */
  async _getQueryFromRelationship(doc, relationshipName) {
    const relationship = this.relationshipsByName[relationshipName]
    console.debug('_getQueryFromRelationship', {
      relationship: relationship
    })
    return await relationship.type.query(doc, this.client, relationship)
  }

  async _executeQueries() {
    console.debug('_executeQueries')
    this._optimizedQueryResponses = new Map()
    for (const query of this._optimizedQueries.keys()) {
      console.debug('before')
      this._optimizedQueryResponses.set(query, await this.client.query(query))
      console.debug('after')
    }
  }

  // Now the hard part, we need to store QueryDefinition AND optimized
  // QueryDefinition and then retrieve which optimization contains which
  // QueryDefinition
  /**
   * From the property `queriesValues`, generates a list of optimized
   * QueryDefinition to minimize the number of requests sent.
   *
   * Also keep a track of which optimized QueryDefinition optimizes which
   * QueryDefinition.
   */
  _optimizeQueries() {
    console.debug({ keys: Array.from(this.queryMap.keys()) })
    this._optimizedQueries = optimizeQueries(
      Array.from(this.queryMap.keys()).filter(
        queryDef => queryDef instanceof QueryDefinition
      )
    )
  }
}

export default RelationshipsFetcher
