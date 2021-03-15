import { createContext } from 'react'
import CozyClient from './CozyClient'

export const clientContext = createContext({
  /** @type {CozyClient}  */
  client: null,
  store: null
})

export default clientContext
