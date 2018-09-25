# Integrating with an existing redux store

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
