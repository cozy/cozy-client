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

[CozyPouchLink.js:95](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L95)

## Properties

### client

• **client**: `any`

*Defined in*

[CozyPouchLink.js:166](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L166)

***

### doctypes

• **doctypes**: `string`\[]

*Defined in*

[CozyPouchLink.js:112](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L112)

***

### doctypesReplicationOptions

• **doctypesReplicationOptions**: `Record`<`string`, `any`>

*Defined in*

[CozyPouchLink.js:113](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L113)

***

### indexes

• **indexes**: `Object`

*Defined in*

[CozyPouchLink.js:114](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L114)

***

### initialSync

• **initialSync**: `boolean`

*Defined in*

[CozyPouchLink.js:118](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L118)

***

### options

• **options**: { `replicationInterval`: `number`  } & `PouchLinkOptions`

*Defined in*

[CozyPouchLink.js:106](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L106)

***

### periodicSync

• **periodicSync**: `boolean`

*Defined in*

[CozyPouchLink.js:119](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L119)

***

### pouches

• **pouches**: `any`

*Defined in*

[CozyPouchLink.js:236](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L236)

***

### replicationStatus

• **replicationStatus**: `Record`<`string`, `ReplicationStatus`>

*Defined in*

[CozyPouchLink.js:122](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L122)

***

### storage

• **storage**: `PouchLocalStorage`

*Defined in*

[CozyPouchLink.js:115](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L115)

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

[CozyPouchLink.js:789](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L789)

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

[CozyPouchLink.js:750](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L750)

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

[CozyPouchLink.js:581](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L581)

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

[CozyPouchLink.js:793](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L793)

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

[CozyPouchLink.js:778](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L778)

***

### executeMutation

▸ **executeMutation**(`mutation`, `result`, `forward`): `Promise`<`any`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `mutation` | `any` |
| `result` | `any` |
| `forward` | `any` |

*Returns*

`Promise`<`any`>

*Defined in*

[CozyPouchLink.js:720](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L720)

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

[CozyPouchLink.js:658](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L658)

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

[CozyPouchLink.js:605](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L605)

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

[CozyPouchLink.js:458](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L458)

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

[CozyPouchLink.js:473](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L473)

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

[CozyPouchLink.js:383](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L383)

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

[CozyPouchLink.js:146](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L146)

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

[CozyPouchLink.js:379](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L379)

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

[CozyPouchLink.js:290](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L290)

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

[CozyPouchLink.js:285](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L285)

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

[CozyPouchLink.js:271](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L271)

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

[CozyPouchLink.js:567](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L567)

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

[CozyPouchLink.js:180](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L180)

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

[CozyPouchLink.js:553](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L553)

***

### onLogin

▸ **onLogin**(): `Promise`<`void`>

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:199](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L199)

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

[CozyPouchLink.js:359](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L359)

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

[CozyPouchLink.js:508](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L508)

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

[CozyPouchLink.js:165](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L165)

***

### request

▸ **request**(`operation`, `result?`, `forward?`): `Promise`<`any`>

*Parameters*

| Name | Type | Default value |
| :------ | :------ | :------ |
| `operation` | `any` | `undefined` |
| `result` | `any` | `null` |
| `forward` | (`operation`: `any`, `result`: `any`) => `void` | `doNothing` |

*Returns*

`Promise`<`any`>

*Overrides*

CozyLink.request

*Defined in*

[CozyPouchLink.js:402](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L402)

***

### reset

▸ **reset**(): `Promise`<`void`>

*Returns*

`Promise`<`void`>

*Overrides*

CozyLink.reset

*Defined in*

[CozyPouchLink.js:255](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L255)

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

[CozyPouchLink.js:481](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L481)

***

### startReplication

▸ **startReplication**(): `void`

User of the link can call this to start ongoing replications.
Typically, it can be used when the application regains focus.

Emits pouchlink:sync:start event when the replication begins

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:319](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L319)

***

### startReplicationWithDebounce

▸ **startReplicationWithDebounce**(): `void`

Debounced version of startReplication() method

Debounce delay can be configured through constructor's `syncDebounceDelayInMs` option

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:332](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L332)

***

### stopReplication

▸ **stopReplication**(): `void`

User of the link can call this to stop ongoing replications.
Typically, it can be used when the applications loses focus.

Emits pouchlink:sync:stop event

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:351](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L351)

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

[CozyPouchLink.js:387](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L387)

***

### syncImmediately

▸ **syncImmediately**(): `Promise`<`void`>

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:815](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L815)

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

[CozyPouchLink.js:755](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L755)

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

[CozyPouchLink.js:760](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L760)

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

[CozyPouchLink.js:141](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L141)
