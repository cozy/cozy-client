import { useContext } from 'react'
import clientContext from '../context'
import CozyClient from '../CozyClient'

/**
 * Returns the cozy client from the context
 *
 * @returns {CozyClient|null} - Current cozy client
 */
const useClient = () => {
  const { client } = useContext(clientContext)
  return client
}

export default useClient
