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

[CozyPouchLink.js:87](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L87)

## Properties

### client

• **client**: `any`

*Defined in*

[CozyPouchLink.js:141](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L141)

***

### doctypes

• **doctypes**: `string`\[]

*Defined in*

[CozyPouchLink.js:97](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L97)

***

### doctypesReplicationOptions

• **doctypesReplicationOptions**: `Record`<`string`, `any`>

*Defined in*

[CozyPouchLink.js:98](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L98)

***

### ignoreWarmup

• **ignoreWarmup**: `any`

*Defined in*

[CozyPouchLink.js:103](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L103)

***

### indexes

• **indexes**: `Object`

*Defined in*

[CozyPouchLink.js:99](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L99)

***

### options

• **options**: { `replicationInterval`: `number`  } & `PouchLinkOptions`

*Defined in*

[CozyPouchLink.js:91](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L91)

***

### pouches

• **pouches**: `any`

*Defined in*

[CozyPouchLink.js:211](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L211)

***

### replicationStatus

• **replicationStatus**: `Record`<`string`, `ReplicationStatus`>

*Defined in*

[CozyPouchLink.js:106](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L106)

***

### storage

• **storage**: `PouchLocalStorage`

*Defined in*

[CozyPouchLink.js:100](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L100)

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

[CozyPouchLink.js:670](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L670)

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

[CozyPouchLink.js:631](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L631)

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

[CozyPouchLink.js:468](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L468)

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

[CozyPouchLink.js:674](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L674)

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

[CozyPouchLink.js:659](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L659)

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

[CozyPouchLink.js:601](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L601)

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

[CozyPouchLink.js:532](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L532)

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

[CozyPouchLink.js:492](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L492)

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

[CozyPouchLink.js:328](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L328)

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

[CozyPouchLink.js:121](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L121)

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

[CozyPouchLink.js:324](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L324)

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

[CozyPouchLink.js:265](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L265)

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

[CozyPouchLink.js:260](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L260)

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

[CozyPouchLink.js:246](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L246)

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

[CozyPouchLink.js:454](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L454)

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

[CozyPouchLink.js:155](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L155)

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

[CozyPouchLink.js:440](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L440)

***

### onLogin

▸ **onLogin**(): `Promise`<`void`>

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:174](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L174)

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

[CozyPouchLink.js:304](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L304)

***

### persistData

▸ **persistData**(`data`, `forward?`): `Promise`<`void`>

*Parameters*

| Name | Type | Default value |
| :------ | :------ | :------ |
| `data` | `any` | `undefined` |
| `forward` | (`operation`: `any`, `result`: `any`) => `void` | `doNothing` |

*Returns*

`Promise`<`void`>

*Overrides*

CozyLink.persistData

*Defined in*

[CozyPouchLink.js:395](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L395)

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

[CozyPouchLink.js:140](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L140)

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

[CozyPouchLink.js:347](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L347)

***

### reset

▸ **reset**(): `Promise`<`void`>

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:230](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L230)

***

### startReplication

▸ **startReplication**(): `void`

User of the link can call this to start ongoing replications.
Typically, it can be used when the application regains focus.

Emits pouchlink:sync:start event when the replication begins

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:279](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L279)

***

### stopReplication

▸ **stopReplication**(): `void`

User of the link can call this to stop ongoing replications.
Typically, it can be used when the applications loses focus.

Emits pouchlink:sync:stop event

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:296](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L296)

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

[CozyPouchLink.js:332](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L332)

***

### syncImmediately

▸ **syncImmediately**(): `Promise`<`void`>

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:696](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L696)

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

[CozyPouchLink.js:636](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L636)

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

[CozyPouchLink.js:641](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L641)

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

[CozyPouchLink.js:116](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L116)
