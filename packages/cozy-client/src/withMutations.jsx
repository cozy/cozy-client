import React, { Component } from 'react'

const withMutations = mutations => WrappedComponent => {
  class Wrapper extends Component {
    constructor(props, context) {
      super(props, context)
      this.mutations =
        typeof mutations === 'function'
          ? mutations(context.client, props)
          : mutations
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
