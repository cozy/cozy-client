import React,  { Component, useState, useEffect, useCallback }  from 'react'
import CozyClient, { CozyProvider } from 'cozy-client'
import { Provider } from 'react-redux'

import useStickyState from './useStickyState'

const styles = {
  uriTokenPrompt: {
    maxWidth: '800px',
    margin: 'auto'
  }
}

/**
 * Guards its children with a form asking for token/uri
 * When user has entered token/uri, provides its children with a CozyClient
 * through CozyProvider
 */
const DebugClientProvider = ({ children }) => {
  const [token, setToken] = useStickyState(null, 'clientToken')
  const [uri, setURI] = useStickyState('http://cozy.tools:8080', 'clientURI')
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
    return <URITokenPrompt
      initialToken={token}
      initialURI={uri}
      onChangeToken={setToken}
      onChangeURI={setURI} />
  }
}

class ExpiredTokenHandler extends Component {
  componentDidCatch(error) {
    console.log('error', error)
    if (error.message.indexOf('Expired token') > -1) {
      this.props.onExpiredToken()
    } else {
      throw error
    }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    return this.props.children
  }
}


const URITokenPrompt = ({ onChangeToken, onChangeURI, initialURI, initialToken  }) => {
  return <>
      <div style={styles.uriTokenPrompt}>
      <p>
        Please enter an URI and a token (<span style={{ fontFamily: 'monospace' }}>cozy-stack instances token-cli</span>)<br/>
        <label>
          uri: <input defaultValue={initialURI} type='text' onChange={e => { onChangeURI(e.target.value)}}/>
        </label><br/>
        <label>token: <input defaultValue={initialToken} type='text' onChange={e => { onChangeToken(e.target.value)}}/></label>
      </p>
      </div>
    </>
}

export default DebugClientProvider
