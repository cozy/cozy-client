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

[CozyPouchLink.js:162](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L162)

***

### doctypes

• **doctypes**: `string`\[]

*Defined in*

[CozyPouchLink.js:105](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L105)

***

### doctypesReplicationOptions

• **doctypesReplicationOptions**: `Record`<`string`, `any`>

*Defined in*

[CozyPouchLink.js:106](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L106)

***

### indexes

• **indexes**: `Object`

*Defined in*

[CozyPouchLink.js:107](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L107)

***

### initialSync

• **initialSync**: `boolean`

*Defined in*

[CozyPouchLink.js:111](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L111)

***

### options

• **options**: { `replicationInterval`: `number`  } & `PouchLinkOptions`

*Defined in*

[CozyPouchLink.js:99](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L99)

***

### performanceApi

• **performanceApi**: `any`

*Defined in*

[CozyPouchLink.js:127](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L127)

***

### periodicSync

• **periodicSync**: `boolean`

*Defined in*

[CozyPouchLink.js:112](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L112)

***

### pouches

• **pouches**: `any`

*Defined in*

[CozyPouchLink.js:237](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L237)

***

### queryEngine

• **queryEngine**: `DatabaseQueryEngine` | typeof `default`

*Defined in*

[CozyPouchLink.js:235](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L235)

***

### replicationStatus

• **replicationStatus**: `Record`<`string`, `ReplicationStatus`>

*Defined in*

[CozyPouchLink.js:115](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L115)

***

### storage

• **storage**: `PouchLocalStorage`

*Defined in*

[CozyPouchLink.js:108](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L108)

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

[CozyPouchLink.js:723](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L723)

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

[CozyPouchLink.js:684](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L684)

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

[CozyPouchLink.js:727](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L727)

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

[CozyPouchLink.js:712](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L712)

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

[CozyPouchLink.js:646](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L646)

***

### executeQuery

▸ **executeQuery**(`__namedParameters`): `Promise`<`any`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |

*Returns*

`Promise`<`any`>

*Defined in*

[CozyPouchLink.js:597](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L597)

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

[CozyPouchLink.js:502](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L502)

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

[CozyPouchLink.js:517](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L517)

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

[CozyPouchLink.js:415](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L415)

***

### getQueryEngineFromDoctype

▸ **getQueryEngineFromDoctype**(`doctype`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doctype` | `any` |

*Returns*

`any`

*Defined in*

[CozyPouchLink.js:407](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L407)

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

[CozyPouchLink.js:142](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L142)

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

[CozyPouchLink.js:403](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L403)

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

[CozyPouchLink.js:305](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L305)

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

[CozyPouchLink.js:300](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L300)

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

[CozyPouchLink.js:278](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L278)

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

[CozyPouchLink.js:593](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L593)

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

[CozyPouchLink.js:176](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L176)

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

[CozyPouchLink.js:579](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L579)

***

### onLogin

▸ **onLogin**(): `Promise`<`void`>

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:195](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L195)

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

[CozyPouchLink.js:383](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L383)

***

### persistCozyData

▸ **persistCozyData**(`doc`, `forward?`): `Promise`<`any`>

We persist in the local Pouch database all the documents that do not
exist on the remote Couch database.

Those documents are computed by the cozy-stack then are sent to the
client using JSON-API format

*Parameters*

| Name | Type | Default value |
| :------ | :------ | :------ |
| `doc` | `any` | `undefined` |
| `forward` | (`operation`: `any`, `result`: `any`) => `void` | `doNothing` |

*Returns*

`Promise`<`any`>

*Overrides*

CozyLink.persistCozyData

*Defined in*

[CozyPouchLink.js:532](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L532)

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

[CozyPouchLink.js:161](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L161)

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

[CozyPouchLink.js:442](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L442)

***

### reset

▸ **reset**(): `Promise`<`void`>

*Returns*

`Promise`<`void`>

*Overrides*

CozyLink.reset

*Defined in*

[CozyPouchLink.js:262](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L262)

***

### startReplication

▸ **startReplication**(`options?`): `void`

User of the link can call this to start ongoing replications.
Typically, it can be used when the application regains focus.

Emits pouchlink:sync:start event when the replication begins

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | The options |
| `options.waitForReplications` | `boolean` | - |

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:339](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L339)

***

### startReplicationWithDebounce

▸ **startReplicationWithDebounce**(`options?`): `void`

Debounced version of startReplication() method

Debounce delay can be configured through constructor's `syncDebounceDelayInMs` option

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | The options |
| `options.waitForReplications` | `boolean` | - |

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:356](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L356)

***

### stopReplication

▸ **stopReplication**(): `void`

User of the link can call this to stop ongoing replications.
Typically, it can be used when the applications loses focus.

Emits pouchlink:sync:stop event

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:375](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L375)

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

[CozyPouchLink.js:423](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L423)

***

### syncImmediately

▸ **syncImmediately**(): `Promise`<`void`>

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:757](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L757)

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

[CozyPouchLink.js:689](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L689)

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

[CozyPouchLink.js:694](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L694)

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

[CozyPouchLink.js:137](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L137)
