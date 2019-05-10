/**
 * ObservableQueries are the glue between the store and observers
 * of the store. They have the responsibility to hydrate the documents
 * before passing them to the React component.
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
    const data = this.client.hydrateDocuments(
      this.definition.doctype,
      result.data
    )
    return {
      ...result,
      data: this.definition.id ? data[0] : data
    }
  }

  fetch() {
    return this.client.query(this.definition, { as: this.queryId })
  }

  fetchMore() {
    return this.client.query(
      this.definition.offset(this.currentRawResult().data.length),
      {
        as: this.queryId
      }
    )
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
    return this.client.store
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
