import React from 'react'
import PropTypes from 'prop-types'
import compose from 'lodash/flowRight'
import Query from './Query'

/**
 * @function
 * @description HOC to provide client from context as prop
 *
 * @param  {Component} Component - wrapped component
 * @return {function} - Component that will receive client as prop
 */
export const withClient = Component => {
  const Wrapped = (props, context) => (
    <Component {...props} client={context.client} />
  )
  Wrapped.displayName = `withClient(${Component.displayName || Component.name})`
  Wrapped.contextTypes = {
    client: PropTypes.object
  }
  return Wrapped
}

const withQuery = (dest, queryOpts, Original) => {
  if (!queryOpts) {
    throw new Error(
      `withQuery has no options for ${dest} (wrapping ${Original.name})`
    )
  }
  return Component => {
    const Wrapped = (props, context) => {
      queryOpts = typeof queryOpts === 'function' ? queryOpts(props) : queryOpts
      if (!context.client) {
        throw new Error(
          'Should be used with client in context (use CozyProvider to set context)'
        )
      }

      if (queryOpts.doc) {
        return <Component {...{ [dest]: queryOpts.doc, ...props }} />
      }

      return (
        <Query {...queryOpts}>
          {result => <Component {...{ [dest]: result, ...props }} />}
        </Query>
      )
    }
    Wrapped.contextTypes = {
      client: PropTypes.object
    }
    Wrapped.displayName = `withQuery(${Component.displayName ||
      Component.name})`
    return Wrapped
  }
}

/**
 * @function
 * @description HOC creator to connect component to several queries in a declarative manner
 *
 * @param  {object} querySpecs - Definition of the queries
 * @return {function} - HOC to apply to a component
 */
export const queryConnect = querySpecs => Component => {
  const enhancers = Object.keys(querySpecs).map(dest =>
    withQuery(dest, querySpecs[dest], Component)
  )
  return compose.apply(null, enhancers)(Component)
}
