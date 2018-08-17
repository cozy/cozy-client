# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

     <a name="1.0.0"></a>
# [1.0.0](https://github.com/cozy/cozy-client/compare/v1.0.0-beta.30...v1.0.0) (2018-08-17)


### Bug Fixes

* add redux dependency used in tests ([386b864](https://github.com/cozy/cozy-client/commit/386b864))
* client.get query will return only 1 result ([2d496e0](https://github.com/cozy/cozy-client/commit/2d496e0))


### Features

* add helpful error handling ([bb68d1b](https://github.com/cozy/cozy-client/commit/bb68d1b))
* add hoc queryConnect and withClient ([c241f82](https://github.com/cozy/cozy-client/commit/c241f82))
* auto update queries when receiving results ([1370773](https://github.com/cozy/cozy-client/commit/1370773))
* default options for Query ([da295c1](https://github.com/cozy/cozy-client/commit/da295c1))
* extract function to give better errors ([f7a97ca](https://github.com/cozy/cozy-client/commit/f7a97ca))
* query update removes documents that no longer pertain to the query ([0a7dac5](https://github.com/cozy/cozy-client/commit/0a7dac5))
* remove context query ids ([f428d81](https://github.com/cozy/cozy-client/commit/f428d81))
* throw when ObservableQuery does not have the right params ([25b56a5](https://github.com/cozy/cozy-client/commit/25b56a5))


### Performance Improvements

* bind fetch more ([dc82671](https://github.com/cozy/cozy-client/commit/dc82671))
* do not bind functions inside render ([0227634](https://github.com/cozy/cozy-client/commit/0227634))


### BREAKING CHANGES

* before applications had to select the
first item of the results themselves, now it is
done in the library

```diff
<Query query={client.get('doctype', 'id')}>
-  { ({ data: documents }) => {
-     const myDoc = documents[0]
+  { ({ data: myDoc }) => {
  ...
}}
/>
```
