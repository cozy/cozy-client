import { Component } from 'react'
import PropTypes from 'prop-types'

export default class CozyProvider extends Component {
  static propTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    }),
    client: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  }

  static childContextTypes = {
    store: PropTypes.object,
    client: PropTypes.object.isRequired
  }

  static contextTypes = {
    store: PropTypes.object
  }

  constructor(props, context) {
    super(props, context)
    if (!props.client) {
      throw new Error('CozyProvider was not passed a client instance.')
    }
    if (props.store) {
      props.client.setStore(props.store)
    }
  }

  getChildContext() {
    return {
      store: this.props.store || this.context.store || this.props.client.store,
      client: this.props.client
    }
  }

  render() {
    if (!this.props.children) return null
    if (!Array.isArray(this.props.children)) return this.props.children
    return this.props.children[0]
  }
}
