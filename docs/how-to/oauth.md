# Using the OAuth client

`CozyClient` can also be used as an OAuth client. To get started, configure the OAuth informations when creating the client:

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

`scope` is an array of [permissions](https://github.com/cozy/cozy-stack/blob/master/docs/permissions.md) you require for your client, and `oauth` is a list of fields that identify your client for the user and the server. The complete list of field can be found [here](https://github.com/cozy/cozy-stack/blob/master/docs/permissions.md), although they should be camel-cased instead of snake-cased.

## Obtaining a token

Before you can start making requests to the server, you will need to get a token. `cozy-client` will provide a URL to a page where the user is shown what data you want to access, and asking for his or her permission. After the user accepts these permissions, he or she is redirected to the `oauth.redirectURI` that you declared earlier. You will then have to give this redirected URL back to `cozy-client` as it contains a code, that will be exchanged for the token.

Sounds, tricky, but most of it is taken care of for you. To get started, you call `client.startOAuthFlow` like this:

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

The `openURL` parameter is a callback. It will receive the URL to the page as a parameter, and it must return a Promise that resolves with the redirected URL. How exactly you do this depends on your environment — for a mobile app you may use a WebView, in a browser maybe a new tab… Here is an example that uses the browser's console and an experienced user:

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

## Restoring a client

Of course you don't want to go through this whole process every time your app starts. In order to restore the client from a previous version, you need to give it a token and some extra information about itself. Both of these are returned by the `openURL` function, so you can store them wherever you see fit — in this example we'll use the `localStorag` API.

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

## Logout a client

When a user logout, we would like remove all references on this instance and
remove all user data. You can just use `cozyClient.logout()`.
