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

⚠️ Even if you use an NPM tag, this creates a real version on NPM. If you want to create
a beta version, change the version and add for example `beta.0`. This way, you do not
take the space of the next version.

* `--force-publish` to force publication even if there were no changes

```
lerna publish --scope cozy-client --force-publish cozy-client
```

Linking
-------

Use `yarn watch` to watch on cozy-client side and `yarn link` on the app side.

If you have a problem like "React is not found" from cozy-client files, it may be because webpack is resolving the dependencies in cozy-client's `node_modules`, you may want to `ln -s` your app node_modules inside cozy-client's.

```
$ ls code
cozy-banks
cozy-client

$ cd cozy-client/packages/cozy-client
$ rm -rf node_modules
$ ln -s ~/code/cozy-banks/node_modules .
```
