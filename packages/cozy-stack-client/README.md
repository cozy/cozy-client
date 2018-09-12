# cozy-stack-client

## The constructor

```js
const client = new CozyStackClient(options)
```
#### Options

 - `uri`: The Cozy instance URI ;
 - `token`: The token given by the stack.

## Collections

A collection is the set of all documents of a same doctype.

Selecting a collection is done by calling the `collection()` method, passing it the doctype:
```js
const todos = client.collection('io.cozy.todos')
```

## Listing all documents
```js
const allTodos = await todos.all()
console.log(allTodos.data)
```

#### Pagination

By default, the stack limits the number of query results to 100 documents. If
the limit causes some documents not to be returned, the response will have a
`next: true` property.

By using the `skip` and `limit` options you can build your own pagination:
```js
const firstPage = await todos.all({ limit: 100 })
if (firstPage.next) {
  const secondPage = await todos.all({ skip: 100, limit: 100 })
}
```
You can also use the `meta.count` property to know the total count of documents.
```js
const allTodos = await todos.all()
console.log(`There are ${allTodos.meta.count} todos.`)
```

## Finding documents
```js
const doneTodos = await todos.find({ done: true })
console.log(allTodos.data)
```
