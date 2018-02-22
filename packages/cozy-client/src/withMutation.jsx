import React, { Component } from 'react'

const withMutation = (mutation, options = {}) => WrappedComponent => {
  return class Wrapper extends Component {
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
}

export default withMutation
