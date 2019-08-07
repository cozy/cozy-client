## What is the Cozy-Client React Integration?

In addition to the Javascript client, Cozy-Client provides a way to connect directly the data from your Cozy instance to your React components. 

Once connected, your components will receive the requesting data and a fetch status in their props. The data will automatically be refreshed upon modification.


## Setup

The following procedure requires you to already know how to initialize a CozyClient instance and create a query to fetch documents.

### 1. Initialize a CozyClient provider


Import `CozyClient` and `CozyProvider`

```javascript
import CozyClient, { CozyProvider } from 'cozy-client'
```

Initialize a CozyClient instance (see the `CozyClient()` documentation for additional parameters, for example to provide a schema)

```javascript
const client = new CozyClient({
  uri: 'http://cozy.tools:8080',
  token: '...'
})
```

Then wrap you React application inside a CozyProvider component with your newly instance of CozyClient in its props as `client`.

```jsx
function MyCozyApp(props) {
  return <CozyProvider client={client}>
    <MyApp {...props} />
  </CozyProvider>
}

ReactDOM.render(<MyCozyApp />,
  document.getElementById('main')
)
```

The CozyClient will be available for consumption to all components inside your wrapped application.

`cozy-client` uses redux internally to centralize the statuses of the various fetches and replications triggered by the library, and to store locally the data in a normalized way. If you already have a redux store in your app, you can configure `cozy-client` to use this existing store:

```jsx
import CozyClient, { CozyProvider } from 'cozy-client'
import { combineReducers, createStore, applyMiddleware } from 'redux'

const client = new CozyClient({
  uri: 'http://cozy.tools:8080',
  token: '...'
})

const store = createStore(
  combineReducers({ ...myReducers, cozy: client.reducer() }),
  applyMiddleware(myMiddleware)
)

function MyCozyApp(props) {
  return <CozyProvider client={client} store={store}>
    <MyApp {...props} />
  </CozyProvider>
}

ReactDOM.render(<MyCozyApp />,
  document.getElementById('main')
)
```

### 2.a Requesting data with `<Query />`

To make it easy to fetch data and make it available to your component, we provide a Render Props component called `Query`. Basic example of usage:


```jsx
import { Query } from 'cozy-client'

const todos = 'io.cozy.todos'
const checked = { checked: false }
const query = client => client.find(todos).where(checked)

function TodoList(props) {
  return <Query query={query}>
    {
      ({ data, fetchStatus }) =>
      fetchStatus !== 'loaded'
        ? <h1>Loading...</h1>
        : <ul>{data.map(todo => <li>{todo.label}</li>)}</ul>
    }
  </Query>
}
```

When we use `Query` to "wrap" a component, three things happen:
 - The query passed as a prop will be executed when `Query` mounts, resulting in the loading of data from the local Pouchdb (if any) or from the server; in the future it may load the data directly from the client-side store;
 - `Query` subscribes to the store, so that it is updated if the data changes;
 - `Query` passes the result of the query as props to the children function.


The following props will be given to your wrapped component:
 - `data`: an array of documents
 - `fetchStatus`: the status of the fetch (`pending`, `loading`, `loaded` or `error`)
 - `lastFetch`: when the last fetch occured
 - `hasMore`: the fetches being paginated, this property indicates if there are more documents to load


You can also pass a function intead of a direct query. Your function will be given the props of the component and should return the requested query:

```jsx
import { Query } from 'cozy-client'

const query = function (props) {
  const todos = 'io.cozy.todos'
  const where = { checked: props.checked }
  return client => client.find(todos).where(where)
}

function TodoList() {
  return <Query query={query} checked={props.checked}>
    {
      ({ data, fetchStatus }) =>
      fetchStatus !== 'loaded'
        ? <h1>Loading...</h1>
        : <ul>{data.map(todo => <li>{todo.label}</li>)}</ul>
    }
  </Query>
}

// use <TodoList checked={false} />
```

