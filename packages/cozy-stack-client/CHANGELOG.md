# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="6.23.2"></a>
## [6.23.2](https://github.com/cozy/cozy-client/compare/v6.23.1...v6.23.2) (2019-04-25)


### Bug Fixes

* Await promises otherwise test errors are unhandled rejections ([a291040](https://github.com/cozy/cozy-client/commit/a291040))
* Test was failing ([73856c4](https://github.com/cozy/cozy-client/commit/73856c4))




<a name="6.23.1"></a>
## [6.23.1](https://github.com/cozy/cozy-client/compare/v6.23.0...v6.23.1) (2019-04-25)


### Bug Fixes

* **deps:** update dependency qs to v6.7.0 ([cbb1661](https://github.com/cozy/cozy-client/commit/cbb1661))




<a name="6.23.0"></a>
# [6.23.0](https://github.com/cozy/cozy-client/compare/v6.22.0...v6.23.0) (2019-04-25)


### Features

* Allow to use stack client when not completely initialized ([0c16046](https://github.com/cozy/cozy-client/commit/0c16046))




<a name="6.21.0"></a>
# [6.21.0](https://github.com/cozy/cozy-client/compare/v6.20.0...v6.21.0) (2019-04-03)


### Features

* Remove warning ([e0734c2](https://github.com/cozy/cozy-client/commit/e0734c2))




<a name="6.20.0"></a>
# [6.20.0](https://github.com/cozy/cozy-client/compare/v6.19.0...v6.20.0) (2019-03-27)


### Features

* **client:** Better AppColleciton and KonnectorCollection 📝 ([985d762](https://github.com/cozy/cozy-client/commit/985d762)), closes [#406](https://github.com/cozy/cozy-client/issues/406)




<a name="6.18.1"></a>
## [6.18.1](https://github.com/cozy/cozy-client/compare/v6.18.0...v6.18.1) (2019-03-25)


### Bug Fixes

* **stack:** Make KonnectorCollection inherit from DocumentCollection 🚑i ([1a56bad](https://github.com/cozy/cozy-client/commit/1a56bad))




<a name="6.18.0"></a>
# [6.18.0](https://github.com/cozy/cozy-client/compare/v6.17.0...v6.18.0) (2019-03-22)


### Bug Fixes

* **client:** Make TriggerCollection.all() return all 📝 ([ee904c4](https://github.com/cozy/cozy-client/commit/ee904c4))
* **client:** Normalize trigger as expected 📝 ([2561588](https://github.com/cozy/cozy-client/commit/2561588))


### Features

* **client:** Implement find() method in TriggerCollection ✨ ([8787a79](https://github.com/cozy/cozy-client/commit/8787a79))




<a name="6.17.0"></a>
# [6.17.0](https://github.com/cozy/cozy-client/compare/v6.16.0...v6.17.0) (2019-03-21)


### Bug Fixes

* **stack:** Make KonnectorCollection export KONNECTORS_DOCTYPE 📝 ([a5eb7e8](https://github.com/cozy/cozy-client/commit/a5eb7e8))
* **stack:** Normalize Konnector after fetch 🚑 ([3e938a9](https://github.com/cozy/cozy-client/commit/3e938a9))


### Features

* **stack:** Serve KonnectorCollection and ensure legacy ✨ ([ba2821b](https://github.com/cozy/cozy-client/commit/ba2821b))




<a name="6.12.0"></a>
# [6.12.0](https://github.com/cozy/cozy-client/compare/v6.11.1...v6.12.0) (2019-03-18)


### Features

* **stack:** Add KonnectorCollection ✨ ([addc2d8](https://github.com/cozy/cozy-client/commit/addc2d8))
* **stack:** Add konnectors object under stackClient ✨ ([b6d698b](https://github.com/cozy/cozy-client/commit/b6d698b))




<a name="6.11.1"></a>
## [6.11.1](https://github.com/cozy/cozy-client/compare/v6.11.0...v6.11.1) (2019-03-14)




**Note:** Version bump only for package cozy-stack-client

<a name="6.11.0"></a>
# [6.11.0](https://github.com/cozy/cozy-client/compare/v6.10.0...v6.11.0) (2019-03-14)


### Features

* **cozy-stack-client:** Add all function on TriggerCollection ([7b8e169](https://github.com/cozy/cozy-client/commit/7b8e169))




<a name="6.10.0"></a>
# [6.10.0](https://github.com/cozy/cozy-client/compare/v6.9.0...v6.10.0) (2019-03-14)


### Features

* :sparkles: Handle konnectors with AppCollection ([6c35e00](https://github.com/cozy/cozy-client/commit/6c35e00))




<a name="6.7.0"></a>
# [6.7.0](https://github.com/cozy/cozy-client/compare/v6.6.0...v6.7.0) (2019-03-06)


### Bug Fixes

* Copy headers since they can be mutated ([b5ee211](https://github.com/cozy/cozy-client/commit/b5ee211))


### Features

* **Stack:** Add getAuthorizationHeader, deprecate getCredentials ([3c9f82e](https://github.com/cozy/cozy-client/commit/3c9f82e))
* **stackClient:** Send cookies even without Authorization header ([b7c8983](https://github.com/cozy/cozy-client/commit/b7c8983))
* Add setToken, deprecate setCredentials ([2578a22](https://github.com/cozy/cozy-client/commit/2578a22))
* Pass custom Authorization through headers.Authorization ([e4c5acb](https://github.com/cozy/cozy-client/commit/e4c5acb))
* Remove test testing the implementation ([b321f08](https://github.com/cozy/cozy-client/commit/b321f08))




<a name="6.6.0"></a>
# [6.6.0](https://github.com/cozy/cozy-client/compare/v6.5.1...v6.6.0) (2019-03-06)


### Features

* Change to POST request for doc_ids parameter ([60528a1](https://github.com/cozy/cozy-client/commit/60528a1))
* Update changes route to match all couch parameters ([922bfe1](https://github.com/cozy/cozy-client/commit/922bfe1))




<a name="6.5.0"></a>
# [6.5.0](https://github.com/cozy/cozy-client/compare/v6.4.2...v6.5.0) (2019-03-01)


### Features

* **OAuthClient:** Add resetClient ([aa18361](https://github.com/cozy/cozy-client/commit/aa18361))




<a name="6.3.3"></a>
## [6.3.3](https://github.com/cozy/cozy-client/compare/v6.3.2...v6.3.3) (2019-02-20)


### Bug Fixes

* Registry and app routes have different resp fmts ([5e35615](https://github.com/cozy/cozy-client/commit/5e35615))




<a name="6.3.1"></a>
## [6.3.1](https://github.com/cozy/cozy-client/compare/v6.3.0...v6.3.1) (2019-02-19)


### Bug Fixes

* Copy options not to modify passed args ([883b010](https://github.com/cozy/cozy-client/commit/883b010))
* Options for fetch were unnecessary and buggy ([2bdcca9](https://github.com/cozy/cozy-client/commit/2bdcca9))




<a name="6.3.0"></a>
# [6.3.0](https://github.com/cozy/cozy-client/compare/v6.2.0...v6.3.0) (2019-02-18)


### Features

* Get icon from stack or registry for apps and konnectors ([c37fbe1](https://github.com/cozy/cozy-client/commit/c37fbe1))




<a name="6.1.0"></a>
# [6.1.0](https://github.com/cozy/cozy-client/compare/v6.0.0...v6.1.0) (2019-02-14)


### Bug Fixes

* **harvest:** Tests ☔️ ([739449b](https://github.com/cozy/cozy-client/commit/739449b))


### Features

* **stack-client:** Base for TriggersCollection ✨ ([d4be9c2](https://github.com/cozy/cozy-client/commit/d4be9c2))




<a name="5.6.1"></a>
## [5.6.1](https://github.com/cozy/cozy-client/compare/v5.6.0...v5.6.1) (2019-01-17)




**Note:** Version bump only for package cozy-stack-client

<a name="5.5.0"></a>
# [5.5.0](https://github.com/cozy/cozy-client/compare/v5.4.6...v5.5.0) (2019-01-15)


### Features

* Add urls helpers ([e9de4dc](https://github.com/cozy/cozy-client/commit/e9de4dc))




<a name="5.2.1"></a>
## [5.2.1](https://github.com/cozy/cozy-client/compare/v5.2.0...v5.2.1) (2018-12-21)


### Bug Fixes

* Guard against rows containg errors ([cb298d9](https://github.com/cozy/cozy-client/commit/cb298d9))




<a name="5.2.0"></a>
# [5.2.0](https://github.com/cozy/cozy-client/compare/v5.1.0...v5.2.0) (2018-12-20)


### Features

* Method add() for Permissions ✨ ([afdd721](https://github.com/cozy/cozy-client/commit/afdd721))




<a name="5.0.4"></a>
## [5.0.4](https://github.com/cozy/cozy-client/compare/v5.0.3...v5.0.4) (2018-12-19)




**Note:** Version bump only for package cozy-stack-client

<a name="5.0.2"></a>
## [5.0.2](https://github.com/cozy/cozy-client/compare/v5.0.1...v5.0.2) (2018-12-12)


### Bug Fixes

* **CozyStackClient:** Permissions POST endpoint 🚑 ([265633e](https://github.com/cozy/cozy-client/commit/265633e))




<a name="5.0.0"></a>
# [5.0.0](https://github.com/cozy/cozy-client/compare/v4.14.0...v5.0.0) (2018-12-10)


### Features

* Create with fixed id ✨ ([bc26177](https://github.com/cozy/cozy-client/commit/bc26177))


### BREAKING CHANGES

* Create or Update decision is now based on _rev
attribute existence  and not _id's one anymore




<a name="4.13.1"></a>
## [4.13.1](https://github.com/cozy/cozy-client/compare/v4.13.0...v4.13.1) (2018-12-03)


### Bug Fixes

* **DocumentCollection:** Check if the doc is not null ([953413e](https://github.com/cozy/cozy-client/commit/953413e))
* **DocumentCollection:** No need to filter when querying _normal_docs ([146b287](https://github.com/cozy/cozy-client/commit/146b287))




<a name="4.13.0"></a>
# [4.13.0](https://github.com/cozy/cozy-client/compare/v4.12.2...v4.13.0) (2018-11-30)


### Features

* Add fetch changes ([7193f00](https://github.com/cozy/cozy-client/commit/7193f00))




<a name="4.12.2"></a>
## [4.12.2](https://github.com/cozy/cozy-client/compare/v4.12.1...v4.12.2) (2018-11-28)


### Bug Fixes

* **DocumentCollection:** Return all docs if limit is null ([a093931](https://github.com/cozy/cozy-client/commit/a093931))




<a name="4.8.0"></a>
# [4.8.0](https://github.com/cozy/cozy-client/compare/v4.7.1...v4.8.0) (2018-11-19)


### Bug Fixes

* **DocCollection:** Correct pagination limits ([de4d7a9](https://github.com/cozy/cozy-client/commit/de4d7a9))


### Features

* **DocCollection:** Use _normal_docs route ([4622d0e](https://github.com/cozy/cozy-client/commit/4622d0e))




<a name="4.5.0"></a>
# [4.5.0](https://github.com/cozy/cozy-client/compare/v4.4.0...v4.5.0) (2018-11-13)


### Bug Fixes

* Lint ([c7bc4b1](https://github.com/cozy/cozy-client/commit/c7bc4b1))


### Features

* Add index method to QueryDefinition ([70de235](https://github.com/cozy/cozy-client/commit/70de235))




<a name="4.3.0"></a>
# [4.3.0](https://github.com/cozy/cozy-client/compare/v4.2.1...v4.3.0) (2018-11-09)


### Features

* **FileCollection:** Url-encode all parameters ([5f99a42](https://github.com/cozy/cozy-client/commit/5f99a42))




<a name="4.2.1"></a>
## [4.2.1](https://github.com/cozy/cozy-client/compare/v4.2.0...v4.2.1) (2018-11-08)


### Bug Fixes

* Case typo ([8b6acc2](https://github.com/cozy/cozy-client/commit/8b6acc2))




<a name="4.0.0"></a>
# [4.0.0](https://github.com/cozy/cozy-client/compare/v3.8.0...v4.0.0) (2018-11-05)


### Features

* Disable console via mock in all tests ([8e67741](https://github.com/cozy/cozy-client/commit/8e67741))




<a name="3.4.0"></a>
# [3.4.0](https://github.com/cozy/cozy-client/compare/v3.3.2...v3.4.0) (2018-10-26)


### Features

* Side effects free in package.json ([d558c69](https://github.com/cozy/cozy-client/commit/d558c69))




<a name="3.1.1"></a>
## [3.1.1](https://github.com/cozy/cozy-client/compare/v3.1.0...v3.1.1) (2018-10-23)


### Bug Fixes

* **ReferencedFiles:** Properly detect next pages ([c3a27bc](https://github.com/cozy/cozy-client/commit/c3a27bc))




<a name="3.0.3"></a>
## [3.0.3](https://github.com/cozy/cozy-client/compare/v3.0.2...v3.0.3) (2018-10-12)


### Bug Fixes

* **deps:** update dependency mime-types to v2.1.20 ([5755856](https://github.com/cozy/cozy-client/commit/5755856))




<a name="3.0.1"></a>
## [3.0.1](https://github.com/cozy/cozy-client/compare/v3.0.0...v3.0.1) (2018-10-11)




**Note:** Version bump only for package cozy-stack-client

<a name="3.0.0"></a>
# [3.0.0](https://github.com/cozy/cozy-client/compare/v2.24.2...v3.0.0) (2018-10-11)


### Bug Fixes

* Selector fields are not sorted first ([63e5163](https://github.com/cozy/cozy-client/commit/63e5163))


### Features

* Respect sort order ([a2ca980](https://github.com/cozy/cozy-client/commit/a2ca980))


### BREAKING CHANGES

* Sorting order of previous queries might change




<a name="2.24.1"></a>
## [2.24.1](https://github.com/cozy/cozy-client/compare/v2.24.0...v2.24.1) (2018-10-09)


### Bug Fixes

* **deps:** pin dependencies to 4.17.10 ([3c3a83a](https://github.com/cozy/cozy-client/commit/3c3a83a))




<a name="2.23.0"></a>
# [2.23.0](https://github.com/cozy/cozy-client/compare/v2.22.4...v2.23.0) (2018-10-03)


### Features

* Update file metadata ([d3ac41f](https://github.com/cozy/cozy-client/commit/d3ac41f))




<a name="2.22.1"></a>
## [2.22.1](https://github.com/cozy/cozy-client/compare/v2.22.0...v2.22.1) (2018-09-25)


### Bug Fixes

* Really force file download ([82ab0a5](https://github.com/cozy/cozy-client/commit/82ab0a5))




<a name="2.21.3"></a>
## [2.21.3](https://github.com/cozy/cozy-client/compare/v2.21.2...v2.21.3) (2018-09-25)




**Note:** Version bump only for package cozy-stack-client

<a name="2.21.1"></a>
## [2.21.1](https://github.com/cozy/cozy-client/compare/v2.21.0...v2.21.1) (2018-09-21)




**Note:** Version bump only for package cozy-stack-client

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




**Note:** Version bump only for package cozy-stack-client

<a name="2.17.0"></a>
# [2.17.0](https://github.com/cozy/cozy-client/compare/v2.16.0...v2.17.0) (2018-09-12)


### Features

* Add route to get own permissions ([0255600](https://github.com/cozy/cozy-client/commit/0255600))
* Preview path for sharings ([dfd14e7](https://github.com/cozy/cozy-client/commit/dfd14e7))




<a name="2.10.4"></a>
## [2.10.4](https://github.com/cozy/cozy-client/compare/v2.10.3...v2.10.4) (2018-09-05)


### Bug Fixes

* Restored keys option for DC.all() ([c69ecb1](https://github.com/cozy/cozy-client/commit/c69ecb1))




<a name="2.9.1"></a>
## [2.9.1](https://github.com/cozy/cozy-client/compare/v2.9.0...v2.9.1) (2018-09-04)


### Bug Fixes

* **oauth:** Don't forget data in updateInformation ([3f8620a](https://github.com/cozy/cozy-client/commit/3f8620a))




<a name="2.7.3"></a>
## [2.7.3](https://github.com/cozy/cozy-client/compare/v2.7.2...v2.7.3) (2018-09-04)


### Bug Fixes

* Default sort by datetime instead of date ([bcc17f3](https://github.com/cozy/cozy-client/commit/bcc17f3))




<a name="2.7.1"></a>
## [2.7.1](https://github.com/cozy/cozy-client/compare/v2.7.0...v2.7.1) (2018-09-03)




**Note:** Version bump only for package cozy-stack-client

<a name="2.5.1"></a>
## [2.5.1](https://github.com/cozy/cozy-client/compare/v2.5.0...v2.5.1) (2018-08-29)


### Bug Fixes

* Use the right param for code in OAuth flow ([5d5ab56](https://github.com/cozy/cozy-client/commit/5d5ab56))




<a name="2.5.0"></a>
# [2.5.0](https://github.com/cozy/cozy-client/compare/v2.4.1...v2.5.0) (2018-08-29)


### Features

* Remove default limit ([7202208](https://github.com/cozy/cozy-client/commit/7202208))




<a name="2.3.0"></a>
# [2.3.0](https://github.com/cozy/cozy-client/compare/v2.2.3...v2.3.0) (2018-08-27)


### Bug Fixes

* Unregister on stack unregister on lib ([b5edcac](https://github.com/cozy/cozy-client/commit/b5edcac))




<a name="2.1.7"></a>
## [2.1.7](https://github.com/cozy/cozy-client/compare/v2.1.6...v2.1.7) (2018-08-23)


### Bug Fixes

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





<a name="2.1.1"></a>
## [2.1.1](https://github.com/cozy/cozy-client/compare/v2.1.0...v2.1.1) (2018-08-22)


### Bug Fixes

* Sleep function was not imported ([4e18fbf](https://github.com/cozy/cozy-client/commit/4e18fbf))





<a name="2.1.0"></a>
# [2.1.0](https://github.com/cozy/cozy-client/compare/v2.0.0...v2.1.0) (2018-08-22)


### Features

* **stackLink:** ability to fetch several documents in one go ([45307de](https://github.com/cozy/cozy-client/commit/45307de))





<a name="2.0.0"></a>
# [2.0.0](https://github.com/cozy/cozy-client/compare/v1.0.0-beta.30...v2.0.0) (2018-08-17)


### Bug Fixes

* 📝  Fix AppCollection ([3b58131](https://github.com/cozy/cozy-client/commit/3b58131))


### Features

* ⚠️ Throw error for not available appcollection methods ([44edd17](https://github.com/cozy/cozy-client/commit/44edd17))




<a name="1.0.0"></a>
# [1.0.0](https://github.com/cozy/cozy-client/compare/v1.0.0-beta.30...v1.0.0) (2018-08-17)


### Bug Fixes

* 📝  Fix AppCollection ([3b58131](https://github.com/cozy/cozy-client/commit/3b58131))


### Features

* ⚠️ Throw error for not available appcollection methods ([44edd17](https://github.com/cozy/cozy-client/commit/44edd17))
