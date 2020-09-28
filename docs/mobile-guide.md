<!-- MarkdownTOC autolink=true -->

- [Using CozyClient on a mobile app](#using-cozyclient-on-a-mobile-app)
  - [Configuration 🛠](#configuration-%F0%9F%9B%A0)
  - [Starting the OAuth flow 🏄‍♂️](#starting-the-oauth-flow-%F0%9F%8F%84%E2%80%8D%E2%99%82%EF%B8%8F)
  - [How to restore a previous token ?](#how-to-restore-a-previous-token-)
  - [How to logout the client ?](#how-to-logout-the-client-)
- [Support offline for some doctypes with `cozy-pouch-link`](#support-offline-for-some-doctypes-with-cozy-pouch-link)

<!-- /MarkdownTOC -->


## Using CozyClient on a mobile app

### Configuration 🛠

On the web, the server pass the token and the domain to the page directly through template variables. This is not possible on mobile as there is no server to serve the page. `CozyClient` supports connecting to a Cozy via OAtuh.

To get started, configure the OAuth settings when creating the client:

```js
import CozyClient from 'cozy-client'

const client = new CozyClient({
  uri: 'http://cozy.tools:8080',
  scope: ['io.cozy.mydoctype'],
  oauth: {
    clientName: 'MyClient',
    softwareID: 'MyAppId',
    redirectURI: 'http://localhost'
  }
})
```

* `scope` is an array of [permissions](https://github.com/cozy/cozy-stack/blob/master/docs/permissions.md) you require for your client

* `oauth` is a list of fields that identify your client for the user and the server. The complete list of field can be found [here](https://github.com/cozy/cozy-stack/blob/master/docs/permissions.md), although they should be camel-cased instead of snake-cased.

### Starting the OAuth flow 🏄‍♂️

Before you can start making requests to the server, you will need to get a token. `cozy-client` will provide a URL to a page where the user is shown what data you want to access, and asking for his or her permission. After the user accepts these permissions, he or she is redirected to the `oauth.redirectURI` that you declared earlier. You will then have to give this redirected URL back to `cozy-client` as it contains a code, that will be exchanged for the token.

To get started, you call `client.startOAuthFlow` like this:

```js
import CozyClient from 'cozy-client'

const client = new CozyClient({
  uri: 'http://cozy.tools:8080',
  scope: ['io.cozy.mydoctype'],
  oauth: {
    clientName: 'MyClient',
    softwareID: 'MyAppId',
    redirectURI: 'http://localhost'
  }
})

client.startOAuthFlow(openURL)
```

The `openURL` parameter is a callback. It will receive the URL to the page as a parameter, and it must return a `Promise` that resolves with the redirected URL. How exactly you do this depends on your environment — for a mobile app you may use a WebView, in a browser maybe a new tab… Here is an example that uses the browser's console and an experienced user:

```js
const openURL = url => {
  console.log('Please visit the following URL, accept the permissions and copy the URL you are redirected to, then come back here. you have 10 seconds.', url)
  return new Promise(resolve => {
    setTimeout(async () => {
      const returnUrl = prompt('Paste the new URL here.')
      resolve(returnUrl)
    }, 10000)
  })
}
```

And that's it! After the promise is resolved, `cozy-client` finishes the OAuth flow and you can start using it.

### How to restore a previous token ?

Nobody likes to enter passwords, and you don't want to make your user go through this whole process every time your app starts. In order to restore the client from a previous version, you need to give it a token and some extra information about itself. Both of these are returned by the `openURL` function, so you can store them wherever you see fit — in this example we'll use the `localStorage` API.

```js
import CozyClient from 'cozy-client'

const client = new CozyClient({
  uri: 'http://cozy.tools:8080',
  scope: ['io.cozy.mydoctype'],
  oauth: {
    clientName: 'MyClient',
    softwareID: 'MyAppId',
    redirectURI: 'http://localhost'
  }
})

const {token, infos} = client.startOAuthFlow(openURL)
localStorage.setItem('token', token)
localStorage.setItem('infos', JSON.stringify(infos))
```

Next time your app starts, you can pass these informations to the constructor. Here is a complete example of the OAuth client initilisation:

```js
const storedToken = localStorage.getItem('token') || null
const storedInfos = JSON.parse(localStorage.getItem('infos')) || {
  clientName: 'MyClient',
  softwareID: 'MyAppId',
  redirectURI: 'http://localhost'
}

const client = new CozyClient({
  uri: 'http://cozy.tools:8080',
  oauth: storedInfos,
  token: storedToken,
  scope: ['io.cozy.mydoctype']
});

if (!storedToken) {
  const {token, infos} = await client.startOAuthFlow(openURL)
  localStorage.setItem('token', token)
  localStorage.setItem('infos', JSON.stringify(infos))
}
```

### How to logout the client ?

When a user logout, we would like remove all references on this instance and
remove all user data. You can just use `cozyClient.logout()`.

## Support offline for some doctypes with `cozy-pouch-link`

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

Additionally, it is possible to replicate some doctypes only in a specific direction:

```js

const pouchLink = new PouchLink({
  doctypes: ['io.cozy.todos', 'io.cozy.files', 'io.cozy.localtype'],
  doctypesReplicationOptions: {
    'io.cozy.todos': {
      strategy: 'sync' // default, replicate both ways
    },
    'io.cozy.files': {
      strategy: 'fromRemote' // replicate changes from the remote locally, but don't push any changes
    },
    'io.cozy.localtype': {
      strategy: 'toRemote' // push changes to remote, but don't replicate changes from it
    }
  }
  initialSync: true
})
```

If you choose the `fromRemote` strategy, the cozy-client mutation will not be executed 
on the PouchLink but rather on the StackLink. 

Since making the first query can be long (PouchDB will create the index first), you can 
specify the queries you want to be "warmed up". It means that, those queries will be 
executed by CozyClient during the PouchLink's instanciation, but CozyClient will use 
PouchDB only if those queries have been resolved at least one time.

```js

const buildRecentQuery = () => ({
  definition: () =>
    Q('io.cozy.files')
      .where({
        type: 'file',
        trashed: false,
        updated_at: {
          $gt: null
        }
      })
  options: {
    as: 'recent-view-query',
    fetchPolicy: defaultFetchPolicy,
  }
})

const pouchLink = new PouchLink({
  doctypes: ['io.cozy.todos', 'io.cozy.files', 'io.cozy.localtype'],
  doctypesReplicationOptions: {
    'io.cozy.files': {
      warmupQueries: [
        buildRecentQuery()
      ]
    }
  }
  initialSync: true
})
```

