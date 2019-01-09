import React, { Component } from 'react'
import { connect as reduxConnect } from 'react-redux'
import PropTypes from 'prop-types'

import { getQueryFromState } from './store'

const connect = (query, options = {}) => {
  console.warn(
    "cozy-client's `connect` is deprecated. Please use `queryConnect` instead. For more informations about it, please see https://github.com/cozy/cozy-client/blob/master/docs/how-tos.md#how-to-connect-to-the-documents-store-declaratively-"
  )

  return WrappedComponent => {
    const wrappedDisplayName =
      WrappedComponent.displayName || WrappedComponent.name || 'Component'

    const mapStateToProps = (state, ownProps) => ({
      ...getQueryFromState(state, ownProps.queryId)
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
        this.queryDef =
          typeof query === 'function' ? query(this.client, props) : query
      }

      componentDidMount() {
        this.client.query(this.queryDef, { as: this.queryId })
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
}

export default connect
