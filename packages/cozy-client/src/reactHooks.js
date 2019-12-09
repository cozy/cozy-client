import { useContext } from 'react'

import CozyContext from './context'

/**
 * React hooks to get a cozyClient from the context.
 * Use Cozy CozyProvider to set the client instance in your React tree
 */

/**
 * Get the cozyClient instance from the context (React hook)
 * If provided a cozyClient instance, will return this instance 
 * instead of the context one.
 * @param {CozyClient} propsClient - cozy client instance
 * @returns {CozyClient} cozy client instance
 */
export function useClient(propsClient) {
  const { client } = useContext(CozyContext)
  return propsClient || client
}

/**
 * Get the cozyClient store from the context (React hook)
 * If provided a store, will return this store
 * instead of the context one.
 * @param {Store} propsStore - cozy client store
 * @returns {Store} cozy client store
 */
export function useClientStore(propsStore) {
  const { store } = useContext(CozyContext)
  return propsStore || store
}

