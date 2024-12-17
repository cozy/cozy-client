[cozy-pouch-link](../README.md) / PouchLink

# Class: PouchLink

Link to be passed to a `CozyClient` instance to support CouchDB. It instantiates
PouchDB collections for each doctype that it supports and knows how
to respond to queries and mutations.

## Hierarchy

*   `default`

    ↳ **`PouchLink`**

## Constructors

### constructor

• **new PouchLink**(`opts`)

constructor - Initializes a new PouchLink

*Parameters*

| Name | Type |
| :------ | :------ |
| `opts` | `PouchLinkOptions` |

*Overrides*

CozyLink.constructor

*Defined in*

[CozyPouchLink.js:97](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L97)

## Properties

### client

• **client**: `any`

*Defined in*

[CozyPouchLink.js:172](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L172)

***

### doctypes

• **doctypes**: `string`\[]

*Defined in*

[CozyPouchLink.js:115](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L115)

***

### doctypesReplicationOptions

• **doctypesReplicationOptions**: `Record`<`string`, `any`>

*Defined in*

[CozyPouchLink.js:116](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L116)

***

### indexes

• **indexes**: `Object`

*Defined in*

[CozyPouchLink.js:117](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L117)

***

### initialSync

• **initialSync**: `boolean`

*Defined in*

[CozyPouchLink.js:121](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L121)

***

### options

• **options**: { `replicationInterval`: `number`  } & `PouchLinkOptions`

*Defined in*

[CozyPouchLink.js:109](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L109)

***

### performanceApi

• **performanceApi**: `any`

*Defined in*

[CozyPouchLink.js:137](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L137)

***

### periodicSync

• **periodicSync**: `boolean`

*Defined in*

[CozyPouchLink.js:122](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L122)

***

### pouches

• **pouches**: `any`

*Defined in*

[CozyPouchLink.js:243](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L243)

***

### replicationStatus

• **replicationStatus**: `Record`<`string`, `ReplicationStatus`>

*Defined in*

[CozyPouchLink.js:125](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L125)

***

### storage

• **storage**: `PouchLocalStorage`

*Defined in*

[CozyPouchLink.js:118](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L118)

## Methods

### addReferencesTo

▸ **addReferencesTo**(`mutation`): `Promise`<`void`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `mutation` | `any` |

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:837](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L837)

***

### createDocument

▸ **createDocument**(`mutation`): `Promise`<`any`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `mutation` | `any` |

*Returns*

`Promise`<`any`>

*Defined in*

[CozyPouchLink.js:798](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L798)

***

### createIndex

▸ **createIndex**(`fields`, `indexOption?`): `Promise`<`PouchDbIndex`>

Create the PouchDB index if not existing

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `fields` | `any`\[] | Fields to index |
| `indexOption` | `Object` | Options for the index |
| `indexOption.doctype` | `string` | - |
| `indexOption.indexName` | `string` | - |
| `indexOption.partialFilter` | `any` | - |

*Returns*

`Promise`<`PouchDbIndex`>

*Defined in*

[CozyPouchLink.js:603](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L603)

***

### dbMethod

▸ **dbMethod**(`method`, `mutation`): `Promise`<`any`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `method` | `any` |
| `mutation` | `any` |

*Returns*

`Promise`<`any`>

*Defined in*

[CozyPouchLink.js:841](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L841)

***

### deleteDocument

▸ **deleteDocument**(`mutation`): `Promise`<`any`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `mutation` | `any` |

*Returns*

`Promise`<`any`>

*Defined in*

[CozyPouchLink.js:826](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L826)

***

### executeMutation

▸ **executeMutation**(`mutation`, `options`, `result`, `forward`): `Promise`<`any`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `mutation` | `any` |
| `options` | `any` |
| `result` | `any` |
| `forward` | `any` |

*Returns*

`Promise`<`any`>

*Defined in*

[CozyPouchLink.js:760](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L760)

***

### executeQuery

▸ **executeQuery**(`__namedParameters`): `Promise`<{ `data`: `any` = res.cozyPouchData; `meta`: `undefined` ; `next`: `undefined` ; `skip`: `undefined` = offset } | { `data`: `any` ; `meta`: { `count`: `any` = docs.length } ; `next`: `boolean` ; `skip`: `any` = offset }>

