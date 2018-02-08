# cozy-client

A simple and declarative way of managing [cozy-stack](https://github.com/cozy/cozy-stack) API calls and resulting data.

## Introduction

`cozy-client` is a convenient yet powerful way to bind `cozy-stack` queries to your (p)React components.

If you don't use React, you can still benefit of its underlying libraries:

* [cozy-stack-link](https://github.com/cozy/cozy-client/blob/master/packages/cozy-stack-link/README.md): a HTTP client to the cozy stack.

## Setup

### Install

`npm install --save cozy-client cozy-stack-link`
or
`yarn add cozy-client cozy-stack-link`

To get started using `cozy-client` with (p)React, you need to create a `CozyClient`, a `CozyStackLink`, and a `CozyProvider`:

* `CozyClient` is the master of your data: it manages data queries and their status ;
* `CozyStackLink` is the HTTP interface to the stack instance ;
* `CozyProvider` injects the client into components' context.

#### Creating a client

```js
import CozyClient from 'cozy-client'
import CozyStackLink from 'cozy-stack-link'

const client = new CozyClient({
  link: new CozyStackLink({
    uri: 'http://cozy.tools:8080',
    token: '...'
  })
})
```
If you need guidance to get the URI of your instance and/or the token, see (https://cozy.github.io/cozy-docs-v3/en/dev/app/#behind-the-magic).

#### Creating a provider

All components that we want to connect to data need access to the client. We could pass it as a prop from component to component, but it'll quickly get tedious.
We recommend that you use a `CozyProvider` somewhere high in your app. It will make the client available to all your components using the context:

```js
import CozyClient, { CozyProvider } from 'cozy-client'
import CozyStackLink from 'cozy-stack-link'

const client = new CozyClient({
  /*...*/
})

ReactDOM.render(
  <CozyProvider client={client}>
    <MyApp />
  </CozyProvider>,
  document.getElementById('main')
)
```


#### Integrating with an existing redux store

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

### Requesting data

To make it easy to fetch data and make it available to your component, we provide a higher-order component called `connect`. Basic example of usage:

```jsx
import React from 'react'
import { connect, find } from 'cozy-client'

const query = find('io.cozy.todos').where({ checked: false })

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

#### The injected props

As seen above, `connect` will pass the result of the query fetch to the wrapped component as a set of props. For list fetches, the injected props are the following:
 - `data`: an array of documents
 - `fetchStatus`: the status of the fetch (`pending`, `loading`, `loaded` or `error`)
 - `lastFetch`: when the last fetch occured
 - `hasMore`: the fetches being paginated, this property indicates if there are more documents to load

#### Making queries

`cozy-client` provides you with a very easy to use DSL to define document queries:

```jsx
import { find } from 'cozy-client'

const query = find('io.cozy.todos').where({ checked: false })
```
