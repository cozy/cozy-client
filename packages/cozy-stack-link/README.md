# cozy-stack-link

## The constructor

```js
const link = new CozyStackLink(options)
```
#### Options

 - `uri`: The Cozy instance URI ;
 - `token`: The token given by the stack.

## Collections

A collection is the set of all documents of a same doctype.

Selecting a collection is done by calling the `collection()` method, passing it the doctype:
```js
const todos = link.collection('io.cozy.todos')
```

## Listing all documents
```js
const allTodos = await todos.all()
console.log(allTodos.data)
```

#### Pagination
By default, the link limits query results to 50 documents. If the limit causes some documents to not be returned, the response will have a `next: true` property.
You can also use the `meta.count` property to know the total count of documents.
By using the `skip` and `limit` options you can build your own pagination:
```js
const allTodos = await todos.all({ skip: 100, limit: 100 })
```

## Finding documents
```js
const doneTodos = await todos.find({ done: true })
console.log(allTodos.data)
```