*Parameters*

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |

*Returns*

`Promise`<{ `data`: `any` = res.cozyPouchData; `meta`: `undefined` ; `next`: `undefined` ; `skip`: `undefined` = offset } | { `data`: `any` ; `meta`: { `count`: `any` = docs.length } ; `next`: `boolean` ; `skip`: `any` = offset }>

*Defined in*

[CozyPouchLink.js:680](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L680)

***

### findExistingIndex

▸ **findExistingIndex**(`doctype`, `options`, `indexName`): `PouchDbIndex`

Retrieve the PouchDB index if exist, undefined otherwise

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `doctype` | `string` | The query's doctype |
| `options` | `MangoQueryOptions` | The find options |
| `indexName` | `string` | The index name |

*Returns*

`PouchDbIndex`

*Defined in*

[CozyPouchLink.js:627](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L627)

***

### getChanges

▸ **getChanges**(`doctype`, `options`): `Promise`<`PouchDBChangesResults`>

Get PouchDB changes
See https://pouchdb.com/api.html#changes

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `doctype` | `string` | The PouchDB database's doctype |
| `options` | `any` | The changes options. See https://pouchdb.com/api.html#changes |

*Returns*

`Promise`<`PouchDBChangesResults`>

The changes

*Defined in*

[CozyPouchLink.js:473](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L473)

***

### getDbInfo

▸ **getDbInfo**(`doctype`): `Promise`<`PouchDBInfo`>

Get PouchDB database info
See https://pouchdb.com/api.html#database_information

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `doctype` | `string` | The PouchDB database's doctype |

*Returns*

`Promise`<`PouchDBInfo`>

The db info

*Defined in*

[CozyPouchLink.js:488](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L488)

***

### getPouch

