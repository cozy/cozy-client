# Links

## Using links

To create a link to use with Cozy Client, you can import one from `cozy-client` or create your own. A `StackLink` will be setup by default, but you can instantiate it yourself:

```js
import CozyClient, { StackLink } from 'cozy-client'

const link = new StackLink()

const client = new CozyClient({
  uri: 'http://cozy.tools:8080',
  token: '...',
  link
})
```

Links are designed to be composed together to form chains:

```js
import CozyClient, { StackLink } from 'cozy-client'
import PouchDBLink from 'cozy-pouch-link'
import LogLink from '../LogLink'

const stackLink = new StackLink()
const pouchLink = new PouchDBLink({ doctypes: [...] })
const logLink = new LogLink()

const client = new CozyClient({
  uri: 'http://cozy.tools:8080',
  token: '...',
  links: [
    logLink,
    pouchLink,
    stackLink
  ]
})
```

## Authoring a link

There are two ways of creating a new link. First, you can instantiate a `CozyLink` and pass a request handling function to its constructor:

```js
const logLink = new CozyLink((operation, result, forward) => {
  console.log(JSON.stringify(operation))
  return forward(operation, result)
})
```

Or you can subclass `CozyLink`:

```js
class LogLink extends CozyLink {
  request(operation, result, forward) {
    console.log(JSON.stringify(operation))
    return forward(operation, result)
  }
}
```

At the core of a link is the `request` method. It takes the following arguments:
 - `operation`: the operation definition being passed through the link ;
 - `result`: the (maybe incomplete) result processed by the previous link ;
 - `forward`: (optional) specifies the next link in the chain of links.

When the `request` method is called, the link has to return data back. Depending on where the link is in the chain, and its ability to provide the requested data, it will either use the `forward` callback to defer to the next link the task of providing (or completing) the data, or return back a result on its own.
