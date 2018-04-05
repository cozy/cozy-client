import React, { Component } from 'react'

const withMutations = (mutations = {}) => WrappedComponent => {
  class Wrapper extends Component {
    constructor(props, context) {
      super(props, context)
      const client = context.client
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

  Wrapper.displayName = `WithMutations(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`
  return Wrapper
}

export default withMutations
