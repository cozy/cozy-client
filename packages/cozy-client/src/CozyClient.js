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
  constructor({ link }) {
    this.link = link
    this.idCounter = 1
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
