## How to activate logging ?

Cozy-client libs use [`minilog`](https://www.npmjs.com/package/minilog) for internal logging.
If you need to see those logs, you need to tell minilog to show them, they are filtered by
default. Each lib has a different namespace that can be enabled/disabled.

For example if you want to allow `cozy-pouch-link` logs at `debug` level, you can do:

```
// In your app, make sure to attach minilog to window for cozy-client to use it
import minilog from 'minilog'
window.minilog = minilog
minilog.enable()
// You can enable/disable loggers via minilog filters
require('minilog').suggest.allow('cozy-pouch-link', 'debug')
```


If you want to see everything :

```
require('minilog').suggest.clear()
```

More info on [minilog docs](http://mixu.net/minilog/filter.html#filters).
