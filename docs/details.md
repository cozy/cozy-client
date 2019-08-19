<!-- MarkdownTOC autolink=true -->

- [How to use the client on Node environment ?](#how-to-use-the-client-on-node-environment-referenceerror-fetch-is-not-defined)
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

When using cozy-client on Node environment, you don't have access to all React
specific APIs. If, for any reason, you want to access these APIs, you can still
import them from `cozy-client/dist/react`.


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
