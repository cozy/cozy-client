import { createContext } from 'react'

export const clientContext = createContext({
  client: null,
  store: null
})

export default clientContext
