import React,  { Component, useState, useEffect, useCallback }  from 'react'
import CozyClient, { CozyProvider } from 'cozy-client'
import { Provider } from 'react-redux'

import useStickyState from './useStickyState'

class ExpiredTokenHandler extends Component {
  componentDidCatch(error) {
    console.log('error', error)
    if (error.message.indexOf('Expired token')) {
      this.props.onExpiredToken()
    } else {
      throw error
    }
  }
  render() {
    return this.props.children
  }
}

const DebugClientProvider = ({ children }) => {
  const [token, setToken] = useStickyState(null, 'clientToken')
  const [uri, setURI] = useStickyState(null, 'clientURI')
  const [client, setClient] = useState(null)

  useEffect(() => {
    if (!token || !uri) {
      return
    }

    const client = new CozyClient({
      uri: uri,
      token: token
    })
    client.ensureStore()

    setClient(client)
  }, [token, uri])


  const handleLogout = useCallback(() => {
    setToken(null)
    setURI(null)
    setClient(null)
  }, [setToken, setURI])

  if (client) {
    return (
      <ExpiredTokenHandler onExpiredToken={handleLogout}>
        <CozyProvider client={client}>
          <Provider store={client.store}>
            { children }
            <button onClick={handleLogout}>logout</button>
          </Provider>
        </CozyProvider>
      </ExpiredTokenHandler>
    )
  } else {
    return <>
      token: <input type='text' onChange={e => { setToken(e.target.value)}}/><br/>
      uri: <input type='text' onChange={e => { setURI(e.target.value)}}/>
    </>
  }
}

export default DebugClientProvider
