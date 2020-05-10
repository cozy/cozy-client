import React from 'react'
import PropTypes from 'prop-types'
import compose from 'lodash/flowRight'
import Query from './Query'
import useClient from './hooks/useClient'

/**
 * @function
 * @description HOC to provide client from context as prop
 *
 * @param  {Component} Component - wrapped component
 * @returns {Function} - Component that will receive client as prop
 */
export const withClient = Component => {
  const Wrapped = props => {
    const client = useClient()
    return <Component {...props} client={client} />
  }
  Wrapped.displayName = `withClient(${Component.displayName || Component.name})`
  return Wrapped
}

const withQuery = (dest, queryOpts, Original) => {
  if (!queryOpts) {
    throw new Error(
      `withQuery has no options for ${dest} (wrapping ${Original.name})`
    )
  }
  return Component => {
    const Wrapper = (props, context) => {
      if (!context.client) {
        throw new Error(
          'Should be used with client in context (use CozyProvider to set context)'
        )
      }

      queryOpts = typeof queryOpts === 'function' ? queryOpts(props) : queryOpts
      if (queryOpts.doc) {
        console.warn('queryOpts.doc is deprecated')
        return <Component {...{ [dest]: queryOpts.doc, ...props }} />
      }

      return (
        <Query {...queryOpts}>
          {result => <Component {...{ [dest]: result, ...props }} />}
        </Query>
      )
    }
    Wrapper.contextTypes = {
      client: PropTypes.object
    }
    Wrapper.displayName = `withQuery(${Component.displayName ||
      Component.name})`
    return Wrapper
  }
}

/**
 * @function
 * @description HOC creator to connect component to several queries in a declarative manner
 *
 * @param  {object} querySpecs - Definition of the queries
 * @returns {Function} - HOC to apply to a component
 */
export const queryConnect = querySpecs => Component => {
  const enhancers = Object.keys(querySpecs).map(dest =>
    withQuery(dest, querySpecs[dest], Component)
  )
  return compose.apply(null, enhancers)(Component)
}
