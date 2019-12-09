import merge from 'lodash/merge'
import React, { Component } from 'react'

import CozyContext from './reactContext'

const makeMutationsObject = (mutations, client, props) => {
  return merge(
    ...mutations.map(mutations =>
      typeof mutations === 'function' ? mutations(client, props) : mutations
    )
  )
}

/**
 * @function
 * @description HOC to provide mutations to components. Needs client in context
 * or as prop.
 * @param  {Function} mutations One ore more mutations, which are function
 * taking CozyClient as parameter and returning an object containing one or
 * more mutations as attributes.
 * @returns {Function} - Component that will receive mutations as props
 */
const withMutations = (...mutations) => WrappedComponent => {
  const wrappedDisplayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'

  class Wrapper extends Component {
    static contextTypes = CozyContext

    constructor(props, context) {
      super(props, context)
      const client = props.client || context.client
      if (!client) {
        throw new Error(
          `Could not find "client" in either the context or props of ${wrappedDisplayName}`
        )
      }
      this.mutations = {
        createDocument: client.create.bind(client),
        saveDocument: client.save.bind(client),
        deleteDocument: client.destroy.bind(client),
        ...makeMutationsObject(mutations, client, props)
      }
    }

    render() {
      return <WrappedComponent {...this.mutations} {...this.props} />
    }
  }

  Wrapper.displayName = `WithMutations(${wrappedDisplayName})`
  return Wrapper
}

export default withMutations
