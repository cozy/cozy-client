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

#### 1.a Use your own Redux store

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
import { Query, isQueryLoading } from 'cozy-client'

const todos = 'io.cozy.todos'
const checked = { checked: false }
const query = client => client.find(todos).where(checked)

function TodoList(props) {
  return <Query query={query}>
    {
      queryResult => isQueryLoading(queryResult)
        ? <h1>Loading...</h1>
        : <ul>{queryResult.data.map(todo => <li>{todo.label}</li>)}</ul>
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

### 2.c Using a fetch policy to decrease network requests

When multiple components share the same data, you might want to share the data between the two
components. In this case, you do not want to execute 2 network requests for the same data, the
two components should share the same data and only 1 network request should be executed.

There are two solutions:

1) Lift the data fetching up the React tree: make a parent of the two components be the responsible of the data.
2) Using fetch policies to prevent re-fetching of the data

1 can be a good solution but sometimes the components needing the data are too far down the tree and/or too decoupled;
it might not make sense to lift the data fetching up only to have to drill the data down the tree again.

Using both `Query` and `queryConnect`, you can declare a *fetch policy*. It tells cozy-client if it should
execute the `query` at componentDidMount time. It enables n components to be connected to the same query without
triggering n requests.

A fetch policy is a function receiving the state of the current query and returning true if it should
be fetched and false otherwise. It is important to name the query with `as` when using fetch policies
otherwise query data cannot be shared across components.

```jsx
const query = client => client.all('io.cozy.todos')

// io.cozy.todos will not be refetched if there are already io.cozy.todos
// in the store and the data is fresh (updated less than 30s ago). 
const fetchPolicy = CozyClient.olderThan(30*1000)
const as = 'my-query'

// With Query and a render prop
<Query as={as} query={query} fetchPolicy={fetchPolicy}>{
  ({ data: todos }) => {<TodoList todos={todos} />}
}</Query>

// With queryConnect
queryConnect({
  todos: {
    as,
    query,
    fetchPolicy
  }
})(TodoList)
```

See [CozyClient::fetchPolicies](https://docs.cozy.io/en/cozy-client/api/cozy-client/#CozyClient.fetchPolicies)
for the API documentation.

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


