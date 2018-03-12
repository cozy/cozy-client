import React, { Component } from 'react'

export default class Mutations extends Component {
  constructor(props, context) {
    super(props, context)
    const { mutations, ...rest } = props
    this.mutations = mutations(context.client.mutate.bind(context.client), rest)
  }

  render() {
    const { children } = this.props
    return children(this.mutations)
  }
}
