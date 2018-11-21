# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

       <a name="4.12.0"></a>
# [4.12.0](https://github.com/cozy/cozy-client/compare/v4.11.0...v4.12.0) (2018-11-21)


### Features

* Remove resign cordova event ([c070d52](https://github.com/cozy/cozy-client/commit/c070d52))




       <a name="4.11.0"></a>
# [4.11.0](https://github.com/cozy/cozy-client/compare/v4.10.0...v4.11.0) (2018-11-21)


### Features

* Save state of login to not start replication twice ([6a1f71f](https://github.com/cozy/cozy-client/commit/6a1f71f))




     <a name="4.10.0"></a>
# [4.10.0](https://github.com/cozy/cozy-client/compare/v4.8.0...v4.10.0) (2018-11-19)


### Bug Fixes

* Remove listener and add tests ([81b6df3](https://github.com/cozy/cozy-client/commit/81b6df3))
* Rm safariViewController for Android ([6f1c0e6](https://github.com/cozy/cozy-client/commit/6f1c0e6))


### Features

* Stop Start replication when device is online/offline ([de0a1f9](https://github.com/cozy/cozy-client/commit/de0a1f9))




  <a name="4.9.0"></a>
# [4.9.0](https://github.com/cozy/cozy-client/compare/v4.8.0...v4.9.0) (2018-11-19)


### Bug Fixes

* Remove listener and add tests ([81b6df3](https://github.com/cozy/cozy-client/commit/81b6df3))
* Rm safariViewController for Android ([6f1c0e6](https://github.com/cozy/cozy-client/commit/6f1c0e6))


### Features

* Stop Start replication when device is online/offline ([de0a1f9](https://github.com/cozy/cozy-client/commit/de0a1f9))




<a name="4.8.0"></a>
# [4.8.0](https://github.com/cozy/cozy-client/compare/v4.7.1...v4.8.0) (2018-11-19)


### Bug Fixes

* **DocCollection:** Correct pagination limits ([de4d7a9](https://github.com/cozy/cozy-client/commit/de4d7a9))


### Features

* **DocCollection:** Use _normal_docs route ([4622d0e](https://github.com/cozy/cozy-client/commit/4622d0e))




<a name="4.7.1"></a>
## [4.7.1](https://github.com/cozy/cozy-client/compare/v4.7.0...v4.7.1) (2018-11-19)




**Note:** Version bump only for package undefined

<a name="4.7.0"></a>
# [4.7.0](https://github.com/cozy/cozy-client/compare/v4.6.0...v4.7.0) (2018-11-14)


### Features

* **pouch:** Destroy databases when login on another instance ([a64caad](https://github.com/cozy/cozy-client/commit/a64caad))




<a name="4.6.0"></a>
# [4.6.0](https://github.com/cozy/cozy-client/compare/v4.5.0...v4.6.0) (2018-11-14)


### Features

* Add authenticate with SafariViewController on mobile ([900bdd4](https://github.com/cozy/cozy-client/commit/900bdd4))




<a name="4.5.0"></a>
# [4.5.0](https://github.com/cozy/cozy-client/compare/v4.4.0...v4.5.0) (2018-11-13)


### Bug Fixes

* Lint ([c7bc4b1](https://github.com/cozy/cozy-client/commit/c7bc4b1))


### Features

* Add index method to QueryDefinition ([70de235](https://github.com/cozy/cozy-client/commit/70de235))




<a name="4.4.0"></a>
# [4.4.0](https://github.com/cozy/cozy-client/compare/v4.3.0...v4.4.0) (2018-11-09)


### Features

* Ability to execute a custom request/mutation ([ec243f7](https://github.com/cozy/cozy-client/commit/ec243f7))




<a name="4.3.0"></a>
# [4.3.0](https://github.com/cozy/cozy-client/compare/v4.2.1...v4.3.0) (2018-11-09)


### Features

* **FileCollection:** Url-encode all parameters ([5f99a42](https://github.com/cozy/cozy-client/commit/5f99a42))




<a name="4.2.1"></a>
## [4.2.1](https://github.com/cozy/cozy-client/compare/v4.2.0...v4.2.1) (2018-11-08)


### Bug Fixes

* Case typo ([8b6acc2](https://github.com/cozy/cozy-client/commit/8b6acc2))




<a name="4.2.0"></a>
# [4.2.0](https://github.com/cozy/cozy-client/compare/v4.1.0...v4.2.0) (2018-11-08)


### Features

* **pouch:** Manage sync status by doctype ([a2d4923](https://github.com/cozy/cozy-client/commit/a2d4923))




<a name="4.1.0"></a>
# [4.1.0](https://github.com/cozy/cozy-client/compare/v4.0.0...v4.1.0) (2018-11-07)


### Features

* Add pouch parameters ([f783916](https://github.com/cozy/cozy-client/commit/f783916))




<a name="4.0.0"></a>
# [4.0.0](https://github.com/cozy/cozy-client/compare/v3.8.0...v4.0.0) (2018-11-05)


### Code Refactoring

* Client uses stackClient ([42428f7](https://github.com/cozy/cozy-client/commit/42428f7))


### Features

* Disable console via mock in all tests ([8e67741](https://github.com/cozy/cozy-client/commit/8e67741))
* Pouch link calls setData on the client ([989b432](https://github.com/cozy/cozy-client/commit/989b432))


### BREAKING CHANGES

* registerOnLinks is no longer called with a CozyStackClient
but with a CozyClient




<a name="3.8.0"></a>
# [3.8.0](https://github.com/cozy/cozy-client/compare/v3.7.7...v3.8.0) (2018-11-02)


### Features

* Log time necessary to replicate a DB ([452a1a0](https://github.com/cozy/cozy-client/commit/452a1a0))




<a name="3.7.7"></a>
## [3.7.7](https://github.com/cozy/cozy-client/compare/v3.7.6...v3.7.7) (2018-11-02)


### Bug Fixes

* Discard rev from PouchDB results ([#249](https://github.com/cozy/cozy-client/issues/249)) ([5d88ae4](https://github.com/cozy/cozy-client/commit/5d88ae4))




<a name="3.7.6"></a>
## [3.7.6](https://github.com/cozy/cozy-client/compare/v3.7.5...v3.7.6) (2018-10-31)


### Bug Fixes

* Ensure database is created on the remote side ([ff71b37](https://github.com/cozy/cozy-client/commit/ff71b37))




<a name="3.7.5"></a>
## [3.7.5](https://github.com/cozy/cozy-client/compare/v3.7.3...v3.7.5) (2018-10-31)


### Bug Fixes

* Repair HasMany files relationships ([cba9552](https://github.com/cozy/cozy-client/commit/cba9552))




<a name="3.7.4"></a>
## [3.7.4](https://github.com/cozy/cozy-client/compare/v3.7.3...v3.7.4) (2018-10-31)


### Bug Fixes

* Repair HasMany files relationships ([cba9552](https://github.com/cozy/cozy-client/commit/cba9552))




<a name="3.7.3"></a>
## [3.7.3](https://github.com/cozy/cozy-client/compare/v3.7.1...v3.7.3) (2018-10-31)


### Bug Fixes

* Better handling for null values ([4941b3c](https://github.com/cozy/cozy-client/commit/4941b3c))
* Default uri ([f8839b8](https://github.com/cozy/cozy-client/commit/f8839b8))




<a name="3.7.2"></a>
## [3.7.2](https://github.com/cozy/cozy-client/compare/v3.7.1...v3.7.2) (2018-10-31)


### Bug Fixes

* Better handling for null values ([4941b3c](https://github.com/cozy/cozy-client/commit/4941b3c))
* Default uri ([f8839b8](https://github.com/cozy/cozy-client/commit/f8839b8))




<a name="3.7.1"></a>
## [3.7.1](https://github.com/cozy/cozy-client/compare/v3.7.0...v3.7.1) (2018-10-30)




**Note:** Version bump only for package undefined

<a name="3.7.0"></a>
# [3.7.0](https://github.com/cozy/cozy-client/compare/v3.6.4...v3.7.0) (2018-10-30)


### Features

* **pouch:** Add dev logs ([b0ecff5](https://github.com/cozy/cozy-client/commit/b0ecff5))




<a name="3.6.4"></a>
## [3.6.4](https://github.com/cozy/cozy-client/compare/v3.6.3...v3.6.4) (2018-10-30)


### Bug Fixes

* **deps:** pin dependency sift to 7.0.1 ([7de2c6a](https://github.com/cozy/cozy-client/commit/7de2c6a))




<a name="3.6.3"></a>
## [3.6.3](https://github.com/cozy/cozy-client/compare/v3.6.1...v3.6.3) (2018-10-29)


### Bug Fixes

* **pouch:** Wait end of replication before triggering another one ([e5657b2](https://github.com/cozy/cozy-client/commit/e5657b2))




<a name="3.6.2"></a>
## [3.6.2](https://github.com/cozy/cozy-client/compare/v3.6.1...v3.6.2) (2018-10-29)


### Bug Fixes

* **pouch:** Wait end of replication before triggering another one ([e5657b2](https://github.com/cozy/cozy-client/commit/e5657b2))




<a name="3.6.1"></a>
## [3.6.1](https://github.com/cozy/cozy-client/compare/v3.6.0...v3.6.1) (2018-10-29)


### Bug Fixes

* Revert alloc ([e3b2832](https://github.com/cozy/cozy-client/commit/e3b2832))




<a name="3.6.0"></a>
# [3.6.0](https://github.com/cozy/cozy-client/compare/v3.5.2...v3.6.0) (2018-10-29)


### Features

* Add elapsed time ([0414cc5](https://github.com/cozy/cozy-client/commit/0414cc5))




<a name="3.5.2"></a>
## [3.5.2](https://github.com/cozy/cozy-client/compare/v3.5.1...v3.5.2) (2018-10-29)




**Note:** Version bump only for package undefined

<a name="3.5.1"></a>
## [3.5.1](https://github.com/cozy/cozy-client/compare/v3.5.0...v3.5.1) (2018-10-26)




**Note:** Version bump only for package undefined

<a name="3.5.0"></a>
# [3.5.0](https://github.com/cozy/cozy-client/compare/v3.4.1...v3.5.0) (2018-10-26)


### Features

* Add Sift for mango selectors ([7206bd5](https://github.com/cozy/cozy-client/commit/7206bd5))




<a name="3.4.1"></a>
## [3.4.1](https://github.com/cozy/cozy-client/compare/v3.4.0...v3.4.1) (2018-10-26)


### Bug Fixes

* Documents can be arrays ([7f1d845](https://github.com/cozy/cozy-client/commit/7f1d845))




<a name="3.4.0"></a>
# [3.4.0](https://github.com/cozy/cozy-client/compare/v3.3.2...v3.4.0) (2018-10-26)


### Bug Fixes

* Do not throw if the document is not available ([6f5e692](https://github.com/cozy/cozy-client/commit/6f5e692))


### Features

* Filter early ([6b7b713](https://github.com/cozy/cozy-client/commit/6b7b713))
* Reduce the number of allocation ([366ccbb](https://github.com/cozy/cozy-client/commit/366ccbb))
* Side effects free in package.json ([d558c69](https://github.com/cozy/cozy-client/commit/d558c69))




<a name="3.3.2"></a>
## [3.3.2](https://github.com/cozy/cozy-client/compare/v3.3.1...v3.3.2) (2018-10-26)


### Bug Fixes

* Hydrating relation when querying even if empty ([7a92103](https://github.com/cozy/cozy-client/commit/7a92103))




<a name="3.3.1"></a>
## [3.3.1](https://github.com/cozy/cozy-client/compare/v3.3.0...v3.3.1) (2018-10-25)




**Note:** Version bump only for package undefined

<a name="3.3.0"></a>
# [3.3.0](https://github.com/cozy/cozy-client/compare/v3.2.0...v3.3.0) (2018-10-24)


### Bug Fixes

* Example used old relationship schema ([246849b](https://github.com/cozy/cozy-client/commit/246849b))


### Features

* Deduplicate documents ([84e7cf0](https://github.com/cozy/cozy-client/commit/84e7cf0))
* Do not show warnings in production ([b144534](https://github.com/cozy/cozy-client/commit/b144534))
* Optimize id queries ([a9fa010](https://github.com/cozy/cozy-client/commit/a9fa010))




<a name="3.2.0"></a>
# [3.2.0](https://github.com/cozy/cozy-client/compare/v3.1.1...v3.2.0) (2018-10-24)


### Features

* Export getQueryFromState ([ffc75ef](https://github.com/cozy/cozy-client/commit/ffc75ef))




<a name="3.1.1"></a>
## [3.1.1](https://github.com/cozy/cozy-client/compare/v3.1.0...v3.1.1) (2018-10-23)


### Bug Fixes

* **ReferencedFiles:** Properly detect next pages ([c3a27bc](https://github.com/cozy/cozy-client/commit/c3a27bc))




<a name="3.1.0"></a>
# [3.1.0](https://github.com/cozy/cozy-client/compare/v3.0.6...v3.1.0) (2018-10-23)


### Features

* Add addById / removeById to HasMany ([1e107ef](https://github.com/cozy/cozy-client/commit/1e107ef))




<a name="3.0.6"></a>
## [3.0.6](https://github.com/cozy/cozy-client/compare/v3.0.5...v3.0.6) (2018-10-16)


### Bug Fixes

* Link was broken ([7c673d0](https://github.com/cozy/cozy-client/commit/7c673d0))




<a name="3.0.5"></a>
## [3.0.5](https://github.com/cozy/cozy-client/compare/v3.0.3...v3.0.5) (2018-10-12)


### Bug Fixes

* **deps:** update dependency lodash to v4.17.11 ([54e3880](https://github.com/cozy/cozy-client/commit/54e3880))




<a name="3.0.4"></a>
## [3.0.4](https://github.com/cozy/cozy-client/compare/v3.0.3...v3.0.4) (2018-10-12)


### Bug Fixes

* **deps:** update dependency lodash to v4.17.11 ([54e3880](https://github.com/cozy/cozy-client/commit/54e3880))




<a name="3.0.3"></a>
## [3.0.3](https://github.com/cozy/cozy-client/compare/v3.0.2...v3.0.3) (2018-10-12)


### Bug Fixes

* **deps:** update dependency mime-types to v2.1.20 ([5755856](https://github.com/cozy/cozy-client/commit/5755856))




<a name="3.0.2"></a>
## [3.0.2](https://github.com/cozy/cozy-client/compare/v3.0.1...v3.0.2) (2018-10-12)


### Bug Fixes

* Deep compare documents updates ([7ae21c5](https://github.com/cozy/cozy-client/commit/7ae21c5))




<a name="3.0.1"></a>
## [3.0.1](https://github.com/cozy/cozy-client/compare/v3.0.0...v3.0.1) (2018-10-11)




**Note:** Version bump only for package undefined

<a name="3.0.0"></a>
# [3.0.0](https://github.com/cozy/cozy-client/compare/v2.24.2...v3.0.0) (2018-10-11)


### Bug Fixes

* Selector fields are not sorted first ([63e5163](https://github.com/cozy/cozy-client/commit/63e5163))


### Features

* Respect sort order ([a2ca980](https://github.com/cozy/cozy-client/commit/a2ca980))


### BREAKING CHANGES

* Sorting order of previous queries might change




<a name="2.24.2"></a>
## [2.24.2](https://github.com/cozy/cozy-client/compare/v2.24.1...v2.24.2) (2018-10-11)


### Bug Fixes

* Avoid rerenders when no doc changed ([290770b](https://github.com/cozy/cozy-client/commit/290770b))
* Pass next documents to query reducer ([6af8518](https://github.com/cozy/cozy-client/commit/6af8518))
* Prevent state updates with identical doc ([8828f70](https://github.com/cozy/cozy-client/commit/8828f70))




<a name="2.24.1"></a>
## [2.24.1](https://github.com/cozy/cozy-client/compare/v2.24.0...v2.24.1) (2018-10-09)


### Bug Fixes

* **deps:** pin dependencies to 4.17.10 ([3c3a83a](https://github.com/cozy/cozy-client/commit/3c3a83a))




<a name="2.24.0"></a>
# [2.24.0](https://github.com/cozy/cozy-client/compare/v2.23.1...v2.24.0) (2018-10-09)


### Features

* $ne operator support ([7389dac](https://github.com/cozy/cozy-client/commit/7389dac))




<a name="2.23.1"></a>
## [2.23.1](https://github.com/cozy/cozy-client/compare/v2.23.0...v2.23.1) (2018-10-05)


### Bug Fixes

* tests all green ([980b625](https://github.com/cozy/cozy-client/commit/980b625))
* Update queries when references are mutated ([4272cbc](https://github.com/cozy/cozy-client/commit/4272cbc))




<a name="2.23.0"></a>
# [2.23.0](https://github.com/cozy/cozy-client/compare/v2.22.4...v2.23.0) (2018-10-03)


### Features

* Update file metadata ([d3ac41f](https://github.com/cozy/cozy-client/commit/d3ac41f))




<a name="2.22.4"></a>
## [2.22.4](https://github.com/cozy/cozy-client/compare/v2.22.3...v2.22.4) (2018-10-02)


### Bug Fixes

* :bug: Fix state update issue on destroy ([e842349](https://github.com/cozy/cozy-client/commit/e842349))
* Unregistering client ([e5901b9](https://github.com/cozy/cozy-client/commit/e5901b9))




<a name="2.22.3"></a>
## [2.22.3](https://github.com/cozy/cozy-client/compare/v2.22.2...v2.22.3) (2018-10-02)


### Bug Fixes

* Have a client instance in Schema class ([76f6253](https://github.com/cozy/cozy-client/commit/76f6253))
* Transmit call to Schema.validate ([95c88c1](https://github.com/cozy/cozy-client/commit/95c88c1))




<a name="2.22.2"></a>
## [2.22.2](https://github.com/cozy/cozy-client/compare/v2.22.1...v2.22.2) (2018-10-01)


### Bug Fixes

* :art: client error handling in withMutations ([8d05662](https://github.com/cozy/cozy-client/commit/8d05662))
* :bug: Fix withMutations context issue ([08be90d](https://github.com/cozy/cozy-client/commit/08be90d))




<a name="2.22.1"></a>
## [2.22.1](https://github.com/cozy/cozy-client/compare/v2.22.0...v2.22.1) (2018-09-25)


### Bug Fixes

* Really force file download ([82ab0a5](https://github.com/cozy/cozy-client/commit/82ab0a5))




<a name="2.22.0"></a>
# [2.22.0](https://github.com/cozy/cozy-client/compare/v2.21.3...v2.22.0) (2018-09-25)


### Bug Fixes

* Launch replication when device are online 📞 ([ce3be03](https://github.com/cozy/cozy-client/commit/ce3be03))


### Features

* Add information on console 🗣 ([2df2bac](https://github.com/cozy/cozy-client/commit/2df2bac))
* Save synced flag on localStorage 🧠 ([80e38ce](https://github.com/cozy/cozy-client/commit/80e38ce))




<a name="2.21.3"></a>
## [2.21.3](https://github.com/cozy/cozy-client/compare/v2.21.2...v2.21.3) (2018-09-25)




**Note:** Version bump only for package undefined

<a name="2.21.2"></a>
## [2.21.2](https://github.com/cozy/cozy-client/compare/v2.21.1...v2.21.2) (2018-09-24)




**Note:** Version bump only for package undefined

<a name="2.21.1"></a>
## [2.21.1](https://github.com/cozy/cozy-client/compare/v2.21.0...v2.21.1) (2018-09-21)




**Note:** Version bump only for package undefined

<a name="2.21.0"></a>
# [2.21.0](https://github.com/cozy/cozy-client/compare/v2.20.2...v2.21.0) (2018-09-21)


### Features

* Stop replication when app lost focus ([149f5a3](https://github.com/cozy/cozy-client/commit/149f5a3))




<a name="2.20.2"></a>
## [2.20.2](https://github.com/cozy/cozy-client/compare/v2.20.1...v2.20.2) (2018-09-20)


### Bug Fixes

* Use refresh token ([352bb93](https://github.com/cozy/cozy-client/commit/352bb93))




<a name="2.20.1"></a>
## [2.20.1](https://github.com/cozy/cozy-client/compare/v2.20.0...v2.20.1) (2018-09-18)




**Note:** Version bump only for package undefined

<a name="2.20.0"></a>
# [2.20.0](https://github.com/cozy/cozy-client/compare/v2.19.2...v2.20.0) (2018-09-18)


### Bug Fixes

* Make new documents ([694c850](https://github.com/cozy/cozy-client/commit/694c850))
* Unused variable ([ffea569](https://github.com/cozy/cozy-client/commit/ffea569))
* Validate on client proxies to schema ([9c9d061](https://github.com/cozy/cozy-client/commit/9c9d061))


### Features

* Ability for a Query to return docs ([cee8694](https://github.com/cozy/cozy-client/commit/cee8694))
* Add addById/removeById/existsById ([52b169d](https://github.com/cozy/cozy-client/commit/52b169d))
* add HasManyInPlace ([274c6fa](https://github.com/cozy/cozy-client/commit/274c6fa))
* Association is in charge of defining query ([e5ff308](https://github.com/cozy/cozy-client/commit/e5ff308))
* Client exports dehydrate ([6ad4ab5](https://github.com/cozy/cozy-client/commit/6ad4ab5))
* Custom relationship in schema ([61d28f2](https://github.com/cozy/cozy-client/commit/61d28f2))
* Defining a schema is required ([d600671](https://github.com/cozy/cozy-client/commit/d600671))
* HasOneInPlace ([d81964d](https://github.com/cozy/cozy-client/commit/d81964d))
* Relationships are resolved in schema ([45d2dc9](https://github.com/cozy/cozy-client/commit/45d2dc9))
* Remove HasManyUNSAFE ([a6b904b](https://github.com/cozy/cozy-client/commit/a6b904b))
* Remove useless warnings ([0f35115](https://github.com/cozy/cozy-client/commit/0f35115))
* Warning before error to help dev ([40c2ade](https://github.com/cozy/cozy-client/commit/40c2ade))




<a name="2.19.2"></a>
## [2.19.2](https://github.com/cozy/cozy-client/compare/v2.19.1...v2.19.2) (2018-09-14)


### Bug Fixes

* Changed revokeRecipient() signature ([0a8e935](https://github.com/cozy/cozy-client/commit/0a8e935))




<a name="2.19.1"></a>
## [2.19.1](https://github.com/cozy/cozy-client/compare/v2.19.0...v2.19.1) (2018-09-13)


### Bug Fixes

* Return sensible data when database not found ([7141deb](https://github.com/cozy/cozy-client/commit/7141deb))




<a name="2.19.0"></a>
# [2.19.0](https://github.com/cozy/cozy-client/compare/v2.18.1...v2.19.0) (2018-09-13)


### Bug Fixes

* **stack-client:** Map redirect_uris to camelcase ([286a0ee](https://github.com/cozy/cozy-client/commit/286a0ee))


### Features

* **stack:** Check mandatory fields in register ([db6afe1](https://github.com/cozy/cozy-client/commit/db6afe1))




<a name="2.18.1"></a>
## [2.18.1](https://github.com/cozy/cozy-client/compare/v2.18.0...v2.18.1) (2018-09-12)




**Note:** Version bump only for package undefined

<a name="2.18.0"></a>
# [2.18.0](https://github.com/cozy/cozy-client/compare/v2.17.0...v2.18.0) (2018-09-12)


### Features

* Add ability to fetch only one document ([ea28fdd](https://github.com/cozy/cozy-client/commit/ea28fdd))




<a name="2.17.0"></a>
# [2.17.0](https://github.com/cozy/cozy-client/compare/v2.16.0...v2.17.0) (2018-09-12)


### Features

* Add route to get own permissions ([0255600](https://github.com/cozy/cozy-client/commit/0255600))
* Preview path for sharings ([dfd14e7](https://github.com/cozy/cozy-client/commit/dfd14e7))




<a name="2.16.0"></a>
# [2.16.0](https://github.com/cozy/cozy-client/compare/v2.15.3...v2.16.0) (2018-09-12)


### Features

* Export Association ([7347883](https://github.com/cozy/cozy-client/commit/7347883))




<a name="2.15.3"></a>
## [2.15.3](https://github.com/cozy/cozy-client/compare/v2.15.2...v2.15.3) (2018-09-11)


### Bug Fixes

* **pouch:** Avoid to destroy dbs already destroyed ([0f64a98](https://github.com/cozy/cozy-client/commit/0f64a98))




<a name="2.15.2"></a>
## [2.15.2](https://github.com/cozy/cozy-client/compare/v2.15.1...v2.15.2) (2018-09-10)


### Bug Fixes

* Filter design and deleted docs in replication ([47c3107](https://github.com/cozy/cozy-client/commit/47c3107))




<a name="2.15.1"></a>
## [2.15.1](https://github.com/cozy/cozy-client/compare/v2.15.0...v2.15.1) (2018-09-10)


### Bug Fixes

* **pouch:** Updated docs were not retrieved well ([8001ad2](https://github.com/cozy/cozy-client/commit/8001ad2))




<a name="2.15.0"></a>
# [2.15.0](https://github.com/cozy/cozy-client/compare/v2.14.0...v2.15.0) (2018-09-10)


### Features

* add hooks ([6c38acc](https://github.com/cozy/cozy-client/commit/6c38acc))
* add public methods to start/stop replication ([760ee44](https://github.com/cozy/cozy-client/commit/760ee44))




<a name="2.14.0"></a>
# [2.14.0](https://github.com/cozy/cozy-client/compare/v2.13.1...v2.14.0) (2018-09-10)


### Features

* Use two way replication ([170a00f](https://github.com/cozy/cozy-client/commit/170a00f))




<a name="2.13.1"></a>
## [2.13.1](https://github.com/cozy/cozy-client/compare/v2.13.0...v2.13.1) (2018-09-07)


### Bug Fixes

* Raw() is a getter ([1314a31](https://github.com/cozy/cozy-client/commit/1314a31))




<a name="2.13.0"></a>
# [2.13.0](https://github.com/cozy/cozy-client/compare/v2.12.0...v2.13.0) (2018-09-07)


### Features

* Add _type/id to documents in onSync ([cf97ad6](https://github.com/cozy/cozy-client/commit/cf97ad6))
* Pouch onSync called with updated documents ([c67261b](https://github.com/cozy/cozy-client/commit/c67261b))




<a name="2.12.0"></a>
# [2.12.0](https://github.com/cozy/cozy-client/compare/v2.11.0...v2.12.0) (2018-09-07)


### Features

* **client:** Add setData method ([24d52c6](https://github.com/cozy/cozy-client/commit/24d52c6))




<a name="2.11.0"></a>
# [2.11.0](https://github.com/cozy/cozy-client/compare/v2.10.5...v2.11.0) (2018-09-06)


### Bug Fixes

* No warning if no relationship attribute ([36958e4](https://github.com/cozy/cozy-client/commit/36958e4))


### Features

* Dehydrate document before saving ([dedf8ed](https://github.com/cozy/cozy-client/commit/dedf8ed))




<a name="2.10.5"></a>
## [2.10.5](https://github.com/cozy/cozy-client/compare/v2.10.4...v2.10.5) (2018-09-06)


### Bug Fixes

* **pouch:** Set sync to false on reset ([19a36d4](https://github.com/cozy/cozy-client/commit/19a36d4))




<a name="2.10.4"></a>
## [2.10.4](https://github.com/cozy/cozy-client/compare/v2.10.3...v2.10.4) (2018-09-05)


### Bug Fixes

* Restored keys option for DC.all() ([c69ecb1](https://github.com/cozy/cozy-client/commit/c69ecb1))




<a name="2.10.3"></a>
## [2.10.3](https://github.com/cozy/cozy-client/compare/v2.10.2...v2.10.3) (2018-09-05)


### Bug Fixes

* Extract doc from pouch result + spec ([3d51fac](https://github.com/cozy/cozy-client/commit/3d51fac))




<a name="2.10.2"></a>
## [2.10.2](https://github.com/cozy/cozy-client/compare/v2.10.1...v2.10.2) (2018-09-05)




**Note:** Version bump only for package undefined

<a name="2.10.1"></a>
## [2.10.1](https://github.com/cozy/cozy-client/compare/v2.10.0...v2.10.1) (2018-09-05)


### Bug Fixes

* **pouch:** Call onSync when sync is done ([256e264](https://github.com/cozy/cozy-client/commit/256e264))




<a name="2.10.0"></a>
# [2.10.0](https://github.com/cozy/cozy-client/compare/v2.9.1...v2.10.0) (2018-09-04)


### Features

* Examples ([8406f0c](https://github.com/cozy/cozy-client/commit/8406f0c))




<a name="2.9.1"></a>
## [2.9.1](https://github.com/cozy/cozy-client/compare/v2.9.0...v2.9.1) (2018-09-04)


### Bug Fixes

* **oauth:** Don't forget data in updateInformation ([3f8620a](https://github.com/cozy/cozy-client/commit/3f8620a))




<a name="2.9.0"></a>
# [2.9.0](https://github.com/cozy/cozy-client/compare/v2.8.0...v2.9.0) (2018-09-04)


### Features

* **client:** Call onLogin on links ([cef01aa](https://github.com/cozy/cozy-client/commit/cef01aa))
* **pouch:** Implement onLogin lifecycle method ([ab56f40](https://github.com/cozy/cozy-client/commit/ab56f40))




<a name="2.8.0"></a>
# [2.8.0](https://github.com/cozy/cozy-client/compare/v2.7.3...v2.8.0) (2018-09-04)


### Features

* **pouch:** Handle errors for pouches destroy ([825b794](https://github.com/cozy/cozy-client/commit/825b794))




<a name="2.7.3"></a>
## [2.7.3](https://github.com/cozy/cozy-client/compare/v2.7.2...v2.7.3) (2018-09-04)


### Bug Fixes

* Default sort by datetime instead of date ([bcc17f3](https://github.com/cozy/cozy-client/commit/bcc17f3))




<a name="2.7.2"></a>
## [2.7.2](https://github.com/cozy/cozy-client/compare/v2.7.1...v2.7.2) (2018-09-03)


### Bug Fixes

* **pouch:** Replace not existing method ([3802403](https://github.com/cozy/cozy-client/commit/3802403))




<a name="2.7.1"></a>
## [2.7.1](https://github.com/cozy/cozy-client/compare/v2.7.0...v2.7.1) (2018-09-03)




**Note:** Version bump only for package undefined

<a name="2.7.0"></a>
# [2.7.0](https://github.com/cozy/cozy-client/compare/v2.6.1...v2.7.0) (2018-09-03)


### Features

* **client:** Add deprecation warning for link ([895d697](https://github.com/cozy/cozy-client/commit/895d697))
* **client:** Add login method ([9758f45](https://github.com/cozy/cozy-client/commit/9758f45))
* **client:** Always chain links ([856e559](https://github.com/cozy/cozy-client/commit/856e559))
* **client:** Save links in array in constructor ([c600986](https://github.com/cozy/cozy-client/commit/c600986))




<a name="2.6.1"></a>
## [2.6.1](https://github.com/cozy/cozy-client/compare/v2.6.0...v2.6.1) (2018-09-03)


### Bug Fixes

* Creating a doc with empty relationships ([ebf0d86](https://github.com/cozy/cozy-client/commit/ebf0d86))




<a name="2.6.0"></a>
# [2.6.0](https://github.com/cozy/cozy-client/compare/v2.5.2...v2.6.0) (2018-08-31)


### Bug Fixes

* Not able to start several time ([56a7995](https://github.com/cozy/cozy-client/commit/56a7995))
* Pouchdb is written in lowercase ([e009dbe](https://github.com/cozy/cozy-client/commit/e009dbe))
* Remove console.log ([a3d81ab](https://github.com/cozy/cozy-client/commit/a3d81ab))


### Features

* Ability to serialize/deserialize the token ([05f6d9e](https://github.com/cozy/cozy-client/commit/05f6d9e))
* add replication manager ([20511c7](https://github.com/cozy/cozy-client/commit/20511c7))
* Polish the example ([17f85b3](https://github.com/cozy/cozy-client/commit/17f85b3))




<a name="2.5.2"></a>
## [2.5.2](https://github.com/cozy/cozy-client/compare/v2.5.1...v2.5.2) (2018-08-31)




**Note:** Version bump only for package undefined

<a name="2.5.1"></a>
## [2.5.1](https://github.com/cozy/cozy-client/compare/v2.5.0...v2.5.1) (2018-08-29)


### Bug Fixes

* Use the right param for code in OAuth flow ([5d5ab56](https://github.com/cozy/cozy-client/commit/5d5ab56))




<a name="2.5.0"></a>
# [2.5.0](https://github.com/cozy/cozy-client/compare/v2.4.1...v2.5.0) (2018-08-29)


### Features

* Remove default limit ([7202208](https://github.com/cozy/cozy-client/commit/7202208))




<a name="2.4.1"></a>
## [2.4.1](https://github.com/cozy/cozy-client/compare/v2.4.0...v2.4.1) (2018-08-29)


### Bug Fixes

* **pouch:** Resolve with result after replication ([7c6b365](https://github.com/cozy/cozy-client/commit/7c6b365))




<a name="2.4.0"></a>
# [2.4.0](https://github.com/cozy/cozy-client/compare/v2.3.0...v2.4.0) (2018-08-28)


### Features

* Remove design document on response 🤪 ([202ed16](https://github.com/cozy/cozy-client/commit/202ed16))




<a name="2.3.0"></a>
# [2.3.0](https://github.com/cozy/cozy-client/compare/v2.2.3...v2.3.0) (2018-08-27)


### Bug Fixes

* Unregister on stack unregister on lib ([b5edcac](https://github.com/cozy/cozy-client/commit/b5edcac))


### Features

* Add logout function 👋 ([b2764ad](https://github.com/cozy/cozy-client/commit/b2764ad))




<a name="2.2.3"></a>
## [2.2.3](https://github.com/cozy/cozy-client/compare/v2.2.2...v2.2.3) (2018-08-27)




**Note:** Version bump only for package undefined

<a name="2.2.2"></a>
## [2.2.2](https://github.com/cozy/cozy-client/compare/v2.2.1...v2.2.2) (2018-08-24)


### Bug Fixes

* Mv ensureStore instead of getOrCreateStore ([217ad21](https://github.com/cozy/cozy-client/commit/217ad21))




<a name="2.2.1"></a>
## [2.2.1](https://github.com/cozy/cozy-client/compare/v2.2.0...v2.2.1) (2018-08-24)




**Note:** Version bump only for package undefined

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




**Note:** Version bump only for package undefined

<a name="2.1.7"></a>
## [2.1.7](https://github.com/cozy/cozy-client/compare/v2.1.6...v2.1.7) (2018-08-23)


### Bug Fixes

* Prevent double query init ([e5b0498](https://github.com/cozy/cozy-client/commit/e5b0498))
* Use only one sorting order ([d81a159](https://github.com/cozy/cozy-client/commit/d81a159))




<a name="2.1.6"></a>
## [2.1.6](https://github.com/cozy/cozy-client/compare/v2.1.5...v2.1.6) (2018-08-22)


### Bug Fixes

* Downgrade lerna package ⬇️ ([76c5a09](https://github.com/cozy/cozy-client/commit/76c5a09))




<a name="2.1.5"></a>
## [2.1.5](https://github.com/cozy/cozy-client/compare/v2.1.4...v2.1.5) (2018-08-22)


### Bug Fixes

* Test deploy with travis 🍄 ([3ba53c4](https://github.com/cozy/cozy-client/commit/3ba53c4))





<a name="2.1.4"></a>
## [2.1.4](https://github.com/cozy/cozy-client/compare/v2.1.3...v2.1.4) (2018-08-22)


### Bug Fixes

* Lerna publish 🚀 ([7aa474c](https://github.com/cozy/cozy-client/commit/7aa474c))





<a name="2.1.3"></a>
## [2.1.3](https://github.com/cozy/cozy-client/compare/v2.1.2...v2.1.3) (2018-08-22)


### Bug Fixes

* Test lerna publish 🔭 ([a95703e](https://github.com/cozy/cozy-client/commit/a95703e))





<a name="2.1.2"></a>
## [2.1.2](https://github.com/cozy/cozy-client/compare/v2.1.1...v2.1.2) (2018-08-22)


### Bug Fixes

* Add new line at end of README.md file ([af62dea](https://github.com/cozy/cozy-client/commit/af62dea))
* Test auto release ([ec00760](https://github.com/cozy/cozy-client/commit/ec00760))





<a name="2.1.1"></a>
## [2.1.1](https://github.com/cozy/cozy-client/compare/v2.1.0...v2.1.1) (2018-08-22)


### Bug Fixes

* Sleep function was not imported ([4e18fbf](https://github.com/cozy/cozy-client/commit/4e18fbf))





<a name="2.1.0"></a>
# [2.1.0](https://github.com/cozy/cozy-client/compare/v2.0.0...v2.1.0) (2018-08-22)


### Bug Fixes

* **autoquery:** do not try to update query if response has no data ([96a4721](https://github.com/cozy/cozy-client/commit/96a4721))
* **Query:** dont call unsubscribe if it has not been set ([88772b3](https://github.com/cozy/cozy-client/commit/88772b3))
* typo in travis broke autopublish ([be8adea](https://github.com/cozy/cozy-client/commit/be8adea))
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
