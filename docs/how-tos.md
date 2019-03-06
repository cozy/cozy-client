<!-- MarkdownTOC autolink=true -->

- [How-to integrate with an existing store ?](#how-to-integrate-with-an-existing-store-)
- [How to connect to the documents store declaratively ?](#how-to-connect-to-the-documents-store-declaratively-)
- [How to provide a mutation to a component ?](#how-to-provide-a-mutation-to-a-component-)
- [How to specify a schema ?](#how-to-specify-a-schema-)

<!-- /MarkdownTOC -->


### How-to integrate with an existing store ?

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

### How to connect to the documents store declaratively ?

Sometimes, HOCs are better suited than render-prop components, especially if you have multiple data-sources and you do not want to have multiple indent levelves. We provide a higher-order component called `queryConnect`. Basic example of usage:

```jsx
import React from 'react'
import { queryConnect } from 'cozy-client'

const query = client => client.find('io.cozy.todos').where({ checked: false })

const TodoList = ({ todos }) =>
  todos.fetchStatus !== 'loaded'
    ? <h1>Loading...</h1>
    : <ul>{todos.data.map(todo => <li>{todo.label}</li>)}</ul>

export default queryConnect({
  todos: {
    query: query,
    as: 'todos'
  }
})(TodoList)
```

When we use `queryConnect` to bind a query to a component, three things happen:
 - The queries passed as an argument will be executed when the component mounts, resulting in the loading of data from the client-side store, or the server if the data is not in the store ;
 - Our component subscribes to the store, so that it is updated if the data changes ;
 - props are injected into the component: if we were to declare `propTypes` they would look like this:
```jsx
TodoList.propTypes = {
  todos: PropTypes.shape({
    fetchStatus: PropTypes.string.isRequired,
    data: PropTypes.array
  })
}
```

You can also connect multiples queries by adding other properties to the object passed to `queryConnect`:

```jsx
import { queryConnect } from 'cozy-client'
import React from 'react'
import TodoList from './TodoList'
import Contacts from './Contacts'

const App = ({ todos, contacts }) => (
  <div>
    {todos.fetchStatus !== 'loaded' ? <p>Loading...</p> : <TodoList items={todos.data} />}
    {contacts.fetchStatus !== 'loaded' ? <p>Loading...</p> : <Contacts items={contact.data} />}
  </div>
)

export default queryConnect({
  todos: { query: client => client.all('io.cozy.todos'), as: 'todos' },
  contacts: { query: client => client.all('io.cozy.contacts'), as: 'contact' }
})(App)
```

Finally, `queryConnect` also allows us to make queries based on props by passing a function instead of a plain object. For example, if we want to fetch todos based on a selected contact:

```js
queryConnect({
  todos: props => ({
    query: client => client.all('io.cozy.todos').where({ author: props.selectedContact }),
    as: 'todos'
  })
})
```

## How to provide a mutation to a component ?

`withMutation` provides only a simple function to the wrapper component, in a prop called `mutate`:

```jsx
import { withMutation } from 'cozy-client'

const AddTodo = ({ mutate: createTodo }) => {
  let input

  return (
    <form onSubmit={e => {
      e.preventDefault()
      createTodo(input.value)
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

## How to specify a schema ?

Each doctype accessed via cozy-client needs to have a schema declared. It is useful for

* Validation
* Relationships
* Automatic metadata maintenance

Here is a sample of a schema used in the Banks application.

```js
const { HasMany } = require('cozy-client')

class HasManyBills extends HasMany {
  ...
}

class HasManyReimbursements extends HasMany {
  ...
}


const schema = {
  transactions: {
    doctype: 'io.cozy.bank.operations',
    attributes: {},
    relationships: {
      account: {
        type: 'belongs-to-in-place',
        doctype: 'io.cozy.bank.accounts'
      },
      bills: {
        type: HasManyBills,
        doctype: 'io.cozy.bills'
      },
      reimbursements: {
        type: HasManyReimbursements,
        doctype: 'io.cozy.bills'
      }
    },
    cozyMetadata: {
      createdByApp: {
        trigger: 'creation',
        value: 'cozy-banks'
      },
      updatedByApps: {
        trigger: 'update',
        value: ['cozy-banks']
      },
      createdAt: {
        trigger: 'creation',
        useCurrentDate: true
      },
      updatedAt: {
        trigger: 'update',
        useCurrentDate: true
      },
    }
  }
}

const client = new CozyClient({
  ...
  schema
  ...
})
```

### Relationships

Here we can see that banking transactions are linked to

- their *account* via a "belongs to" relationship
- *bills* via a custom "has many" relationship
- *reimbursements* via a custom "has many" relationship

Custom relationships are useful if the relationship data is not stored in a built-in way.

### Metadata

cozy-client will also automatically insert and update the standard document metadata. You may provide some info when you initialize the client:

- in the `appMetadata` parameter:
  - `slug`: the app's slug
  - `sourceAccount`: in case of the app is a connector, the `io.cozy.accounts` (defaults to `null`)
  - `version`: the app's version
- in the `schema`, for each doctype:
  - `doctypeVersion`: the version of the doctype

For example, to initialize the client for google connector that deals with `io.cozy.contacts` and `io.cozy.contacts.accounts`:

```javascript
const client = new CozyClient({
  schema: {
    contacts: {
      doctype: 'io.cozy.contacts',
      doctypeVersion: 2
    },
    contactsAccounts: {
      doctype: 'io.cozy.contacts.accounts',
      doctypeVersion: 1
    }
  },
  appMetadata: {
    slug: 'konnector-google',
    sourceAccount: 'xxx', // id of the io.cozy.accounts object
    version: 3
  }
})
```

### Validation

Validation is not yet implemented in cozy-client.
