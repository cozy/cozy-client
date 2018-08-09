import React, { Component } from 'react'
import { getQueryFromState } from './store'
import { QueryDefinition } from './dsl'
import PropTypes from 'prop-types'

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
      typeof mutations === 'function'
        ? mutations(this.observableQuery, rest)
        : {}

    const query = this.observableQuery
    this.createDocument = query.create.bind(query)
    this.saveDocument = query.save.bind(query)
    this.deleteDocument = query.destroy.bind(query)
    this.getAssociation = query.getAssociation.bind(this.observableQuery)
    this.fetchMore = query.fetchMore.bind(query)
  }

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
    const query = this.observableQuery
    return children(
      {
        fetchMore: this.fetchMore,
        ...query.currentResult()
      },
      {
        createDocument: this.createDocument,
        saveDocument: this.saveDocument,
        deleteDocument: this.deleteDocument,
        getAssociation: this.getAssociation,
        ...this.mutations
      }
    )
  }
}

Query.propTypes = {
  query: PropTypes.func.isRequired,
  as: PropTypes.string,
  children: PropTypes.func.isRequired
}