Note: Your query will be bound when the `<Query/>` component mounts. Future changes in props will not modify the query.

### 2.b Requesting data with the `queryConnect` HOC

At your preference, you can use an higher-order component. `queryConnect` will take the name of the props field where it should send the result of the query and the actual query:

```jsx
import { queryConnect } from 'cozy-client'

function TodoList(props) {
  const { data, fetchStatus } = props.result
  if (fetchStatus !== 'loaded') {
    return <h1>Loading...</h1>
  } else {
    return <ul>{data.map(todo => <li>{todo.label}</li>)}</ul>
  }
}

const dest = 'result'

const todos = 'io.cozy.todos'
const checked = { checked: false }
const query = (client, props) => client.find('id', props.id).where(checked)

const queryOpts = { [dest]: { query } }

const ConnectedTodoList = queryConnect(queryOpts)(TodoList)
```

`queryConnect` will use `<Query />` internally so you will inherits the same behaviour.

With the same syntax, you may register multiple queries to run:

```jsx
import { queryConnect } from 'cozy-client'

function TodoList(props) {
  const { data, fetchStatus } = props.checked
  if (fetchStatus !== 'loaded') {
    return <h1>Loading...</h1>
  } else {
    return <ul>{data.map(todo => <li>{todo.label}</li>)}</ul>
  }
}

const todos = 'io.cozy.todos'
const checked = { query: client => client.find(todos).where({ checked: false }) }
const archived = { query: client => client.find(todos).where({ archive: false }) }

const queries = { checked, archived }

const ConnectedTodoList = queryConnect(queries)(TodoList)
```

### 3. Mutating data

The simplest way is to use the `withClient` high order component. It will inject a `client` in your props with the CozyClient instance you gave to the `<CozyProvider />` upper.

```jsx
import { withClient } from 'cozy-client'

function TodoList(props) {
  const { client } = props
  const createNewTodo = e => client.create(
    'io.cozy.todos', 
    { label: e.target.elements['new-todo'], checked: false }
  )
  return (
    <ul>
      {/* todo items */}
    </ul>
    <form onSubmit={createNewTodo}>
      <label htmlFor="new-todo">Todo</label>
      <input id="new-todo" name="new-todo" />
      <button type="submit">Add todo</button>
    </form>
  )
}

const ConnectedTodoList = withClient(TodoList)
```

Alternatively, you have `withMutation()` which returns an HOC. This HOC forwards you a `createDocument`, a `saveDocument` and a `deleteDocument` in your props. They are the `create()`, `save()`and `delete()` functions from CozyClient, bound to the instance you gave to the `<CozyProvider />`.

```jsx
import { withMutations } from 'cozy-client'

function TodoList(props) {
  const { createDocument } = props
  const createNewTodo = e => createDocument(
    'io.cozy.todos', 
    { label: e.target.elements['new-todo'], checked: false }
  )
  return (
    <ul>
      {/* todo items */}
    </ul>
    <form onSubmit={createNewTodo}>
      <label htmlFor="new-todo">Todo</label>
      <input id="new-todo" name="new-todo" />
      <button type="submit">Add todo</button>
    </form>
  )
}

const ConnectedTodoList = withMutations()(TodoList)
```

Finally, `<Query />` also takes a `mutations` optional props. It should have a function that will receive the CozyClient instance, the query requested and the rest of props given to the component, and should return a keyed object which will be added to the props of your wrapped component.

```jsx
import { Query } from 'cozy-client'

const todos = 'io.cozy.todos'
const checked = { checked: false }
const query = client => client.find(todos).where(checked)
const mutations = client => ({ createDocument: client.create.bind(client) })

function TodoList() {
  return <Query query={query} mutations={mutations}>
    {
      ({ data, fetchStatus }) =>
      fetchStatus !== 'loaded'
        ? <h1>Loading...</h1>
        : <ul>{data.map(todo => <li>{todo.label}</li>)}</ul>
    }
  </Query>
}
```


