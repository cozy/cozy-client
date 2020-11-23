## Cozy-client Architecture

This is an overview of the cozy-client architecture:

![Architecture schema](./architecture.png)

<!-- The architecture schema can also be accessed [online here](https://whimsical.co/6AJnnS7v5ePRcuKZysPAF5).
It's created on https://whimsical.co/ — if you need to edit it, ask for an invite from one of the projects maintainers. -->

To explain the architecture, we will see how a request for data flows
through cozy-client through links and finally how the data that has been
fetched is stored in the redux store.

<!-- MarkdownTOC autolink=true -->

- [Query definitions](#query-definitions)
- [Links](#links)
- [Store](#store)

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

The redux store is composed of two slices, "documents" and "queries": 

- `documents` stores the data indexed by `[doctype]([doctype](https://docs.cozy.io/en/cozy-doctypes/docs/)` then `_id`.
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
