import React, { Component } from 'react'

const withMutate = (mutation, options = {}) => WrappedComponent => {
  return class Wrapper extends Component {
    mutate = (...args) => {
      return this.context.client.mutate(mutation.apply(null, args), options)
    }

    render() {
      return <WrappedComponent mutate={this.mutate} {...this.props} />
    }
  }
}

export default withMutate
