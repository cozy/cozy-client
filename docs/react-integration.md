## What is the Cozy-Client React Integration?

In addition to the Javascript client, Cozy-Client provides a way to connect directly the data from your Cozy instance to your React components. 

Once connected, your components will receive the requesting data and a fetch status in their props. The data will automatically be refreshed upon modification.

<!-- MarkdownTOC autolink=true -->

- [1. Setup](#1-setup)
  - [1.a Initialize a CozyClient provider](#1a-initialize-a-cozyclient-provider)
    - [1.b Use your own Redux store](#1b-use-your-own-redux-store)
- [2. Usage](#2-usage)
  - [2.a Requesting data with `useQuery`](#2a-requesting-data-with-)
  - [2.b Requesting data with the `queryConnect` HOC](#2b-requesting-data-with-the-queryconnect-hoc)
  - [2.c Using a fetch policy to decrease network requests](#2c-using-a-fetch-policy-to-decrease-network-requests)
  - [2.d Keeping data up to date in real time](#2d-keeping-data-up-to-date-in-real-time)
  - [3. Mutating data](#3-mutating-data)
  - [3.a Mutating data with `useMutation`](#3a-mutating-data-with-usemutation)
  - [3.b Mutating data with `Query`](#3a-mutating-data-with-query)
  - [4. Testing](#4-testing)

<!-- /MarkdownTOC -->



## 1. Setup

The following procedure requires you to already know how to initialize a CozyClient instance and create a query to fetch documents.

⚠️  The fromDOM instantiation method assumes the page you use is served by the
Cozy Stack, and that there is a DOM node with the stack info. See 
[how the application works](https://docs.cozy.io/en/tutorials/app/#how-the-application-works) for more information.

```
<div role='application' data-cozy='{{ .CozyData }}' />
```

### 1.a Initialize a CozyClient provider

Import `CozyClient` and `CozyProvider`

```javascript
import CozyClient, { CozyProvider } from 'cozy-client'
```

Initialize a CozyClient instance (see the `CozyClient()` documentation for additional parameters, for example to provide a schema)

```javascript
const client = CozyClient.fromDOM()
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

#### 1.b Use your own Redux store

`cozy-client` uses redux internally to centralize the statuses of the various fetches and replications triggered by the library, and to store locally the data in a normalized way. If you already have a redux store in your app, you can configure `cozy-client` to use this existing store:

```jsx
import CozyClient, { CozyProvider } from 'cozy-client'
import { combineReducers, createStore, applyMiddleware } from 'redux'

const client = CozyClient.fromDOM({
  store: false // Important, otherwise a default store is created
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

## 2. Usage

### 2.a Requesting data with `useQuery`

`useQuery` is the most straightforward to fetch data from the Cozy.
Query results are cached and can be reused across components, you just
have to name the query results ("checked-todos") below.

```jsx
import CozyClient, { useQuery, isQueryLoading, Q } from 'cozy-client'

const client = CozyClient.fromDOM()
client.ensureStore()
const todos = 'io.cozy.todos'
const checked = { checked: false }

// Use the Q helper to build queries
const queryDefinition = Q(todos).where(checked)

function TodoList(props) {
  const queryResult = useQuery(queryDefinition, {
    as: 'checked-todos',
    fetchPolicy: CozyClient.fetchPolicies.olderThan(30 * 1000)
  })
  return <>
    {
      queryResult => isQueryLoading(queryResult)
        ? <h1>Loading...</h1>
        : <ul>{queryResult.data.map(todo => <li>{todo.label}</li>)}</ul>
    }
  </>
}

function App() {
  return <CozyProvider client={client}>
    <TodoList />
  </CozyProvider>
}
```

`useQuery` also supports a "disabled" parameter: if set to `false` the query won't
be executed. This is useful when you have dependent queries that rely on the results
of another query to have been fetched.


### 2.b Requesting data with `<Query />`

If you cannot use a hook, you can use the `Query` render-prop component. Basic example of usage:


```jsx
import { Query, isQueryLoading, Q } from 'cozy-client'
import React from 'react'

const todos = 'io.cozy.todos'
const checked = { checked: false }

// Use the Q helper to build queries
const queryDefinition = Q(todos).where(checked)

const TodoList = () => (
  <Query query={queryDefinition}>
    {queryResult => isQueryLoading(queryResult)
      ? <h1>Loading...</h1>
      : <ul>{queryResult.data.map(todo => <li>{todo.label}</li>)}</ul>
    }
  </Query>
)
```

When we use `Query` to "wrap" a component, three things happen:
 - The query passed as a prop will be executed when `Query` mounts, resulting in the loading of data from the local Pouchdb (if any) or from the server; in the future it may load the data directly from the client-side store;
 - `Query` subscribes to the store, so that it is updated if the data changes;
 - `Query` passes the result of the query as props to the children function.


The following props will be given to your wrapped component:
 - `data`: an array of documents
 - `fetchStatus`: the status of the fetch (`pending`, `loading`, `loaded` or `error`)
 - `lastFetch`: when the last fetch occurred
 - `hasMore`: the fetches being paginated, this property indicates if there are more documents to load


You can also pass a function instead of a direct query definition. Your function will be given the props of the component and should return the requested query definition:

```jsx
import { Query, Q } from 'cozy-client'
import React from 'react'

const queryDefinition = function(props) {
  const todos = 'io.cozy.todos'
  const where = { checked: props.checked }
  return Q(todos).where(where)
}

const TodoList = ({ props }) => (
  <Query query={queryDefinition} checked={props.checked}>
    {({ data, fetchStatus }) => (
      fetchStatus !== 'loaded'
        ? <h1>Loading...</h1>
        : <ul>{data.map(todo => <li>{todo.label}</li>)}</ul>
      )
    }
  </Query>
)

// use <TodoList checked={false}/>
```

Note: Your query definition will be bound when the `<Query/>` component mounts. Future changes in props will not modify the query.

### 2.c Requesting data with the `queryConnect` HOC

At your preference, you can use a higher-order component. `queryConnect` will take the name of the props field where it should send the result of the query and the actual query:

```jsx
import { queryConnect, Q } from 'cozy-client'

function TodoList(props) {
  const { data, fetchStatus } = props.result
  if (fetchStatus !== 'loaded') {
    return <h1>Loading...</h1>
  } else {
    return <ul>{data.map(todo => <li>{todo.label}</li>)}</ul>
  }
}

const ConnectedTodoList = queryConnect({
  result: {
     query: Q('io.cozy.todos').where({ checked: false })
  }
})(TodoList)
```

`queryConnect` will use `<Query />` internally, so you will inherit the same behaviour.

With the same syntax, you may register multiple queries to run:

```jsx
import { queryConnect, Q } from 'cozy-client'

function TodoList(props) {
  const { data, fetchStatus } = props.checked
  if (fetchStatus !== 'loaded') {
    return <h1>Loading...</h1>
  } else {
    return <ul>{data.map(todo => <li>{todo.label}</li>)}</ul>
  }
}

const todos = 'io.cozy.todos'
const checked = { query: Q(todos).where({ checked: false }) }
const archived = { query: Q(todos).where({ archive: false }) }

const queries = { checked, archived }

const ConnectedTodoList = queryConnect(queries)(TodoList)
```

### 2.d Using a fetch policy to decrease network requests

When multiple components share the same data, you might want to share the data between the two
components. In this case, you do not want to execute 2 network requests for the same data, the
two components should share the same data and only 1 network request should be executed.

There are two solutions:

1) Lift the data fetching up the React tree: make a parent of the two components be the responsible for the data.
2) Using fetch policies to prevent re-fetching of the data

1 can be a good solution but sometimes the components needing the data are too far down the tree and/or too decoupled;
it might not make sense to lift the data fetching up only to have to drill the data down the tree again.

Using `useQuery`, `Query` and `queryConnect`, you can declare a *fetch policy*. It tells cozy-client if it should
execute the `query` at componentDidMount time. It enables *N* components to be connected to the same query without
triggering *N* requests.

A fetch policy is a function receiving the state of the current query and returning true if it should
be fetched and false otherwise. It is important to name the query with `as` when using fetch policies
otherwise query data cannot be shared across components.

```jsx
import { Q } from 'cozy-client'
const queryDefinition = () => Q('io.cozy.todos')

const MyComponent = () => {
  
  // io.cozy.todos will not be refetched if there are already io.cozy.todos
  // in the store and the data is fresh (updated less than 30s ago). 
  const fetchPolicy = CozyClient.olderThan(30*1000)
  const as = 'my-query'

  // With Query and a render prop
  return (<Query as={as} query={queryDefinition} fetchPolicy={fetchPolicy}>{
    ({ data: todos }) => {<TodoList todos={todos} />}
  }</Query>)
}

// With queryConnect
queryConnect({
  todos: {
    as,
    query,
    fetchPolicy
  }
})(TodoList)
```

See [CozyClient::fetchPolicies](../api/cozy-client/#fetchpolicies)
for the API documentation.

### 2.e Keeping data up to date in real time

Sometimes the data you are displaying will be changed from other places than your app. Maybe the data is shared and someone else has updated it, or maybe it simply changes over time.

You can however keep your UI always up to date without constantly re-running your queries, by subscribing to changes in real time. This is done with the `RealTimeQueries` component:

```jsx
import { RealTimeQueries } from 'cozy-client'

function MyParentComponent(props) {
  return (
    <>
      <ConnectedTodoList />
      <RealTimeQueries doctype="io.cozy.todos" />
    </>
  )
}
```

You subscribe to changes for an entire doctype using `RealTimeQueries`, and as long as that component is rendered all documents from the given doctype in your queries will automatically stay up to date.

### 3. Mutating data

The simplest way is to use the hook `useClient` to get the CozyClient instance you gave to the `<CozyProvider />` upper.

```jsx
import { useClient } from 'cozy-client'

function TodoList(props) {
  const client = useClient()
  const createNewTodo = e => client.create(
    'io.cozy.todos',
    { label: e.target.elements['new-todo'], checked: false }
  )
  return (
    <>
      <ul>
        {/* todo items */}
      </ul>
      <form onSubmit={createNewTodo}>
        <label htmlFor="new-todo">Todo</label>
        <input id="new-todo" name="new-todo" />
        <button type="submit">Add todo</button>
      </form>
    </>
  )
}
```

### 3.a Mutating data with `useMutation`

We also provides a hook to manage `client.save` mutation state called `useMutation`.

```jsx
import { useMutation } from 'cozy-client'

function TodoLabelInlineEdit({ todo }) {
  const [label, setLabel] = useState(todo.label)
  const { mutate, mutationStatus } = useMutation()

  const handleChange = event => {
    setLabel(event.target.value)
  }

  const handleBlur = () => {
    mutate({
      ...todo,
      label
    })
  }

  return (
    <div style={{ display: 'flex' }}>
      <input
        type="text"
        aria-label="Label"
        style={{ marginRight: '1rem' }}
        value={label}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {mutationStatus === 'loaded' ? '✓' : null}
      {mutationStatus === 'failed' ? '✗' : null}
    </div>
  )
}
```

### 3.b Mutating data with `Query`

`<Query />` also takes a `mutations` optional props. It should have a function that will receive the CozyClient instance, the query requested and the rest of props given to the component, and should return a keyed object which will be added to the props of your wrapped component.

```jsx
import { Query } from 'cozy-client'

const todos = 'io.cozy.todos'
const checked = { checked: false }
const queryDefinition = Q(todos).where(checked)
const mutations = client => ({ createDocument: client.create.bind(client) })

function TodoList() {
  return <Query query={queryDefinition} mutations={mutations}>
    {
      ({ data, fetchStatus }) =>
      fetchStatus !== 'loaded'
        ? <h1>Loading...</h1>
        : <ul>{data.map(todo => <li>{todo.label}</li>)}</ul>
    }
  </Query>
}
```

### 4. Testing

When testing, it is useful to prefill the client with data and mock the
network. You can use `createMockClient` for this.

Say we want to test the following component:

```jsx
import React from 'react'
import { useQuery, Q } from 'cozy-client'

function TodoList() {
  const { data, fetchStatus, lastError } = useQuery(Q('io.cozy.todos'), {
    as: 'todos'
  })

  if (fetchStatus === 'failed') {
    return <h1>An error occurred : {lastError.message}</h1>
  } else if (fetchStatus !== 'loaded') {
    return <h1>Loading...</h1>
  } else {
    return (
      <>
        <h1 id="todos-heading">Todos</h1>
        <ul aria-labelledby="todos-heading">
          {data.map(todo => (
            <li key={todo.id}>{todo.label}</li>
          ))}
        </ul>
      </>
    )
  }
}

export default TodoList
```

We want to make sure the component renders correctly. In our test, we can
create a mocked client with predefined data for the `todos` query, and test
it with [testing-library](https://testing-library.com/) :

```jsx
import React from 'react'
import { createMockClient, CozyProvider } from 'cozy-client'
import { render, screen, within } from '@testing-library/react'
import TodoList from './TodoList'

describe('TodoList', () => {
  const setup = client => {
    return render(
      <CozyProvider client={client}>
        <TodoList />
      </CozyProvider>
    )
  }

  it('should show the todos', () => {
    const mockClient = createMockClient({
      queries: {
        todos: {
          doctype: 'io.cozy.todos',
          data: [
            { id: 'todo1', name: 'Write tests', done: true },
            { id: 'todo2', name: 'Write code', done: true },
            { id: 'todo3', name: 'Take breaks', done: true },
            { id: 'todo4', name: 'Write documentation', done: false }
          ]
        }
      }
    })

    setup(mockClient)

    const list = screen.getByRole('list', {
      name: /todos/i
    })
    const { getAllByRole } = within(list)
    const items = getAllByRole('listitem')
    expect(items.length).toBe(4)
  })

  it('should display the error message', () => {
    const mockClient = createMockClient({
      queries: {
        todos: {
          doctype: 'io.cozy.todos',
          queryError: new Error('Network error')
        }
      }
    })

    setup(mockClient)

    expect(screen.getByText(/network error/i)).toBeDefined()
  })
})
```
