import { StackLink } from './CozyLink'
import CozyStackClient from 'cozy-stack-client'
import {
  default as reducer,
  createStore,
  initQuery,
  receiveQueryResult,
  receiveQueryError,
  initMutation,
  receiveMutationResult,
  receiveMutationError
} from './store'

export default class CozyClient {
  constructor({ link, ...options }) {
    this.options = options
    this.idCounter = 1
    this.link = link || new StackLink({ client: this.getOrCreateStackClient() })
  }

  /**
   * Forwards to a stack client  a {@link DocumentCollection} instance.
   *
   * @param  {String} doctype The collection doctype.
   * @return {DocumentCollection}
   */
  collection(doctype) {
    return this.getOrCreateStackClient().collection(doctype)
  }

  async query(queryDefinition, options = {}) {
    this.getOrCreateStore()
    const queryId = options.as || this.generateId()
    this.dispatch(initQuery(queryId, queryDefinition))
    try {
      const response = await this.executeRequest(queryDefinition)
      this.dispatch(receiveQueryResult(queryId, response))
      return response
    } catch (error) {
      return this.dispatch(receiveQueryError(queryId, error))
    }
  }

  async mutate(mutationDefinition, { updateQueries, ...options } = {}) {
    this.getOrCreateStore()
    const mutationId = options.as || this.generateId()
    this.dispatch(initMutation(mutationId))
    try {
      const response = await this.executeRequest(mutationDefinition)
      this.dispatch(
        receiveMutationResult(mutationId, response, {
          updateQueries
        })
      )
      return response
    } catch (error) {
      return this.dispatch(receiveMutationError(mutationId, error))
    }
  }

  executeRequest(request) {
    return this.link.execute(request)
  }

  setStore(store) {
    this.store = store
  }

  getOrCreateStore() {
    if (!this.store) {
      this.setStore(createStore())
    }
    return this.store
  }

  getOrCreateStackClient() {
    if (!this.client) {
      this.client = new CozyStackClient(this.options)
    }
    return this.client
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
