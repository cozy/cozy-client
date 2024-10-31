`cozy-client` is the sdk to interact with the cozy stack from a Javascript application. It aims at hiding all low level details and providing a simple high level API to fetch and cache documents.

Main features:

- Authentication with a Cozy
- Querying and caching documents
- Transparent relations between couchdb documents
- Updates metadata in couch documents
- Offline: any data can be stored in a local PouchDB that is persisted across page loads
- React integration to connect your components to remote data

Additional features with plugins:

- [Realtime][cozy-realtime]: Be notified when changes occur on the server side
- [InterApp][cozy-interapp]: Interact with other apps (example : file picking within your app)
- [Flag][cozy-flags]: Use feature flags

The following guide is an overview of a cozy-client integration to help you to get started.

## Install

```
npm install --save cozy-client
# or yarn add cozy-client
```

⚠️ If you use Jest, you should also add a bit of configuration for imports to work properly,
[see this document for more information][entrypoints].

## Usage

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

Usually, the token and URI are provided by the stack on the DOM node `<div role="application">`.
When using this, you can instantiate a client with:

```
const client = CozyClient.fromDOM({
   schema
}) // Note how token and uri are not passed, instead they are taken from the DOM
```

If you need guidance to get the URI of your instance and/or the token,
see [the app tutorial][app-tutorial].

Every doctype accessed in `cozy-client` needs to be declared in the schema section of the options.
See [how to use the schema features][schema]


## Fetch data

To fetch data, we first build a [`QueryDefinition`][query-definition] with the `Q` helper:

```javascript
import { Q } from 'cozy-client'

const allTodosQuery = Q('io.cozy.todos')
const singleTodoQuery = Q('io.cozy.todos').getById('5fcbbf2cb171b1d5c3bc6df3d4affb32')
```

`QueryDefinition`s describe which documents to be fetched from CouchDB. It uses a fluent interface:

```javascript
Q('io.cozy.todos')
  .select(['title', 'checked'])
  .where({checked: false})
  .include(['dependencies'])
  .sortBy([{'cozyMetadata.updatedAt': 'desc'}])
  .limitBy(20)
```

- `select()` lists the fields you want in the response (all by default)
- `where()` allows a [mango selector][mango-selector]
- `include()` will cause the query to fetch the related documents (see [relationships][cozy-relationships])
- `sortBy` sorts the documents by their `updatedAt` metadata in descending order
- `limitBy` limits the number of results to 20

By default, all fields in the `where()` are automatically indexed. You can turn off this behavior by specifying
explicitly the list of fields to be indexed in `indexFields()`.


Finally, `client.query()` will execute your query and return a promise with a `data` attribute containing the requested documents.

```javascript
import CozyClient from 'cozy-client'

const client = new CozyClient({
  /*...*/
})

const { data } = await client.query(Q('io.cozy.todos').where({ checked: false }))
console.log(data)
```

✅ Inside a React application, instead of using directly `client.query`, please use [`useQuery`, `<Query />` or `queryConnect`
to connect your components to cozy-client queries][react-integration].

ℹ️ Check out our dedicated [query documentation][query-documentation] to
know more about querying with cozy-client and avoid common traps that can dramatically impact your app performances.

🚀 Cozy-client's [devtools] allows to monitor your queries data and performance.

## Mutate the data

An instance of [`CozyClient`][cozy-client] allows you to query and mutate (update) data, here's how it looks:

```javascript
import CozyClient from 'cozy-client'

const client = new CozyClient({
  /*...*/
})


// create a new io.cozy.todo
await client.save({_type: 'io.cozy.todos', label: 'Buy bread', checked: false })

const qdef = Q('io.cozy.todos').where({ checked: false })
const { data: todos } = await client.query(qdef)
const doc = todos[0]
// modify existing io.cozy.todo (will make an update if _rev is present inside the doc)
await client.save({...doc, checked: true})
```

`save()` will return a Promise with a `data` attribute containing the saved document.

ℹ️ When mutating data, queries that depend on the mutated document(s) will automatically be refreshed:
components that depend on these queries will be re-rendered.

## Mutate several documents in batch

The `saveAll()` method can be used to save multiple documents in one request.

```javascript
const { data: updatedDocs } = await client.saveAll([
  { _type: 'io.cozy.todos', checked: true, label: 'Buy milk' },
  { _type: 'io.cozy.todos', checked: false, label: 'Make dinner' }
])
```

[cozy-realtime]: https://docs.cozy.io/en/cozy-realtime/
[cozy-interapp]: https://github.com/cozy/cozy-libs/tree/master/packages/cozy-interapp
[cozy-flags]: https://docs.cozy.io/en/cozy-flags/
[entrypoints]: ./entrypoints.md
[app-tutorial]: https://docs.cozy.io/en/tutorials/app/#behind-the-magic
[schema]: https://docs.cozy.io/en/cozy-client/schema
[query-definition]: ./api/cozy-client/classes/QueryDefinition.md
[mango-selector]: http://docs.couchdb.org/en/latest/api/database/find.html#find-selectors
[cozy-relationships]: https://docs.cozy.io/en/cozy-doctypes/docs/#relationships
[react-integration]: ./react-integration.md
[query-documentation]: https://docs.cozy.io/en/tutorials/data/queries/
[cozy-client]: ./api/cozy-client/classes/CozyClient.md
[devtools]: https://github.com/cozy/cozy-libs/tree/master/packages/cozy-devtools
