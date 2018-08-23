import React, { Component } from 'react'
import { getQueryFromState } from './store'
import { QueryDefinition } from './dsl'
import PropTypes from 'prop-types'

const dummyState = {}

export default class Query extends Component {
  constructor(props, context) {
    super(props, context)
    const { client } = context
    if (!context.client) {
      throw new Error(
        'Query should be used with client in context (use CozyProvider to set context)'
      )
    }

    const queryDef =
      typeof props.query === 'function'
        ? props.query(client, props)
        : props.query

    this.client = client
    this.queryDefinition = queryDef
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
    if (this.props.fetchPolicy !== 'cache-only') {
      this.client.query(this.queryDefinition, { as: this.observableQuery.queryId })
    }
  }

  componentWillUnmount() {
    if (this.queryUnsubscribe) {
      this.queryUnsubscribe()
    }
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

Query.contextTypes = {
  client: PropTypes.object,
  store: PropTypes.object
}

Query.propTypes = {
  /** Query definition that will be executed and observed */
  query: PropTypes.func.isRequired,
  /** Name of the query */
  as: PropTypes.string,
  /** Function called with the data from the query */
  children: PropTypes.func.isRequired,
  /** How data is fetched */
  fetchPolicy: PropTypes.oneOf(['cache-only'])
}
