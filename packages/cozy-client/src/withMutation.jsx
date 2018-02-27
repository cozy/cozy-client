import React, { Component } from 'react'

const withMutation = (mutation, options = {}) => WrappedComponent => {
  class Wrapper extends Component {
    mutate = (...args) => {
      return this.context.client.mutate(mutation.apply(null, args), options)
    }

    render() {
      const mutationProps = {
        [options.name || 'mutate']: this.mutate
      }
      return <WrappedComponent {...mutationProps} {...this.props} />
    }
  }

  Wrapper.displayName = `WithMutation(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`
  return Wrapper
}

export default withMutation
