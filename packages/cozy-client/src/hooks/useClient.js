import { useContext } from 'react'
import clientContext from '../context'

const useClient = () => {
  const { client } = useContext(clientContext)
  return client
}

export default useClient
