import React, { Component } from 'react'
import { getQueryFromStore } from './store'
import { QueryDefinition } from './dsl'

const dummyState = {}

export default class Query extends Component {
  constructor(props, context) {
    super(props, context)
    const { client } = context

    const queryDef =
      typeof props.query === 'function'
        ? props.query(client, props)
        : props.query

    this.observableQuery = client.watchQuery(queryDef, props)

    const { mutations, ...rest } = props
    this.mutations =
      typeof mutations === 'function' ? mutations(this.mutate, rest) : {}
  }

  mutate = (mutationCreator, options = {}) =>
    this.context.client.mutate(mutationCreator(this.context.client), {
      ...options,
      contextQueryId: this.observableQuery.queryId
    })

  componentDidMount() {
    this.queryUnsubscribe = this.observableQuery.subscribe(this.onQueryChange)
  }

  componentWillUnmount() {
    this.queryUnsubscribe()
  }

  onQueryChange = () => {
    console.log(
      `query ${this.observableQuery.queryId} changed, forcing rerender`
    )
    this.setState(dummyState)
  }

  render() {
    const { children } = this.props
    const { client, store } = this.context
    return children(
      {
        fetchMore: this.observableQuery.fetchMore.bind(this.observableQuery),
        ...this.observableQuery.currentResult()
      },
      this.mutations
    )
  }
}
