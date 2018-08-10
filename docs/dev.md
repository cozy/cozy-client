Publishing
----------

We use lerna for publishing. 

```
lerna publish
```

These options are useful

* `--scope` to only care about one package

```
lerna publish --scope cozy-client
```

* `--npm-tag` to change the default npm-tag (latest). Useful if you are testing
and don't want your users to end up with your changes.

```
$ lerna publish --scope cozy-client --npm-tag beta
$ npm install cozy-client@beta
```

* `--force-publish` to force publication even if there were no changes

```
lerna publish --scope cozy-client --force-publish cozy-client
```

Linking
-------

Use `yarn watch` to watch on cozy-client side and `yarn link` on the app side.
