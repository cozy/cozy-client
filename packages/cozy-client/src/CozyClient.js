import {
  default as reducer,
  initQuery,
  receiveQueryResult,
  receiveQueryError
} from './store'

export default class CozyClient {
  constructor({ link }) {
    this.link = link
    this.idCounter = 1
  }

  async query(queryDefinition, options = {}) {
    this.initStore()
    const queryId = options.as || this.generateId()
    this.dispatch(initQuery(queryId, queryDefinition))
    try {
      const response = await this.executeQuery(queryDefinition)
      return this.dispatch(receiveQueryResult(queryId, response))
    } catch (error) {
      return this.dispatch(receiveQueryError(queryId, error))
    }
  }

  async executeQuery({ doctype, selector, ...options }) {
    if (!doctype) {
      throw new Error('No doctype found in a query definition')
    }
    const collection = this.link.collection(doctype)
    return !selector
      ? collection.all(options)
      : collection.find(selector, options)
  }

  setStore(store) {
    this.store = store
  }

  initStore() {
    if (!this.store) {
      throw new Error('No store provided to the client')
    }
  }

  reducer() {
    return reducer
  }

  dispatch(action) {
    return this.store.dispatch(action)
  }

  generateId() {
    const id = this.idCounter
    this.idCounter++
    return id
  }
}
