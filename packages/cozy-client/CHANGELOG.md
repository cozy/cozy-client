# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

      <a name="2.6.1"></a>
## [2.6.1](https://github.com/cozy/cozy-client/compare/v2.6.0...v2.6.1) (2018-09-03)


### Bug Fixes

* Creating a doc with empty relationships ([ebf0d86](https://github.com/cozy/cozy-client/commit/ebf0d86))




      <a name="2.6.0"></a>
# [2.6.0](https://github.com/cozy/cozy-client/compare/v2.5.2...v2.6.0) (2018-08-31)


### Features

* add replication manager ([20511c7](https://github.com/cozy/cozy-client/commit/20511c7))




     <a name="2.5.2"></a>
## [2.5.2](https://github.com/cozy/cozy-client/compare/v2.5.1...v2.5.2) (2018-08-31)




**Note:** Version bump only for package cozy-client

   <a name="2.5.1"></a>
## [2.5.1](https://github.com/cozy/cozy-client/compare/v2.5.0...v2.5.1) (2018-08-29)


### Bug Fixes

* Use the right param for code in OAuth flow ([5d5ab56](https://github.com/cozy/cozy-client/commit/5d5ab56))




<a name="2.5.0"></a>
# [2.5.0](https://github.com/cozy/cozy-client/compare/v2.4.1...v2.5.0) (2018-08-29)




**Note:** Version bump only for package cozy-client

<a name="2.3.0"></a>
# [2.3.0](https://github.com/cozy/cozy-client/compare/v2.2.3...v2.3.0) (2018-08-27)


### Features

* Add logout function 👋 ([b2764ad](https://github.com/cozy/cozy-client/commit/b2764ad))




<a name="2.2.3"></a>
## [2.2.3](https://github.com/cozy/cozy-client/compare/v2.2.2...v2.2.3) (2018-08-27)




**Note:** Version bump only for package cozy-client

<a name="2.2.2"></a>
## [2.2.2](https://github.com/cozy/cozy-client/compare/v2.2.1...v2.2.2) (2018-08-24)


### Bug Fixes

* Mv ensureStore instead of getOrCreateStore ([217ad21](https://github.com/cozy/cozy-client/commit/217ad21))




<a name="2.2.1"></a>
## [2.2.1](https://github.com/cozy/cozy-client/compare/v2.2.0...v2.2.1) (2018-08-24)




**Note:** Version bump only for package cozy-client

<a name="2.2.0"></a>
# [2.2.0](https://github.com/cozy/cozy-client/compare/v2.1.9...v2.2.0) (2018-08-24)


### Features

* **assoc:** Throw if already initialized ([3ab5369](https://github.com/cozy/cozy-client/commit/3ab5369))
* Get or create store in watchQuery ([f9d5f15](https://github.com/cozy/cozy-client/commit/f9d5f15))
* **hydrate:** Log error if any ([9be0fa4](https://github.com/cozy/cozy-client/commit/9be0fa4))
* Throw if setStore undefined ([2e51b5f](https://github.com/cozy/cozy-client/commit/2e51b5f))




<a name="2.1.9"></a>
## [2.1.9](https://github.com/cozy/cozy-client/compare/v2.1.8...v2.1.9) (2018-08-23)


### Bug Fixes

* watchQuery calls getOrCreate store to ensure it has a store ([a4c4bbc](https://github.com/cozy/cozy-client/commit/a4c4bbc))




<a name="2.1.8"></a>
## [2.1.8](https://github.com/cozy/cozy-client/compare/v2.1.7...v2.1.8) (2018-08-23)




**Note:** Version bump only for package cozy-client

<a name="2.1.7"></a>
## [2.1.7](https://github.com/cozy/cozy-client/compare/v2.1.6...v2.1.7) (2018-08-23)


### Bug Fixes

* Prevent double query init ([e5b0498](https://github.com/cozy/cozy-client/commit/e5b0498))




<a name="2.1.6"></a>
## [2.1.6](https://github.com/cozy/cozy-client/compare/v2.1.5...v2.1.6) (2018-08-22)




**Note:** Version bump only for package cozy-client

<a name="2.1.5"></a>
## [2.1.5](https://github.com/cozy/cozy-client/compare/v2.1.4...v2.1.5) (2018-08-22)

**Note:** Version bump only for package cozy-client





<a name="2.1.4"></a>
## [2.1.4](https://github.com/cozy/cozy-client/compare/v2.1.3...v2.1.4) (2018-08-22)

**Note:** Version bump only for package cozy-client





<a name="2.1.3"></a>
## [2.1.3](https://github.com/cozy/cozy-client/compare/v2.1.2...v2.1.3) (2018-08-22)

**Note:** Version bump only for package cozy-client





<a name="2.1.2"></a>
## [2.1.2](https://github.com/cozy/cozy-client/compare/v2.1.1...v2.1.2) (2018-08-22)

**Note:** Version bump only for package cozy-client





<a name="2.1.1"></a>
## [2.1.1](https://github.com/cozy/cozy-client/compare/v2.1.0...v2.1.1) (2018-08-22)

**Note:** Version bump only for package cozy-client





<a name="2.1.0"></a>
# [2.1.0](https://github.com/cozy/cozy-client/compare/v2.0.0...v2.1.0) (2018-08-22)


### Bug Fixes

* **autoquery:** do not try to update query if response has no data ([96a4721](https://github.com/cozy/cozy-client/commit/96a4721))
* **Query:** dont call unsubscribe if it has not been set ([88772b3](https://github.com/cozy/cozy-client/commit/88772b3))
* when watching a query, ensure it exists in store ([03657ec](https://github.com/cozy/cozy-client/commit/03657ec))


### Features

* **associations:** ability to define assoc fetching inside relationship ([e50b16e](https://github.com/cozy/cozy-client/commit/e50b16e))
* **dsl:** include() throws helpful error if called with wrong args ([435c268](https://github.com/cozy/cozy-client/commit/435c268))
* **stackLink:** ability to fetch several documents in one go ([45307de](https://github.com/cozy/cozy-client/commit/45307de))
* Add deprecated message on old function ([71cc8b3](https://github.com/cozy/cozy-client/commit/71cc8b3))
* add doc for Query props ([e4c7f98](https://github.com/cozy/cozy-client/commit/e4c7f98))
* add fetchPolicy prop for Query ([ea4714e](https://github.com/cozy/cozy-client/commit/ea4714e))
* export QueryDefinition ([331eb9a](https://github.com/cozy/cozy-client/commit/331eb9a))
* Remove client on Link initialisation 🔥 ([afa6ba7](https://github.com/cozy/cozy-client/commit/afa6ba7))





<a name="2.0.0"></a>
# [2.0.0](https://github.com/cozy/cozy-client/compare/v1.0.0-beta.30...v2.0.0) (2018-08-17)


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
