# How to activate offline for a set of doctypes ?

If you are already using `cozy-client` and the `StackLink`, you may want to go
further and store some documents locally so you can retrieve them even while
being offline.

Currently, you have a code like this one :

```js
import CozyClient, { StackLink } from 'cozy-client'

const stackLink = new StackLink()

const client = new CozyClient({
  // ...
  links: [stackLink]
})
```

To manage the offline aspect, we provide the
[cozy-pouch-link](https://github.com/cozy/cozy-client/tree/master/packages/cozy-pouch-link).
First, let's install it :

```console
# using npm
npm install cozy-pouch-link

# using yarn
yarn add cozy-pouch-link
```

Then, we will create a new instance of this link and give it the list of
doctypes that we want to access offline. We have to put the `PouchLink` first, so
it is reached first when we query the link chain :

```js
import CozyClient, { StackLink } from 'cozy-client'
import PouchLink from 'cozy-pouch-link'

const stackLink = new StackLink()

const offlineDoctypes = ['io.cozy.todos']
const pouchLink = new PouchLink({
  doctypes: offlineDoctypes,
  initialSync: true // whether you want to trigger the synchronization on login or not
})

const client = new CozyClient({
  // ...
  links: [pouchLink, stackLink]
})
```

The `PouchLink` will create the PouchDB databases for all offline doctypes and
synchronize them with the distant CouchDB. All doctypes that are not managed by
the `PouchLink` will be passed to the next link in the chain (in the previous
example, the `StackLink`).
