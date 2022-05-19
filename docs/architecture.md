## Cozy-client Architecture

This is an overview of the cozy-client architecture:

![Architecture schema](./architecture.png)

<!-- The architecture schema can also be accessed [online here](https://whimsical.co/6AJnnS7v5ePRcuKZysPAF5).
It's created on https://whimsical.co/ — if you need to edit it, ask for an invite from one of the projects maintainers. -->

To explain the architecture, we will see how a request for data flows
through cozy-client through links and finally how the data that has been
fetched is stored in the redux store.

<!-- MarkdownTOC autolink=true -->

- [Cozy-client Architecture](#cozy-client-architecture)
  - [Query definitions](#query-definitions)
  - [Links](#links)
  - [Store](#store)
  - [How does it works?](#how-does-it-works)
  - [Focus on `receiveMutationResult`:](#focus-on-receivemutationresult)

<!-- /MarkdownTOC -->


### Query definitions

To query data, we create a *query definition*: an object describing what documents to fetch.

```
{
  doctype: "io.cozy.todos",
  selector: {
    "finished": true
  }
}
```

It is typically created via the helper `Q` that provides a fluid interface
to create a *Query Definition*.

```jsx
const qdef = Q('io.cozy.todos').where({ finished: true })
```

Then we need to execute this query, fetch the data, and storing it.

```jsx
await client.query(qdef)
```

### Links

When executed, *Query definitions* are passed down to *Links*.

Links accept query definitions and can choose

- either to return a response
- or to pass the query definition down to the next link. 

> ℹ️ This is how offline support is implemented: on mobile, a PouchLink (we
use PouchDB under the hood) is added as a link to cozy-client, before the
default StackLink. The PouchLink can decide:

> - either to pass down the query definition to the next link (if the PouchLink has not been synchronized for example),
> - or to respond to the request by communicating directly with PouchDB.

At the moment there are only two links:

- StackLink : fetches data over HTTP by communicating to the Cozy's Stack via the
StackClient.
- PouchLink : fetches data from a local PouchDB. Useful to have offline-ready
  applications.

### Store

When links have responded with data, the data is stored inside the
*redux store* that is internal to cozy-client. This redux store
brings observability to cozy-client, and allows for connection of
UI components to the data.

> ℹ️ You do not need to use Redux in your application to use cozy-client.

> ℹ️ You can connect your own store to cozy-client. It is useful for more
advanced techniques where you create selectors directly on the data
of cozy-client.

The redux store is composed of two `slices` : `documents` and `queries`: 

- `documents` stores the data indexed by [doctype](https://docs.cozy.io/en/cozy-doctypes/docs/) then `_id`
- `queries` store information for each query that has been done by cozy-client. 
    * ids of the documents that match the query
    * whether the server has more documents that can be fetched (useful for
      pagination)
    * whether the query is being loaded.

```js
{
    documents: {
        'io.cozy.todos': {
            'todo-id-1': {
                finished: true,
                label: "Add architecture document for cozy-client"
            }
        }
    },
    queries: {
        finishedTodos: {
            data: ['todo-id-1']
        }
    }

}
```
> ℹ️ If queries are not named, a name is automatically generated but this means that the `queries`
slice can grow indefinitely if there are a large number of queries. This is why you are 
encouraged to name your queries : `client.query(qdef, { as: 'finishedTodos'})`. 

The glue between the Redux store and the UI is done via ObservableQuery.
`ObservableQuery` are objects instantiated by a <Query /> component. Their
role is to react to store changes and wake the component. They should not
be used directly as `useQuery` and `queryConnect` do the job for you.

What do we mean exactly by saying "This redux store
brings observability to cozy-client, and allows for connection of
UI components to the data." Let's take a full exemple: 

We have a component that displays a todolist: 
```jsx
// TodoListComponent.jsx
const { data, fetchStatus } = useQuery(Q('io.cozy.todos'), {'as': 'todoslist'})
if(fetchStatus === 'loaded'){
  return <TodoLists todos={data}> /> 
}
```

But we also have a component that gives use the opportunity to add a 
new todo: 
```jsx
client.save({_type: 'io.cozy.todos', 'label': 'New TODO'});
```

After the call to `save` your `TodoListComponent` will be re-rendered 
with the `New TODO`. 

### How does it works?

When a `query` is resolved, CozyClient dispatches a `receiveQueryResult`
action for a simple `get` but `receiveMutationResult` when we mutate 
something. 

### Focus on `receiveMutationResult`: 

Our two slices `documents` and `queries` listen actions and do some specific work on
 `isReceivingMutationResult` action.

`documents`: If the `_id` of the mutated document is not present, then we add the document. 
If the `_id` is already there, then we update the content of the document with the fresh data
(for now the work is done in extractAndMergeDocument() method). 

So if your app is linked to the documents store via getDocumentFromStore() for instance
your app will have the updated value. 

`queries` has an autoUpdater mechanism that does something we can explain this way:
- it takes the mutated documents (newly created or updated) 
- it converts the initial `query` to a "`js predicate`" (thanks to the [sift library](https://github.com/crcn/sift.js/))
- For each query already in the `slice` it runs this `js predicate` and detects if the query
is concerned by the mutation
- If the query is concerned, then it checks if it has to remove / add the id of the `mutated` 
document
(for now the work is done mainly in queries.js/updateData())

So in our previous example our `todoslist` is concerned by the addition of the new todo, then 
the `id` is added to `todolist` data, then the component linked will be refreshed with this new 
document.

### About updates

As already mentioned, when a mutated document already exists in the store throught its `_id`, it is updated with the new content. However, this update never removes existing fields, it only merges or adds new fields. This is typically useful when two queries retrieve the same document, but not with all the fields. 
Let us illustrate with this example:

```js
const Q1 = { definition: Q('io.cozy.todos').getById('my-todo'), options: { as: todoslist-full, fetchPolicy: lessThan30s }}
const Q2 = { definition: Q('io.cozy.todos').getById('my-todo').select(['label']), options: { as: todoslist-label }}

await client.query(Q1) // returns { _id: 'my-todo', _type: 'io.cozy.todos', label: 'TODOTODO' }, from the database
await client.query(Q2) // returns { label: 'TODOTODO' }, from the database
await client.query(Q1) // returns { _id: 'my-todo', _type: 'io.cozy.todos', label: 'TODOTODO' }, from the store
```

Q1 retrieves the full content of 'my-todo' while Q2 only retrieves its label. When Q2 is run, 'my-todo' already exists in the store, as Q1 was previsouly run. However, the fields retrieved by Q1 for 'my-todos' but absent from Q2 are not lost. This way, when Q1 is run again, the results fetched from the store (thanks to the fetch policy) will include all the fields.

