import React, { Component } from 'react'
import { getQueryFromStore } from './store'
import { QueryDefinition } from './dsl'

const observeStore = (store, select, onChange) => {
  let currentState

  const handleChange = () => {
    let nextState = select(store.getState())
    if (nextState !== currentState) {
      currentState = nextState
      onChange(currentState)
    }
  }

  let unsubscribe = store.subscribe(handleChange)
  handleChange()
  return unsubscribe
}

const makeQuerySelector = (queryId, client) => state =>
  getQueryFromStore(state, queryId, client)

const enhanceProps = (queryResult, query) => {
  // the query hasn't hit the store yet
  if (!queryResult.definition) {
    return queryResult
  }
  const queryDef = new QueryDefinition({ ...queryResult.definition })
  if (queryResult.fetchStatus !== 'loaded') {
    return queryResult
  }
  console.log(queryResult)
  return {
    ...queryResult,
    fetchMore: () =>
      query(queryDef.offset(queryResult.data.length), { as: queryResult.id })
  }
}

export default class Query extends Component {
  constructor(props, context) {
    super(props, context)
    const { client } = context
    this.queryId = props.as || client.generateId()
    this.selector = makeQuerySelector(this.queryId, client)
    const { mutations, ...rest } = props
    this.mutations =
      typeof mutations === 'function' ? mutations(this.mutate, rest) : {}
  }

  mutate = (mutationCreator, options = {}) =>
    this.context.client.mutate(mutationCreator(this.context.client), options)

  componentDidMount() {
    const { client, store } = this.context
    this.unsubscribeStore = observeStore(
      store,
      this.selector.bind(this),
      this.onStoreChange
    )

    const query =
      typeof this.props.query === 'function'
        ? this.props.query(client, this.props)
        : this.props.query

    client.query(query, { as: this.queryId })
  }

  componentWillUnmount() {
    this.unsubscribeStore()
  }

  onStoreChange = () => {
    console.log('store changed, forcing rerender')
    this.forceUpdate()
  }

  render() {
    const { children } = this.props
    const { client, store } = this.context
    return children(
      enhanceProps(this.selector(store.getState()), client.query.bind(client)),
      this.mutations
    )
  }
}
