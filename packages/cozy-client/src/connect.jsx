import React, { Component } from 'react'
import { connect as reduxConnect } from 'react-redux'
import PropTypes from 'prop-types'

import { getQueryFromStore } from './store'

const connect = (query, options = {}) => WrappedComponent => {
  const wrappedDisplayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const mapStateToProps = (state, ownProps) => ({
    ...getQueryFromStore(state, ownProps.queryId)
  })

  const ConnectedWrappedComponent = reduxConnect(mapStateToProps)(
    WrappedComponent
  )

  class Wrapper extends Component {
    static contextTypes = {
      client: PropTypes.object
    }

    constructor(props, context) {
      super(props, context)
      this.client = props.client || context.client
      if (!this.client) {
        throw new Error(
          `Could not find "client" in either the context or props of ${wrappedDisplayName}`
        )
      }
      this.queryId = options.as || this.client.generateId()
    }

    componentDidMount() {
      this.client.query(query, { as: this.queryId })
    }

    render() {
      return (
        <ConnectedWrappedComponent queryId={this.queryId} {...this.props} />
      )
    }
  }

  Wrapper.displayName = `CozyConnect(${wrappedDisplayName})`
  return Wrapper
}

export default connect
