# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

      <a name="2.0.0"></a>
# [2.0.0](https://github.com/cozy/cozy-client/compare/v1.0.0-beta.30...v2.0.0) (2018-08-17)


### Bug Fixes

* :chore: disable regenerator transform in babel preset ([4993b55](https://github.com/cozy/cozy-client/commit/4993b55))
* 📝  Fix AppCollection ([3b58131](https://github.com/cozy/cozy-client/commit/3b58131))
* 📝 Fix lerna watch command ([6b29587](https://github.com/cozy/cozy-client/commit/6b29587))
* add babel-preset-cozy-app at root ([2c4681f](https://github.com/cozy/cozy-client/commit/2c4681f))
* add redux dependency used in tests ([386b864](https://github.com/cozy/cozy-client/commit/386b864))
* checkout on master since travis operates in detached head mode ([df26ee6](https://github.com/cozy/cozy-client/commit/df26ee6))
* client.get query will return only 1 result ([2d496e0](https://github.com/cozy/cozy-client/commit/2d496e0))
* localStorage cannot be used with opaque origins ([f76953e](https://github.com/cozy/cozy-client/commit/f76953e))
* quote "$@" ([45ac76b](https://github.com/cozy/cozy-client/commit/45ac76b))
* typo in travis.yml ([888b3a4](https://github.com/cozy/cozy-client/commit/888b3a4))
* Watch command 🐛 ([b484d5d](https://github.com/cozy/cozy-client/commit/b484d5d))


### Features

* ⚠️ Throw error for not available appcollection methods ([44edd17](https://github.com/cozy/cozy-client/commit/44edd17))
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




      <a name="1.0.0"></a>
# [1.0.0](https://github.com/cozy/cozy-client/compare/v1.0.0-beta.30...v1.0.0) (2018-08-17)


### Bug Fixes

* :chore: disable regenerator transform in babel preset ([4993b55](https://github.com/cozy/cozy-client/commit/4993b55))
* 📝  Fix AppCollection ([3b58131](https://github.com/cozy/cozy-client/commit/3b58131))
* 📝 Fix lerna watch command ([6b29587](https://github.com/cozy/cozy-client/commit/6b29587))
* add babel-preset-cozy-app at root ([2c4681f](https://github.com/cozy/cozy-client/commit/2c4681f))
* add redux dependency used in tests ([386b864](https://github.com/cozy/cozy-client/commit/386b864))
* checkout on master since travis operates in detached head mode ([df26ee6](https://github.com/cozy/cozy-client/commit/df26ee6))
* client.get query will return only 1 result ([2d496e0](https://github.com/cozy/cozy-client/commit/2d496e0))
* localStorage cannot be used with opaque origins ([f76953e](https://github.com/cozy/cozy-client/commit/f76953e))
* quote "$@" ([45ac76b](https://github.com/cozy/cozy-client/commit/45ac76b))
* typo in travis.yml ([888b3a4](https://github.com/cozy/cozy-client/commit/888b3a4))
* Watch command 🐛 ([b484d5d](https://github.com/cozy/cozy-client/commit/b484d5d))


### Features

* ⚠️ Throw error for not available appcollection methods ([44edd17](https://github.com/cozy/cozy-client/commit/44edd17))
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
