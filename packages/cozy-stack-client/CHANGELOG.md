# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [32.6.0](https://github.com/cozy/cozy-client/compare/v32.5.0...v32.6.0) (2022-08-10)


### Features

* Add warning when selector fields are not indexed ([bdb630a](https://github.com/cozy/cozy-client/commit/bdb630a354603fb66c459d360a0a36206773a8e6))





## [32.3.3](https://github.com/cozy/cozy-client/compare/v32.3.2...v32.3.3) (2022-08-05)


### Bug Fixes

* Fix lint issue ([c4c64c5](https://github.com/cozy/cozy-client/commit/c4c64c5aed00bf18d1cb7e048ae6a9a98f65031a))





## [32.3.2](https://github.com/cozy/cozy-client/compare/v32.3.1...v32.3.2) (2022-08-04)

**Note:** Version bump only for package cozy-stack-client





## [32.2.5](https://github.com/cozy/cozy-client/compare/v32.2.4...v32.2.5) (2022-07-20)


### Bug Fixes

* Types ([5b5ab85](https://github.com/cozy/cozy-client/commit/5b5ab8556b2752881f08ae203e574264a01d9bd1))





## [32.2.4](https://github.com/cozy/cozy-client/compare/v32.2.3...v32.2.4) (2022-07-19)


### Bug Fixes

* Call `onTokenRefresh()` after `setToken()` when refreshing token ([e0c4581](https://github.com/cozy/cozy-client/commit/e0c4581f8837412b3d81dad58ebc7e3e6fdce673))





## [32.2.3](https://github.com/cozy/cozy-client/compare/v32.2.2...v32.2.3) (2022-07-18)


### Bug Fixes

* Check the correct path to get the warning ([60a6959](https://github.com/cozy/cozy-client/commit/60a69599b7709525ea2471f956a84d33c3981bbc))





# [32.2.0](https://github.com/cozy/cozy-client/compare/v32.1.1...v32.2.0) (2022-06-28)


### Bug Fixes

* Use correct index name with partial filter ([06d61a8](https://github.com/cozy/cozy-client/commit/06d61a83ddf310470207fb9d3e6849a770422596))


### Features

* Detect inconsistent index with partial filter ([2c30bcb](https://github.com/cozy/cozy-client/commit/2c30bcb12d39cc2dc6ca0d3cab597bf74fce4927))
* Handle CouchDB fallback for partial index ([7c69838](https://github.com/cozy/cozy-client/commit/7c69838d2962be8f59ada6806d65761dbfe47082))





# [32.1.0](https://github.com/cozy/cozy-client/compare/v32.0.0...v32.1.0) (2022-06-24)


### Features

* Add the partial filter fields in the index name ([32c432d](https://github.com/cozy/cozy-client/commit/32c432dd1376b9faec51376294f27d116b1f6370))





# [32.0.0](https://github.com/cozy/cozy-client/compare/v31.0.1...v32.0.0) (2022-06-21)

**Note:** Version bump only for package cozy-stack-client





# [31.0.0](https://github.com/cozy/cozy-client/compare/v30.0.0...v31.0.0) (2022-06-17)

**Note:** Version bump only for package cozy-stack-client





# [30.0.0](https://github.com/cozy/cozy-client/compare/v29.2.0...v30.0.0) (2022-06-09)

**Note:** Version bump only for package cozy-stack-client





# [29.2.0](https://github.com/cozy/cozy-client/compare/v29.1.3...v29.2.0) (2022-06-03)


### Features

* **cozy-stack-client:** Add loginFlagship entry point ([ee66c16](https://github.com/cozy/cozy-client/commit/ee66c16c9ae71b6534e30e06e0d20550b2d34854)), closes [cozy/cozy-stack#3400](https://github.com/cozy/cozy-stack/issues/3400)





# [29.1.0](https://github.com/cozy/cozy-client/compare/v29.0.1...v29.1.0) (2022-05-24)


### Bug Fixes

* Include rev when normalizing files ([f420743](https://github.com/cozy/cozy-client/commit/f42074387a9713ee2e8a8fb46265f7d03475a11d))


### Features

* Support client.save for files ([ac72bff](https://github.com/cozy/cozy-client/commit/ac72bff11a3d8afa0a509e1baf893af78504ca75))





# [29.0.0](https://github.com/cozy/cozy-client/compare/v28.3.0...v29.0.0) (2022-05-11)

**Note:** Version bump only for package cozy-stack-client





## [28.2.1](https://github.com/cozy/cozy-client/compare/v28.2.0...v28.2.1) (2022-04-26)

**Note:** Version bump only for package cozy-stack-client





# [28.2.0](https://github.com/cozy/cozy-client/compare/v28.1.1...v28.2.0) (2022-04-25)


### Features

* Add encrypted option to file creation and update ([7a1a8d0](https://github.com/cozy/cozy-client/commit/7a1a8d0075095d7d7406c3c0ef14b41d9fcc6bb1))





## [28.0.1](https://github.com/cozy/cozy-client/compare/v28.0.0...v28.0.1) (2022-04-22)


### Bug Fixes

* **stack-client:** PeerDependencies should not be fixed ([1fe5086](https://github.com/cozy/cozy-client/commit/1fe50865f6d0eca9bfe0191c694bdea100518391))





# [28.0.0](https://github.com/cozy/cozy-client/compare/v27.26.4...v28.0.0) (2022-04-08)


### Bug Fixes

* **deps:** Upgrade cozy-flags + consider each cozy-lib as peerDeps ([afdee02](https://github.com/cozy/cozy-client/commit/afdee027edb8da4107693bab01c60ca671e5b310))


### BREAKING CHANGES

* **deps:** Each consuming app should install the following
dependencies:
    "@cozy/minilog": "1.0.0",
    "cozy-device-helper": ">1.12.0",
    "cozy-flags": ">2.8.6",
    "cozy-logger": ">1.7.0",





# [27.26.0](https://github.com/cozy/cozy-client/compare/v27.25.0...v27.26.0) (2022-03-24)


### Bug Fixes

* **refresh-token:** Fetch refresh token on a specific route ([cbc62eb](https://github.com/cozy/cozy-client/commit/cbc62eb431403d1538f1b428d3996783eb9c7455))





# [27.21.0](https://github.com/cozy/cozy-client/compare/v27.20.0...v27.21.0) (2022-03-09)


### Features

* Add `fetchSessionCodeWithPassword` method on OAuthClient ([beaaa8b](https://github.com/cozy/cozy-client/commit/beaaa8bc6caf8d489be906a028337d6a621ecd94))
* Add `sessionCode` handling on `authorize()` method ([4176f54](https://github.com/cozy/cozy-client/commit/4176f5405379c826c401e180b6c701ded2883ad0))
* Add optional PKCE code handling on `authorize()` ([663a0a4](https://github.com/cozy/cozy-client/commit/663a0a41d2f80161a4abccfda953db7e7b7e1291))
* Implement `/settings/passphrase/flagship` api in `OAuthClient` ([574b1f5](https://github.com/cozy/cozy-client/commit/574b1f59b7e19481d0aaf73bef6d0c382b7f49f9))





## [27.19.4](https://github.com/cozy/cozy-client/compare/v27.19.3...v27.19.4) (2022-03-04)


### Bug Fixes

* **stack-client:** Fetch icon url when no appData and slug is passed ([5538630](https://github.com/cozy/cozy-client/commit/5538630f7e04fe7ba1563e5dd8f1982fe8e64fb7))





## [27.19.3](https://github.com/cozy/cozy-client/compare/v27.19.2...v27.19.3) (2022-03-04)


### Bug Fixes

* **stack-client:** Fetch icon url from registry when slug is passed ([17fbc69](https://github.com/cozy/cozy-client/commit/17fbc69679910741511db1676121d3b4933fbd57))





## [27.19.2](https://github.com/cozy/cozy-client/compare/v27.19.1...v27.19.2) (2022-03-02)


### Bug Fixes

* **upload:** Handle Ampersand characters in file name while xhr used ([03256a0](https://github.com/cozy/cozy-client/commit/03256a0f9eb9c23629efa6873169660833f2680d))





## [27.19.1](https://github.com/cozy/cozy-client/compare/v27.19.0...v27.19.1) (2022-03-01)


### Bug Fixes

* **stack-client:** Get Icon Url uses preloaded url when oAuth not needed ([34611df](https://github.com/cozy/cozy-client/commit/34611dfe129f02b5ccabab3c1d0d49173e8da134))





# [27.19.0](https://github.com/cozy/cozy-client/compare/v27.18.0...v27.19.0) (2022-02-25)


### Features

* Handle `access token expired` error in `www-authenticate` header ([30a5983](https://github.com/cozy/cozy-client/commit/30a59831dcc772a7ae930214441eaa535acdda6c))





# [27.17.0](https://github.com/cozy/cozy-client/compare/v27.16.1...v27.17.0) (2022-02-23)


### Features

* Add Manual to Job creation ([4843bd8](https://github.com/cozy/cozy-client/commit/4843bd86651158d9d4ec1611bc48aaf4814a403f))





# [27.15.0](https://github.com/cozy/cozy-client/compare/v27.14.4...v27.15.0) (2022-02-02)


### Features

* **file:** Fill last modified date in UpdatedAt path query string ([9f0a0d2](https://github.com/cozy/cozy-client/commit/9f0a0d26d97b4628855a975016a09bda7957de6f))





## [27.14.4](https://github.com/cozy/cozy-client/compare/v27.14.3...v27.14.4) (2022-01-31)


### Bug Fixes

* Generate FileCollection URLs with querystring ([ea17e24](https://github.com/cozy/cozy-client/commit/ea17e24ab40e225ecaf48bbaabac315dd5cda353))





## [27.14.1](https://github.com/cozy/cozy-client/compare/v27.14.0...v27.14.1) (2022-01-28)

**Note:** Version bump only for package cozy-stack-client





# [27.9.0](https://github.com/cozy/cozy-client/compare/v27.8.0...v27.9.0) (2022-01-12)


### Features

* Add a method to get session_code ([a3e7c8e](https://github.com/cozy/cozy-client/commit/a3e7c8e7dd0122c55e7e8ff6730de5bdc5b58b3e))





## [27.6.5](https://github.com/cozy/cozy-client/compare/v27.6.4...v27.6.5) (2021-12-20)


### Bug Fixes

* Use fetchOwnPermissions instead of deprecated getOwnPermissions ([fb1dd51](https://github.com/cozy/cozy-client/commit/fb1dd517c3f8ca6e184055ad3194d387a5901027))





## [27.6.4](https://github.com/cozy/cozy-client/compare/v27.6.3...v27.6.4) (2021-12-20)


### Bug Fixes

* Konnectors collection now ignores id in manifest ([96e08e9](https://github.com/cozy/cozy-client/commit/96e08e91f0447cea60eb2c393ecb7d6935603bff))





## [27.6.3](https://github.com/cozy/cozy-client/compare/v27.6.2...v27.6.3) (2021-12-16)


### Bug Fixes

* **docs:** Add JS Docs on File Collection ([c3f739a](https://github.com/cozy/cozy-client/commit/c3f739a60a4d32501970997585c0b8f7755ca6b9))





## [27.6.1](https://github.com/cozy/cozy-client/compare/v27.6.0...v27.6.1) (2021-12-15)


### Bug Fixes

* **filename:** Get illegal characters from file name and returns them ([7c00526](https://github.com/cozy/cozy-client/commit/7c00526283dd865aea929c2983d32f7a12121c65))





# [27.1.0](https://github.com/cozy/cozy-client/compare/v27.0.1...v27.1.0) (2021-11-04)


### Features

* Add FileCollection.fetchChanges() method ([af2f43b](https://github.com/cozy/cozy-client/commit/af2f43b154e6ba6011cb969c63e4e2045295bd4a))





# [27.0.0](https://github.com/cozy/cozy-client/compare/v26.0.2...v27.0.0) (2021-11-03)


### Bug Fixes

* Normalize referenced_by data into Array ([f2dd095](https://github.com/cozy/cozy-client/commit/f2dd095220116c74afaf06dad730ac40de242c2b))
* Return meta after file's referenced_by update ([917ebb5](https://github.com/cozy/cozy-client/commit/917ebb576f5d199ba596039285c9f074da79e13b))


### BREAKING CHANGES

* Changed returned `data` object value of
  `FileCollection.findReferencedBy()`,
  `FileCollection.addReferencedBy()` and
  `FileCollection.removeReferencedBy()` from `null` to `[]`.

  When a file is not referenced by any document, or we removed the last
  reference with a call to `FileCollection.removeReferencedBy()`,
  `cozy-stack` will return a `null` data object instead of an empty
  Array.
  To simplify the use of these methods, we'll normalize the response
  data to make sure it is always an Array.





# [26.0.0](https://github.com/cozy/cozy-client/compare/v25.1.0...v26.0.0) (2021-10-29)

**Note:** Version bump only for package cozy-stack-client





## [25.0.5](https://github.com/cozy/cozy-client/compare/v25.0.4...v25.0.5) (2021-10-25)


### Bug Fixes

* References routes do not return content ([2d34058](https://github.com/cozy/cozy-client/commit/2d340580ba00aac9d20d8b856c12abac998270e2))





## [25.0.2](https://github.com/cozy/cozy-client/compare/v25.0.1...v25.0.2) (2021-10-14)

**Note:** Version bump only for package cozy-stack-client





## [25.0.1](https://github.com/cozy/cozy-client/compare/v25.0.0...v25.0.1) (2021-10-13)


### Bug Fixes

* Normalize file relationship response ([f5f465f](https://github.com/cozy/cozy-client/commit/f5f465f05a4885981f7bb1f5c2a4c1d968e29449))





# [25.0.0](https://github.com/cozy/cozy-client/compare/v24.10.2...v25.0.0) (2021-10-12)

**Note:** Version bump only for package cozy-stack-client





## [24.10.2](https://github.com/cozy/cozy-client/compare/v24.10.1...v24.10.2) (2021-10-11)


### Bug Fixes

* Return destroyed OAuth client ([8e8151b](https://github.com/cozy/cozy-client/commit/8e8151bae87779e4640543566c5b016324621774))





## [24.10.1](https://github.com/cozy/cozy-client/compare/v24.10.0...v24.10.1) (2021-10-08)

**Note:** Version bump only for package cozy-stack-client





# [24.10.0](https://github.com/cozy/cozy-client/compare/v24.9.2...v24.10.0) (2021-10-06)


### Features

* Add OAuthClientsCollection ([ca3a439](https://github.com/cozy/cozy-client/commit/ca3a439157c5a3c6c6b74131ffc5d9992da408ea))





## [24.8.1](https://github.com/cozy/cozy-client/compare/v24.8.0...v24.8.1) (2021-09-20)

**Note:** Version bump only for package cozy-stack-client





## [24.6.1](https://github.com/cozy/cozy-client/compare/v24.6.0...v24.6.1) (2021-09-13)


### Bug Fixes

* Change sharing rule for `com.bitwarden.organizations` ([9884a2c](https://github.com/cozy/cozy-client/commit/9884a2cbc19a75c5d233509e68a1cb8b340376a6))





# [24.6.0](https://github.com/cozy/cozy-client/compare/v24.5.0...v24.6.0) (2021-09-13)


### Bug Fixes

* Set lastModifiedDate ([038b7d0](https://github.com/cozy/cozy-client/commit/038b7d0e0eafa5e84398f572f41b0dc34dd7a604))


### Features

* Infer content-type from file extension ([16877e8](https://github.com/cozy/cozy-client/commit/16877e81e53aa14b3346f2bda351b4f680ddfa3a))





# [24.5.0](https://github.com/cozy/cozy-client/compare/v24.4.0...v24.5.0) (2021-09-09)


### Features

* Pass name as param in updateFile ([b5d8034](https://github.com/cozy/cozy-client/commit/b5d803491bc09484763be5ab98c1a621d83c2c39))





# [24.4.0](https://github.com/cozy/cozy-client/compare/v24.3.3...v24.4.0) (2021-09-08)


### Features

* Handle Onboarding V2 ([91e0a3a](https://github.com/cozy/cozy-client/commit/91e0a3aad5c2ed6608a9c9d9420cda51a68e9f62))





## [24.3.3](https://github.com/cozy/cozy-client/compare/v24.3.2...v24.3.3) (2021-09-07)


### Bug Fixes

* Retrieve correct `data-cozy-*` in `refreshToken()` ([a74b774](https://github.com/cozy/cozy-client/commit/a74b774800d746834d11848547b79215e523cbe5))





# [24.0.0](https://github.com/cozy/cozy-client/compare/v23.22.0...v24.0.0) (2021-08-13)

**Note:** Version bump only for package cozy-stack-client





# [23.19.0](https://github.com/cozy/cozy-client/compare/v23.18.1...v23.19.0) (2021-08-06)


### Features

* Add sharing rules for bitwarden organizations ([866b8c2](https://github.com/cozy/cozy-client/commit/866b8c23a257d6cbf32656c1362ec018e749c5b5))





## [23.18.1](https://github.com/cozy/cozy-client/compare/v23.18.0...v23.18.1) (2021-08-04)

**Note:** Version bump only for package cozy-stack-client





# [23.18.0](https://github.com/cozy/cozy-client/compare/v23.17.3...v23.18.0) (2021-08-04)


### Features

* Update all automatically removes special member _type from docs ([54d96e1](https://github.com/cozy/cozy-client/commit/54d96e133b47be93c59de83fbfa1641ff83159a7)), closes [#758](https://github.com/cozy/cozy-client/issues/758)





# [23.17.0](https://github.com/cozy/cozy-client/compare/v23.16.0...v23.17.0) (2021-07-01)


### Features

* Include_docs is done by default by fetchChanges ([2f7c8a3](https://github.com/cozy/cozy-client/commit/2f7c8a35ec589f44b8b2bd5e667242dfbeae2248))





## [23.13.1](https://github.com/cozy/cozy-client/compare/v23.13.0...v23.13.1) (2021-06-18)


### Bug Fixes

* Updating a file also sanitize its name ([03bdd7e](https://github.com/cozy/cozy-client/commit/03bdd7e0687d69443d037d4b7bc32fd2b6d2a65a))





# [23.10.0](https://github.com/cozy/cozy-client/compare/v23.9.1...v23.10.0) (2021-06-15)


### Features

* Handle multiple workers in TriggerCollection.find ([4cc8a9a](https://github.com/cozy/cozy-client/commit/4cc8a9ad27625f8a9c68c1091ef1cefcd0fd4753))





## [23.9.1](https://github.com/cozy/cozy-client/compare/v23.9.0...v23.9.1) (2021-06-11)


### Bug Fixes

* Add normalization to jobCollection.update ([5989dd5](https://github.com/cozy/cozy-client/commit/5989dd5a86da5ef8b892a6755426b7590b829c00))
* Lint ([656c523](https://github.com/cozy/cozy-client/commit/656c523e944fd3cc72281b5a0eb66d00eabf9fe3))





# [23.8.0](https://github.com/cozy/cozy-client/compare/v23.7.0...v23.8.0) (2021-06-07)


### Features

* Add synchronization exclusions methods ([f1b9193](https://github.com/cozy/cozy-client/commit/f1b91936be78ab5eec796817cd17d686a9494086))





# [23.7.0](https://github.com/cozy/cozy-client/compare/v23.6.0...v23.7.0) (2021-06-07)


### Bug Fixes

* Better error message ([99d285d](https://github.com/cozy/cozy-client/commit/99d285dbb4311a533404e14a590739f3881472de))
* Changed setState method to update ([fa75fc4](https://github.com/cozy/cozy-client/commit/fa75fc412a2bb4983d306300cd7d54717a5b3fd3))
* Throw when the worker is not a client one ([f6fb779](https://github.com/cozy/cozy-client/commit/f6fb779f1d1662c51b47ad9f160843d53ef1f7d2))


### Features

* Add job setState ([2861501](https://github.com/cozy/cozy-client/commit/2861501df40a78f3af076f4505dbebe01f043bb3))





# [23.5.0](https://github.com/cozy/cozy-client/compare/v23.4.0...v23.5.0) (2021-06-02)


### Bug Fixes

* Do not try to COPY index if it is already the right one ([5319f6b](https://github.com/cozy/cozy-client/commit/5319f6b9a479ff42d49f7e661bcac8949e10eff6))





# [23.4.0](https://github.com/cozy/cozy-client/compare/v23.3.0...v23.4.0) (2021-05-26)


### Features

* Debug flag activates execution statistics ([083ec05](https://github.com/cozy/cozy-client/commit/083ec059798f123a3be20b35d0ce3427498b2506))





# [23.0.0](https://github.com/cozy/cozy-client/compare/v22.3.0...v23.0.0) (2021-04-22)

**Note:** Version bump only for package cozy-stack-client





# [22.3.0](https://github.com/cozy/cozy-client/compare/v22.2.0...v22.3.0) (2021-04-22)


### Bug Fixes

* Upgrade cozy-flags to fix errors in test ([3d557e4](https://github.com/cozy/cozy-client/commit/3d557e4afbb12718e544e46b6ceed7e2e6d9da3f))





# [22.0.0](https://github.com/cozy/cozy-client/compare/v21.1.1...v22.0.0) (2021-03-30)

**Note:** Version bump only for package cozy-stack-client





# [21.0.0](https://github.com/cozy/cozy-client/compare/v20.3.0...v21.0.0) (2021-03-23)

**Note:** Version bump only for package cozy-stack-client





## [20.2.1](https://github.com/cozy/cozy-client/compare/v20.2.0...v20.2.1) (2021-03-22)


### Bug Fixes

* Detect and destroy inconsistent indexes ([0f54e1a](https://github.com/cozy/cozy-client/commit/0f54e1aca8d44dbf609f7f52199abbb7b995602a))
* Pass the _design for index name ([7e4c3a6](https://github.com/cozy/cozy-client/commit/7e4c3a6f30fa05928b1c23eae07cb8d442239649))
* Query the whole selector to avoid creating specific index ([3ba0b5b](https://github.com/cozy/cozy-client/commit/3ba0b5b8c247f5a464b691c49babf00cf71d3685))





# [20.0.0](https://github.com/cozy/cozy-client/compare/v19.1.1...v20.0.0) (2021-03-16)

**Note:** Version bump only for package cozy-stack-client





## [19.1.1](https://github.com/cozy/cozy-client/compare/v19.1.0...v19.1.1) (2021-03-12)

**Note:** Version bump only for package cozy-stack-client





# [19.1.0](https://github.com/cozy/cozy-client/compare/v19.0.0...v19.1.0) (2021-03-08)


### Features

* Upgrade cozy-flag to fix react import in node env ([fe18020](https://github.com/cozy/cozy-client/commit/fe180208e8ddce2d06a33aedbe00b182fe523920))





# [19.0.0](https://github.com/cozy/cozy-client/compare/v18.1.3...v19.0.0) (2021-03-05)

**Note:** Version bump only for package cozy-stack-client





## [18.1.3](https://github.com/cozy/cozy-client/compare/v18.1.2...v18.1.3) (2021-03-05)


### Bug Fixes

* Upgrade cozy-flags to avoid error in node env ([825bce5](https://github.com/cozy/cozy-client/commit/825bce505af12c04adad7e937481decc37702495))





# [18.0.0](https://github.com/cozy/cozy-client/compare/v17.6.1...v18.0.0) (2021-03-02)

**Note:** Version bump only for package cozy-stack-client





## [17.6.1](https://github.com/cozy/cozy-client/compare/v17.6.0...v17.6.1) (2021-03-01)


### Bug Fixes

* HandleMissingIndex can now deal with undefined indexedFields ([743d883](https://github.com/cozy/cozy-client/commit/743d8834b71682d7aaa2bcec1e8285a2af0d536d))





# [17.6.0](https://github.com/cozy/cozy-client/compare/v17.5.0...v17.6.0) (2021-02-26)


### Features

* Send uploaded file size via query-string ([#882](https://github.com/cozy/cozy-client/issues/882)) ([2bb6eb9](https://github.com/cozy/cozy-client/commit/2bb6eb966c1fc0d7031757b5702ed17fa0d0e39c))





# [17.3.0](https://github.com/cozy/cozy-client/compare/v17.2.0...v17.3.0) (2021-02-23)


### Features

* Can use app_slug when creating a sharing ([29ecad0](https://github.com/cozy/cozy-client/commit/29ecad0c761e822f33cccbf944cbe38cd37f3c2f))





## [17.1.1](https://github.com/cozy/cozy-client/compare/v17.1.0...v17.1.1) (2021-02-16)


### Bug Fixes

* Copy fields before sort ([a880556](https://github.com/cozy/cozy-client/commit/a880556ddd8dfdc34579708ed1411409bbd0f2d1))
* Do not throw no_usable_index error after find query ([22f7db6](https://github.com/cozy/cozy-client/commit/22f7db69c0fa702f6fa268cb63d4db059febc4bf))





# [17.1.0](https://github.com/cozy/cozy-client/compare/v17.0.3...v17.1.0) (2021-02-15)


### Features

* Copy design doc when equivalent index is found ([65b3e75](https://github.com/cozy/cozy-client/commit/65b3e75cb5f04fb8000fe41cbd53502f2a73e3b1))
* Limit to 1 the queries after index creation ([20c13ec](https://github.com/cozy/cozy-client/commit/20c13ec80203694a2353708b91c1f8b91af76263))
* Optimistic index creation ([f104d0d](https://github.com/cozy/cozy-client/commit/f104d0df97a553093e640437b22cd94362b95a50))





## [17.0.2](https://github.com/cozy/cozy-client/compare/v17.0.1...v17.0.2) (2021-02-12)

**Note:** Version bump only for package cozy-stack-client





## [17.0.1](https://github.com/cozy/cozy-client/compare/v17.0.0...v17.0.1) (2021-02-11)


### Bug Fixes

* Moving of some spec files to src root folder ([9256942](https://github.com/cozy/cozy-client/commit/92569424e1191cf89f88b7b5af90de0f1295e14c))
* Throw an error only if sources is not an array ([07d4de4](https://github.com/cozy/cozy-client/commit/07d4de452624490f722e22109203779385e96264))





# [17.0.0](https://github.com/cozy/cozy-client/compare/v16.19.0...v17.0.0) (2021-02-10)

**Note:** Version bump only for package cozy-stack-client





# [16.19.0](https://github.com/cozy/cozy-client/compare/v16.18.0...v16.19.0) (2021-02-08)


### Bug Fixes

* Add type to path ([e529b99](https://github.com/cozy/cozy-client/commit/e529b99198d7d83b66a0864f8e691543452e5d24))


### Features

* Add posibility to have multiple values in type with $in ([3ea6132](https://github.com/cozy/cozy-client/commit/3ea6132a27c9a32a735048051862742b3380bd22))





# [16.17.0](https://github.com/cozy/cozy-client/compare/v16.16.0...v16.17.0) (2021-01-27)


### Features

* Add possibility to chose sources when executing a Q().getById() ([cfb82f5](https://github.com/cozy/cozy-client/commit/cfb82f51d45c2998e1c7b9281cd55032534fa21d))
* Add query as argument to collection.get() ([dbab610](https://github.com/cozy/cozy-client/commit/dbab61064dc869460a7bc2eabee3085e93283424))





# [16.14.0](https://github.com/cozy/cozy-client/compare/v16.13.1...v16.14.0) (2021-01-22)


### Features

* Handle index conflicts ([5fa5832](https://github.com/cozy/cozy-client/commit/5fa58327201a95c4e9bff054d8aad41180c9d446))





# [16.12.0](https://github.com/cozy/cozy-client/compare/v16.11.0...v16.12.0) (2021-01-13)


### Bug Fixes

* Files API uses meta ([d8b402e](https://github.com/cozy/cozy-client/commit/d8b402efd1b0a2da6928121f91a4a10e64fbecc9))


### Features

* Support for perfs.execution_stats flag ([19cda8c](https://github.com/cozy/cozy-client/commit/19cda8cb6df9f9c204f3ba964ecb4709120c77a1))





# [16.11.0](https://github.com/cozy/cozy-client/compare/v16.10.2...v16.11.0) (2021-01-11)


### Features

* Can create tiny code (6 digits) ([958395f](https://github.com/cozy/cozy-client/commit/958395f73e00c3638fc9ff4c8d29c0cd7d88eae4))





# [16.8.0](https://github.com/cozy/cozy-client/compare/v16.7.0...v16.8.0) (2020-11-26)


### Features

* Support partial index in DocumentCollection ([cb3a7f7](https://github.com/cozy/cozy-client/commit/cb3a7f7feaabd0c1d72fe311c738ba8d84a37d2e))





# [16.6.0](https://github.com/cozy/cozy-client/compare/v16.5.0...v16.6.0) (2020-11-24)


### Features

* Use node-fetch in place of isomorphic-fetch ([87f9e4e](https://github.com/cozy/cozy-client/commit/87f9e4e2f23f86f9fd9f81f96070f4eede2e01ce)), closes [konnectors/libs#724](https://github.com/konnectors/libs/issues/724)





# [16.5.0](https://github.com/cozy/cozy-client/compare/v16.4.1...v16.5.0) (2020-11-24)

**Note:** Version bump only for package cozy-stack-client





# [16.4.0](https://github.com/cozy/cozy-client/compare/v16.3.0...v16.4.0) (2020-11-16)


### Bug Fixes

* Rename getOwnPermissions to fetchOwnPermissions ([5731ea5](https://github.com/cozy/cozy-client/commit/5731ea5))


### Features

* Add get on SharingCollection ([61b4c62](https://github.com/cozy/cozy-client/commit/61b4c62))





# [16.0.0](https://github.com/cozy/cozy-client/compare/v15.6.0...v16.0.0) (2020-10-26)


### Bug Fixes

* Don't send empty params ([8a384ce](https://github.com/cozy/cozy-client/commit/8a384ce))
* Remove the reference to policy in getSharingRules warning ([b654415](https://github.com/cozy/cozy-client/commit/b654415))


### Features

* New addRecipients API to follow recipients and readOnlyRecipients ([41a8b75](https://github.com/cozy/cozy-client/commit/41a8b75))
* Remove OLD addRecipients API ([8bec3dd](https://github.com/cozy/cozy-client/commit/8bec3dd))


### BREAKING CHANGES

* addRecipients(sharing, recipients, sharingType) is now
addRecipients({document, recipients, readOnlyRecipients})

Added Recipient / Sharing / Rule Typedef

Don't send params (recipients / readOnlyRecipients) if they are empty





# [15.6.0](https://github.com/cozy/cozy-client/compare/v15.5.0...v15.6.0) (2020-10-23)


### Features

* GetOwnPermissions returns included ([868c63e](https://github.com/cozy/cozy-client/commit/868c63e))





# [15.5.0](https://github.com/cozy/cozy-client/compare/v15.4.2...v15.5.0) (2020-10-22)


### Features

* New Create method for SharingCollection ([0f7c917](https://github.com/cozy/cozy-client/commit/0f7c917))





## [15.4.1](https://github.com/cozy/cozy-client/compare/v15.4.0...v15.4.1) (2020-10-19)


### Bug Fixes

* Rename fetchFileContent to fetchFilecontentById ([a77607c](https://github.com/cozy/cozy-client/commit/a77607c))





# [15.2.0](https://github.com/cozy/cozy-client/compare/v15.1.1...v15.2.0) (2020-10-05)


### Features

* When an app/konnector is fetched by id, doctype should be present ([1487ec1](https://github.com/cozy/cozy-client/commit/1487ec1))





# [15.0.0](https://github.com/cozy/cozy-client/compare/v14.7.0...v15.0.0) (2020-09-25)

**Note:** Version bump only for package cozy-stack-client





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
