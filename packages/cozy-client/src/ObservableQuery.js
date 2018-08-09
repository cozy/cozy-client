/**
 * ObservableQueries are the glue between the store and observers
 * of the store. They know about the QueryDefinition, the client and
 * know how to hydrate documents.
 */

import { getQueryFromState, getRawQueryFromState } from './store'

const hasOwn = Object.prototype.hasOwnProperty

export default class ObservableQuery {
  constructor(queryId, definition, client) {
    if (!queryId || !definition || !client) {
      throw new Error(
        'ObservableQuery takes 3 arguments: queryId, definition and client'
      )
    }
    this.queryId = queryId
    this.definition = definition
    this.client = client
    this.observers = {}
    this.idCounter = 1
    this.lastResult = this.currentRawResult()
    this.unsubscribeStore = this.getStore().subscribe(this.handleStoreChange)
  }

  handleStoreChange = () => {
    const nextResult = this.currentRawResult()
    if (!shallowEqual(nextResult, this.lastResult)) {
      this.lastResult = nextResult
      this.notifyObservers()
    }
  }

  currentResult() {
    const result = getQueryFromState(this.getStore().getState(), this.queryId)
    if (result.fetchStatus !== 'loaded') {
      return result
    }
    return {
      ...result,
      data: this.client.hydrateDocuments(
        this.definition.doctype,
        result.data,
        this.queryId
      )
    }
  }

  fetchMore() {
    return this.client.query(
      this.definition.offset(this.currentRawResult().data.length),
      {
        as: this.queryId
      }
    )
  }

  getAssociation(document, associationName) {
    return this.client.getAssociation(document, associationName, this.queryId)
  }

  create(type, { _type, ...attributes }, relationships, mutationOptions = {}) {
    return this.client.create(type, attributes, relationships, {
      ...mutationOptions,
      contextQueryId: this.queryId
    })
  }

  save(document, mutationOptions = {}) {
    return this.client.save(document, {
      ...mutationOptions,
      contextQueryId: this.queryId
    })
  }

  validate(document) {
    return this.client.validate(document)
  }

  destroy(document, mutationOptions = {}) {
    return this.client.destroy(document, {
      ...mutationOptions,
      contextQueryId: this.queryId
    })
  }

  upload(file, dirPath, mutationOptions = {}) {
    return this.client.upload(file, dirPath, {
      ...mutationOptions,
      contextQueryId: this.queryId
    })
  }

  currentRawResult() {
    return getRawQueryFromState(this.getStore().getState(), this.queryId)
  }

  notifyObservers() {
    Object.keys(this.observers).forEach(id => this.observers[id]())
  }

  subscribe(callback) {
    const callbackId = this.idCounter
    this.idCounter++
    this.observers[callbackId] = callback
    return () => this.unsubscribe(callbackId)
  }

  unsubscribe(callbackId) {
    delete this.observers[callbackId]
  }

  getStore() {
    return this.client.getOrCreateStore()
  }
}

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false
    }
  }

  return true
}
