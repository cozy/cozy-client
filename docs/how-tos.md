<!-- MarkdownTOC autolink=true -->

- [How to use the client on Node environment ?](#how-to-use-the-client-on-node-environment-referenceerror-fetch-is-not-defined)
- [How to specify a schema ?](#how-to-specify-a-schema-)
- [How to activate logging ?](#how-to-activate-logging-)

<!-- /MarkdownTOC -->


### How to use the client on Node environment (`ReferenceError: fetch is not defined`) ?

Cozy-Client relies on the [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) function included in browsers (or polyfilled). This function does not exist on Node environments so we have to provide a polyfill. An example using [`node-fetch`](https://www.npmjs.com/package/node-fetch):

```js
import fetch from 'node-fetch'
import CozyClient from 'cozy-client'

global.fetch = fetch
```

Then you will be able to use all the client methods and fetch data correctly.


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

## How to activate logging ?

Cozy-client libs use [`minilog`](https://www.npmjs.com/package/minilog) for internal logging.
If you need to see those logs, you need to tell minilog to show them, they are filtered by
default. Each lib has a different namespace that can be enabled/disabled.

For example if you want to allow `cozy-pouch-link` logs at `debug` level, you can do:

```
require('minilog').suggest.allow('cozy-pouch-link', 'debug')
```

If you want to see everything :

```
require('minilog').suggest.clear()
```

More info on [minilog docs](http://mixu.net/minilog/filter.html#filters).
