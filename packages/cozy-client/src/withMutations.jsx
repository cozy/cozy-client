import React, { Component } from 'react'

const withMutations = mutations => WrappedComponent => {
  class Wrapper extends Component {
    constructor(props, context) {
      super(props, context)
      this.mutations =
        typeof mutations === 'function'
          ? mutations(this.mutate, props)
          : mutations
    }

    mutate = (mutationCreator, options = {}) =>
      this.context.client.mutate(mutationCreator(this.context.client), options)

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
