import React, { Component } from 'react'
import PropTypes from 'prop-types'

const withMutations = (mutations = {}) => WrappedComponent => {
  const wrappedDisplayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'

  class Wrapper extends Component {
    static contextTypes = {
      client: PropTypes.object
    }

    constructor(props, context) {
      super(props, context)
      const client = props.client || context.client
      if (!client) {
        throw new Error(
          `Could not find "client" in either the context or props of ${wrappedDisplayName}`
        )
      }
      this.mutations = {
        ...{
          createDocument: client.create.bind(client),
          saveDocument: client.save.bind(client),
          deleteDocument: client.destroy.bind(client)
        },
        ...(typeof mutations === 'function'
          ? mutations(client, props)
          : mutations)
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
