# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [14.1.2](https://github.com/cozy/cozy-client/compare/v14.1.1...v14.1.2) (2020-09-04)


### Bug Fixes

* Revoke sharing links fetch all the related permissions ([d769190](https://github.com/cozy/cozy-client/commit/d769190))





## [14.1.1](https://github.com/cozy/cozy-client/compare/v14.1.0...v14.1.1) (2020-09-03)


### Bug Fixes

* Do not reassign to function parameters ([feb6e8e](https://github.com/cozy/cozy-client/commit/feb6e8e))





# [14.1.0](https://github.com/cozy/cozy-client/compare/v14.0.0...v14.1.0) (2020-09-03)


### Features

* Add ttl params to create Permissions ([cf3478c](https://github.com/cozy/cozy-client/commit/cf3478c))





# [14.0.0](https://github.com/cozy/cozy-client/compare/v13.21.0...v14.0.0) (2020-08-28)


### Features

* We can pass a codes argument at the perm creation ([720ab0c](https://github.com/cozy/cozy-client/commit/720ab0c))


### BREAKING CHANGES

* By default, we defaulted the codes values
to code for PermissionsCollection.create. Without we
receive an object without key in response
shortcodes: {"": "abcdfef"}. Now by default we have :
shortcodes: {"code": "adcdef"}.

It's a BC, but this method is not used in our code base for
now.





## [13.20.2](https://github.com/cozy/cozy-client/compare/v13.20.1...v13.20.2) (2020-08-19)

**Note:** Version bump only for package cozy-stack-client





# [13.16.0](https://github.com/cozy/cozy-client/compare/v13.15.1...v13.16.0) (2020-07-23)


### Features

* Add ContactCollection ([aa60741](https://github.com/cozy/cozy-client/commit/aa60741))





## [13.15.1](https://github.com/cozy/cozy-client/compare/v13.15.0...v13.15.1) (2020-07-17)


### Bug Fixes

* Always have response ids for settings routes ([5327493](https://github.com/cozy/cozy-client/commit/5327493))





## [13.12.1](https://github.com/cozy/cozy-client/compare/v13.12.0...v13.12.1) (2020-06-30)


### Bug Fixes

* FileCollection.statById pagination ([8f07797](https://github.com/cozy/cozy-client/commit/8f07797))





# [13.12.0](https://github.com/cozy/cozy-client/compare/v13.11.2...v13.12.0) (2020-06-30)


### Features

* Expose FileCollection.update() via CozyClient.save() ([118f53e](https://github.com/cozy/cozy-client/commit/118f53e))





# [13.11.0](https://github.com/cozy/cozy-client/compare/v13.10.0...v13.11.0) (2020-06-26)


### Features

* Add emptyTrash method ([52f683e](https://github.com/cozy/cozy-client/commit/52f683e))





# [13.9.0](https://github.com/cozy/cozy-client/compare/v13.8.5...v13.9.0) (2020-06-23)


### Features

* Support file/folder creation through client.create ([149231a](https://github.com/cozy/cozy-client/commit/149231a))





## [13.8.3](https://github.com/cozy/cozy-client/compare/v13.8.2...v13.8.3) (2020-06-03)


### Bug Fixes

* Correctly call callback for tokenRefresh passed in options ([c472fb0](https://github.com/cozy/cozy-client/commit/c472fb0))





## [13.8.2](https://github.com/cozy/cozy-client/compare/v13.8.1...v13.8.2) (2020-05-27)

**Note:** Version bump only for package cozy-stack-client





## [13.5.3](https://github.com/cozy/cozy-client/compare/v13.5.2...v13.5.3) (2020-05-06)


### Bug Fixes

* **cozy-stack-client:** Allow fetch to work in node ([bd00205](https://github.com/cozy/cozy-client/commit/bd00205))





## [13.5.2](https://github.com/cozy/cozy-client/compare/v13.5.1...v13.5.2) (2020-04-24)


### Bug Fixes

* Handle correctly KO result ([4767ecd](https://github.com/cozy/cozy-client/commit/4767ecd))





## [13.5.1](https://github.com/cozy/cozy-client/compare/v13.5.0...v13.5.1) (2020-04-24)


### Bug Fixes

* Add onerror handler to fetchXHR ([eaf9fbb](https://github.com/cozy/cozy-client/commit/eaf9fbb))





## [13.4.2](https://github.com/cozy/cozy-client/compare/v13.4.1...v13.4.2) (2020-04-09)


### Bug Fixes

* Normalize PermissionsCol.add response ([a9d2fa6](https://github.com/cozy/cozy-client/commit/a9d2fa6))





# [13.3.0](https://github.com/cozy/cozy-client/compare/v13.2.1...v13.3.0) (2020-04-03)


### Features

* Handle client errors ([6d53aca](https://github.com/cozy/cozy-client/commit/6d53aca))





## [13.2.1](https://github.com/cozy/cozy-client/compare/v13.2.0...v13.2.1) (2020-03-25)


### Bug Fixes

* Wrong condition to check for onload/onprogress support ([ed8ac0f](https://github.com/cozy/cozy-client/commit/ed8ac0f))





# [13.2.0](https://github.com/cozy/cozy-client/compare/v13.1.2...v13.2.0) (2020-03-23)


### Features

* Progress events for upload ([43643fc](https://github.com/cozy/cozy-client/commit/43643fc))





# [13.1.0](https://github.com/cozy/cozy-client/compare/v13.0.0...v13.1.0) (2020-03-17)


### Features

* Support cursor on FilesCollection.find ([418ff0d](https://github.com/cozy/cozy-client/commit/418ff0d))





# [13.0.0](https://github.com/cozy/cozy-client/compare/v12.6.0...v13.0.0) (2020-03-16)

**Note:** Version bump only for package cozy-stack-client





# [12.6.0](https://github.com/cozy/cozy-client/compare/v12.5.1...v12.6.0) (2020-03-16)


### Features

* Add ShortcutsCollection ([ffd854c](https://github.com/cozy/cozy-client/commit/ffd854c))





# [12.5.0](https://github.com/cozy/cozy-client/compare/v12.4.0...v12.5.0) (2020-03-06)


### Bug Fixes

* Take review into account ([7a1a2e8](https://github.com/cozy/cozy-client/commit/7a1a2e8))


### Features

* Store bookmark inside query ([1bf9f36](https://github.com/cozy/cozy-client/commit/1bf9f36))





# [12.2.0](https://github.com/cozy/cozy-client/compare/v12.1.1...v12.2.0) (2020-03-03)

**Note:** Version bump only for package cozy-stack-client





# [12.0.0](https://github.com/cozy/cozy-client/compare/v11.6.0...v12.0.0) (2020-02-26)

**Note:** Version bump only for package cozy-stack-client





# [11.2.0](https://github.com/cozy/cozy-client/compare/v11.1.1...v11.2.0) (2020-02-21)


### Features

* Add create to NotesCollection ([77ab427](https://github.com/cozy/cozy-client/commit/77ab427))





# [11.1.0](https://github.com/cozy/cozy-client/compare/v11.0.1...v11.1.0) (2020-02-14)


### Features

* Refresh stack token when invalid ([#643](https://github.com/cozy/cozy-client/issues/643)) ([63ab7a7](https://github.com/cozy/cozy-client/commit/63ab7a7))





## [11.0.1](https://github.com/cozy/cozy-client/compare/v11.0.0...v11.0.1) (2020-02-13)


### Bug Fixes

* Consider data object from stat ([98799f7](https://github.com/cozy/cozy-client/commit/98799f7))





# [11.0.0](https://github.com/cozy/cozy-client/compare/v10.9.0...v11.0.0) (2020-02-12)


### Features

* Add support for bookmark pagination on _find queries ([070f626](https://github.com/cozy/cozy-client/commit/070f626))


### BREAKING CHANGES

* the `meta: {count}` in the response no longer exist.
It was used to know how many docs were returned so far and was
computed with the skip value.
If the client needs this, it can be overcomed by keeping track of the
returned docs for each query and perform a `.length` on it.





# [10.7.0](https://github.com/cozy/cozy-client/compare/v10.6.0...v10.7.0) (2020-01-31)


### Features

* Add Notes collection `fetchURL` method ([231c737](https://github.com/cozy/cozy-client/commit/231c737))





# [10.4.0](https://github.com/cozy/cozy-client/compare/v10.3.0...v10.4.0) (2020-01-27)


### Features

* Add revokeAllRecipients for a sharing ([57d9786](https://github.com/cozy/cozy-client/commit/57d9786))





# [10.3.0](https://github.com/cozy/cozy-client/compare/v10.2.1...v10.3.0) (2020-01-24)


### Bug Fixes

* Use correct data endpoint ([d3339bd](https://github.com/cozy/cozy-client/commit/d3339bd))


### Features

* Get apps by id ([a59bf77](https://github.com/cozy/cozy-client/commit/a59bf77))





# [10.0.0](https://github.com/cozy/cozy-client/compare/v9.10.0...v10.0.0) (2020-01-22)

**Note:** Version bump only for package cozy-stack-client





# [9.10.0](https://github.com/cozy/cozy-client/compare/v9.9.0...v9.10.0) (2020-01-20)


### Features

* Notes collection ([cac0cc7](https://github.com/cozy/cozy-client/commit/cac0cc7))





# [9.9.0](https://github.com/cozy/cozy-client/compare/v9.8.1...v9.9.0) (2020-01-20)


### Bug Fixes

* Add onLine to memoize ([b1febfc](https://github.com/cozy/cozy-client/commit/b1febfc))
* Memoization for getIcon ([73c43eb](https://github.com/cozy/cozy-client/commit/73c43eb))
* Use custom error ([0c091d4](https://github.com/cozy/cozy-client/commit/0c091d4))


### Features

* Correctly await during tests ([2852488](https://github.com/cozy/cozy-client/commit/2852488))





## [9.8.1](https://github.com/cozy/cozy-client/compare/v9.8.0...v9.8.1) (2020-01-16)


### Bug Fixes

* Refresh token on expiration ([#618](https://github.com/cozy/cozy-client/issues/618)) ([434962d](https://github.com/cozy/cozy-client/commit/434962d))





# [9.7.0](https://github.com/cozy/cozy-client/compare/v9.6.1...v9.7.0) (2020-01-15)


### Bug Fixes

* Await promise during tests and fix the test ([d4bc48e](https://github.com/cozy/cozy-client/commit/d4bc48e))





# [9.6.0](https://github.com/cozy/cozy-client/compare/v9.5.2...v9.6.0) (2020-01-13)


### Features

* Use bookmark pagination for queryAll ([8195a72](https://github.com/cozy/cozy-client/commit/8195a72))





# [9.5.0](https://github.com/cozy/cozy-client/compare/v9.4.0...v9.5.0) (2020-01-08)

**Note:** Version bump only for package cozy-stack-client





# [9.2.0](https://github.com/cozy/cozy-client/compare/v9.1.1...v9.2.0) (2019-12-19)


### Features

* Destroy all removes the _type from the document ([1ca7ac7](https://github.com/cozy/cozy-client/commit/1ca7ac7))
* Destroy all removes the _type from the document ([#597](https://github.com/cozy/cozy-client/issues/597)) ([cb5e61d](https://github.com/cozy/cozy-client/commit/cb5e61d))





# [9.1.0](https://github.com/cozy/cozy-client/compare/v9.0.0...v9.1.0) (2019-12-18)


### Features

* Share a link with special permissions ([#598](https://github.com/cozy/cozy-client/issues/598)) ([ab73de8](https://github.com/cozy/cozy-client/commit/ab73de8))





# [9.0.0](https://github.com/cozy/cozy-client/compare/v8.10.1...v9.0.0) (2019-12-18)

**Note:** Version bump only for package cozy-stack-client





# [8.8.0](https://github.com/cozy/cozy-client/compare/v8.7.1...v8.8.0) (2019-12-12)


### Features

* Add mockClient creation for use in tests ([b2c7b40](https://github.com/cozy/cozy-client/commit/b2c7b40))





## [8.7.1](https://github.com/cozy/cozy-client/compare/v8.7.0...v8.7.1) (2019-12-10)

**Note:** Version bump only for package cozy-stack-client





# [8.7.0](https://github.com/cozy/cozy-client/compare/v8.6.0...v8.7.0) (2019-12-10)


### Features

* Fix regeneratorRuntime ([#588](https://github.com/cozy/cozy-client/issues/588)) ([4612ad9](https://github.com/cozy/cozy-client/commit/4612ad9)), closes [#584](https://github.com/cozy/cozy-client/issues/584)





## [8.5.1](https://github.com/cozy/cozy-client/compare/v8.5.0...v8.5.1) (2019-12-05)


### Bug Fixes

* Don't change my headers ([fa25142](https://github.com/cozy/cozy-client/commit/fa25142))





# [8.4.0](https://github.com/cozy/cozy-client/compare/v8.3.1...v8.4.0) (2019-11-29)


### Features

* Add checkForRevocation helper ([e62d62b](https://github.com/cozy/cozy-client/commit/e62d62b))





# [8.3.0](https://github.com/cozy/cozy-client/compare/v8.2.0...v8.3.0) (2019-11-28)

**Note:** Version bump only for package cozy-stack-client





# [8.0.0](https://github.com/cozy/cozy-client/compare/v7.14.0...v8.0.0) (2019-11-22)


### Bug Fixes

* SettingsCollection fix data response ([11edf5e](https://github.com/cozy/cozy-client/commit/11edf5e))


### BREAKING CHANGES

* SettingsCollection now returns the result in data : {}





# [7.12.0](https://github.com/cozy/cozy-client/compare/v7.11.0...v7.12.0) (2019-11-18)


### Features

* **cozy-stack-client:** Files get binary of a file ([31236b9](https://github.com/cozy/cozy-client/commit/31236b9))





# [7.11.0](https://github.com/cozy/cozy-client/compare/v7.10.0...v7.11.0) (2019-11-13)


### Features

* **cozy-stack-client:** Download file version ([830679b](https://github.com/cozy/cozy-client/commit/830679b))





# [7.8.0](https://github.com/cozy/cozy-client/compare/v7.7.0...v7.8.0) (2019-10-31)


### Features

* Added a simple settings collection ([fa0c1d6](https://github.com/cozy/cozy-client/commit/fa0c1d6))





# [7.5.0](https://github.com/cozy/cozy-client/compare/v7.4.1...v7.5.0) (2019-10-16)

**Note:** Version bump only for package cozy-stack-client





## [7.1.1](https://github.com/cozy/cozy-client/compare/v7.1.0...v7.1.1) (2019-10-11)

**Note:** Version bump only for package cozy-stack-client





# [7.1.0](https://github.com/cozy/cozy-client/compare/v7.0.0...v7.1.0) (2019-10-10)


### Bug Fixes

* Deprecate updateFileMetadata ([fc811fe](https://github.com/cozy/cozy-client/commit/fc811fe))


### Features

* **cozy-stack-client:** Filecollection update file metadata ([1dbeb40](https://github.com/cozy/cozy-client/commit/1dbeb40))





# [7.0.0](https://github.com/cozy/cozy-client/compare/v6.66.0...v7.0.0) (2019-10-07)


### Bug Fixes

* Job collection has default options ([1862faf](https://github.com/cozy/cozy-client/commit/1862faf))





# [6.66.0](https://github.com/cozy/cozy-client/compare/v6.65.0...v6.66.0) (2019-10-04)


### Features

* Add method to waitFor the completion of a job ([e4759fd](https://github.com/cozy/cozy-client/commit/e4759fd))
* Add methods to launch/update a konnector ([2e83b5b](https://github.com/cozy/cozy-client/commit/2e83b5b))





# [6.65.0](https://github.com/cozy/cozy-client/compare/v6.64.7...v6.65.0) (2019-10-03)


### Bug Fixes

* Triple equal ([52edce0](https://github.com/cozy/cozy-client/commit/52edce0))


### Features

* Add updateAll and deleteAll ([e8aa1f1](https://github.com/cozy/cozy-client/commit/e8aa1f1))
* Refresh token throws if not in web context ([b06c19d](https://github.com/cozy/cozy-client/commit/b06c19d))





## [6.64.6](https://github.com/cozy/cozy-client/compare/v6.64.5...v6.64.6) (2019-09-17)

**Note:** Version bump only for package cozy-stack-client





## [6.64.3](https://github.com/cozy/cozy-client/compare/v6.64.2...v6.64.3) (2019-09-13)

**Note:** Version bump only for package cozy-stack-client





# [6.63.0](https://github.com/cozy/cozy-client/compare/v6.62.0...v6.63.0) (2019-09-09)


### Bug Fixes

* Error reports the right fix ([46c4efd](https://github.com/cozy/cozy-client/commit/46c4efd))





## [6.58.2](https://github.com/cozy/cozy-client/compare/v6.58.1...v6.58.2) (2019-08-29)

**Note:** Version bump only for package cozy-stack-client





## [6.58.1](https://github.com/cozy/cozy-client/compare/v6.58.0...v6.58.1) (2019-08-21)

**Note:** Version bump only for package cozy-stack-client





# [6.57.0](https://github.com/cozy/cozy-client/compare/v6.56.1...v6.57.0) (2019-08-07)


### Features

* Implement referenced-by add/remove ([04aee66](https://github.com/cozy/cozy-client/commit/04aee66))





# [6.56.0](https://github.com/cozy/cozy-client/compare/v6.55.1...v6.56.0) (2019-08-02)


### Features

* **cozy-stack-client:** We can find on TriggerCollection ([5cef03b](https://github.com/cozy/cozy-client/commit/5cef03b))





# [6.55.0](https://github.com/cozy/cozy-client/compare/v6.54.0...v6.55.0) (2019-07-23)


### Features

* **stackClient:** Implement JobCollection.get() ✨ ([3615b90](https://github.com/cozy/cozy-client/commit/3615b90))





# [6.53.0](https://github.com/cozy/cozy-client/compare/v6.52.0...v6.53.0) (2019-07-16)


### Features

* Use a lighter mime library ([#373](https://github.com/cozy/cozy-client/issues/373)) ([5a97df0](https://github.com/cozy/cozy-client/commit/5a97df0))





# [6.52.0](https://github.com/cozy/cozy-client/compare/v6.51.0...v6.52.0) (2019-07-16)


### Features

* **cozy-stack-client:** Updatefile can create metadata ([bd768f7](https://github.com/cozy/cozy-client/commit/bd768f7))





# [6.51.0](https://github.com/cozy/cozy-client/compare/v6.50.0...v6.51.0) (2019-07-16)


### Features

* IsChild ([87e92e2](https://github.com/cozy/cozy-client/commit/87e92e2))





# [6.50.0](https://github.com/cozy/cozy-client/compare/v6.49.3...v6.50.0) (2019-07-16)


### Features

* **stack:** Add deleteFilePermanently method ([e422b27](https://github.com/cozy/cozy-client/commit/e422b27))





# [6.49.0](https://github.com/cozy/cozy-client/compare/v6.48.0...v6.49.0) (2019-07-08)


### Bug Fixes

* Allow double-array in query param ([78e8d73](https://github.com/cozy/cozy-client/commit/78e8d73))


### Features

* Add cursor-based pagination ([a075999](https://github.com/cozy/cozy-client/commit/a075999))
* Force use of cursor for view pagination ([5ad9387](https://github.com/cozy/cozy-client/commit/5ad9387))
* Use recursivity for querystrings ([daaa79f](https://github.com/cozy/cozy-client/commit/daaa79f))





# [6.47.0](https://github.com/cozy/cozy-client/compare/v6.46.0...v6.47.0) (2019-06-26)


### Features

* **stack:** Expose JobCollection via client.collection('io.cozy.jobs') ([57e5c91](https://github.com/cozy/cozy-client/commit/57e5c91))





# [6.46.0](https://github.com/cozy/cozy-client/compare/v6.45.2...v6.46.0) (2019-06-21)


### Features

* **stack:** Implment TriggerCollection.get method ✨ ([f8b170a](https://github.com/cozy/cozy-client/commit/f8b170a))





# [6.44.0](https://github.com/cozy/cozy-client/compare/v6.43.1...v6.44.0) (2019-06-14)


### Features

* Add createFileMetadata ([c5a282c](https://github.com/cozy/cozy-client/commit/c5a282c))





<a name="6.43.1"></a>
## [6.43.1](https://github.com/cozy/cozy-client/compare/v6.43.0...v6.43.1) (2019-06-05)




**Note:** Version bump only for package cozy-stack-client

<a name="6.43.0"></a>
# [6.43.0](https://github.com/cozy/cozy-client/compare/v6.42.0...v6.43.0) (2019-06-05)


### Features

* Add job creation + fetching ([77ffdf4](https://github.com/cozy/cozy-client/commit/77ffdf4))




<a name="6.42.0"></a>
# [6.42.0](https://github.com/cozy/cozy-client/compare/v6.41.1...v6.42.0) (2019-06-04)


### Features

* Add an unified way to get the access token ([4799688](https://github.com/cozy/cozy-client/commit/4799688))




<a name="6.40.0"></a>
# [6.40.0](https://github.com/cozy/cozy-client/compare/v6.39.0...v6.40.0) (2019-05-31)


### Features

* Add fetch polyfill in jest setup ([750216d](https://github.com/cozy/cozy-client/commit/750216d))




<a name="6.39.0"></a>
# [6.39.0](https://github.com/cozy/cozy-client/compare/v6.38.2...v6.39.0) (2019-05-31)


### Features

* Delete triggers ([198062b](https://github.com/cozy/cozy-client/commit/198062b))




<a name="6.38.1"></a>
## [6.38.1](https://github.com/cozy/cozy-client/compare/v6.38.0...v6.38.1) (2019-05-29)


### Bug Fixes

* Allow fromEnv instantiation from oauth client ([4f03be9](https://github.com/cozy/cozy-client/commit/4f03be9))
* Use NODE_ENV to differenciate authentication methods ([25499f0](https://github.com/cozy/cozy-client/commit/25499f0))




<a name="6.38.0"></a>
# [6.38.0](https://github.com/cozy/cozy-client/compare/v6.37.1...v6.38.0) (2019-05-28)


### Features

* **cozy-stack-client:** Add restore method on FileCollection ([cebca37](https://github.com/cozy/cozy-client/commit/cebca37))




<a name="6.33.0"></a>
# [6.33.0](https://github.com/cozy/cozy-client/compare/v6.32.0...v6.33.0) (2019-05-21)


### Features

* **cozy-stack-client:** Add updateFile method to FileCollection ([21006d1](https://github.com/cozy/cozy-client/commit/21006d1))




<a name="6.25.0"></a>
# [6.25.0](https://github.com/cozy/cozy-client/compare/v6.24.2...v6.25.0) (2019-04-30)


### Features

* Allows to refresh app tokens ([8b55e2c](https://github.com/cozy/cozy-client/commit/8b55e2c))




<a name="6.24.2"></a>
## [6.24.2](https://github.com/cozy/cozy-client/compare/v6.24.1...v6.24.2) (2019-04-29)


### Bug Fixes

* Defensive condition ([b23e924](https://github.com/cozy/cozy-client/commit/b23e924))
* Set Authorization header ([976f47d](https://github.com/cozy/cozy-client/commit/976f47d))




<a name="6.24.1"></a>
## [6.24.1](https://github.com/cozy/cozy-client/compare/v6.24.0...v6.24.1) (2019-04-26)




**Note:** Version bump only for package cozy-stack-client

<a name="6.24.0"></a>
# [6.24.0](https://github.com/cozy/cozy-client/compare/v6.23.3...v6.24.0) (2019-04-25)


### Features

* Stack client tells CozyClient of a revocation ([f7c9e95](https://github.com/cozy/cozy-client/commit/f7c9e95))




<a name="6.23.3"></a>
## [6.23.3](https://github.com/cozy/cozy-client/compare/v6.23.2...v6.23.3) (2019-04-25)


### Bug Fixes

* Find method was used for KonnectorCollection ([6a46477](https://github.com/cozy/cozy-client/commit/6a46477))




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