▸ **getPouch**(`doctype`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doctype` | `any` |

*Returns*

`any`

*Defined in*

[CozyPouchLink.js:394](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L394)

***

### getReplicationURL

▸ **getReplicationURL**(`doctype`): `string`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doctype` | `any` |

*Returns*

`string`

*Defined in*

[CozyPouchLink.js:152](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L152)

***

### getSyncInfo

▸ **getSyncInfo**(`doctype`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doctype` | `any` |

*Returns*

`any`

*Defined in*

[CozyPouchLink.js:390](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L390)

***

### handleDoctypeSyncEnd

▸ **handleDoctypeSyncEnd**(`doctype`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doctype` | `any` |

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:301](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L301)

***

### handleDoctypeSyncStart

▸ **handleDoctypeSyncStart**(`doctype`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doctype` | `any` |

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:296](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L296)

***

### handleOnSync

▸ **handleOnSync**(`doctypeUpdates`): `void`

Receives PouchDB updates (documents grouped by doctype).
Normalizes the data (.id -> .\_id, .rev -> \_rev).
Passes the data to the client and to the onSync handler.

Emits an event (pouchlink:sync:end) when the sync (all doctypes) is done

*Parameters*

| Name | Type |
| :------ | :------ |
| `doctypeUpdates` | `any` |

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:282](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L282)

***

### hasIndex

▸ **hasIndex**(`name`): `boolean`

*Parameters*

| Name | Type |
| :------ | :------ |
| `name` | `any` |

*Returns*

`boolean`

*Defined in*

[CozyPouchLink.js:589](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L589)

***

### migrateAdapter

▸ **migrateAdapter**(`params`): `Promise`<`void`>

Migrate the current adapter

**`property`** {string} \[fromAdapter] - The current adapter type, e.g. 'idb'

**`property`** {string} \[toAdapter] - The new adapter type, e.g. 'indexeddb'

**`property`** {string} \[url] - The Cozy URL

**`property`** {Array<object>} \[plugins] - The PouchDB plugins

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `MigrationParams` | Migration params |

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:186](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L186)

***

### needsToWaitWarmup

▸ **needsToWaitWarmup**(`doctype`): `Promise`<`boolean`>

Check if there is warmup queries for this doctype
and return if those queries are already warmed up or not

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `doctype` | `string` | Doctype to check |

*Returns*

`Promise`<`boolean`>

the need to wait for the warmup

*Defined in*

[CozyPouchLink.js:575](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L575)

***

### onLogin

▸ **onLogin**(): `Promise`<`void`>

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:205](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L205)

***

### onSyncError

▸ **onSyncError**(`error`): `Promise`<`void`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `error` | `any` |

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:370](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L370)

***

### persistCozyData

▸ **persistCozyData**(`data`, `forward?`): `Promise`<`void`>

*Parameters*

| Name | Type | Default value |
| :------ | :------ | :------ |
| `data` | `any` | `undefined` |
| `forward` | (`operation`: `any`, `result`: `any`) => `void` | `doNothing` |

*Returns*

`Promise`<`void`>

*Overrides*

CozyLink.persistCozyData

*Defined in*

[CozyPouchLink.js:523](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L523)

***

### registerClient

▸ **registerClient**(`client`): `Promise`<`void`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `client` | `any` |

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:171](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L171)

***

### request

▸ **request**(`operation`, `options`, `result?`, `forward?`): `Promise`<`any`>

*Parameters*

| Name | Type | Default value |
| :------ | :------ | :------ |
| `operation` | `any` | `undefined` |
| `options` | `any` | `undefined` |
| `result` | `any` | `null` |
| `forward` | (`operation`: `any`, `result`: `any`) => `void` | `doNothing` |

*Returns*

`Promise`<`any`>

*Overrides*

CozyLink.request

*Defined in*

[CozyPouchLink.js:413](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L413)

***

### reset

▸ **reset**(): `Promise`<`void`>

*Returns*

`Promise`<`void`>

*Overrides*

CozyLink.reset

*Defined in*

[CozyPouchLink.js:266](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L266)

***

### sanitizeJsonApi

▸ **sanitizeJsonApi**(`data`): `Omit`<`Pick`<`any`, `string` | `number` | `symbol`>, `"attributes"` | `"meta"`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `data` | `any` |

*Returns*

`Omit`<`Pick`<`any`, `string` | `number` | `symbol`>, `"attributes"` | `"meta"`>

*Defined in*

[CozyPouchLink.js:496](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L496)

***

### startReplication

▸ **startReplication**(): `void`

User of the link can call this to start ongoing replications.
Typically, it can be used when the application regains focus.

Emits pouchlink:sync:start event when the replication begins

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:330](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L330)

***

### startReplicationWithDebounce

▸ **startReplicationWithDebounce**(): `void`

Debounced version of startReplication() method

Debounce delay can be configured through constructor's `syncDebounceDelayInMs` option

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:343](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L343)

***

### stopReplication

▸ **stopReplication**(): `void`

User of the link can call this to stop ongoing replications.
Typically, it can be used when the applications loses focus.

Emits pouchlink:sync:stop event

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:362](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L362)

***

### supportsOperation

▸ **supportsOperation**(`operation`): `boolean`

*Parameters*

| Name | Type |
| :------ | :------ |
| `operation` | `any` |

*Returns*

`boolean`

*Defined in*

[CozyPouchLink.js:398](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L398)

***

### syncImmediately

▸ **syncImmediately**(): `Promise`<`void`>

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:871](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L871)

***

### updateDocument

▸ **updateDocument**(`mutation`): `Promise`<`any`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `mutation` | `any` |

*Returns*

`Promise`<`any`>

*Defined in*

[CozyPouchLink.js:803](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L803)

***

### updateDocuments

▸ **updateDocuments**(`mutation`): `Promise`<`any`\[]>

*Parameters*

| Name | Type |
| :------ | :------ |
| `mutation` | `any` |

*Returns*

`Promise`<`any`\[]>

*Defined in*

[CozyPouchLink.js:808](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L808)

***

### getPouchAdapterName

▸ `Static` **getPouchAdapterName**(`localStorage`): `Promise`<`string`>

Return the PouchDB adapter name.
Should be IndexedDB for newest adapters.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `localStorage` | `LocalStorage` | Methods to access local storage |

*Returns*

`Promise`<`string`>

The adapter name

*Defined in*

[CozyPouchLink.js:147](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L147)
