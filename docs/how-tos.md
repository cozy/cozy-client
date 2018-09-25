### How to use a higher order component

If you prefer HOCs to render-prop components, we provide a higher-order component called `connect`. Basic example of usage:

```jsx
import React from 'react'
import { connect } from 'cozy-client'

const query = client => client.find('io.cozy.todos').where({ checked: false })

const TodoList = ({ data, fetchStatus }) =>
  fetchStatus !== 'loaded'
    ? <h1>Loading...</h1>
    : <ul>{data.map(todo => <li>{todo.label}</li>)}</ul>

export default connect(query)(TodoList)
```

When we use `connect` to bind a query to a component, three things happen:
 - The query passed as an argument will be executed when the component mounts, resulting in the loading of data from the client-side store, or the server if the data is not in the store ;
 - Our component subscribes to the store, so that it is updated if the data changes ;
 - props are injected into the component: if we were to declare `propTypes` they would look like this:
```jsx
TodoList.propTypes = {
  fetchStatus: PropTypes.string.isRequired,
  data: PropTypes.array
}
```

Using `withMutation` higher-order component makes it easy to bind actions to your components. `withMutation` provides only a simple function to the wrapper component, in a prop called `mutate`:

```jsx
import { withMutation } from 'cozy-client'

const AddTodo = ({ mutate }) => {
  let input

  return (
    <form onSubmit={e => {
      e.preventDefault()
      mutate(input.value)
      input.value = ''
    }}>
      <input ref={node => { input = node }} />
      <button type="submit">Add Todo</button>
    </form>
  )
}

export default withMutation(
  label => client => client.create('io.cozy.todos', { label })
)(AddTodo)
```

### How-to integrate with an existing store

`cozy-client` uses redux internally to centralize the statuses of the various fetches and replications triggered by the library, and to store locally the data in a normalized way. If you already have a redux store in your app, you can configure `cozy-client` to use this existing store:

```js
import CozyClient from 'cozy-client'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import myReducers from './myapp/reducers'
import myMiddleware from './myapp/middleware'

const client = new CozyClient({
  /*...*/
})

const store = createStore(
  combineReducers({ ...myReducers, cozy: client.reducer() }),
  applyMiddleware(myMiddleware)
)

ReactDOM.render(
  <CozyProvider client={client} store={store}>
    <MyApp />
  </CozyProvider>,
  document.getElementById('main')
)
```

### How to obtain a token

Before you can start making requests to the server, you will need to get a token. `cozy-client` will provide a URL to a page where the user is shown what data you want to access, and asking for his or her permission. After the user accepts these permissions, he or she is redirected to the `oauth.redirectURI` that you declared earlier. You will then have to give this redirected URL back to `cozy-client` as it contains a code, that will be exchanged for the token.

Sounds, tricky, but most of it is taken care of for you. To get started, you call `client.startOAuthFlow` like this:

```js
import CozyClient from 'cozy-client'

const client = new CozyClient({
  uri: 'http://cozy.tools:8080',
  scope: ['io.cozy.mydoctype'],
  oauth: {
    clientName: 'MyClient',
    softwareID: 'MyAppId',
    redirectURI: 'http://localhost'
  }
})

client.startOAuthFlow(openURL)
```

The `openURL` parameter is a callback. It will receive the URL to the page as a parameter, and it must return a Promise that resolves with the redirected URL. How exactly you do this depends on your environment — for a mobile app you may use a WebView, in a browser maybe a new tab… Here is an example that uses the browser's console and an experienced user:

```js
const openURL = url => {
  console.log('Please visit the following URL, accept the permissions and copy the URL you are redirected to, then come back here. you have 10 seconds.', url)
  return new Promise(resolve => {
    setTimeout(async () => {
      const returnUrl = prompt('Paste the new URL here.')
      resolve(returnUrl)
    }, 10000)
  })
}
```

And that's it! After the promise is resolved, `cozy-client` finishes the OAuth flow and you can start using it.

### How to restore a previous token

Of course you don't want to go through this whole process every time your app starts. In order to restore the client from a previous version, you need to give it a token and some extra information about itself. Both of these are returned by the `openURL` function, so you can store them wherever you see fit — in this example we'll use the `localStorage` API.

```js
import CozyClient from 'cozy-client'

const client = new CozyClient({
  uri: 'http://cozy.tools:8080',
  scope: ['io.cozy.mydoctype'],
  oauth: {
    clientName: 'MyClient',
    softwareID: 'MyAppId',
    redirectURI: 'http://localhost'
  }
})

const {token, infos} = client.startOAuthFlow(openURL)
localStorage.setItem('token', token)
localStorage.setItem('infos', JSON.stringify(infos))
```

Next time your app starts, you can pass these informations to the constructor. Here is a complete example of the OAuth client initilisation:

```js
const storedToken = localStorage.getItem('token') || null
const storedInfos = JSON.parse(localStorage.getItem('infos')) || {
  clientName: 'MyClient',
  softwareID: 'MyAppId',
  redirectURI: 'http://localhost'
}

const client = new CozyClient({
  uri: 'http://cozy.tools:8080',
  oauth: storedInfos,
  token: storedToken,
  scope: ['io.cozy.mydoctype']
});

if (!storedToken) {
  const {token, infos} = await client.startOAuthFlow(openURL)
  localStorage.setItem('token', token)
  localStorage.setItem('infos', JSON.stringify(infos))
}
```

### How to logout a client

When a user logout, we would like remove all references on this instance and
remove all user data. You can just use `cozyClient.logout()`.

## How to use CozyClient on mobile

`CozyClient` can also be used as an OAuth client. To get started, configure the OAuth informations when creating the client:

```js
import CozyClient from 'cozy-client'

const client = new CozyClient({
  uri: 'http://cozy.tools:8080',
  scope: ['io.cozy.mydoctype'],
  oauth: {
    clientName: 'MyClient',
    softwareID: 'MyAppId',
    redirectURI: 'http://localhost'
  }
})
```

`scope` is an array of [permissions](https://github.com/cozy/cozy-stack/blob/master/docs/permissions.md) you require for your client, and `oauth` is a list of fields that identify your client for the user and the server. The complete list of field can be found [here](https://github.com/cozy/cozy-stack/blob/master/docs/permissions.md), although they should be camel-cased instead of snake-cased.
