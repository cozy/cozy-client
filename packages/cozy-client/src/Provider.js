import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import CozyContext from './reactContext'

/**
 * CozyClient React Provider
 * Set cozyClient instance and store in the React tree.
 * This is a React component.
 * @param {Object} _
 * @param {CozyClient} _.client - cozy client instance
 * @param {Store} _.store - store to be used by cozy client
 */
export function CozyContextProvider({client, store}) {
  useMemo(
    () => store && client && client.setStore(store),
    [store, client]
  )
  return <CozyContext.Provider value={{client, store}}>
    {children}
  </CozyContext.Provider>
}

/**
 * CozyClient Legacy React Provider
 * This is given as backward compatibility with apps using the old context API.
 * @param {CozyClient} _.client - cozy client instance
 * @param {Store} _.store - store to be used by cozy client
 */
export class CozyLegacyProvider extends React.Component {
  
  static propTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    }),
    client: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  }
  
  static contextTypes = {
    store: PropTypes.object
  }

  static childContextTypes = {
    store: PropTypes.object,
    client: PropTypes.object.isRequired
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
      store: this.getStore(),
      client: this.getClient()
    }
  }

  getClient() {
    return this.props.client
  }

  getStore() {
    return this.props.store || this.context.store || this.props.client.store
  }

  render() {
    return <CozyProvider client={this.getClient()} store={this.getStore()}>{this.props.children}</CozyProvider>
  }

}

export default CozyLegacyProvider