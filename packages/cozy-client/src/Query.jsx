import { Component } from 'react'
import PropTypes from 'prop-types'

const dummyState = {}

// Need to have this since Query and ObservableQuery might come from
// two different incompatible versions of cozy-client. This is kept
// for backward compatibility
export const fetchQuery = (client, query) => {
  if (query.fetch) {
    return query.fetch()
  } else {
    return client.query(query.definition, { as: query.queryId })
  }
}

/**
 * Get attributes that will be assigned to the instance of a Query
 */
const getQueryAttributes = (client, props) => {
  // Methods bound to the client
  const createDocument = client.create.bind(client)
  const saveDocument = client.save.bind(client)
  const deleteDocument = client.destroy.bind(client)
  const getAssociation = client.getAssociation.bind(client)

  // Methods on ObservableQuery
  const queryDefinition =
    typeof props.query === 'function' ? props.query(client, props) : props.query

  const observableQuery = client.makeObservableQuery(queryDefinition, props)
  const fetchMore = observableQuery.fetchMore.bind(observableQuery)

  // Mutations
  const { mutations: propMutations, ...rest } = props
  const mutations =
    typeof propMutations === 'function'
      ? propMutations(client, observableQuery, rest)
      : propMutations

  // If the query comes from a CozyClient that it too old, which may happen
  // in the bar, we do not have query.fetch
  const fetch = observableQuery.fetch
    ? observableQuery.fetch.bind(observableQuery)
    : null

  return {
    client,
    observableQuery,
    queryDefinition,
    createDocument,
    saveDocument,
    deleteDocument,
    getAssociation,
    fetchMore,
    fetch,
    mutations
  }
}

const computeChildrenArgs = queryAttributes => {
  const {
    observableQuery,
    fetchMore,
    fetch,
    createDocument,
    saveDocument,
    deleteDocument,
    getAssociation,
    mutations
  } = queryAttributes

  return [
    {
      fetchMore: fetchMore,
      fetch: fetch,
      ...observableQuery.currentResult()
    },
    {
      createDocument: createDocument,
      saveDocument: saveDocument,
      deleteDocument: deleteDocument,
      getAssociation: getAssociation,
      ...mutations
    }
  ]
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

    Object.assign(this, getQueryAttributes(client, props))

    this.recomputeChildrenArgs()
  }

  componentDidMount() {
    this.queryUnsubscribe = this.observableQuery.subscribe(this.onQueryChange)
    if (this.props.fetchPolicy !== 'cache-only') {
      fetchQuery(this.client, this.observableQuery)
    }
  }

  componentWillUnmount() {
    if (this.queryUnsubscribe) {
      this.queryUnsubscribe()
    }
  }

  onQueryChange = () => {
    this.recomputeChildrenArgs()
    this.setState(dummyState)
  }

  recomputeChildrenArgs() {
    this.childrenArgs = computeChildrenArgs(this)
  }

  render() {
    const { children } = this.props
    return children(this.childrenArgs[0], this.childrenArgs[1])
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

export { getQueryAttributes, computeChildrenArgs }
