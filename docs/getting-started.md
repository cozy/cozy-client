<!-- MarkdownTOC autolink=true -->

- [What's cozy-client?](#whats-cozy-client)
- [Setup](#setup)
  - [Install](#install)
  - [Creating a client](#creating-a-client)
  - [Wrapping the App in a `CozyProvider`](#wrapping-the-app-in-a-cozyprovider)
  - [Using the client](#using-the-client)
- [Requesting data](#requesting-data)
  - [The available props](#the-available-props)
  - [Making queries](#making-queries)
- [Mutating data](#mutating-data)
  - [Updating queries](#updating-queries)

<!-- /MarkdownTOC -->


## What's cozy-client?

`cozy-client` is a javascript library. It facilitates the communication between an applications and the cozy stack.

Main features :

- Authentification with your Cozy
- Declarative integration between React components and server data (data is auatomatically refreshed)
- Offline : any data can be stored in a local cache without impacting your code that can continue to read and write.

Additional features with plugins :

- Real-time : be notified when changes occur on the server side.
- InterApp : API to interact with other apps (exemple : file picking within your app)

The following guide is an overview of a cozy-client integration to help you getting started.

See also :

TODO Tutorial to create a complete Cozy application
TODO Reference documentation of cozy-client

## Setup

### Install

`npm install --save cozy-client`
or
`yarn add cozy-client`

To get started using `cozy-client` with (p)React, you need to create a `CozyClient`, and a `CozyProvider`:

* `CozyClient` is the master of your data: it manages data queries and their status ;
* `CozyProvider` injects the client into components' context.

### Creating a client

```js
import CozyClient from 'cozy-client'

const schema = {
  todos: {
    doctype: 'io.cozy.todos',
    attributes: {...},
    relationships: {...}
  }
}

const client = new CozyClient({
  uri: 'http://cozy.tools:8080',
  schema,
  token: '...'
})
```

If you need guidance to get the URI of your instance and/or the token, see (https://docs.cozy.io/en/dev/app/#behind-the-magic).

Every doctype accessed in `cozy-client` needs to be declared in the schema section of the options. See the specific [how-to](./how-tos.md#how-to-specify-a-schema-) on how to use the schema features.

### Wrapping the App in a `CozyProvider`

All components connected to data need access to the client. We recommend that you use a `CozyProvider` to wrap your app. It will make the client available to all your components using the context:

```jsx
import CozyClient, { CozyProvider } from 'cozy-client'

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

### Using the client

An instance of `CozyClient` allows you to query and mutate (update) data, here's how it looks:

```jsx
import CozyClient from 'cozy-client'

const client = new CozyClient({
  /*...*/
})

client.query(
  client.find('io.cozy.todos').where({ checked: false })
).then(
  ({ data }) => console.log(data)
)

client.mutate(
  client.create('io.cozy.todos', { label: 'Buy bread' })
).then(
  ({ data }) => console.log(data.id)
)
```

## Requesting data

To make it easy to fetch data and make it available to your component, we provide a Render Props component called `Query`. Basic example of usage:

```jsx
import React from 'react'
import { Query } from 'cozy-client'

const query = client => client.find('io.cozy.todos').where({ checked: false })

const TodoList = () => (
  <Query query={query}>
    {({ data, fetchStatus }) =>
      fetchStatus !== 'loaded'
        ? <h1>Loading...</h1>
        : <ul>{data.map(todo => <li>{todo.label}</li>)}</ul>
    }
  </Query>
```

When we use `Query` to "wrap" a component, three things happen:
 - The query passed as a prop will be executed when `Query` mounts, resulting in the loading of data from the client-side store, or the server if the data is not in the store ;
 - `Query` subscribes to the store, so that it is updated if the data changes ;
 - `Query` pass the result of the query as props to the children function.

### The available props

 - `data`: an array of documents
 - `fetchStatus`: the status of the fetch (`pending`, `loading`, `loaded` or `error`)
 - `lastFetch`: when the last fetch occured
 - `hasMore`: the fetches being paginated, this property indicates if there are more documents to load

### Making queries

`cozy-client` provides you with a very easy to use DSL to define document queries:

```jsx
import CozyClient from 'cozy-client'

const client = new CozyClient({
  /*...*/
})

const query = client.find('io.cozy.todos').where({ checked: false }).sortBy({ label: 'desc' })
```

## Mutating data

In addition to fetching data using queries, `cozy-client` also helps you mutate (update) data.

```jsx
import React from 'react'
import { Query } from 'cozy-client'

const query = client => client.find('io.cozy.todos').where({ checked: false })

const createMutations = (client, ownProps) => ({
  addTodo: label => client.create('io.cozy.todos', { label })
})

const App = () => (
  <Query query={query} mutations={createMutations}>
    {(result, addTodo) =>
      <TodoList data={result.data} onAddTodo={addTodo} />
    }
  </Query>
```

### Updating queries

TODO

```jsx
import React from 'react'
import { connect, find } from 'cozy-client'

const query = find('io.cozy.todos').where({ checked: false })

const TodoList = ...

export default connect(query, { as: 'allTodos' })(TodoList)
```
