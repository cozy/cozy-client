# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [24.6.1](https://github.com/cozy/cozy-client/compare/v24.6.0...v24.6.1) (2021-09-13)

**Note:** Version bump only for package cozy-client





# [24.6.0](https://github.com/cozy/cozy-client/compare/v24.5.0...v24.6.0) (2021-09-13)

**Note:** Version bump only for package cozy-client





# [24.5.0](https://github.com/cozy/cozy-client/compare/v24.4.0...v24.5.0) (2021-09-09)


### Features

* Implement data retrieval for HasManyFiles ([f6740be](https://github.com/cozy/cozy-client/commit/f6740be2b0e8a0c88cbc3d5beddffd30c240fcdb))





# [24.4.0](https://github.com/cozy/cozy-client/compare/v24.3.3...v24.4.0) (2021-09-08)

**Note:** Version bump only for package cozy-client





## [24.3.3](https://github.com/cozy/cozy-client/compare/v24.3.2...v24.3.3) (2021-09-07)

**Note:** Version bump only for package cozy-client





# [24.2.0](https://github.com/cozy/cozy-client/compare/v24.1.3...v24.2.0) (2021-09-01)


### Features

* Allow to query a HasManyFiles relation in both ways ([1577564](https://github.com/cozy/cozy-client/commit/15775649a275020cf6d41b36214e3a2b4f486338))
* Uniq ids in query ([e6a7b17](https://github.com/cozy/cozy-client/commit/e6a7b17c918adf54a9d8b7024f78c7393f9b53b7))





## [24.1.3](https://github.com/cozy/cozy-client/compare/v24.1.2...v24.1.3) (2021-08-27)

**Note:** Version bump only for package cozy-client





## [24.1.2](https://github.com/cozy/cozy-client/compare/v24.1.1...v24.1.2) (2021-08-27)

**Note:** Version bump only for package cozy-client





## [24.1.1](https://github.com/cozy/cozy-client/compare/v24.1.0...v24.1.1) (2021-08-27)


### Bug Fixes

* Linting ([6a9f31d](https://github.com/cozy/cozy-client/commit/6a9f31dc85b651d996c5b1ce296fe970fcc9ccae))
* Moved polyfills in createClientInteractive ([39d3cd4](https://github.com/cozy/cozy-client/commit/39d3cd4d8bc6bd9f5c6a4620fa98fa0e15948857))





# [24.1.0](https://github.com/cozy/cozy-client/compare/v24.0.0...v24.1.0) (2021-08-23)


### Bug Fixes

* QueryAll for CozyPouchLink ([00a54cc](https://github.com/cozy/cozy-client/commit/00a54cc60ac6421c44f31c209c30e4bf6d1f592e))





# [24.0.0](https://github.com/cozy/cozy-client/compare/v23.22.0...v24.0.0) (2021-08-13)


### Features

* Replace fetchAppLatestVersion by fetchAppVersion ([d705072](https://github.com/cozy/cozy-client/commit/d705072a858430e95579cc27dc7d074fe2912c67))


### BREAKING CHANGES

* the fetchAppLatestVersion method won't exist
anymore, but it is really new and has no sense with the presence of
fetchAppVersion.





# [23.22.0](https://github.com/cozy/cozy-client/compare/v23.21.0...v23.22.0) (2021-08-12)


### Features

* Add a devtool panel for pouch ([dca619c](https://github.com/cozy/cozy-client/commit/dca619c25baa2d99b51349ceadb717639ad20e25))
* Add registry.fetchAppLatestVersion ([100c6ac](https://github.com/cozy/cozy-client/commit/100c6ac95ad25f278a811709ecaef712489ee286))
* Check presence of parameters in fetchAppLatestVersion ([6536904](https://github.com/cozy/cozy-client/commit/65369048041e2c012d1ba566ab34825b1bff9cad))
* Devtools opens at last panels that was opened ([6f466a1](https://github.com/cozy/cozy-client/commit/6f466a10352835a2863f697e05bfd2c0734cc826))
* Nicer close button for dev panel (sits just above the panel) ([9246f40](https://github.com/cozy/cozy-client/commit/9246f408174201e99f09d48f8cb43ecea92d7a57))
* Queries panels has a minWidth of 400 ([22eb1f5](https://github.com/cozy/cozy-client/commit/22eb1f5ece5b17dd018324bb1350652c78c440e9))





## [23.19.3](https://github.com/cozy/cozy-client/compare/v23.19.2...v23.19.3) (2021-08-10)

**Note:** Version bump only for package cozy-client





## [23.19.2](https://github.com/cozy/cozy-client/compare/v23.19.1...v23.19.2) (2021-08-09)

**Note:** Version bump only for package cozy-client





## [23.19.1](https://github.com/cozy/cozy-client/compare/v23.19.0...v23.19.1) (2021-08-09)


### Bug Fixes

* Move [@types](https://github.com/types) back to dependencies ([486b49d](https://github.com/cozy/cozy-client/commit/486b49d4cb7a9f550811e08f7c924aafef1956a3))





# [23.19.0](https://github.com/cozy/cozy-client/compare/v23.18.1...v23.19.0) (2021-08-06)

**Note:** Version bump only for package cozy-client





## [23.18.1](https://github.com/cozy/cozy-client/compare/v23.18.0...v23.18.1) (2021-08-04)

**Note:** Version bump only for package cozy-client





# [23.18.0](https://github.com/cozy/cozy-client/compare/v23.17.3...v23.18.0) (2021-08-04)


### Features

* Ability to saveAll through StackLink ([b763de4](https://github.com/cozy/cozy-client/commit/b763de4232375d6f971d6dc35ebbf8c162aa07c9))
* Attach bad documents to the error ([e570918](https://github.com/cozy/cozy-client/commit/e57091877cbc76465d837df2803520cee49c8f79))
* BulkEditError provides a way to get updated documents and errors ([bdf6b47](https://github.com/cozy/cozy-client/commit/bdf6b478cab7d11f8a4ab81d286cd8a2cbadd7f1))
* Improve validation errors while bulk saving ([ff7811a](https://github.com/cozy/cozy-client/commit/ff7811ae733cfb5ae50af565c23f9b6cdd9054db))
* Mock saveAll in mock client ([a1cf7d0](https://github.com/cozy/cozy-client/commit/a1cf7d09604ce25a3e6ae562d1dc197cdade246b))





## [23.17.3](https://github.com/cozy/cozy-client/compare/v23.17.2...v23.17.3) (2021-07-19)


### Bug Fixes

* Cached queries optimization ([f3f1f0f](https://github.com/cozy/cozy-client/commit/f3f1f0f0136555a43c4fd157d96be68b11a818f8))





## [23.17.2](https://github.com/cozy/cozy-client/compare/v23.17.1...v23.17.2) (2021-07-15)


### Bug Fixes

* Move [@types](https://github.com/types) to devDependencies ([abd847c](https://github.com/cozy/cozy-client/commit/abd847ce4bb29f405fc80109fd78f65fd780d5f2))





## [23.17.1](https://github.com/cozy/cozy-client/compare/v23.17.0...v23.17.1) (2021-07-09)


### Bug Fixes

* Restore the log URL for mobile authentication ([63b8eb4](https://github.com/cozy/cozy-client/commit/63b8eb44ab0f7ca3661f6dee887fcde4f80edb87)), closes [unified#diff-e879aaa33e459b749f1f68b01b84a2faf1fccd65cc819c96e7afc6c8bcbb2c36L168](https://github.com/unified/issues/diff-e879aaa33e459b749f1f68b01b84a2faf1fccd65cc819c96e7afc6c8bcbb2c36L168)





# [23.17.0](https://github.com/cozy/cozy-client/compare/v23.16.0...v23.17.0) (2021-07-01)

**Note:** Version bump only for package cozy-client





# [23.16.0](https://github.com/cozy/cozy-client/compare/v23.15.2...v23.16.0) (2021-06-30)


### Features

* Pass readme none to typedocs ([1fbf7f7](https://github.com/cozy/cozy-client/commit/1fbf7f78e060026aa991c6be44d055a05e74d9a8))





## [23.15.2](https://github.com/cozy/cozy-client/compare/v23.15.1...v23.15.2) (2021-06-30)

**Note:** Version bump only for package cozy-client





## [23.15.1](https://github.com/cozy/cozy-client/compare/v23.15.0...v23.15.1) (2021-06-28)


### Bug Fixes

* LoadInstanceOptionsFromDOM add root datas and cozy datas ([12b3d6a](https://github.com/cozy/cozy-client/commit/12b3d6a4ec83ec30d93b9383bb4f6214c00e581c))
* Remove useless omit import ([f8d43b7](https://github.com/cozy/cozy-client/commit/f8d43b70956006806e2e7b7c276a85ef12bfac43))





# [23.15.0](https://github.com/cozy/cozy-client/compare/v23.14.1...v23.15.0) (2021-06-24)


### Features

* Improve type documentation for CozyClient ([dbacf5d](https://github.com/cozy/cozy-client/commit/dbacf5dcf814ba655aca3c880bea80b07a6cc801))





## [23.14.1](https://github.com/cozy/cozy-client/compare/v23.14.0...v23.14.1) (2021-06-24)


### Bug Fixes

* Remove docs ids that have been removed from docs slice ([9804ccd](https://github.com/cozy/cozy-client/commit/9804ccd2352089b039f2cfd5ae7bb34ca36ceb91))





# [23.14.0](https://github.com/cozy/cozy-client/compare/v23.13.1...v23.14.0) (2021-06-22)


### Bug Fixes

* Defensive code to not throw an error if there is no Qd. ([bd61235](https://github.com/cozy/cozy-client/commit/bd6123591e8ba8ef59648c62075ef34d37a5ab00))
* Set fetchStatus to loading by default ([6a80e38](https://github.com/cozy/cozy-client/commit/6a80e384136afb7e77851f77e6793e5df1637720)), closes [#925](https://github.com/cozy/cozy-client/issues/925)


### Features

* Dedupes equal queries fired at the same time ([b13d463](https://github.com/cozy/cozy-client/commit/b13d463e222cdb629cf43ea4cf759e2264ebe467))





## [23.13.1](https://github.com/cozy/cozy-client/compare/v23.13.0...v23.13.1) (2021-06-18)

**Note:** Version bump only for package cozy-client





# [23.13.0](https://github.com/cozy/cozy-client/compare/v23.12.0...v23.13.0) (2021-06-17)


### Bug Fixes

* Add parameters to query() in Association ([0aa559e](https://github.com/cozy/cozy-client/commit/0aa559e6074a71233595914cda816ceec2e733e2))
* Remove ref to CozyClient as it breaks tests (circular dependency) ([3872bb4](https://github.com/cozy/cozy-client/commit/3872bb4981ead5ba7775c7b72cff1bf47bcdeed7))


### Features

* Improve type documentation for Association.js ([e33702e](https://github.com/cozy/cozy-client/commit/e33702e403cc150a3fa785cca48b4becfbe3a059))
* Improve type documentation for timeseries.js ([4c19bb0](https://github.com/cozy/cozy-client/commit/4c19bb0660dc07312c7d797de0d1f48e014afe9c))





# [23.12.0](https://github.com/cozy/cozy-client/compare/v23.11.1...v23.12.0) (2021-06-17)


### Features

* Instanciating new CozyClient now add capabilities to it ([324a6d2](https://github.com/cozy/cozy-client/commit/324a6d22687c915d28fd8a20239aa56790aa4f93))





## [23.11.1](https://github.com/cozy/cozy-client/compare/v23.11.0...v23.11.1) (2021-06-15)

**Note:** Version bump only for package cozy-client





# [23.11.0](https://github.com/cozy/cozy-client/compare/v23.10.0...v23.11.0) (2021-06-15)


### Features

* Allow to pass null to instantiate a query ([eca6e03](https://github.com/cozy/cozy-client/commit/eca6e03b69ae4b45820675af05c69d112a964a6a))





# [23.10.0](https://github.com/cozy/cozy-client/compare/v23.9.1...v23.10.0) (2021-06-15)

**Note:** Version bump only for package cozy-client





## [23.9.1](https://github.com/cozy/cozy-client/compare/v23.9.0...v23.9.1) (2021-06-11)

**Note:** Version bump only for package cozy-client





# [23.9.0](https://github.com/cozy/cozy-client/compare/v23.8.0...v23.9.0) (2021-06-08)


### Bug Fixes

* Remove obsolete comment ([9b5d1e1](https://github.com/cozy/cozy-client/commit/9b5d1e10480d1a887674ce864f1dd233712424b6))
* Types ([b19de82](https://github.com/cozy/cozy-client/commit/b19de82a0e3f6172f5b1cec45aa032632fb5b8d4))


### Features

* Use native.js file to make react native really optionnal ([390f46d](https://github.com/cozy/cozy-client/commit/390f46d47c8c80917c93d518ac201a1b40868329))





# [23.8.0](https://github.com/cozy/cozy-client/compare/v23.7.0...v23.8.0) (2021-06-07)

**Note:** Version bump only for package cozy-client





# [23.7.0](https://github.com/cozy/cozy-client/compare/v23.6.0...v23.7.0) (2021-06-07)

**Note:** Version bump only for package cozy-client





# [23.6.0](https://github.com/cozy/cozy-client/compare/v23.5.0...v23.6.0) (2021-06-07)


### Bug Fixes

* Better docs ([d7b30c5](https://github.com/cozy/cozy-client/commit/d7b30c5ffd257b256f8e80030657c64de5275881))
* Typos ([02491cd](https://github.com/cozy/cozy-client/commit/02491cd66a7a6b4e396256a8fb6dfc393c0440fb))


### Features

* Add react-native authentication ([ce2fa57](https://github.com/cozy/cozy-client/commit/ce2fa571427ed77f3be18095b3eb3345b3634b0c))





# [23.5.0](https://github.com/cozy/cozy-client/compare/v23.4.0...v23.5.0) (2021-06-02)


### Bug Fixes

* Queries in error are correctly sorted ([b486081](https://github.com/cozy/cozy-client/commit/b486081b6da4b1afa10a4f6ab9e3d93f4e0cfe9c))
* When returning default query, return it with the requested id ([4d1072f](https://github.com/cozy/cozy-client/commit/4d1072f7566a14aa378ba73b7f0b1c46aa4b37c8))


### Features

* Add tests for autoUpdate strategies ([8f1b5e6](https://github.com/cozy/cozy-client/commit/8f1b5e6ddd592e61bf8610dede3d87e7bd14eae8))
* Add types for redux slices ([740d31b](https://github.com/cozy/cozy-client/commit/740d31bb0317e05172ef1948bab543fbb1c1e5f0))
* Add types to schema ([132b561](https://github.com/cozy/cozy-client/commit/132b561a085c7f59f8b91bcf9409eb7e1bfecdb0))
* Better types for queries state slice ([7513489](https://github.com/cozy/cozy-client/commit/7513489a5ab50f9c8c716fecbb675078494d6be0))
* Highlight failed queries in query list ([3ece710](https://github.com/cozy/cozy-client/commit/3ece71068c12c1dde9fbd3abceb38a7def15186a))
* Ignore tslint warning ([4a0fc58](https://github.com/cozy/cozy-client/commit/4a0fc58763760bbbcce5cf98b75e564c8ddfb552))
* Queries can choose not to be auto updated ([dd76114](https://github.com/cozy/cozy-client/commit/dd761142cb75b2d8f8acdd2ae4e84a38b6ce52bb))
* Show indexedFields in the Query devtool ([c1debce](https://github.com/cozy/cozy-client/commit/c1debce2ce0dca7959ce0ce493fa2cbc4de62621))
* Type query state ([a3bc450](https://github.com/cozy/cozy-client/commit/a3bc450aabad76c341dea7338db386717fdf590d))
* Type query state in devtools ([7427fa3](https://github.com/cozy/cozy-client/commit/7427fa38b00d76aaa8654861d56bd262492538b1))
* Use lowercase text to have for coherence with other labels ([1c3028b](https://github.com/cozy/cozy-client/commit/1c3028b6a6e0ea77e32cc4957f1585e9cb1dd9ba))
* useQuery/Query support an enabled parameter ([6faede4](https://github.com/cozy/cozy-client/commit/6faede4f590ef2a9f2e5fb53603d6beb035f71f9))





# [23.4.0](https://github.com/cozy/cozy-client/compare/v23.3.0...v23.4.0) (2021-05-26)


### Bug Fixes

* Move devtools doc at the right place ([1733bd6](https://github.com/cozy/cozy-client/commit/1733bd67a10fb3b4a632a04a58b6407de075e120))


### Features

* Debug flag activates execution statistics ([083ec05](https://github.com/cozy/cozy-client/commit/083ec059798f123a3be20b35d0ce3427498b2506))





# [23.3.0](https://github.com/cozy/cozy-client/compare/v23.2.0...v23.3.0) (2021-05-18)


### Features

* Add some file models from Drive ([27ed3b0](https://github.com/cozy/cozy-client/commit/27ed3b05391aa820ac1821d66abc4f99444bb7d6))





## [23.1.2](https://github.com/cozy/cozy-client/compare/v23.1.1...v23.1.2) (2021-05-11)


### Bug Fixes

* Add missing export to useAppsInMaintenance ([6cdeb12](https://github.com/cozy/cozy-client/commit/6cdeb12dbc17569855a62d1e90ec8ea9da2235bb))





## [23.1.1](https://github.com/cozy/cozy-client/compare/v23.1.0...v23.1.1) (2021-05-11)

**Note:** Version bump only for package cozy-client





# [23.1.0](https://github.com/cozy/cozy-client/compare/v23.0.0...v23.1.0) (2021-05-10)


### Features

* Add useAppsInMaintenance ([a3802f5](https://github.com/cozy/cozy-client/commit/a3802f5f3d43dd067e31f9d3b755627ef4cfdc9c))





# [23.0.0](https://github.com/cozy/cozy-client/compare/v22.3.0...v23.0.0) (2021-04-22)


### Features

* Change files storage location on Android ([f45aacb](https://github.com/cozy/cozy-client/commit/f45aacbc5e2fe08e8c1cf8b3da6b49e08a3c0fe6))


### BREAKING CHANGES

* Due to Android 11 release, we have to change
the files storage location.





# [22.3.0](https://github.com/cozy/cozy-client/compare/v22.2.0...v22.3.0) (2021-04-22)


### Bug Fixes

* Remove warnings ([290d118](https://github.com/cozy/cozy-client/commit/290d1189fbd365c2b78008916366dfa2faecdfe4))
* Upgrade cozy-flags to fix errors in test ([3d557e4](https://github.com/cozy/cozy-client/commit/3d557e4afbb12718e544e46b6ceed7e2e6d9da3f))


### Features

* Add execution time in Queries ([829389c](https://github.com/cozy/cozy-client/commit/829389c5d3b2e71d4009ffa78b15f569dd58ae48))
* DevTools display exec time first ([3207153](https://github.com/cozy/cozy-client/commit/3207153cc184187b45916fe554ca0c6aded86f72))
* DevTools Math round exec time ([cd79fca](https://github.com/cozy/cozy-client/commit/cd79fca8d6fa0ba2428f2105e92ed18cbb9bb9d3))
* DevTools warning for < 250ms ([cc0525a](https://github.com/cozy/cozy-client/commit/cc0525a4305d3df489cf03eb94fbf744f00cc1a0))
* Use ObjectInspector by default on queryDef and exec_time ([ff96599](https://github.com/cozy/cozy-client/commit/ff965993596fce5e8b4c1a41f2f93fb74f3ca820))





# [22.2.0](https://github.com/cozy/cozy-client/compare/v22.1.0...v22.2.0) (2021-04-19)


### Bug Fixes

* Type ([033d019](https://github.com/cozy/cozy-client/commit/033d0197acc25b327f90de9432983f708b5080f8))


### Features

* Add devtools panel resize ([a07d47e](https://github.com/cozy/cozy-client/commit/a07d47ec684a7046aa445aab5cdf585122339dd8))
* Do not fetch the same query is she is already loading ([9396f32](https://github.com/cozy/cozy-client/commit/9396f3279aafaf27e30853233614913c68d892d3))
* Wrap devtools in a slide component ([60b0ccf](https://github.com/cozy/cozy-client/commit/60b0ccf7255729761937d4847b11a23f2a107578))





# [22.1.0](https://github.com/cozy/cozy-client/compare/v22.0.0...v22.1.0) (2021-03-31)


### Bug Fixes

* Defensive code. Check if there is attributes ([87982ea](https://github.com/cozy/cozy-client/commit/87982eac7dd66ecfea3e15063af7b251d38f98bf))
* Use the correct method to be "type" compatible and add Types ([43c663f](https://github.com/cozy/cozy-client/commit/43c663f8b553ae9609fa191f6f4b7636d48d623f))


### Features

* Autoname getById() query ([dfefe59](https://github.com/cozy/cozy-client/commit/dfefe59e7ac122a5485e3291a7d03106efe04a57))





# [22.0.0](https://github.com/cozy/cozy-client/compare/v21.1.1...v22.0.0) (2021-03-30)


### Bug Fixes

* Devtools improvements ([e200fef](https://github.com/cozy/cozy-client/commit/e200fef7b0764b88ea9e2b189a4ccd0c989fb63b))


### Features

* Ability to use devtools without binding store to cozy-client ([77eeb0b](https://github.com/cozy/cozy-client/commit/77eeb0be713b912c63730966a5a2c80d8569b957))
* Auto create store if options.store !== false ([6afda4e](https://github.com/cozy/cozy-client/commit/6afda4e893309f7dfacee4275760bcef14da5f35))
* Improve Queries panels ([a7aa0eb](https://github.com/cozy/cozy-client/commit/a7aa0ebcb1aae53e3f1b9119c7bd820a1f24256f))
* Put devtool panel above all ([4f22090](https://github.com/cozy/cozy-client/commit/4f22090be0be251f614dc041a87178b60564c6ec))
* Show definition ([3c3e08b](https://github.com/cozy/cozy-client/commit/3c3e08b2018d7869188f45a4339faf3382bb76c7))


### BREAKING CHANGES

* If you want to use your own store with cozy-client,
you need to pass `store: false` when instantiating CozyClient, otherwise
a default redux store will be created for you.

Fix https://github.com/cozy/cozy-client/issues/910





## [21.1.1](https://github.com/cozy/cozy-client/compare/v21.1.0...v21.1.1) (2021-03-29)


### Bug Fixes

* Better peer dependency ([00807bb](https://github.com/cozy/cozy-client/commit/00807bb0c66b01d99ed8af171bdcc184897c18d0))





# [21.1.0](https://github.com/cozy/cozy-client/compare/v21.0.1...v21.1.0) (2021-03-29)


### Bug Fixes

* Remove two colliding dep and devDep warnings ([f03110a](https://github.com/cozy/cozy-client/commit/f03110a66ff2cd238708fcef5022878e73c068f6))


### Features

* Add devtools ([c2e8a74](https://github.com/cozy/cozy-client/commit/c2e8a74edc4216b49f983c4368f4f22b71ed45eb))
* Add flag devtools panel ([fbac244](https://github.com/cozy/cozy-client/commit/fbac244ecc7992c6d3c5f651b7cdee0f314b5e64))
* Add library version devtools panel ([a4a1d33](https://github.com/cozy/cozy-client/commit/a4a1d3360605b2a95444b4e094a1a17fc6d6570f))
* Add query devtools panel ([55a59cc](https://github.com/cozy/cozy-client/commit/55a59cc458d07396a3bc7090ce5a1d48a351d37f))





## [21.0.1](https://github.com/cozy/cozy-client/compare/v21.0.0...v21.0.1) (2021-03-24)

**Note:** Version bump only for package cozy-client





# [21.0.0](https://github.com/cozy/cozy-client/compare/v20.3.0...v21.0.0) (2021-03-23)


### Features

* Remove useClientErrors from default export ([c62d396](https://github.com/cozy/cozy-client/commit/c62d396f944eb21855c6ed9768a61b8e5526c2ce))


### BREAKING CHANGES

* To use useClientErrors, you must import it directly:

```patch
import { useClientErrors } from 'cozy-client'
import useClientErrors from 'cozy-client/dist/hooks/useClientErrors
```





# [20.3.0](https://github.com/cozy/cozy-client/compare/v20.2.1...v20.3.0) (2021-03-23)


### Features

* Use createSelector hook to remove need for ReduxProvider ([98ea8c5](https://github.com/cozy/cozy-client/commit/98ea8c5ccaed3776f204f3a5cba73fe484eb8b60))





## [20.2.1](https://github.com/cozy/cozy-client/compare/v20.2.0...v20.2.1) (2021-03-22)

**Note:** Version bump only for package cozy-client





# [20.2.0](https://github.com/cozy/cozy-client/compare/v20.1.0...v20.2.0) (2021-03-17)


### Features

* Update cozy-device-helper ([75da334](https://github.com/cozy/cozy-client/commit/75da3341aa4f9f0042fd937b7079f81baab72a4d))





# [20.1.0](https://github.com/cozy/cozy-client/compare/v20.0.0...v20.1.0) (2021-03-16)


### Features

* Throw instead of returning undefined in fromDOM ([61e7a03](https://github.com/cozy/cozy-client/commit/61e7a030d13d4bf6a15f75082e602551c3667561))





# [20.0.0](https://github.com/cozy/cozy-client/compare/v19.1.1...v20.0.0) (2021-03-16)


### Bug Fixes

* Correct types ([8d7b6ed](https://github.com/cozy/cozy-client/commit/8d7b6ed5362af4f7706878bda36e207a85a94923))
* Use correct method for getAssociation ([11ddd9e](https://github.com/cozy/cozy-client/commit/11ddd9e5d9e5b6961af2f301a43f33a8064d148b))


### Features

* Add capabilities to client DOM instantiation ([c823db2](https://github.com/cozy/cozy-client/commit/c823db2a04174b5a01c6f1a698c881d4a7471780))
* Add on/removeListener methods to cozy client ([f7afbc5](https://github.com/cozy/cozy-client/commit/f7afbc52148625077a700a36f65d934aa1ab1e7e))
* Better types ([f01577d](https://github.com/cozy/cozy-client/commit/f01577dabb8b931a2a2cc73a781705aa7cf0923a))
* Doctype typing ([f1d05c1](https://github.com/cozy/cozy-client/commit/f1d05c143a42d7bb388a6f4cc2e884aa479dc12b))
* Exchange order of arguments for fromDOM ([58524f4](https://github.com/cozy/cozy-client/commit/58524f413e9f50145dd044fe999f8f2cd1e4e827))
* Improve types ([b57c3ab](https://github.com/cozy/cozy-client/commit/b57c3abe703ad571422a8ab95b803f444cccdb06))
* Improve types for CozyClient.fromEnv ([0445dac](https://github.com/cozy/cozy-client/commit/0445dacd9f198ac3fe223fb8470c889e360a94d0))
* Improve typing ([e95f3f0](https://github.com/cozy/cozy-client/commit/e95f3f02d5261ce94580de34b8e12bb7726aa75f))
* Support for instantiating client fromDOM with {{.CozyData}} ([9e5ec4f](https://github.com/cozy/cozy-client/commit/9e5ec4fb93dc6bf2a524c90dd0b7f9b50bb19d52))
* Type useClient return value ([534d934](https://github.com/cozy/cozy-client/commit/534d9342cfea08e740b0c5760ba262faa0f207c7))


### Reverts

* Revert "feat: Remove getAssociation" ([f823ea3](https://github.com/cozy/cozy-client/commit/f823ea3eced7e8efc0dcafd8712dbc1f8a1c0442))


### BREAKING CHANGES

* fromDOM order of arguments has changed, please use
CozyClient.fromDOM(options) or CozyClient.fromDOM(options, nodeSelector)





## [19.1.1](https://github.com/cozy/cozy-client/compare/v19.1.0...v19.1.1) (2021-03-12)

**Note:** Version bump only for package cozy-client





# [19.1.0](https://github.com/cozy/cozy-client/compare/v19.0.0...v19.1.0) (2021-03-08)

**Note:** Version bump only for package cozy-client





# [19.0.0](https://github.com/cozy/cozy-client/compare/v18.1.3...v19.0.0) (2021-03-05)


### Features

* Do not polyfill at the module level ([b8007ff](https://github.com/cozy/cozy-client/commit/b8007ffddf79b1a1741fab13a90f2d9c753ef7e6))


### BREAKING CHANGES

* Any application relying on this behavior (fetch being
polyfilled by importing cozy-client) should instead polyfill fetch
themself.





## [18.1.3](https://github.com/cozy/cozy-client/compare/v18.1.2...v18.1.3) (2021-03-05)

**Note:** Version bump only for package cozy-client





## [18.1.2](https://github.com/cozy/cozy-client/compare/v18.1.1...v18.1.2) (2021-03-02)


### Bug Fixes

* Do not assign window to win if window is not defined ([d0cd762](https://github.com/cozy/cozy-client/commit/d0cd76231cac91408dde94a18e3a49f49e538d10))





## [18.1.1](https://github.com/cozy/cozy-client/compare/v18.1.0...v18.1.1) (2021-03-02)

**Note:** Version bump only for package cozy-client





# [18.1.0](https://github.com/cozy/cozy-client/compare/v18.0.0...v18.1.0) (2021-03-02)


### Features

* Make interval query consistent on operators ([ac5c52f](https://github.com/cozy/cozy-client/commit/ac5c52fab5f5bb2501b1e845986a0882a461c68c))





# [18.0.0](https://github.com/cozy/cozy-client/compare/v17.6.1...v18.0.0) (2021-03-02)


### Bug Fixes

* Do not import recursively cozy-client ([ced357d](https://github.com/cozy/cozy-client/commit/ced357d0e5f87e4fb45d15e05a7827565bfa0fce)), closes [/github.com/microsoft/TypeScript/issues/14538#issuecomment-638989542](https://github.com//github.com/microsoft/TypeScript/issues/14538/issues/issuecomment-638989542)
* HasManyInPlace used this instead of doc passed in argument ([8b56be3](https://github.com/cozy/cozy-client/commit/8b56be37b3a9952ffb1f611802ca88ec2feaea6e))
* Move outDir out of compiler options ([110cb87](https://github.com/cozy/cozy-client/commit/110cb870dd5515fda9551c30efdc43b93c11d668))
* Need plugin to convert & to | when generating doc through jsdoc ([856acf7](https://github.com/cozy/cozy-client/commit/856acf71c9ebfc430156bb55b0a9d7072b3aff79))
* Remove old definition file ([c740ec4](https://github.com/cozy/cozy-client/commit/c740ec4a13d6d863dcecf8f16602fb5ad7487c50))


### Features

* Accept redux 3 or 4 in dependencies ([eb08719](https://github.com/cozy/cozy-client/commit/eb08719292bdeca1dfe05877ad91127934049716))
* Add types for fsnative ([ab01b12](https://github.com/cozy/cozy-client/commit/ab01b128d2a1674d2ebd4c188a06bd8d249b0895))
* Add types to package.json ([c65c3c5](https://github.com/cozy/cozy-client/commit/c65c3c5e2b4777319382ddf3172cb47de40fb27b))
* Better typing for useQuery return value ([c0f0d05](https://github.com/cozy/cozy-client/commit/c0f0d05e1d24892ccaa01522bb70ef0e612c9ae4))
* Explicitely add types to files that get pushed to npm ([5db845c](https://github.com/cozy/cozy-client/commit/5db845ca583d14e851be16b19a475862bb168683))
* Improve typing for HasOneInPlace:query ([82692b5](https://github.com/cozy/cozy-client/commit/82692b508213970b7e7908ae3ff7d16ca6a7282e))
* Re-add outDir types in CLI ([d40c39a](https://github.com/cozy/cozy-client/commit/d40c39a08ae46fdd2962986b6d6b8035060e88ca))
* Remove getAssociation ([83e3ea2](https://github.com/cozy/cozy-client/commit/83e3ea2bff21cf095e838068568616995288196e))
* Reuse QueryResult type definition ([25e8877](https://github.com/cozy/cozy-client/commit/25e8877922bc49ecb80cb3b858872af4e9a31f5f))
* Revise typedefs for window ([0f771a2](https://github.com/cozy/cozy-client/commit/0f771a279baad4b6d6632b5c5db88f8950306f06))
* Type corrections ([b8188c6](https://github.com/cozy/cozy-client/commit/b8188c6fba93560aa54774d0808f7894e82079d2))


### BREAKING CHANGES

* This removes the getAssociation method from CozyClient and from the Query result
This method did not work so it should not have
a big impact ;)





## [17.6.1](https://github.com/cozy/cozy-client/compare/v17.6.0...v17.6.1) (2021-03-01)

**Note:** Version bump only for package cozy-client





# [17.6.0](https://github.com/cozy/cozy-client/compare/v17.5.0...v17.6.0) (2021-02-26)


### Features

* Send uploaded file size via query-string ([#882](https://github.com/cozy/cozy-client/issues/882)) ([2bb6eb9](https://github.com/cozy/cozy-client/commit/2bb6eb966c1fc0d7031757b5702ed17fa0d0e39c))





# [17.5.0](https://github.com/cozy/cozy-client/compare/v17.4.0...v17.5.0) (2021-02-26)


### Features

* Add openFileWith in fsnative ([8196628](https://github.com/cozy/cozy-client/commit/819662801421a7fff185895d5ca46497baf3d35d))





# [17.4.0](https://github.com/cozy/cozy-client/compare/v17.3.0...v17.4.0) (2021-02-24)


### Features

* Add TimeSerie helpers ([3b1a030](https://github.com/cozy/cozy-client/commit/3b1a030811e8f7a39f3399bd100c2d02f3665395))





# [17.3.0](https://github.com/cozy/cozy-client/compare/v17.2.0...v17.3.0) (2021-02-23)

**Note:** Version bump only for package cozy-client





# [17.2.0](https://github.com/cozy/cozy-client/compare/v17.1.1...v17.2.0) (2021-02-23)


### Features

* Add method to deal with cordova ([afd28c4](https://github.com/cozy/cozy-client/commit/afd28c4c2adfe1719c8aa6ca97b6a81cd5dc0fe8))





## [17.1.1](https://github.com/cozy/cozy-client/compare/v17.1.0...v17.1.1) (2021-02-16)

**Note:** Version bump only for package cozy-client





# [17.1.0](https://github.com/cozy/cozy-client/compare/v17.0.3...v17.1.0) (2021-02-15)

**Note:** Version bump only for package cozy-client





## [17.0.3](https://github.com/cozy/cozy-client/compare/v17.0.2...v17.0.3) (2021-02-12)


### Bug Fixes

* HasOneInPlace correctly gets its data ([55668a9](https://github.com/cozy/cozy-client/commit/55668a97ec8455e2d4a1588778675f5f18226e74))





## [17.0.2](https://github.com/cozy/cozy-client/compare/v17.0.1...v17.0.2) (2021-02-12)

**Note:** Version bump only for package cozy-client





## [17.0.1](https://github.com/cozy/cozy-client/compare/v17.0.0...v17.0.1) (2021-02-11)

**Note:** Version bump only for package cozy-client





# [17.0.0](https://github.com/cozy/cozy-client/compare/v16.19.0...v17.0.0) (2021-02-10)


### Code Refactoring

* Remove deprecated connect ([4b41dad](https://github.com/cozy/cozy-client/commit/4b41dad2d52204cb5903df6a67d2fe4ee501c5b3))


### Features

* Throw if realtime plugin not registered inside client ([2a85818](https://github.com/cozy/cozy-client/commit/2a858188fff5905940c60bcda474fbbf32a8fbdb))


### BREAKING CHANGES

* connect has been removed, please use Query,
queryConnect or useQuery to bind data to components.





# [16.19.0](https://github.com/cozy/cozy-client/compare/v16.18.0...v16.19.0) (2021-02-08)

**Note:** Version bump only for package cozy-client





# [16.18.0](https://github.com/cozy/cozy-client/compare/v16.17.0...v16.18.0) (2021-02-08)


### Features

* Add fetchQueryAndGetFromState ([f06b5a8](https://github.com/cozy/cozy-client/commit/f06b5a8ff1fcc185bfefb9a06b7b2c5fcbdef890))





# [16.17.0](https://github.com/cozy/cozy-client/compare/v16.16.0...v16.17.0) (2021-01-27)


### Features

* Add endpoint and method to transform result to Registry ([f206b3b](https://github.com/cozy/cozy-client/commit/f206b3b258949e778a2e24bbbd96d5d286da58ec))
* Add query as argument to collection.get() ([dbab610](https://github.com/cozy/cozy-client/commit/dbab61064dc869460a7bc2eabee3085e93283424))





# [16.16.0](https://github.com/cozy/cozy-client/compare/v16.15.1...v16.16.0) (2021-01-27)


### Features

* Only return booleans in existsById ([b80c86a](https://github.com/cozy/cozy-client/commit/b80c86a29042a0078d773019d6e81e64bba66e9c))
* Use Q instead of client.get / client.find ([eb5cf84](https://github.com/cozy/cozy-client/commit/eb5cf849592f45ccfad92383cfc23b2f5e4f3cb6))
* Use Q instead of client.get / client.find ([f6581d6](https://github.com/cozy/cozy-client/commit/f6581d6f27c05e3a4351b1ce5dc52175141eb5f2))





## [16.15.1](https://github.com/cozy/cozy-client/compare/v16.15.0...v16.15.1) (2021-01-26)

**Note:** Version bump only for package cozy-client





# [16.15.0](https://github.com/cozy/cozy-client/compare/v16.14.0...v16.15.0) (2021-01-26)


### Features

* Use Q instead of client.get ([623f02c](https://github.com/cozy/cozy-client/commit/623f02cd697e7b26d6707bd085be87fc46f99605))





# [16.14.0](https://github.com/cozy/cozy-client/compare/v16.13.1...v16.14.0) (2021-01-22)

**Note:** Version bump only for package cozy-client





## [16.13.1](https://github.com/cozy/cozy-client/compare/v16.13.0...v16.13.1) (2021-01-19)


### Bug Fixes

* Fetch qualifications by rules ([72ed55d](https://github.com/cozy/cozy-client/commit/72ed55da9bbb389b1286dd848be8f790ab4a489c))





# [16.13.0](https://github.com/cozy/cozy-client/compare/v16.12.1...v16.13.0) (2021-01-19)


### Features

* Add helper to get files by qualification rules ([017b078](https://github.com/cozy/cozy-client/commit/017b07826286df602a5159cd366e8df5b6a42520))





## [16.12.1](https://github.com/cozy/cozy-client/compare/v16.12.0...v16.12.1) (2021-01-18)


### Bug Fixes

* getLastsuccess -> getLastSuccess ([4a60bb2](https://github.com/cozy/cozy-client/commit/4a60bb252a9c04543194e8697b8afeb96a0a62b7))





# [16.12.0](https://github.com/cozy/cozy-client/compare/v16.11.0...v16.12.0) (2021-01-13)


### Features

* Add log when execution_stats is set ([5959db4](https://github.com/cozy/cozy-client/commit/5959db4afea134f7354305c2324a712388c2f391))





# [16.11.0](https://github.com/cozy/cozy-client/compare/v16.10.2...v16.11.0) (2021-01-11)

**Note:** Version bump only for package cozy-client





## [16.10.2](https://github.com/cozy/cozy-client/compare/v16.10.1...v16.10.2) (2020-12-18)

**Note:** Version bump only for package cozy-client





## [16.10.1](https://github.com/cozy/cozy-client/compare/v16.10.0...v16.10.1) (2020-12-18)


### Bug Fixes

* Add partial index selectors to sift ([29d8b39](https://github.com/cozy/cozy-client/commit/29d8b39fe2898f4e495554df0050cadc4ab64679))





# [16.10.0](https://github.com/cozy/cozy-client/compare/v16.9.0...v16.10.0) (2020-12-10)


### Features

* Add receipt qualification ([a838a39](https://github.com/cozy/cozy-client/commit/a838a39687ed813b938406e2d5a7be5cc7bfd4f2))





# [16.9.0](https://github.com/cozy/cozy-client/compare/v16.8.0...v16.9.0) (2020-12-07)


### Features

* Allow registry collection fetch to have a limit parameter ([7071d48](https://github.com/cozy/cozy-client/commit/7071d48077f8627c36e4de999792ab3f1de1480a)), closes [/github.com/cozy/cozy-store/pull/705#issuecomment-739244759](https://github.com//github.com/cozy/cozy-store/pull/705/issues/issuecomment-739244759)





# [16.8.0](https://github.com/cozy/cozy-client/compare/v16.7.0...v16.8.0) (2020-11-26)


### Bug Fixes

* Split imports ([f2175aa](https://github.com/cozy/cozy-client/commit/f2175aa90fd6a1b00b1aefd0d6af9d8eb80249b1))


### Features

* Add partial index example ([18a3bbb](https://github.com/cozy/cozy-client/commit/18a3bbb56d2fe826b1e51737ce150e6352284a14))
* Add partial index in QueryDefinition ([2a3f4c5](https://github.com/cozy/cozy-client/commit/2a3f4c55d7fc5f427ed5a9213579977ee0e73bd2))
* Support partial index in DocumentCollection ([cb3a7f7](https://github.com/cozy/cozy-client/commit/cb3a7f7feaabd0c1d72fe311c738ba8d84a37d2e))
* Use createClientInteractive for examples ([7f4257e](https://github.com/cozy/cozy-client/commit/7f4257e0e1b172d1a072c29b99e0592409c0007c))





# [16.7.0](https://github.com/cozy/cozy-client/compare/v16.6.0...v16.7.0) (2020-11-25)


### Features

* Add isSharingShortcut and isSharingShortcutNew ([d9bbaec](https://github.com/cozy/cozy-client/commit/d9bbaec51bbd5d9a738278fa79523f676c0d529b))





# [16.6.0](https://github.com/cozy/cozy-client/compare/v16.5.0...v16.6.0) (2020-11-24)


### Features

* Use node-fetch in place of isomorphic-fetch ([87f9e4e](https://github.com/cozy/cozy-client/commit/87f9e4e2f23f86f9fd9f81f96070f4eede2e01ce)), closes [konnectors/libs#724](https://github.com/konnectors/libs/issues/724)





# [16.5.0](https://github.com/cozy/cozy-client/compare/v16.4.1...v16.5.0) (2020-11-24)


### Features

* Deprecate query helpers on the client ([aaa7f08](https://github.com/cozy/cozy-client/commit/aaa7f08))





## [16.4.1](https://github.com/cozy/cozy-client/compare/v16.4.0...v16.4.1) (2020-11-23)


### Bug Fixes

* Do not log in tests ([9cb6d2b](https://github.com/cozy/cozy-client/commit/9cb6d2b))





# [16.4.0](https://github.com/cozy/cozy-client/compare/v16.3.0...v16.4.0) (2020-11-16)


### Features

* Add isShortcutCreated to permission's model ([cfee955](https://github.com/cozy/cozy-client/commit/cfee955))
* Add others qualifications ([4b3b8b1](https://github.com/cozy/cozy-client/commit/4b3b8b1))





# [16.3.0](https://github.com/cozy/cozy-client/compare/v16.2.0...v16.3.0) (2020-11-16)


### Bug Fixes

* Update docs & delete setHasManyItems ([86af0f0](https://github.com/cozy/cozy-client/commit/86af0f0))


### Features

* Add setHasManyItems & removeHasManyItem helpers ([209c4bb](https://github.com/cozy/cozy-client/commit/209c4bb))





# [16.2.0](https://github.com/cozy/cozy-client/compare/v16.1.2...v16.2.0) (2020-11-09)


### Features

* Add telecom invoice qualification ([d26df60](https://github.com/cozy/cozy-client/commit/d26df60))





## [16.1.2](https://github.com/cozy/cozy-client/compare/v16.1.1...v16.1.2) (2020-11-09)


### Bug Fixes

* Lint ([c000331](https://github.com/cozy/cozy-client/commit/c000331))
* Use correct var ([38c6599](https://github.com/cozy/cozy-client/commit/38c6599))





## [16.1.1](https://github.com/cozy/cozy-client/compare/v16.1.0...v16.1.1) (2020-11-05)


### Bug Fixes

* **deps:** update dependency isomorphic-fetch to v3 ([0575af6](https://github.com/cozy/cozy-client/commit/0575af6))





# [16.1.0](https://github.com/cozy/cozy-client/compare/v16.0.0...v16.1.0) (2020-11-04)


### Features

* Add qualification model ([2320e60](https://github.com/cozy/cozy-client/commit/2320e60))
* Add qualifications helpers ([573f625](https://github.com/cozy/cozy-client/commit/573f625))
* Export document model ([ffc2894](https://github.com/cozy/cozy-client/commit/ffc2894))
* File helper to save qualification ([7204d60](https://github.com/cozy/cozy-client/commit/7204d60))





# [16.0.0](https://github.com/cozy/cozy-client/compare/v15.6.0...v16.0.0) (2020-10-26)

**Note:** Version bump only for package cozy-client





# [15.6.0](https://github.com/cozy/cozy-client/compare/v15.5.0...v15.6.0) (2020-10-23)

**Note:** Version bump only for package cozy-client





# [15.5.0](https://github.com/cozy/cozy-client/compare/v15.4.2...v15.5.0) (2020-10-22)

**Note:** Version bump only for package cozy-client





## [15.4.2](https://github.com/cozy/cozy-client/compare/v15.4.1...v15.4.2) (2020-10-19)


### Bug Fixes

* Use cozy's fork of minilog ([6601431](https://github.com/cozy/cozy-client/commit/6601431))





## [15.4.1](https://github.com/cozy/cozy-client/compare/v15.4.0...v15.4.1) (2020-10-19)


### Bug Fixes

* Use console.warn for depreciation ([ae05f44](https://github.com/cozy/cozy-client/commit/ae05f44))





# [15.4.0](https://github.com/cozy/cozy-client/compare/v15.3.1...v15.4.0) (2020-10-16)


### Features

* Add Contact's makeFullname, makeDisplayName, makeIndexBy ([a3180c8](https://github.com/cozy/cozy-client/commit/a3180c8))





## [15.3.1](https://github.com/cozy/cozy-client/compare/v15.3.0...v15.3.1) (2020-10-06)


### Bug Fixes

* HasMany helpers ([1786148](https://github.com/cozy/cozy-client/commit/1786148))





# [15.3.0](https://github.com/cozy/cozy-client/compare/v15.2.0...v15.3.0) (2020-10-06)


### Features

* Create fails for references without relationship support ([03e46d1](https://github.com/cozy/cozy-client/commit/03e46d1))





# [15.2.0](https://github.com/cozy/cozy-client/compare/v15.1.1...v15.2.0) (2020-10-05)

**Note:** Version bump only for package cozy-client





## [15.1.1](https://github.com/cozy/cozy-client/compare/v15.1.0...v15.1.1) (2020-10-02)


### Bug Fixes

* Do not show singleDocData warning for non single doc queries ([8dbc52b](https://github.com/cozy/cozy-client/commit/8dbc52b))





# [15.1.0](https://github.com/cozy/cozy-client/compare/v15.0.3...v15.1.0) (2020-09-30)


### Bug Fixes

* Handle single dom dataset ([e9b1f54](https://github.com/cozy/cozy-client/commit/e9b1f54))


### Features

* Add fromDOM method ([1740ee7](https://github.com/cozy/cozy-client/commit/1740ee7))





# [15.0.0](https://github.com/cozy/cozy-client/compare/v14.7.0...v15.0.0) (2020-09-25)


### Features

* Check if the sort is correct ([5f1f597](https://github.com/cozy/cozy-client/commit/5f1f597))





# [14.6.0](https://github.com/cozy/cozy-client/compare/v14.5.0...v14.6.0) (2020-09-18)


### Bug Fixes

* Empty contact indexes are objects ([351129a](https://github.com/cozy/cozy-client/commit/351129a))


### Features

* Client-side query sort handles nested attributes ([ea8c06b](https://github.com/cozy/cozy-client/commit/ea8c06b))





# [14.5.0](https://github.com/cozy/cozy-client/compare/v14.4.0...v14.5.0) (2020-09-16)


### Bug Fixes

* Typo preventing to use object directly as query in useQuery ([f73e7f1](https://github.com/cozy/cozy-client/commit/f73e7f1))


### Features

* Ability to deactivate hydration ([0378e4b](https://github.com/cozy/cozy-client/commit/0378e4b))
* Use logger for warn / info messages ([adbec45](https://github.com/cozy/cozy-client/commit/adbec45))
* Use query can return single doc data for single doc queries ([60a1ec5](https://github.com/cozy/cozy-client/commit/60a1ec5))





# [14.4.0](https://github.com/cozy/cozy-client/compare/v14.3.0...v14.4.0) (2020-09-11)


### Features

* Add account model helpers ([bc68346](https://github.com/cozy/cozy-client/commit/bc68346))
* Add static helpers to deal with relationship data ([cae291f](https://github.com/cozy/cozy-client/commit/cae291f))
* Throw if getById is called without id ([bc00255](https://github.com/cozy/cozy-client/commit/bc00255))





# [14.3.0](https://github.com/cozy/cozy-client/compare/v14.2.0...v14.3.0) (2020-09-10)


### Features

* Add model functions to deal with sharing shortcuts ([4f02370](https://github.com/cozy/cozy-client/commit/4f02370))





# [14.2.0](https://github.com/cozy/cozy-client/compare/v14.1.3...v14.2.0) (2020-09-07)


### Bug Fixes

* Do not set loading on queryState for noninitial initQuery ([293cd1c](https://github.com/cozy/cozy-client/commit/293cd1c))


### Features

* Do not change references unnecessarily ([e8c2c81](https://github.com/cozy/cozy-client/commit/e8c2c81))





## [14.1.3](https://github.com/cozy/cozy-client/compare/v14.1.2...v14.1.3) (2020-09-04)


### Bug Fixes

* Remove deleted document from store ([6f9244d](https://github.com/cozy/cozy-client/commit/6f9244d))





## [14.1.2](https://github.com/cozy/cozy-client/compare/v14.1.1...v14.1.2) (2020-09-04)

**Note:** Version bump only for package cozy-client





## [14.1.1](https://github.com/cozy/cozy-client/compare/v14.1.0...v14.1.1) (2020-09-03)


### Bug Fixes

* Do not reassign to function parameters ([feb6e8e](https://github.com/cozy/cozy-client/commit/feb6e8e))
* Query can be passed a simple object ([cc6e1a6](https://github.com/cozy/cozy-client/commit/cc6e1a6))
* Query with props based query definitions would use stale def ([6ef9c11](https://github.com/cozy/cozy-client/commit/6ef9c11))





# [14.1.0](https://github.com/cozy/cozy-client/compare/v14.0.0...v14.1.0) (2020-09-03)

**Note:** Version bump only for package cozy-client





# [14.0.0](https://github.com/cozy/cozy-client/compare/v13.21.0...v14.0.0) (2020-08-28)

**Note:** Version bump only for package cozy-client





# [13.21.0](https://github.com/cozy/cozy-client/compare/v13.20.3...v13.21.0) (2020-08-20)


### Features

* Throw if scope is not passed ([78b72e4](https://github.com/cozy/cozy-client/commit/78b72e4))





## [13.20.3](https://github.com/cozy/cozy-client/compare/v13.20.2...v13.20.3) (2020-08-20)


### Bug Fixes

* GetInitials now deals with empty name and cozy url ([73f92a0](https://github.com/cozy/cozy-client/commit/73f92a0))
* Method to get contact index now capitalize the index ([7eb266a](https://github.com/cozy/cozy-client/commit/7eb266a))
* Method to get contact index return now an object when empty ([83c1b5c](https://github.com/cozy/cozy-client/commit/83c1b5c))





## [13.20.2](https://github.com/cozy/cozy-client/compare/v13.20.1...v13.20.2) (2020-08-19)

**Note:** Version bump only for package cozy-client





## [13.20.1](https://github.com/cozy/cozy-client/compare/v13.20.0...v13.20.1) (2020-08-13)


### Bug Fixes

* Get cozyDomain instead of primaryCozy for contact displayName ([b96b817](https://github.com/cozy/cozy-client/commit/b96b817))





# [13.20.0](https://github.com/cozy/cozy-client/compare/v13.19.0...v13.20.0) (2020-08-07)


### Features

* Add getPrimaryCozyDomain in contact models ([156302d](https://github.com/cozy/cozy-client/commit/156302d))





# [13.19.0](https://github.com/cozy/cozy-client/compare/v13.18.2...v13.19.0) (2020-08-05)


### Bug Fixes

* Rename contacts to contact (singular) ([26b5546](https://github.com/cozy/cozy-client/commit/26b5546))


### Features

* Add contacts model ([10ade3c](https://github.com/cozy/cozy-client/commit/10ade3c))





## [13.18.1](https://github.com/cozy/cozy-client/compare/v13.18.0...v13.18.1) (2020-08-03)

**Note:** Version bump only for package cozy-client





# [13.18.0](https://github.com/cozy/cozy-client/compare/v13.17.0...v13.18.0) (2020-07-27)


### Features

* RealTimeQueries component ([0e818d6](https://github.com/cozy/cozy-client/commit/0e818d6))





# [13.17.0](https://github.com/cozy/cozy-client/compare/v13.16.1...v13.17.0) (2020-07-27)


### Features

* Add hasBeenUpdatedByApp helper ([7c17fc8](https://github.com/cozy/cozy-client/commit/7c17fc8))





## [13.16.1](https://github.com/cozy/cozy-client/compare/v13.16.0...v13.16.1) (2020-07-24)


### Bug Fixes

* Reset other offsets in queries ([36cbade](https://github.com/cozy/cozy-client/commit/36cbade))





# [13.16.0](https://github.com/cozy/cozy-client/compare/v13.15.1...v13.16.0) (2020-07-23)

**Note:** Version bump only for package cozy-client





## [13.15.1](https://github.com/cozy/cozy-client/compare/v13.15.0...v13.15.1) (2020-07-17)

**Note:** Version bump only for package cozy-client





# [13.15.0](https://github.com/cozy/cozy-client/compare/v13.14.2...v13.15.0) (2020-07-15)


### Features

* Add hasActionableError ([ef489c6](https://github.com/cozy/cozy-client/commit/ef489c6))
* Add method to get createdByApp ([313c2b0](https://github.com/cozy/cozy-client/commit/313c2b0))





## [13.14.2](https://github.com/cozy/cozy-client/compare/v13.14.1...v13.14.2) (2020-07-15)


### Bug Fixes

* Normalize _type but not type ([5d75e1a](https://github.com/cozy/cozy-client/commit/5d75e1a))





## [13.14.1](https://github.com/cozy/cozy-client/compare/v13.14.0...v13.14.1) (2020-07-13)


### Bug Fixes

* Splitfile name accepts empty names ([19af5b2](https://github.com/cozy/cozy-client/commit/19af5b2))





# [13.13.0](https://github.com/cozy/cozy-client/compare/v13.12.1...v13.13.0) (2020-07-07)


### Bug Fixes

* Can't combine skip, cursor and bookmark in the DSL ([44e1855](https://github.com/cozy/cozy-client/commit/44e1855))
* Use query support fetchMore without bookmark + fetchMore return ([383cb48](https://github.com/cozy/cozy-client/commit/383cb48))





## [13.12.1](https://github.com/cozy/cozy-client/compare/v13.12.0...v13.12.1) (2020-06-30)

**Note:** Version bump only for package cozy-client





# [13.12.0](https://github.com/cozy/cozy-client/compare/v13.11.2...v13.12.0) (2020-06-30)


### Features

* Expose FileCollection.update() via CozyClient.save() ([118f53e](https://github.com/cozy/cozy-client/commit/118f53e))





## [13.11.2](https://github.com/cozy/cozy-client/compare/v13.11.1...v13.11.2) (2020-06-26)


### Bug Fixes

* Support multiple ids in store query updates ([9c33207](https://github.com/cozy/cozy-client/commit/9c33207))





## [13.11.1](https://github.com/cozy/cozy-client/compare/v13.11.0...v13.11.1) (2020-06-26)


### Bug Fixes

* Client-side query sort is case insensitive ([f97400b](https://github.com/cozy/cozy-client/commit/f97400b))





# [13.11.0](https://github.com/cozy/cozy-client/compare/v13.10.0...v13.11.0) (2020-06-26)

**Note:** Version bump only for package cozy-client





# [13.9.0](https://github.com/cozy/cozy-client/compare/v13.8.5...v13.9.0) (2020-06-23)


### Features

* CozyClient can be instantiated without any options ([908ae86](https://github.com/cozy/cozy-client/commit/908ae86))
* Keep query results sorted if a sort has been used on the query ([1ac9386](https://github.com/cozy/cozy-client/commit/1ac9386))
* Support file/folder creation through client.create ([149231a](https://github.com/cozy/cozy-client/commit/149231a))





## [13.8.5](https://github.com/cozy/cozy-client/compare/v13.8.4...v13.8.5) (2020-06-15)


### Bug Fixes

* Reset state on logout ([11d77ed](https://github.com/cozy/cozy-client/commit/11d77ed))





## [13.8.4](https://github.com/cozy/cozy-client/compare/v13.8.3...v13.8.4) (2020-06-10)


### Bug Fixes

* Need to return the source from a codemod ([10d09cf](https://github.com/cozy/cozy-client/commit/10d09cf))
* Use correct package for codemods ([181d036](https://github.com/cozy/cozy-client/commit/181d036))





## [13.8.3](https://github.com/cozy/cozy-client/compare/v13.8.2...v13.8.3) (2020-06-03)


### Bug Fixes

* Correctly call callback for tokenRefresh passed in options ([c472fb0](https://github.com/cozy/cozy-client/commit/c472fb0))





## [13.8.2](https://github.com/cozy/cozy-client/compare/v13.8.1...v13.8.2) (2020-05-27)

**Note:** Version bump only for package cozy-client





## [13.8.1](https://github.com/cozy/cozy-client/compare/v13.8.0...v13.8.1) (2020-05-18)


### Bug Fixes

* Do not crash if relationship is set to null ([2ec65f8](https://github.com/cozy/cozy-client/commit/2ec65f8))
* Do not dehydrate unexistent relationship as null ([2c5eeca](https://github.com/cozy/cozy-client/commit/2c5eeca))
* No failure if bad Relationship::query() throws ([e1bf884](https://github.com/cozy/cozy-client/commit/e1bf884))





# [13.8.0](https://github.com/cozy/cozy-client/compare/v13.7.0...v13.8.0) (2020-05-15)


### Features

* Expose permission.fetchOwn ([f134f62](https://github.com/cozy/cozy-client/commit/f134f62))





# [13.7.0](https://github.com/cozy/cozy-client/compare/v13.6.0...v13.7.0) (2020-05-14)


### Features

* useQueries and queryConnectFlat ([9cd7735](https://github.com/cozy/cozy-client/commit/9cd7735))





# [13.6.0](https://github.com/cozy/cozy-client/compare/v13.5.3...v13.6.0) (2020-05-12)


### Features

* Codemod to transform withClient into useClient ([23753fc](https://github.com/cozy/cozy-client/commit/23753fc))





## [13.5.3](https://github.com/cozy/cozy-client/compare/v13.5.2...v13.5.3) (2020-05-06)

**Note:** Version bump only for package cozy-client





## [13.5.2](https://github.com/cozy/cozy-client/compare/v13.5.1...v13.5.2) (2020-04-24)

**Note:** Version bump only for package cozy-client





## [13.5.1](https://github.com/cozy/cozy-client/compare/v13.5.0...v13.5.1) (2020-04-24)

**Note:** Version bump only for package cozy-client





# [13.5.0](https://github.com/cozy/cozy-client/compare/v13.4.2...v13.5.0) (2020-04-22)


### Features

* Add useFetchJSON ([55cfdc6](https://github.com/cozy/cozy-client/commit/55cfdc6))





## [13.4.2](https://github.com/cozy/cozy-client/compare/v13.4.1...v13.4.2) (2020-04-09)

**Note:** Version bump only for package cozy-client





## [13.4.1](https://github.com/cozy/cozy-client/compare/v13.4.0...v13.4.1) (2020-04-09)


### Bug Fixes

* Add minilog dependency ([b82edb4](https://github.com/cozy/cozy-client/commit/b82edb4))





# [13.4.0](https://github.com/cozy/cozy-client/compare/v13.3.0...v13.4.0) (2020-04-09)


### Features

* Add splitFilename ([f7986ee](https://github.com/cozy/cozy-client/commit/f7986ee))





# [13.3.0](https://github.com/cozy/cozy-client/compare/v13.2.1...v13.3.0) (2020-04-03)


### Features

* Handle client errors ([6d53aca](https://github.com/cozy/cozy-client/commit/6d53aca))





## [13.2.1](https://github.com/cozy/cozy-client/compare/v13.2.0...v13.2.1) (2020-03-25)

**Note:** Version bump only for package cozy-client





# [13.2.0](https://github.com/cozy/cozy-client/compare/v13.1.2...v13.2.0) (2020-03-23)

**Note:** Version bump only for package cozy-client





## [13.1.2](https://github.com/cozy/cozy-client/compare/v13.1.1...v13.1.2) (2020-03-19)


### Bug Fixes

* Typo in function name ([5e2cefa](https://github.com/cozy/cozy-client/commit/5e2cefa))





## [13.1.1](https://github.com/cozy/cozy-client/compare/v13.1.0...v13.1.1) (2020-03-19)


### Bug Fixes

* Use bookmark with fetchMore ([5ace9b8](https://github.com/cozy/cozy-client/commit/5ace9b8))





# [13.1.0](https://github.com/cozy/cozy-client/compare/v13.0.0...v13.1.0) (2020-03-17)

**Note:** Version bump only for package cozy-client





# [13.0.0](https://github.com/cozy/cozy-client/compare/v12.6.0...v13.0.0) (2020-03-16)


### Bug Fixes

* Typo ([a2e7c63](https://github.com/cozy/cozy-client/commit/a2e7c63))


### BREAKING CHANGES

* Renamed shortcurtImg to shotcutImg in useFetchShortcut





# [12.6.0](https://github.com/cozy/cozy-client/compare/v12.5.1...v12.6.0) (2020-03-16)

**Note:** Version bump only for package cozy-client





## [12.5.1](https://github.com/cozy/cozy-client/compare/v12.5.0...v12.5.1) (2020-03-13)


### Bug Fixes

* Make query data duplicate free ([a06dddc](https://github.com/cozy/cozy-client/commit/a06dddc))





# [12.5.0](https://github.com/cozy/cozy-client/compare/v12.4.0...v12.5.0) (2020-03-06)


### Bug Fixes

* Add relative dep on cozy-client ([5fd9cd6](https://github.com/cozy/cozy-client/commit/5fd9cd6))
* Take review into account ([7a1a2e8](https://github.com/cozy/cozy-client/commit/7a1a2e8))
* Tests ([9515444](https://github.com/cozy/cozy-client/commit/9515444))


### Features

* Better UI/token prompt ([b022232](https://github.com/cozy/cozy-client/commit/b022232))
* Implement correctly getDerivedState ([e26588c](https://github.com/cozy/cozy-client/commit/e26588c))
* Make options.as mandatory ([38fb7fb](https://github.com/cozy/cozy-client/commit/38fb7fb))
* Show nb of transactions shown ([6b709c2](https://github.com/cozy/cozy-client/commit/6b709c2))
* Store bookmark inside query ([1bf9f36](https://github.com/cozy/cozy-client/commit/1bf9f36))
* Use query hook ([96cad34](https://github.com/cozy/cozy-client/commit/96cad34))
* Use random name for query when missing ([46c68f0](https://github.com/cozy/cozy-client/commit/46c68f0))





# [12.4.0](https://github.com/cozy/cozy-client/compare/v12.3.0...v12.4.0) (2020-03-06)


### Bug Fixes

* Removed timeout ([8fda21d](https://github.com/cozy/cozy-client/commit/8fda21d))
* Typo in the method name ([a77427c](https://github.com/cozy/cozy-client/commit/a77427c))


### Features

* Add useFetchShortcut hooks ([5bebdcf](https://github.com/cozy/cozy-client/commit/5bebdcf))





# [12.3.0](https://github.com/cozy/cozy-client/compare/v12.2.0...v12.3.0) (2020-03-03)


### Features

* Added folder model ([ba14aee](https://github.com/cozy/cozy-client/commit/ba14aee))





# [12.2.0](https://github.com/cozy/cozy-client/compare/v12.1.1...v12.2.0) (2020-03-03)


### Features

* Hooks for useClient ([6fcf963](https://github.com/cozy/cozy-client/commit/6fcf963))
* Provider and withClient use new context API ([df1d12b](https://github.com/cozy/cozy-client/commit/df1d12b))





## [12.1.1](https://github.com/cozy/cozy-client/compare/v12.1.0...v12.1.1) (2020-02-28)


### Bug Fixes

* Allow custom token file path in createClientInteractive ([ff8a76a](https://github.com/cozy/cozy-client/commit/ff8a76a))





# [12.1.0](https://github.com/cozy/cozy-client/compare/v12.0.0...v12.1.0) (2020-02-28)


### Bug Fixes

* Remove open handles after resolve/reject ([b145056](https://github.com/cozy/cozy-client/commit/b145056))


### Features

* Add onListen callback + option to disable authentication page open ([7c6f787](https://github.com/cozy/cozy-client/commit/7c6f787))
* Add test CLI for createClientInteractive ([91648e4](https://github.com/cozy/cozy-client/commit/91648e4))





# [12.0.0](https://github.com/cozy/cozy-client/compare/v11.6.0...v12.0.0) (2020-02-26)


### Features

* Snapshot the client in a simplified form ([da3472e](https://github.com/cozy/cozy-client/commit/da3472e))


### BREAKING CHANGES

* Will break existing snapshots





# [11.6.0](https://github.com/cozy/cozy-client/compare/v11.5.0...v11.6.0) (2020-02-26)


### Features

* Add isShortcut method ([b9b919c](https://github.com/cozy/cozy-client/commit/b9b919c))





# [11.5.0](https://github.com/cozy/cozy-client/compare/v11.4.1...v11.5.0) (2020-02-26)


### Features

* Add useCapabilities hook ([e8bd041](https://github.com/cozy/cozy-client/commit/e8bd041))





## [11.4.1](https://github.com/cozy/cozy-client/compare/v11.4.0...v11.4.1) (2020-02-25)


### Bug Fixes

* Don't import from cozy-client. Import from path ([93978ff](https://github.com/cozy/cozy-client/commit/93978ff))





# [11.4.0](https://github.com/cozy/cozy-client/compare/v11.3.0...v11.4.0) (2020-02-24)


### Bug Fixes

* Don't expose React from node entry point ([e4bc988](https://github.com/cozy/cozy-client/commit/e4bc988))


### Features

* Add useAppLinkWithStoreFallback hook ([7c4dcd2](https://github.com/cozy/cozy-client/commit/7c4dcd2))





# [11.3.0](https://github.com/cozy/cozy-client/compare/v11.2.1...v11.3.0) (2020-02-24)


### Features

* Support single cozy dataset in DOM ([7a6efbd](https://github.com/cozy/cozy-client/commit/7a6efbd))





## [11.2.1](https://github.com/cozy/cozy-client/compare/v11.2.0...v11.2.1) (2020-02-21)


### Bug Fixes

* Invert private / public params for a note url ([adf9fac](https://github.com/cozy/cozy-client/commit/adf9fac))





# [11.2.0](https://github.com/cozy/cozy-client/compare/v11.1.1...v11.2.0) (2020-02-21)


### Features

* Add a few methods to Note Model ([40eb5e0](https://github.com/cozy/cozy-client/commit/40eb5e0))
* Add create to NotesCollection ([77ab427](https://github.com/cozy/cozy-client/commit/77ab427))





## [11.1.1](https://github.com/cozy/cozy-client/compare/v11.1.0...v11.1.1) (2020-02-17)

**Note:** Version bump only for package cozy-client





# [11.1.0](https://github.com/cozy/cozy-client/compare/v11.0.1...v11.1.0) (2020-02-14)

**Note:** Version bump only for package cozy-client





## [11.0.1](https://github.com/cozy/cozy-client/compare/v11.0.0...v11.0.1) (2020-02-13)

**Note:** Version bump only for package cozy-client





# [11.0.0](https://github.com/cozy/cozy-client/compare/v10.9.0...v11.0.0) (2020-02-12)


### Features

* Add paginated find query in perf example ([6e36c52](https://github.com/cozy/cozy-client/commit/6e36c52))
* Add support for bookmark pagination on _find queries ([070f626](https://github.com/cozy/cozy-client/commit/070f626))


### BREAKING CHANGES

* the `meta: {count}` in the response no longer exist.
It was used to know how many docs were returned so far and was
computed with the skip value.
If the client needs this, it can be overcomed by keeping track of the
returned docs for each query and perform a `.length` on it.





# [10.9.0](https://github.com/cozy/cozy-client/compare/v10.8.1...v10.9.0) (2020-02-11)


### Features

* Deprecate withMutations ([fd36af3](https://github.com/cozy/cozy-client/commit/fd36af3))





## [10.8.1](https://github.com/cozy/cozy-client/compare/v10.8.0...v10.8.1) (2020-02-07)


### Bug Fixes

* URL is already encoded, re-encoding it leads to a stack error ([8b39d80](https://github.com/cozy/cozy-client/commit/8b39d80))





# [10.8.0](https://github.com/cozy/cozy-client/compare/v10.7.1...v10.8.0) (2020-02-07)


### Features

* Checks if a doc has read-only permissions ([#636](https://github.com/cozy/cozy-client/issues/636)) ([a69184c](https://github.com/cozy/cozy-client/commit/a69184c))





## [10.7.1](https://github.com/cozy/cozy-client/compare/v10.7.0...v10.7.1) (2020-02-05)


### Bug Fixes

* Use open package instead of old opn ([636c969](https://github.com/cozy/cozy-client/commit/636c969))





# [10.7.0](https://github.com/cozy/cozy-client/compare/v10.6.0...v10.7.0) (2020-01-31)

**Note:** Version bump only for package cozy-client





# [10.6.0](https://github.com/cozy/cozy-client/compare/v10.5.0...v10.6.0) (2020-01-31)


### Features

* Add generateWebLink helper ([#628](https://github.com/cozy/cozy-client/issues/628)) ([4d0966b](https://github.com/cozy/cozy-client/commit/4d0966b))





# [10.5.0](https://github.com/cozy/cozy-client/compare/v10.4.0...v10.5.0) (2020-01-28)


### Features

* **cozy-client:** Export models in node entry point ([2da0c92](https://github.com/cozy/cozy-client/commit/2da0c92))





# [10.4.0](https://github.com/cozy/cozy-client/compare/v10.3.0...v10.4.0) (2020-01-27)

**Note:** Version bump only for package cozy-client





# [10.3.0](https://github.com/cozy/cozy-client/compare/v10.2.1...v10.3.0) (2020-01-24)

**Note:** Version bump only for package cozy-client





## [10.2.1](https://github.com/cozy/cozy-client/compare/v10.2.0...v10.2.1) (2020-01-23)

**Note:** Version bump only for package cozy-client





# [10.2.0](https://github.com/cozy/cozy-client/compare/v10.0.0...v10.2.0) (2020-01-22)


### Features

* Add fromOldOAuthClient static initiator ([a210668](https://github.com/cozy/cozy-client/commit/a210668))





# [10.1.0](https://github.com/cozy/cozy-client/compare/v10.0.0...v10.1.0) (2020-01-22)


### Features

* Add fromOldOAuthClient static initiator ([a210668](https://github.com/cozy/cozy-client/commit/a210668))





# [10.0.0](https://github.com/cozy/cozy-client/compare/v9.10.0...v10.0.0) (2020-01-22)


### Features

* HasMany prunes absent documents before passing them down ([6ab4130](https://github.com/cozy/cozy-client/commit/6ab4130))
* HasMany prunes absent documents before passing them down ([#622](https://github.com/cozy/cozy-client/issues/622)) ([3b1c4e4](https://github.com/cozy/cozy-client/commit/3b1c4e4))


### BREAKING CHANGES

* - HasMany::data does not return null values
- existsById changes of semantics
- containsById retains the previous behavior of existsById

- containsById does not check for document existence in the store
- existsById checks for existence of the document in the store





# [9.10.0](https://github.com/cozy/cozy-client/compare/v9.9.0...v9.10.0) (2020-01-20)

**Note:** Version bump only for package cozy-client





# [9.9.0](https://github.com/cozy/cozy-client/compare/v9.8.1...v9.9.0) (2020-01-20)

**Note:** Version bump only for package cozy-client





## [9.8.1](https://github.com/cozy/cozy-client/compare/v9.8.0...v9.8.1) (2020-01-16)

**Note:** Version bump only for package cozy-client





# [9.8.0](https://github.com/cozy/cozy-client/compare/v9.7.0...v9.8.0) (2020-01-15)


### Features

* Export createClientInteractive in node entry point ([521d526](https://github.com/cozy/cozy-client/commit/521d526))
* Export createMockClient in both entry points ([7544c97](https://github.com/cozy/cozy-client/commit/7544c97))





# [9.7.0](https://github.com/cozy/cozy-client/compare/v9.6.1...v9.7.0) (2020-01-15)


### Features

* Add codemod to transform client.all into Q ([4ca3a1d](https://github.com/cozy/cozy-client/commit/4ca3a1d))
* Deprecate client.all in favor of Q ([887d422](https://github.com/cozy/cozy-client/commit/887d422))
* Export Q in node env ([cc11c86](https://github.com/cozy/cozy-client/commit/cc11c86))





# [9.6.0](https://github.com/cozy/cozy-client/compare/v9.5.2...v9.6.0) (2020-01-13)


### Features

* Use bookmark pagination for queryAll ([8195a72](https://github.com/cozy/cozy-client/commit/8195a72))
* Use faster concat instead of union ([544887f](https://github.com/cozy/cozy-client/commit/544887f))





## [9.5.2](https://github.com/cozy/cozy-client/compare/v9.5.1...v9.5.2) (2020-01-10)

**Note:** Version bump only for package cozy-client





## [9.5.1](https://github.com/cozy/cozy-client/compare/v9.5.0...v9.5.1) (2020-01-09)


### Bug Fixes

* Mute trigger errors without success ([53ea662](https://github.com/cozy/cozy-client/commit/53ea662))





# [9.5.0](https://github.com/cozy/cozy-client/compare/v9.4.0...v9.5.0) (2020-01-08)


### Bug Fixes

* Add btoa/cozy-logger deps needed for createClientInteractive tests ([2e80a4a](https://github.com/cozy/cozy-client/commit/2e80a4a))
* Add server-destroy dep necessary for createClientInteractive tests ([edcf7fd](https://github.com/cozy/cozy-client/commit/edcf7fd))
* Revive the client with oauthOptions ([32c0685](https://github.com/cozy/cozy-client/commit/32c0685))


### Features

* Add a manual test script for createClientInteractive ([f9ed9c1](https://github.com/cozy/cozy-client/commit/f9ed9c1))
* Add doctypes to the path of the saved credentials ([675cec0](https://github.com/cozy/cozy-client/commit/675cec0))
* Add tests for createInteractiveClient ([9850f74](https://github.com/cozy/cozy-client/commit/9850f74))
* Pass an fs object to serverOptions ([9b42325](https://github.com/cozy/cozy-client/commit/9b42325))





# [9.4.0](https://github.com/cozy/cozy-client/compare/v9.3.0...v9.4.0) (2020-01-06)


### Features

* **cozy-client:** Add getStoreURL method to applications model ([a6f5de0](https://github.com/cozy/cozy-client/commit/a6f5de0))





# [9.3.0](https://github.com/cozy/cozy-client/compare/v9.2.0...v9.3.0) (2020-01-02)


### Features

* File normalization function ([#602](https://github.com/cozy/cozy-client/issues/602)) ([ef6e11b](https://github.com/cozy/cozy-client/commit/ef6e11b)), closes [/github.com/cozy/cozy-notes/pull/41#discussion_r360844792](https://github.com//github.com/cozy/cozy-notes/pull/41/issues/discussion_r360844792)





# [9.2.0](https://github.com/cozy/cozy-client/compare/v9.1.1...v9.2.0) (2019-12-19)

**Note:** Version bump only for package cozy-client





## [9.1.1](https://github.com/cozy/cozy-client/compare/v9.1.0...v9.1.1) (2019-12-18)


### Bug Fixes

* Ensure backward compatibility from pre-9.0.0 ([92ee48e](https://github.com/cozy/cozy-client/commit/92ee48e))





# [9.1.0](https://github.com/cozy/cozy-client/compare/v9.0.0...v9.1.0) (2019-12-18)

**Note:** Version bump only for package cozy-client





# [9.0.0](https://github.com/cozy/cozy-client/compare/v8.10.1...v9.0.0) (2019-12-18)


### Bug Fixes

* Export triggers model ([6553bd9](https://github.com/cozy/cozy-client/commit/6553bd9))
* Fail safe trigger state checks ([e313b08](https://github.com/cozy/cozy-client/commit/e313b08))


### Code Refactoring

* Singularize method names ([6ecfede](https://github.com/cozy/cozy-client/commit/6ecfede))


### Features

* Check if trigger errors are muted ([3d33ef6](https://github.com/cozy/cozy-client/commit/3d33ef6))
* Get accounts last error ([bed0445](https://github.com/cozy/cozy-client/commit/bed0445))
* Get last trigger error ([4583e24](https://github.com/cozy/cozy-client/commit/4583e24))
* Get last trigger exec date ([d208d88](https://github.com/cozy/cozy-client/commit/d208d88))
* Get triggers account ([50b5f0d](https://github.com/cozy/cozy-client/commit/50b5f0d))
* Mute account errors ([c2be0f9](https://github.com/cozy/cozy-client/commit/c2be0f9))


### BREAKING CHANGES

* The trigger model is now singular, update your import 
statements





## [8.10.1](https://github.com/cozy/cozy-client/compare/v8.10.0...v8.10.1) (2019-12-17)


### Bug Fixes

* Test if note ([dc80c34](https://github.com/cozy/cozy-client/commit/dc80c34))





# [8.10.0](https://github.com/cozy/cozy-client/compare/v8.9.0...v8.10.0) (2019-12-17)


### Features

* Add Note model ([5b4f150](https://github.com/cozy/cozy-client/commit/5b4f150))





# [8.9.0](https://github.com/cozy/cozy-client/compare/v8.8.1...v8.9.0) (2019-12-16)


### Features

* Add file model ([b83e58d](https://github.com/cozy/cozy-client/commit/b83e58d))





## [8.8.1](https://github.com/cozy/cozy-client/compare/v8.8.0...v8.8.1) (2019-12-12)

**Note:** Version bump only for package cozy-client





# [8.8.0](https://github.com/cozy/cozy-client/compare/v8.7.1...v8.8.0) (2019-12-12)


### Bug Fixes

* JSDoc warnings ([ac3d55a](https://github.com/cozy/cozy-client/commit/ac3d55a))


### Features

* Add mockClient creation for use in tests ([b2c7b40](https://github.com/cozy/cozy-client/commit/b2c7b40))





## [8.7.1](https://github.com/cozy/cozy-client/compare/v8.7.0...v8.7.1) (2019-12-10)

**Note:** Version bump only for package cozy-client





# [8.7.0](https://github.com/cozy/cozy-client/compare/v8.6.0...v8.7.0) (2019-12-10)

**Note:** Version bump only for package cozy-client





# [8.6.0](https://github.com/cozy/cozy-client/compare/v8.5.1...v8.6.0) (2019-12-09)


### Features

* Instance add method to check if already subscribed ([6fb6938](https://github.com/cozy/cozy-client/commit/6fb6938))





## [8.5.1](https://github.com/cozy/cozy-client/compare/v8.5.0...v8.5.1) (2019-12-05)

**Note:** Version bump only for package cozy-client





# [8.5.0](https://github.com/cozy/cozy-client/compare/v8.4.0...v8.5.0) (2019-12-02)


### Features

* Export applications model ([5579f07](https://github.com/cozy/cozy-client/commit/5579f07))





# [8.4.0](https://github.com/cozy/cozy-client/compare/v8.3.1...v8.4.0) (2019-11-29)


### Features

* Add checkForRevocation helper ([e62d62b](https://github.com/cozy/cozy-client/commit/e62d62b))
* Add helper functions ([3d9d2dd](https://github.com/cozy/cozy-client/commit/3d9d2dd))





## [8.3.1](https://github.com/cozy/cozy-client/compare/v8.3.0...v8.3.1) (2019-11-29)

**Note:** Version bump only for package cozy-client





# [8.3.0](https://github.com/cozy/cozy-client/compare/v8.2.0...v8.3.0) (2019-11-28)


### Features

* Expose cozy client's version ([df53db0](https://github.com/cozy/cozy-client/commit/df53db0))





# [8.2.0](https://github.com/cozy/cozy-client/compare/v8.1.0...v8.2.0) (2019-11-25)


### Features

* Instance model add buildPremiumLink ([722085d](https://github.com/cozy/cozy-client/commit/722085d))





# [8.1.0](https://github.com/cozy/cozy-client/compare/v8.0.0...v8.1.0) (2019-11-25)


### Features

* Add shoulDisplayOffers method ([d1a3b34](https://github.com/cozy/cozy-client/commit/d1a3b34))





# [8.0.0](https://github.com/cozy/cozy-client/compare/v7.14.0...v8.0.0) (2019-11-22)

**Note:** Version bump only for package cozy-client





# [7.14.0](https://github.com/cozy/cozy-client/compare/v7.13.0...v7.14.0) (2019-11-21)


### Features

* Add Instance Model to manager instance information ([42678fa](https://github.com/cozy/cozy-client/commit/42678fa))





# [7.13.0](https://github.com/cozy/cozy-client/compare/v7.12.0...v7.13.0) (2019-11-21)


### Features

* Attempt options auto load ([43786c8](https://github.com/cozy/cozy-client/commit/43786c8))
* Expose instance options ([9824683](https://github.com/cozy/cozy-client/commit/9824683))





# [7.12.0](https://github.com/cozy/cozy-client/compare/v7.11.0...v7.12.0) (2019-11-18)

**Note:** Version bump only for package cozy-client





# [7.11.0](https://github.com/cozy/cozy-client/compare/v7.10.0...v7.11.0) (2019-11-13)

**Note:** Version bump only for package cozy-client





# [7.10.0](https://github.com/cozy/cozy-client/compare/v7.9.0...v7.10.0) (2019-11-12)


### Features

* Expose Q helper to build query definitions ([64f1924](https://github.com/cozy/cozy-client/commit/64f1924))





# [7.9.0](https://github.com/cozy/cozy-client/compare/v7.8.0...v7.9.0) (2019-11-08)


### Features

* Add client creation for CLI ([d5c76cf](https://github.com/cozy/cozy-client/commit/d5c76cf))





# [7.8.0](https://github.com/cozy/cozy-client/compare/v7.7.0...v7.8.0) (2019-10-31)

**Note:** Version bump only for package cozy-client





# [7.7.0](https://github.com/cozy/cozy-client/compare/v7.6.0...v7.7.0) (2019-10-29)


### Features

* Log out a web client ([1569893](https://github.com/cozy/cozy-client/commit/1569893))





# [7.6.0](https://github.com/cozy/cozy-client/compare/v7.5.2...v7.6.0) (2019-10-24)


### Features

* Export fetchPolicies directly ([89293b8](https://github.com/cozy/cozy-client/commit/89293b8))





## [7.5.2](https://github.com/cozy/cozy-client/compare/v7.5.1...v7.5.2) (2019-10-21)


### Bug Fixes

* Get last execution from state ([64e194e](https://github.com/cozy/cozy-client/commit/64e194e))





## [7.5.1](https://github.com/cozy/cozy-client/compare/v7.5.0...v7.5.1) (2019-10-16)


### Bug Fixes

* Pass doctype correctly to hydrateDocuments ([a2fbe42](https://github.com/cozy/cozy-client/commit/a2fbe42))





# [7.5.0](https://github.com/cozy/cozy-client/compare/v7.4.1...v7.5.0) (2019-10-16)


### Bug Fixes

* Make unused variable an error ([19fa023](https://github.com/cozy/cozy-client/commit/19fa023))


### Features

* GetQueryFromState can hydrate documents directly ([6150ae3](https://github.com/cozy/cozy-client/commit/6150ae3))
* GetQueryFromState can hydrate documents directly ([#542](https://github.com/cozy/cozy-client/issues/542)) ([04437d7](https://github.com/cozy/cozy-client/commit/04437d7))





## [7.4.1](https://github.com/cozy/cozy-client/compare/v7.4.0...v7.4.1) (2019-10-16)

**Note:** Version bump only for package cozy-client





# [7.4.0](https://github.com/cozy/cozy-client/compare/v7.3.1...v7.4.0) (2019-10-16)


### Features

* Fetch a single app from the registry ([b6a9d85](https://github.com/cozy/cozy-client/commit/b6a9d85))





## [7.3.1](https://github.com/cozy/cozy-client/compare/v7.3.0...v7.3.1) (2019-10-15)


### Bug Fixes

* Do not modify wrapped component PropTypes ([2d107f1](https://github.com/cozy/cozy-client/commit/2d107f1))
* Do not modify wrapped component PropTypes ([#539](https://github.com/cozy/cozy-client/issues/539)) ([aaba7d4](https://github.com/cozy/cozy-client/commit/aaba7d4))





# [7.3.0](https://github.com/cozy/cozy-client/compare/v7.2.0...v7.3.0) (2019-10-14)


### Features

* Add model helper methods inside cozy-client ([ead3458](https://github.com/cozy/cozy-client/commit/ead3458))





# [7.2.0](https://github.com/cozy/cozy-client/compare/v7.1.1...v7.2.0) (2019-10-14)


### Features

* Fetch maintenance apps ([59cc024](https://github.com/cozy/cozy-client/commit/59cc024))





## [7.1.1](https://github.com/cozy/cozy-client/compare/v7.1.0...v7.1.1) (2019-10-11)

**Note:** Version bump only for package cozy-client





# [7.1.0](https://github.com/cozy/cozy-client/compare/v7.0.0...v7.1.0) (2019-10-10)

**Note:** Version bump only for package cozy-client





# [7.0.0](https://github.com/cozy/cozy-client/compare/v6.66.0...v7.0.0) (2019-10-07)


### Features

* Remove unused code ([f4047cb](https://github.com/cozy/cozy-client/commit/f4047cb))
* Show state when warning for unfound document/collection/query ([ff7155c](https://github.com/cozy/cozy-client/commit/ff7155c))
* Throw error if a store already has been set on the client ([744be29](https://github.com/cozy/cozy-client/commit/744be29))


### BREAKING CHANGES

* If you need to use setStore twice, you need to pass
options { force: true }
* If using StoreProxy {read/write/touch}Query, you should
not since it is undocumented and untested





# [6.66.0](https://github.com/cozy/cozy-client/compare/v6.65.0...v6.66.0) (2019-10-04)

**Note:** Version bump only for package cozy-client





# [6.65.0](https://github.com/cozy/cozy-client/compare/v6.64.7...v6.65.0) (2019-10-03)

**Note:** Version bump only for package cozy-client





## [6.64.7](https://github.com/cozy/cozy-client/compare/v6.64.6...v6.64.7) (2019-09-30)

**Note:** Version bump only for package cozy-client





## [6.64.6](https://github.com/cozy/cozy-client/compare/v6.64.5...v6.64.6) (2019-09-17)

**Note:** Version bump only for package cozy-client





## [6.64.5](https://github.com/cozy/cozy-client/compare/v6.64.4...v6.64.5) (2019-09-13)

**Note:** Version bump only for package cozy-client





## [6.64.3](https://github.com/cozy/cozy-client/compare/v6.64.2...v6.64.3) (2019-09-13)

**Note:** Version bump only for package cozy-client





## [6.64.2](https://github.com/cozy/cozy-client/compare/v6.64.1...v6.64.2) (2019-09-13)


### Bug Fixes

* **deps:** update dependency url-search-params-polyfill to v7 ([1189cc5](https://github.com/cozy/cozy-client/commit/1189cc5))





## [6.64.1](https://github.com/cozy/cozy-client/compare/v6.64.0...v6.64.1) (2019-09-12)

**Note:** Version bump only for package cozy-client





# [6.64.0](https://github.com/cozy/cozy-client/compare/v6.63.0...v6.64.0) (2019-09-09)


### Features

* Add ready-made fetch policies ([fdfb6db](https://github.com/cozy/cozy-client/commit/fdfb6db))
* Fetch policy ([22380bb](https://github.com/cozy/cozy-client/commit/22380bb))





# [6.63.0](https://github.com/cozy/cozy-client/compare/v6.62.0...v6.63.0) (2019-09-09)


### Bug Fixes

* Correctly mock requestQuery to send back a response shaped object ([c3ef9f9](https://github.com/cozy/cozy-client/commit/c3ef9f9))
* Observable query automatically subscribes/unsubscribe from store ([63eddb9](https://github.com/cozy/cozy-client/commit/63eddb9))


### Features

* Better name for watchQuery ([6e83c12](https://github.com/cozy/cozy-client/commit/6e83c12))
* Create children args only when query changes ([8224f70](https://github.com/cozy/cozy-client/commit/8224f70))





# [6.62.0](https://github.com/cozy/cozy-client/compare/v6.61.0...v6.62.0) (2019-09-05)


### Features

* Small improvements and refactor ([#518](https://github.com/cozy/cozy-client/issues/518)) ([d3a308c](https://github.com/cozy/cozy-client/commit/d3a308c))





# [6.61.0](https://github.com/cozy/cozy-client/compare/v6.60.0...v6.61.0) (2019-09-03)


### Features

* Change plugin interface ([#511](https://github.com/cozy/cozy-client/issues/511)) ([04f4949](https://github.com/cozy/cozy-client/commit/04f4949))





# [6.60.0](https://github.com/cozy/cozy-client/compare/v6.59.0...v6.60.0) (2019-09-02)


### Features

* Add registerPlugin method ([#509](https://github.com/cozy/cozy-client/issues/509)) ([1341329](https://github.com/cozy/cozy-client/commit/1341329))





# [6.59.0](https://github.com/cozy/cozy-client/compare/v6.58.2...v6.59.0) (2019-09-02)


### Features

* Instantiate from old client ([#508](https://github.com/cozy/cozy-client/issues/508)) ([a63a5c1](https://github.com/cozy/cozy-client/commit/a63a5c1))





## [6.58.2](https://github.com/cozy/cozy-client/compare/v6.58.1...v6.58.2) (2019-08-29)

**Note:** Version bump only for package cozy-client





## [6.58.1](https://github.com/cozy/cozy-client/compare/v6.58.0...v6.58.1) (2019-08-21)

**Note:** Version bump only for package cozy-client





# [6.58.0](https://github.com/cozy/cozy-client/compare/v6.57.0...v6.58.0) (2019-08-19)


### Features

* **cozy-client:** Expose main and browsers entry points ([22f96ed](https://github.com/cozy/cozy-client/commit/22f96ed))





# [6.57.0](https://github.com/cozy/cozy-client/compare/v6.56.1...v6.57.0) (2019-08-07)


### Features

* Implement referenced-by add/remove ([04aee66](https://github.com/cozy/cozy-client/commit/04aee66))





## [6.56.1](https://github.com/cozy/cozy-client/compare/v6.56.0...v6.56.1) (2019-08-07)


### Bug Fixes

* Hydrate documents also for in-flight queries ([d4623ad](https://github.com/cozy/cozy-client/commit/d4623ad))





# [6.56.0](https://github.com/cozy/cozy-client/compare/v6.55.1...v6.56.0) (2019-08-02)

**Note:** Version bump only for package cozy-client





## [6.55.1](https://github.com/cozy/cozy-client/compare/v6.55.0...v6.55.1) (2019-07-30)

**Note:** Version bump only for package cozy-client





# [6.55.0](https://github.com/cozy/cozy-client/compare/v6.54.0...v6.55.0) (2019-07-23)

**Note:** Version bump only for package cozy-client





# [6.54.0](https://github.com/cozy/cozy-client/compare/v6.53.0...v6.54.0) (2019-07-23)


### Features

* **cozy-client:** Add queryAll method ([932cdc1](https://github.com/cozy/cozy-client/commit/932cdc1))





# [6.53.0](https://github.com/cozy/cozy-client/compare/v6.52.0...v6.53.0) (2019-07-16)

**Note:** Version bump only for package cozy-client





# [6.52.0](https://github.com/cozy/cozy-client/compare/v6.51.0...v6.52.0) (2019-07-16)

**Note:** Version bump only for package cozy-client





# [6.51.0](https://github.com/cozy/cozy-client/compare/v6.50.0...v6.51.0) (2019-07-16)

**Note:** Version bump only for package cozy-client





# [6.50.0](https://github.com/cozy/cozy-client/compare/v6.49.3...v6.50.0) (2019-07-16)

**Note:** Version bump only for package cozy-client





## [6.49.3](https://github.com/cozy/cozy-client/compare/v6.49.2...v6.49.3) (2019-07-13)


### Bug Fixes

* **deps:** update dependency lodash to v4.17.14 ([dc48ea4](https://github.com/cozy/cozy-client/commit/dc48ea4))





## [6.49.2](https://github.com/cozy/cozy-client/compare/v6.49.1...v6.49.2) (2019-07-12)


### Bug Fixes

* **deps:** update dependency lodash to v4.17.13 [security] ([3af67f3](https://github.com/cozy/cozy-client/commit/3af67f3))





## [6.49.1](https://github.com/cozy/cozy-client/compare/v6.49.0...v6.49.1) (2019-07-12)


### Bug Fixes

* **deps:** update dependency cozy-device-helper to v1.7.3 ([9e1328f](https://github.com/cozy/cozy-client/commit/9e1328f))





# [6.49.0](https://github.com/cozy/cozy-client/compare/v6.48.0...v6.49.0) (2019-07-08)


### Bug Fixes

* Allow double-array in query param ([78e8d73](https://github.com/cozy/cozy-client/commit/78e8d73))


### Features

* Add cursor-based pagination ([a075999](https://github.com/cozy/cozy-client/commit/a075999))
* Add relationship pagination example ([3f26b98](https://github.com/cozy/cozy-client/commit/3f26b98))
* Force use of cursor for view pagination ([5ad9387](https://github.com/cozy/cozy-client/commit/5ad9387))





# [6.48.0](https://github.com/cozy/cozy-client/compare/v6.47.1...v6.48.0) (2019-06-27)


### Features

* **cozy-client:** Add set and unset methods on HasOne ([0d29b8a](https://github.com/cozy/cozy-client/commit/0d29b8a))





## [6.47.1](https://github.com/cozy/cozy-client/compare/v6.47.0...v6.47.1) (2019-06-26)


### Bug Fixes

* **cozy-client:** Association HasOne don't fail if there is no data ([262d617](https://github.com/cozy/cozy-client/commit/262d617))





# [6.47.0](https://github.com/cozy/cozy-client/compare/v6.46.0...v6.47.0) (2019-06-26)

**Note:** Version bump only for package cozy-client





# [6.46.0](https://github.com/cozy/cozy-client/compare/v6.45.2...v6.46.0) (2019-06-21)

**Note:** Version bump only for package cozy-client





## [6.45.2](https://github.com/cozy/cozy-client/compare/v6.45.1...v6.45.2) (2019-06-20)


### Bug Fixes

* :bug: Put proptypes on wrapped component instead of wrapper ([c52bc54](https://github.com/cozy/cozy-client/commit/c52bc54))





## [6.45.1](https://github.com/cozy/cozy-client/compare/v6.45.0...v6.45.1) (2019-06-19)


### Bug Fixes

* **withMutations:** Expose all withMutations provided props types ([ceeb9ee](https://github.com/cozy/cozy-client/commit/ceeb9ee))





# [6.45.0](https://github.com/cozy/cozy-client/compare/v6.44.0...v6.45.0) (2019-06-14)


### Bug Fixes

* **cozy-client:** Login links after the uri is set ([7ea68ea](https://github.com/cozy/cozy-client/commit/7ea68ea))





# [6.44.0](https://github.com/cozy/cozy-client/compare/v6.43.1...v6.44.0) (2019-06-14)

**Note:** Version bump only for package cozy-client





      <a name="6.43.0"></a>
# [6.43.0](https://github.com/cozy/cozy-client/compare/v6.42.0...v6.43.0) (2019-06-05)




**Note:** Version bump only for package cozy-client

      <a name="6.42.0"></a>
# [6.42.0](https://github.com/cozy/cozy-client/compare/v6.41.1...v6.42.0) (2019-06-04)




**Note:** Version bump only for package cozy-client

   <a name="6.41.1"></a>
## [6.41.1](https://github.com/cozy/cozy-client/compare/v6.41.0...v6.41.1) (2019-06-03)


### Bug Fixes

* **schema:** Map on names to show duplicate error ([606a84f](https://github.com/cozy/cozy-client/commit/606a84f))




 <a name="6.41.0"></a>
# [6.41.0](https://github.com/cozy/cozy-client/compare/v6.40.1...v6.41.0) (2019-06-03)


### Features

* Add queries on id in dsl ([f625f3d](https://github.com/cozy/cozy-client/commit/f625f3d))




<a name="6.40.1"></a>
## [6.40.1](https://github.com/cozy/cozy-client/compare/v6.40.0...v6.40.1) (2019-05-31)




**Note:** Version bump only for package cozy-client

<a name="6.40.0"></a>
# [6.40.0](https://github.com/cozy/cozy-client/compare/v6.39.0...v6.40.0) (2019-05-31)


### Features

* Add fetch polyfill in jest setup ([750216d](https://github.com/cozy/cozy-client/commit/750216d))
* Implicitly create the schema if it does not exist ([3a834a4](https://github.com/cozy/cozy-client/commit/3a834a4))




<a name="6.39.0"></a>
# [6.39.0](https://github.com/cozy/cozy-client/compare/v6.38.2...v6.39.0) (2019-05-31)




**Note:** Version bump only for package cozy-client

<a name="6.38.2"></a>
## [6.38.2](https://github.com/cozy/cozy-client/compare/v6.38.1...v6.38.2) (2019-05-29)


### Bug Fixes

* **cozy-client:** Export cancelable util ([d262983](https://github.com/cozy/cozy-client/commit/d262983))




<a name="6.38.1"></a>
## [6.38.1](https://github.com/cozy/cozy-client/compare/v6.38.0...v6.38.1) (2019-05-29)


### Bug Fixes

* Allow fromEnv instantiation from oauth client ([4f03be9](https://github.com/cozy/cozy-client/commit/4f03be9))
* Use NODE_ENV to differenciate authentication methods ([25499f0](https://github.com/cozy/cozy-client/commit/25499f0))




<a name="6.38.0"></a>
# [6.38.0](https://github.com/cozy/cozy-client/compare/v6.37.1...v6.38.0) (2019-05-28)




**Note:** Version bump only for package cozy-client

<a name="6.37.1"></a>
## [6.37.1](https://github.com/cozy/cozy-client/compare/v6.37.0...v6.37.1) (2019-05-27)




**Note:** Version bump only for package cozy-client

<a name="6.37.0"></a>
# [6.37.0](https://github.com/cozy/cozy-client/compare/v6.36.0...v6.37.0) (2019-05-27)


### Features

* Fetch apps ([0aa92e4](https://github.com/cozy/cozy-client/commit/0aa92e4))
* Manifest sanitization ([0e75f3f](https://github.com/cozy/cozy-client/commit/0e75f3f))




<a name="6.36.0"></a>
# [6.36.0](https://github.com/cozy/cozy-client/compare/v6.35.0...v6.36.0) (2019-05-27)


### Features

* Standard method of instantiating CozyClient from env vars ([dc2cfab](https://github.com/cozy/cozy-client/commit/dc2cfab))




<a name="6.35.0"></a>
# [6.35.0](https://github.com/cozy/cozy-client/compare/v6.34.0...v6.35.0) (2019-05-23)


### Features

* Add cancelable util ([9f20d87](https://github.com/cozy/cozy-client/commit/9f20d87))




<a name="6.34.0"></a>
# [6.34.0](https://github.com/cozy/cozy-client/compare/v6.33.0...v6.34.0) (2019-05-22)


### Features

* Add Registry API ([73fd7f0](https://github.com/cozy/cozy-client/commit/73fd7f0))




<a name="6.33.0"></a>
# [6.33.0](https://github.com/cozy/cozy-client/compare/v6.32.0...v6.33.0) (2019-05-21)




**Note:** Version bump only for package cozy-client

<a name="6.32.0"></a>
# [6.32.0](https://github.com/cozy/cozy-client/compare/v6.31.1...v6.32.0) (2019-05-20)


### Features

* Add display name to queryConnect and withClient ([fead480](https://github.com/cozy/cozy-client/commit/fead480))




<a name="6.31.1"></a>
## [6.31.1](https://github.com/cozy/cozy-client/compare/v6.31.0...v6.31.1) (2019-05-14)


### Bug Fixes

* Do not bind query.fetch if it does not exist ([18846e5](https://github.com/cozy/cozy-client/commit/18846e5))




<a name="6.31.0"></a>
# [6.31.0](https://github.com/cozy/cozy-client/compare/v6.30.0...v6.31.0) (2019-05-14)


### Bug Fixes

* Do not log warnings when we know what we are doing ([cad9243](https://github.com/cozy/cozy-client/commit/cad9243))




<a name="6.29.0"></a>
# [6.29.0](https://github.com/cozy/cozy-client/compare/v6.28.0...v6.29.0) (2019-05-10)


### Features

* Cozy-client will autologin if initialized with uri and token ([467a534](https://github.com/cozy/cozy-client/commit/467a534))




<a name="6.28.0"></a>
# [6.28.0](https://github.com/cozy/cozy-client/compare/v6.27.0...v6.28.0) (2019-05-10)


### Features

* Fetch method on ObservableQuery ([4c505b6](https://github.com/cozy/cozy-client/commit/4c505b6))




<a name="6.27.0"></a>
# [6.27.0](https://github.com/cozy/cozy-client/compare/v6.26.0...v6.27.0) (2019-05-06)


### Features

* Add beforeLogin event ([c574c6a](https://github.com/cozy/cozy-client/commit/c574c6a))




<a name="6.26.0"></a>
# [6.26.0](https://github.com/cozy/cozy-client/compare/v6.25.0...v6.26.0) (2019-05-02)


### Features

* Emit beforeLogout event before doing the logout logic ([75a68c6](https://github.com/cozy/cozy-client/commit/75a68c6))




<a name="6.25.0"></a>
# [6.25.0](https://github.com/cozy/cozy-client/compare/v6.24.2...v6.25.0) (2019-04-30)




**Note:** Version bump only for package cozy-client

<a name="6.24.2"></a>
## [6.24.2](https://github.com/cozy/cozy-client/compare/v6.24.1...v6.24.2) (2019-04-29)


### Bug Fixes

* Bad name for attribute ([4ce8968](https://github.com/cozy/cozy-client/commit/4ce8968))
* Handle isRevoked in login() ([00668fb](https://github.com/cozy/cozy-client/commit/00668fb))




<a name="6.24.1"></a>
## [6.24.1](https://github.com/cozy/cozy-client/compare/v6.24.0...v6.24.1) (2019-04-26)




**Note:** Version bump only for package cozy-client

<a name="6.24.0"></a>
# [6.24.0](https://github.com/cozy/cozy-client/compare/v6.23.3...v6.24.0) (2019-04-25)


### Features

* Ensure stackClient in options has handlers ([27983ae](https://github.com/cozy/cozy-client/commit/27983ae))
* Stack client tells CozyClient of a revocation ([f7c9e95](https://github.com/cozy/cozy-client/commit/f7c9e95))




<a name="6.23.3"></a>
## [6.23.3](https://github.com/cozy/cozy-client/compare/v6.23.2...v6.23.3) (2019-04-25)




**Note:** Version bump only for package cozy-client

<a name="6.23.2"></a>
## [6.23.2](https://github.com/cozy/cozy-client/compare/v6.23.1...v6.23.2) (2019-04-25)




**Note:** Version bump only for package cozy-client

<a name="6.23.1"></a>
## [6.23.1](https://github.com/cozy/cozy-client/compare/v6.23.0...v6.23.1) (2019-04-25)




**Note:** Version bump only for package cozy-client

<a name="6.23.0"></a>
# [6.23.0](https://github.com/cozy/cozy-client/compare/v6.22.0...v6.23.0) (2019-04-25)


### Features

* Login can set uri and token ([9a4b6b4](https://github.com/cozy/cozy-client/commit/9a4b6b4))
* Reduce timeout for prompt access_code ([84486bf](https://github.com/cozy/cozy-client/commit/84486bf))




<a name="6.22.0"></a>
# [6.22.0](https://github.com/cozy/cozy-client/compare/v6.21.0...v6.22.0) (2019-04-24)


### Features

* Add event when token is refreshed ([7e92346](https://github.com/cozy/cozy-client/commit/7e92346))
* Client emits events for log{in,out} ([b12d20f](https://github.com/cozy/cozy-client/commit/b12d20f))




<a name="6.21.0"></a>
# [6.21.0](https://github.com/cozy/cozy-client/compare/v6.20.0...v6.21.0) (2019-04-03)




**Note:** Version bump only for package cozy-client

<a name="6.20.0"></a>
# [6.20.0](https://github.com/cozy/cozy-client/compare/v6.19.0...v6.20.0) (2019-03-27)




**Note:** Version bump only for package cozy-client

<a name="6.19.0"></a>
# [6.19.0](https://github.com/cozy/cozy-client/compare/v6.18.1...v6.19.0) (2019-03-26)


### Bug Fixes

* **client:** Revert recent changes in fetchRelationships 🚑 ([63e4e46](https://github.com/cozy/cozy-client/commit/63e4e46))


### Features

* **client:** Change HasManyTriggers implementation ✨ ([9e7c3b2](https://github.com/cozy/cozy-client/commit/9e7c3b2))
* **client:** Optimize queries by deduplicating ✨ ([1a856e1](https://github.com/cozy/cozy-client/commit/1a856e1))




<a name="6.18.1"></a>
## [6.18.1](https://github.com/cozy/cozy-client/compare/v6.18.0...v6.18.1) (2019-03-25)




**Note:** Version bump only for package cozy-client

<a name="6.18.0"></a>
# [6.18.0](https://github.com/cozy/cozy-client/compare/v6.17.0...v6.18.0) (2019-03-22)


### Features

* **client:** Add HasManyTriggers association ✨ ([0f39c37](https://github.com/cozy/cozy-client/commit/0f39c37))




<a name="6.17.0"></a>
# [6.17.0](https://github.com/cozy/cozy-client/compare/v6.16.0...v6.17.0) (2019-03-21)




**Note:** Version bump only for package cozy-client

<a name="6.16.0"></a>
# [6.16.0](https://github.com/cozy/cozy-client/compare/v6.15.0...v6.16.0) (2019-03-20)


### Features

* **client:** Add Schema.add() method ✨ ([8c9e592](https://github.com/cozy/cozy-client/commit/8c9e592))
* **stack:** Make Schema.add() throw error if name or doctype exist ⚠️ ([80cf7a1](https://github.com/cozy/cozy-client/commit/80cf7a1))




<a name="6.15.0"></a>
# [6.15.0](https://github.com/cozy/cozy-client/compare/v6.14.0...v6.15.0) (2019-03-19)


### Bug Fixes

* **client:** Association query may return same QueryDefinition 📝 ([abee793](https://github.com/cozy/cozy-client/commit/abee793))
* **client:** Make association query responses unique in included 📝 ([014d056](https://github.com/cozy/cozy-client/commit/014d056))
* **client:** Make fetchRelationships handle document list 📝 ([bbf8094](https://github.com/cozy/cozy-client/commit/bbf8094))


### Features

* **client:** Allow async query method in Assocation ✨ ([529e7f0](https://github.com/cozy/cozy-client/commit/529e7f0))




<a name="6.13.0"></a>
# [6.13.0](https://github.com/cozy/cozy-client/compare/v6.12.0...v6.13.0) (2019-03-19)


### Features

* **client:** Add getCollectionFromState() ✨ ([50ab811](https://github.com/cozy/cozy-client/commit/50ab811))




<a name="6.12.0"></a>
# [6.12.0](https://github.com/cozy/cozy-client/compare/v6.11.1...v6.12.0) (2019-03-18)




**Note:** Version bump only for package cozy-client

<a name="6.11.1"></a>
## [6.11.1](https://github.com/cozy/cozy-client/compare/v6.11.0...v6.11.1) (2019-03-14)




**Note:** Version bump only for package cozy-client

<a name="6.11.0"></a>
# [6.11.0](https://github.com/cozy/cozy-client/compare/v6.10.0...v6.11.0) (2019-03-14)




**Note:** Version bump only for package cozy-client

<a name="6.10.0"></a>
# [6.10.0](https://github.com/cozy/cozy-client/compare/v6.9.0...v6.10.0) (2019-03-14)




**Note:** Version bump only for package cozy-client

<a name="6.9.0"></a>
# [6.9.0](https://github.com/cozy/cozy-client/compare/v6.8.1...v6.9.0) (2019-03-08)


### Features

* Add metadataVersion automatically ([e8b03cd](https://github.com/cozy/cozy-client/commit/e8b03cd))




<a name="6.8.1"></a>
## [6.8.1](https://github.com/cozy/cozy-client/compare/v6.8.0...v6.8.1) (2019-03-08)




**Note:** Version bump only for package cozy-client

<a name="6.8.0"></a>
# [6.8.0](https://github.com/cozy/cozy-client/compare/v6.7.0...v6.8.0) (2019-03-08)


### Features

* Don't use client.schema to add/update cozyMetadata, new format for updatedByApps ([bf6be9b](https://github.com/cozy/cozy-client/commit/bf6be9b))




<a name="6.7.0"></a>
# [6.7.0](https://github.com/cozy/cozy-client/compare/v6.6.0...v6.7.0) (2019-03-06)


### Features

* Add setToken, deprecate setCredentials ([2578a22](https://github.com/cozy/cozy-client/commit/2578a22))




<a name="6.6.0"></a>
# [6.6.0](https://github.com/cozy/cozy-client/compare/v6.5.1...v6.6.0) (2019-03-06)




**Note:** Version bump only for package cozy-client

<a name="6.5.1"></a>
## [6.5.1](https://github.com/cozy/cozy-client/compare/v6.5.0...v6.5.1) (2019-03-06)




**Note:** Version bump only for package cozy-client

<a name="6.5.0"></a>
# [6.5.0](https://github.com/cozy/cozy-client/compare/v6.4.2...v6.5.0) (2019-03-01)




**Note:** Version bump only for package cozy-client

<a name="6.4.2"></a>
## [6.4.2](https://github.com/cozy/cozy-client/compare/v6.4.1...v6.4.2) (2019-02-27)




**Note:** Version bump only for package cozy-client

<a name="6.4.1"></a>
## [6.4.1](https://github.com/cozy/cozy-client/compare/v6.4.0...v6.4.1) (2019-02-21)


### Bug Fixes

* Support $gt null in query selectors ([516a9f5](https://github.com/cozy/cozy-client/commit/516a9f5))




<a name="6.4.0"></a>
# [6.4.0](https://github.com/cozy/cozy-client/compare/v6.3.3...v6.4.0) (2019-02-21)


### Features

* Automatic cozy metadata ([f12574b](https://github.com/cozy/cozy-client/commit/f12574b))




<a name="6.3.3"></a>
## [6.3.3](https://github.com/cozy/cozy-client/compare/v6.3.2...v6.3.3) (2019-02-20)




**Note:** Version bump only for package cozy-client

<a name="6.3.1"></a>
## [6.3.1](https://github.com/cozy/cozy-client/compare/v6.3.0...v6.3.1) (2019-02-19)




**Note:** Version bump only for package cozy-client

<a name="6.3.0"></a>
# [6.3.0](https://github.com/cozy/cozy-client/compare/v6.2.0...v6.3.0) (2019-02-18)




**Note:** Version bump only for package cozy-client

<a name="6.2.0"></a>
# [6.2.0](https://github.com/cozy/cozy-client/compare/v6.1.0...v6.2.0) (2019-02-14)


### Features

* Allow multiple mutations in withMutations() ✨ ([0fc07e4](https://github.com/cozy/cozy-client/commit/0fc07e4))




<a name="6.1.0"></a>
# [6.1.0](https://github.com/cozy/cozy-client/compare/v6.0.0...v6.1.0) (2019-02-14)




**Note:** Version bump only for package cozy-client

<a name="6.0.0"></a>
# [6.0.0](https://github.com/cozy/cozy-client/compare/v5.7.7...v6.0.0) (2019-02-05)


### Features

* Auto-save addById / removeById ([83e3adf](https://github.com/cozy/cozy-client/commit/83e3adf))


### BREAKING CHANGES

* Removed deprecated Associations API




<a name="5.7.7"></a>
## [5.7.7](https://github.com/cozy/cozy-client/compare/v5.7.6...v5.7.7) (2019-02-05)


### Bug Fixes

* **client:** Use properId in all store slices ([56537e7](https://github.com/cozy/cozy-client/commit/56537e7))




<a name="5.7.6"></a>
## [5.7.6](https://github.com/cozy/cozy-client/compare/v5.7.5...v5.7.6) (2019-01-30)


### Bug Fixes

* Add dehydrate method on HasOneInPlace ([d53ab4c](https://github.com/cozy/cozy-client/commit/d53ab4c))
* Return null when getDocumentFromState errors ([51da9f5](https://github.com/cozy/cozy-client/commit/51da9f5))
* Throw if a relation is not dehydratable ([e24d187](https://github.com/cozy/cozy-client/commit/e24d187))




<a name="5.7.5"></a>
## [5.7.5](https://github.com/cozy/cozy-client/compare/v5.7.4...v5.7.5) (2019-01-30)


### Bug Fixes

* **docs:** Broken link to DocumentCollection ([b8a7d81](https://github.com/cozy/cozy-client/commit/b8a7d81))




<a name="5.7.4"></a>
## [5.7.4](https://github.com/cozy/cozy-client/compare/v5.7.3...v5.7.4) (2019-01-29)


### Bug Fixes

* Hydrating null documents failed ([c66c3c9](https://github.com/cozy/cozy-client/commit/c66c3c9))




<a name="5.7.3"></a>
## [5.7.3](https://github.com/cozy/cozy-client/compare/v5.7.2...v5.7.3) (2019-01-28)


### Bug Fixes

* Combine relationships when attaching them to responses ([5d862c3](https://github.com/cozy/cozy-client/commit/5d862c3))




<a name="5.7.2"></a>
## [5.7.2](https://github.com/cozy/cozy-client/compare/v5.7.1...v5.7.2) (2019-01-28)


### Bug Fixes

* **client:** Handle undefined relationships ([d1ffcbe](https://github.com/cozy/cozy-client/commit/d1ffcbe))




<a name="5.7.1"></a>
## [5.7.1](https://github.com/cozy/cozy-client/compare/v5.7.0...v5.7.1) (2019-01-23)


### Bug Fixes

* Avoid deleting relationships in stored documents ([372fccf](https://github.com/cozy/cozy-client/commit/372fccf))
* Smarter detection of relationship attachments ([bde18dc](https://github.com/cozy/cozy-client/commit/bde18dc))




<a name="5.7.0"></a>
# [5.7.0](https://github.com/cozy/cozy-client/compare/v5.6.6...v5.7.0) (2019-01-23)


### Features

* **StackLink:** Use find instead of all if a sort option is given ([d7d7b8e](https://github.com/cozy/cozy-client/commit/d7d7b8e))




<a name="5.6.6"></a>
## [5.6.6](https://github.com/cozy/cozy-client/compare/v5.6.5...v5.6.6) (2019-01-22)




**Note:** Version bump only for package cozy-client

<a name="5.6.5"></a>
## [5.6.5](https://github.com/cozy/cozy-client/compare/v5.6.4...v5.6.5) (2019-01-22)


### Bug Fixes

* Update relationship meta count ([978bd8b](https://github.com/cozy/cozy-client/commit/978bd8b))




<a name="5.6.4"></a>
## [5.6.4](https://github.com/cozy/cozy-client/compare/v5.6.3...v5.6.4) (2019-01-18)


### Bug Fixes

* Example type ([f2f34e3](https://github.com/cozy/cozy-client/commit/f2f34e3))




<a name="5.6.3"></a>
## [5.6.3](https://github.com/cozy/cozy-client/compare/v5.6.2...v5.6.3) (2019-01-17)


### Bug Fixes

* Example type ([6a4e753](https://github.com/cozy/cozy-client/commit/6a4e753))
* Example type ([96af3da](https://github.com/cozy/cozy-client/commit/96af3da))
* Example type ([9ed5aec](https://github.com/cozy/cozy-client/commit/9ed5aec))




<a name="5.6.1"></a>
## [5.6.1](https://github.com/cozy/cozy-client/compare/v5.6.0...v5.6.1) (2019-01-17)




**Note:** Version bump only for package cozy-client

<a name="5.6.0"></a>
# [5.6.0](https://github.com/cozy/cozy-client/compare/v5.5.0...v5.6.0) (2019-01-17)


### Features

* Dehydrate more relationships ([f20b7f9](https://github.com/cozy/cozy-client/commit/f20b7f9))
* New HasMany relations API ([7b11927](https://github.com/cozy/cozy-client/commit/7b11927))




<a name="5.5.0"></a>
# [5.5.0](https://github.com/cozy/cozy-client/compare/v5.4.6...v5.5.0) (2019-01-15)




**Note:** Version bump only for package cozy-client

<a name="5.4.2"></a>
## [5.4.2](https://github.com/cozy/cozy-client/compare/v5.4.1...v5.4.2) (2019-01-10)




**Note:** Version bump only for package cozy-client

<a name="5.4.1"></a>
## [5.4.1](https://github.com/cozy/cozy-client/compare/v5.4.0...v5.4.1) (2019-01-10)


### Bug Fixes

* **deps:** pin dependency redux-thunk to 2.3.0 ([6868e9b](https://github.com/cozy/cozy-client/commit/6868e9b))




<a name="5.4.0"></a>
# [5.4.0](https://github.com/cozy/cozy-client/compare/v5.3.0...v5.4.0) (2019-01-10)


### Features

* **cozy-client:** Deprecate connect HOC ([6b64982](https://github.com/cozy/cozy-client/commit/6b64982))




<a name="5.3.0"></a>
# [5.3.0](https://github.com/cozy/cozy-client/compare/v5.2.2...v5.3.0) (2019-01-10)


### Bug Fixes

* Fixup thunk ([cf48914](https://github.com/cozy/cozy-client/commit/cf48914))
* Update queries after association fetch more ([9fcf6b7](https://github.com/cozy/cozy-client/commit/9fcf6b7))


### Features

* Added dispatch access to Associations ([c4886cc](https://github.com/cozy/cozy-client/commit/c4886cc))
* Added redux-thunk ([2c0bbd1](https://github.com/cozy/cozy-client/commit/2c0bbd1))




<a name="5.2.2"></a>
## [5.2.2](https://github.com/cozy/cozy-client/compare/v5.2.1...v5.2.2) (2019-01-03)




**Note:** Version bump only for package cozy-client

<a name="5.2.1"></a>
## [5.2.1](https://github.com/cozy/cozy-client/compare/v5.2.0...v5.2.1) (2018-12-21)




**Note:** Version bump only for package cozy-client

<a name="5.2.0"></a>
# [5.2.0](https://github.com/cozy/cozy-client/compare/v5.1.0...v5.2.0) (2018-12-20)




**Note:** Version bump only for package cozy-client

<a name="5.1.0"></a>
# [5.1.0](https://github.com/cozy/cozy-client/compare/v5.0.7...v5.1.0) (2018-12-19)


### Features

* HasOne association ✨ ([64221d7](https://github.com/cozy/cozy-client/commit/64221d7))




<a name="5.0.7"></a>
## [5.0.7](https://github.com/cozy/cozy-client/compare/v5.0.6...v5.0.7) (2018-12-19)


### Bug Fixes

* Don't update queries with an id selector ([f912d62](https://github.com/cozy/cozy-client/commit/f912d62))




<a name="5.0.6"></a>
## [5.0.6](https://github.com/cozy/cozy-client/compare/v5.0.5...v5.0.6) (2018-12-19)




**Note:** Version bump only for package cozy-client

<a name="5.0.5"></a>
## [5.0.5](https://github.com/cozy/cozy-client/compare/v5.0.4...v5.0.5) (2018-12-19)


### Bug Fixes

* Do not crash if data is null ([6346e74](https://github.com/cozy/cozy-client/commit/6346e74))




<a name="5.0.4"></a>
## [5.0.4](https://github.com/cozy/cozy-client/compare/v5.0.3...v5.0.4) (2018-12-19)




**Note:** Version bump only for package cozy-client

<a name="5.0.3"></a>
## [5.0.3](https://github.com/cozy/cozy-client/compare/v5.0.2...v5.0.3) (2018-12-19)




**Note:** Version bump only for package cozy-client

<a name="5.0.2"></a>
## [5.0.2](https://github.com/cozy/cozy-client/compare/v5.0.1...v5.0.2) (2018-12-12)




**Note:** Version bump only for package cozy-client

<a name="5.0.1"></a>
## [5.0.1](https://github.com/cozy/cozy-client/compare/v5.0.0...v5.0.1) (2018-12-12)


### Bug Fixes

* **Query-Doc:** Return included documents to data ([fbcfd94](https://github.com/cozy/cozy-client/commit/fbcfd94))




<a name="5.0.0"></a>
# [5.0.0](https://github.com/cozy/cozy-client/compare/v4.14.0...v5.0.0) (2018-12-10)


### Bug Fixes

* **CozyClient:** Query's mutations 🚑 ([4166cbc](https://github.com/cozy/cozy-client/commit/4166cbc))


### Features

* Create with fixed id ✨ ([bc26177](https://github.com/cozy/cozy-client/commit/bc26177))


### BREAKING CHANGES

* Create or Update decision is now based on _rev
attribute existence  and not _id's one anymore




<a name="4.14.0"></a>
# [4.14.0](https://github.com/cozy/cozy-client/compare/v4.13.2...v4.14.0) (2018-12-10)


### Features

* **client:** Handle stack client unregister error ([c39d816](https://github.com/cozy/cozy-client/commit/c39d816))




<a name="4.13.2"></a>
## [4.13.2](https://github.com/cozy/cozy-client/compare/v4.13.1...v4.13.2) (2018-12-04)


### Bug Fixes

* **hasMany:** Tranforom doc into query ([7189ee5](https://github.com/cozy/cozy-client/commit/7189ee5))




<a name="4.13.1"></a>
## [4.13.1](https://github.com/cozy/cozy-client/compare/v4.13.0...v4.13.1) (2018-12-03)




**Note:** Version bump only for package cozy-client

<a name="4.13.0"></a>
# [4.13.0](https://github.com/cozy/cozy-client/compare/v4.12.2...v4.13.0) (2018-11-30)




**Note:** Version bump only for package cozy-client

<a name="4.12.2"></a>
## [4.12.2](https://github.com/cozy/cozy-client/compare/v4.12.1...v4.12.2) (2018-11-28)




**Note:** Version bump only for package cozy-client

<a name="4.11.0"></a>
# [4.11.0](https://github.com/cozy/cozy-client/compare/v4.10.0...v4.11.0) (2018-11-21)


### Features

* Save state of login to not start replication twice ([6a1f71f](https://github.com/cozy/cozy-client/commit/6a1f71f))




<a name="4.10.0"></a>
# [4.10.0](https://github.com/cozy/cozy-client/compare/v4.8.0...v4.10.0) (2018-11-19)


### Bug Fixes

* Rm safariViewController for Android ([6f1c0e6](https://github.com/cozy/cozy-client/commit/6f1c0e6))




<a name="4.9.0"></a>
# [4.9.0](https://github.com/cozy/cozy-client/compare/v4.8.0...v4.9.0) (2018-11-19)


### Bug Fixes

* Rm safariViewController for Android ([6f1c0e6](https://github.com/cozy/cozy-client/commit/6f1c0e6))




<a name="4.8.0"></a>
# [4.8.0](https://github.com/cozy/cozy-client/compare/v4.7.1...v4.8.0) (2018-11-19)




**Note:** Version bump only for package cozy-client

<a name="4.7.1"></a>
## [4.7.1](https://github.com/cozy/cozy-client/compare/v4.7.0...v4.7.1) (2018-11-19)




**Note:** Version bump only for package cozy-client

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


### Features

* Add index method to QueryDefinition ([70de235](https://github.com/cozy/cozy-client/commit/70de235))




<a name="4.4.0"></a>
# [4.4.0](https://github.com/cozy/cozy-client/compare/v4.3.0...v4.4.0) (2018-11-09)


### Features

* Ability to execute a custom request/mutation ([ec243f7](https://github.com/cozy/cozy-client/commit/ec243f7))




<a name="4.3.0"></a>
# [4.3.0](https://github.com/cozy/cozy-client/compare/v4.2.1...v4.3.0) (2018-11-09)




**Note:** Version bump only for package cozy-client

<a name="4.2.1"></a>
## [4.2.1](https://github.com/cozy/cozy-client/compare/v4.2.0...v4.2.1) (2018-11-08)




**Note:** Version bump only for package cozy-client

<a name="4.0.0"></a>
# [4.0.0](https://github.com/cozy/cozy-client/compare/v3.8.0...v4.0.0) (2018-11-05)


### Code Refactoring

* Client uses stackClient ([42428f7](https://github.com/cozy/cozy-client/commit/42428f7))


### Features

* Disable console via mock in all tests ([8e67741](https://github.com/cozy/cozy-client/commit/8e67741))


### BREAKING CHANGES

* registerOnLinks is no longer called with a CozyStackClient
but with a CozyClient




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




<a name="3.6.4"></a>
## [3.6.4](https://github.com/cozy/cozy-client/compare/v3.6.3...v3.6.4) (2018-10-30)


### Bug Fixes

* **deps:** pin dependency sift to 7.0.1 ([7de2c6a](https://github.com/cozy/cozy-client/commit/7de2c6a))




<a name="3.6.1"></a>
## [3.6.1](https://github.com/cozy/cozy-client/compare/v3.6.0...v3.6.1) (2018-10-29)


### Bug Fixes

* Revert alloc ([e3b2832](https://github.com/cozy/cozy-client/commit/e3b2832))




<a name="3.5.2"></a>
## [3.5.2](https://github.com/cozy/cozy-client/compare/v3.5.1...v3.5.2) (2018-10-29)




**Note:** Version bump only for package cozy-client

<a name="3.5.1"></a>
## [3.5.1](https://github.com/cozy/cozy-client/compare/v3.5.0...v3.5.1) (2018-10-26)




**Note:** Version bump only for package cozy-client

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




**Note:** Version bump only for package cozy-client

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




**Note:** Version bump only for package cozy-client

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




**Note:** Version bump only for package cozy-client

<a name="3.0.2"></a>
## [3.0.2](https://github.com/cozy/cozy-client/compare/v3.0.1...v3.0.2) (2018-10-12)


### Bug Fixes

* Deep compare documents updates ([7ae21c5](https://github.com/cozy/cozy-client/commit/7ae21c5))




<a name="3.0.1"></a>
## [3.0.1](https://github.com/cozy/cozy-client/compare/v3.0.0...v3.0.1) (2018-10-11)




**Note:** Version bump only for package cozy-client

<a name="3.0.0"></a>
# [3.0.0](https://github.com/cozy/cozy-client/compare/v2.24.2...v3.0.0) (2018-10-11)




**Note:** Version bump only for package cozy-client

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




**Note:** Version bump only for package cozy-client

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




**Note:** Version bump only for package cozy-client

<a name="2.21.3"></a>
## [2.21.3](https://github.com/cozy/cozy-client/compare/v2.21.2...v2.21.3) (2018-09-25)




**Note:** Version bump only for package cozy-client

<a name="2.21.2"></a>
## [2.21.2](https://github.com/cozy/cozy-client/compare/v2.21.1...v2.21.2) (2018-09-24)




**Note:** Version bump only for package cozy-client

<a name="2.21.1"></a>
## [2.21.1](https://github.com/cozy/cozy-client/compare/v2.21.0...v2.21.1) (2018-09-21)




**Note:** Version bump only for package cozy-client

<a name="2.20.2"></a>
## [2.20.2](https://github.com/cozy/cozy-client/compare/v2.20.1...v2.20.2) (2018-09-20)




**Note:** Version bump only for package cozy-client

<a name="2.20.1"></a>
## [2.20.1](https://github.com/cozy/cozy-client/compare/v2.20.0...v2.20.1) (2018-09-18)




**Note:** Version bump only for package cozy-client

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




**Note:** Version bump only for package cozy-client

<a name="2.19.1"></a>
## [2.19.1](https://github.com/cozy/cozy-client/compare/v2.19.0...v2.19.1) (2018-09-13)




**Note:** Version bump only for package cozy-client

<a name="2.19.0"></a>
# [2.19.0](https://github.com/cozy/cozy-client/compare/v2.18.1...v2.19.0) (2018-09-13)




**Note:** Version bump only for package cozy-client

<a name="2.18.1"></a>
## [2.18.1](https://github.com/cozy/cozy-client/compare/v2.18.0...v2.18.1) (2018-09-12)




**Note:** Version bump only for package cozy-client

<a name="2.17.0"></a>
# [2.17.0](https://github.com/cozy/cozy-client/compare/v2.16.0...v2.17.0) (2018-09-12)




**Note:** Version bump only for package cozy-client

<a name="2.16.0"></a>
# [2.16.0](https://github.com/cozy/cozy-client/compare/v2.15.3...v2.16.0) (2018-09-12)


### Features

* Export Association ([7347883](https://github.com/cozy/cozy-client/commit/7347883))




<a name="2.13.1"></a>
## [2.13.1](https://github.com/cozy/cozy-client/compare/v2.13.0...v2.13.1) (2018-09-07)


### Bug Fixes

* Raw() is a getter ([1314a31](https://github.com/cozy/cozy-client/commit/1314a31))




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




<a name="2.10.4"></a>
## [2.10.4](https://github.com/cozy/cozy-client/compare/v2.10.3...v2.10.4) (2018-09-05)




**Note:** Version bump only for package cozy-client

<a name="2.10.3"></a>
## [2.10.3](https://github.com/cozy/cozy-client/compare/v2.10.2...v2.10.3) (2018-09-05)




**Note:** Version bump only for package cozy-client

<a name="2.10.2"></a>
## [2.10.2](https://github.com/cozy/cozy-client/compare/v2.10.1...v2.10.2) (2018-09-05)




**Note:** Version bump only for package cozy-client

<a name="2.10.0"></a>
# [2.10.0](https://github.com/cozy/cozy-client/compare/v2.9.1...v2.10.0) (2018-09-04)


### Features

* Examples ([8406f0c](https://github.com/cozy/cozy-client/commit/8406f0c))




<a name="2.9.1"></a>
## [2.9.1](https://github.com/cozy/cozy-client/compare/v2.9.0...v2.9.1) (2018-09-04)




**Note:** Version bump only for package cozy-client

<a name="2.9.0"></a>
# [2.9.0](https://github.com/cozy/cozy-client/compare/v2.8.0...v2.9.0) (2018-09-04)


### Features

* **client:** Call onLogin on links ([cef01aa](https://github.com/cozy/cozy-client/commit/cef01aa))




<a name="2.7.3"></a>
## [2.7.3](https://github.com/cozy/cozy-client/compare/v2.7.2...v2.7.3) (2018-09-04)




**Note:** Version bump only for package cozy-client

<a name="2.7.1"></a>
## [2.7.1](https://github.com/cozy/cozy-client/compare/v2.7.0...v2.7.1) (2018-09-03)




**Note:** Version bump only for package cozy-client

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
