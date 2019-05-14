import { Component } from 'react'
import PropTypes from 'prop-types'

const dummyState = {}

// Need to have this since Query and ObservableQuery might come from
// two different incompatible versions of cozy-client. This is kept
// for backward compatibility
const fetchQuery = (client, query) => {
  return client.query(query.definition, { as: query.queryId })
}

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
        ? mutations(this.client, this.observableQuery, rest)
        : mutations

    const query = this.observableQuery
    this.createDocument = client.create.bind(client)
    this.saveDocument = client.save.bind(client)
    this.deleteDocument = client.destroy.bind(client)
    this.getAssociation = client.getAssociation.bind(client)
    this.fetchMore = query.fetchMore.bind(query)

    // If the query comes from a CozyClient that it too old, which may happen
    // in the bar, we do not have query.fetch
    if (query.fetch) {
      this.fetch = query.fetch.bind(query)
    }
  }

  componentDidMount() {
    this.queryUnsubscribe = this.observableQuery.subscribe(this.onQueryChange)
    if (this.props.fetchPolicy !== 'cache-only') {
      this.fetchQuery()
    }
  }

  fetchQuery() {
    if (this.observableQuery.fetch) {
      this.observableQuery.fetch()
    } else {
      fetchQuery(this.client, this.observableQuery)
    }
  }

  componentWillUnmount() {
    if (this.queryUnsubscribe) {
      this.queryUnsubscribe()
    }
  }

  onQueryChange = () => {
    this.setState(dummyState)
  }

  render() {
    const { children } = this.props
    const query = this.observableQuery
    return children(
      {
        fetchMore: this.fetchMore,
        fetch: this.fetch,
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
