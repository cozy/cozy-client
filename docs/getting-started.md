<!-- MarkdownTOC autolink=true -->

- [What's cozy-client?](#whats-cozy-client)
- [Install](#install)
- [Creating a client](#creating-a-client)
- [How to query with Cozy Client](#how-to-query-with-cozy-client)
- [How to mutate the data](#how-to-mutate-the-data)

<!-- /MarkdownTOC -->


## What's cozy-client?

`cozy-client` is the sdk to interact with the cozy stack from a Javascript application. It aims at hidding all low level details and providing a simple high level API.

Main features :

- Authentification with your Cozy
- Requests to the couchdb data
- Transparent relations between couchdb documents
- Automatically takes care of updating metadata in couch documents
- Offline: any data can be stored in a local cache without impacting your code that can continue to read and write.

In addition, the library also provides a React integration to connect your components to the data stored in the cozy stack (with automatic refresh when the data is updated)

Additional features with plugins :

- Real-time : be notified when changes occur on the server side.
- InterApp : API to interact with other apps (exemple : file picking within your app)

The following guide is an overview of a cozy-client integration to help you getting started.

## Install

`npm install --save cozy-client`
or
`yarn add cozy-client`

`CozyClient` is the master of your data: it manages data queries and their status.

ℹ If you use Jest, you should also add a bit of configuration for imports to works properly,
[see at the end of this document](#different-entrypoints-for-nodebrowser).

## Creating a client

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

If you need guidance to get the URI of your instance and/or the token, see [the app tutorial](https://docs.cozy.io/en/tutorials/app/#behind-the-magic).

Every doctype accessed in `cozy-client` needs to be declared in the schema section of the options. See the specific [documentation](https://docs.cozy.io/en/cozy-client/schema) on how to use the schema features.


## How to query with Cozy Client

The two main methods to query data with cozyClient are `find()` and `get()`. Both take an doctype as first argument and return a `QueryDefinition` object: 

```javascript
client.find('io.cozy.todos')

client.get('io.cozy.todos', '5fcbbf2cb171b1d5c3bc6df3d4affb32')
```

A `QueryDefinition` is a special object that describe a query to be sent to CouchDB. It uses a fluent interface:

```javascript
client.find('io.cozy.todos')
  .select(['title', 'checked'])
  .where({checked: false})
  .include(['dependencies'])
  .sortBy([{'cozyMetadata.updatedAt': 'desc'}])
  .limitBy(20)
```

`select()` lists the fields you want in the response (all by default), `where()` allows a [mango selector](http://docs.couchdb.org/en/latest/api/database/find.html#find-selectors), `include()` allows to name the relationships in the schema that you want to load in your response, then `sortBy` and `limitBy` restricts the returned results.

By default all fields in the `where()` are automatically indexed. You can reverse this behaviour by specifying explicitly the list of fields to be indexed in `indexFields()`.


Finally, `client.query()` will execute your query and return a promise with a `data`attribute containing the requested documents.

```javascript
import CozyClient from 'cozy-client'

const client = new CozyClient({
  /*...*/
})

client.query(
  client.find('io.cozy.todos').where({ checked: false })
).then(
  ({ data }) => console.log(data)
)
```

## How to mutate the data

An instance of `CozyClient` allows you to query and mutate (update) data, here's how it looks:

```javascript
import CozyClient from 'cozy-client'

const client = new CozyClient({
  /*...*/
})


// create a new io.cozy.todo
await client.create('io.cozy.todos', { label: 'Buy bread', checked: false })

client.query(
  client.find('io.cozy.todos').where({ checked: false })
).then(
  
  ({ data }) => {

    const doc = data[0]
    // modify existing io.cozy.todo
    await client.save({...doc, checked: true})

  }

)
```

Both `create()` and `save()` will return a Promise with a `data` attribute containing the saved document.

## Learn more about queries

You can check out our dedicated [query documentation](https://docs.cozy.io/en/tutorials/data/queries/) to know more about querying with cozy-client and avoid common traps that can dramatically impact your app performances.

## Connecting with you React components

CozyClient comes with HOC and render props functions to connect to your data inside you own components. See the specific documentation for [React integration](./react-integration.md)

## Different entrypoints for node/browser

cozy-client has different entry points for browser and node (the node version does not export React components). It is implemented by using fields in `package.json`: 

- `browser` field is the entrypoint for browsers
- `main` field is for node

It causes an issue when writing tests that use React components from cozy-client (`Provider` for example) since Jest does not support the `browser` field (contrary to webpack).

⚠️ If you use react APIs, you should configure Jest with the [`browser` option](https://jest-bot.github.io/jest/docs/configuration.html#browser-boolean) in your `package.json` or `jest.config.js`:

```patch
   "jest": {
+    "browser": true
   }
```

There can be some problems since the `browser` field can clash with other node detection mechanism in other libraries (for example `iconv-lite`, see this [PR](https://github.com/ashtuchkin/iconv-lite/pull/222)), an alternative is to use the `moduleNameMapper` option to point Jest to the correct entrypoint only for `cozy-client`.

```
"moduleNameMapper": {
  "^cozy-client$": "cozy-client/dist/index"
}
```

This will force Jest to use the browser entry point.

See [this page](https://github.com/marko-js/jest#why-override-the-resolver-enhanced-resolve-jest) for another alternative solution that overrides the jest resolver so that it supports the `browser` field.
