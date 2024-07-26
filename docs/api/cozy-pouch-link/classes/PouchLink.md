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

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | `Object` | - |
| `opts.doctypes` | `string`\[] | Doctypes to replicate |
| `opts.doctypesReplicationOptions` | `any`\[] | A mapping from doctypes to replication options. All pouch replication options can be used, as well as the "strategy" option that determines which way the replication is done (can be "sync", "fromRemote" or "toRemote") |
| `opts.platform` | `LinkPlatform` | Platform specific adapters and methods |
| `opts.replicationInterval` | `number` | - |

*Overrides*

CozyLink.constructor

*Defined in*

[CozyPouchLink.js:83](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L83)

## Properties

### client

• **client**: `any`

*Defined in*

[CozyPouchLink.js:136](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L136)

***

### doctypes

• **doctypes**: `string`\[]

*Defined in*

[CozyPouchLink.js:93](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L93)

***

### doctypesReplicationOptions

• **doctypesReplicationOptions**: `any`\[]

*Defined in*

[CozyPouchLink.js:94](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L94)

***

### indexes

• **indexes**: `Object`

*Defined in*

[CozyPouchLink.js:95](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L95)

***

### options

• **options**: { `replicationInterval`: `number`  } & { `doctypes`: `string`\[] ; `doctypesReplicationOptions`: `any`\[] ; `platform`: `LinkPlatform` ; `replicationInterval`: `number`  }

*Defined in*

[CozyPouchLink.js:87](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L87)

***

### pouches

• **pouches**: `any`

*Defined in*

[CozyPouchLink.js:206](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L206)

***

### replicationStatus

• **replicationStatus**: `Record`<`string`, `ReplicationStatus`>

*Defined in*

[CozyPouchLink.js:101](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L101)

***

### storage

• **storage**: `PouchLocalStorage`

*Defined in*

[CozyPouchLink.js:96](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L96)

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

[CozyPouchLink.js:607](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L607)

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

[CozyPouchLink.js:568](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L568)

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

[CozyPouchLink.js:611](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L611)

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

[CozyPouchLink.js:596](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L596)

***

### ensureIndex

▸ **ensureIndex**(`doctype`, `query`): `Promise`<`any`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `doctype` | `any` |
| `query` | `any` |

*Returns*

`Promise`<`any`>

*Defined in*

[CozyPouchLink.js:467](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L467)

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

[CozyPouchLink.js:539](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L539)

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

[CozyPouchLink.js:485](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L485)

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

[CozyPouchLink.js:323](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L323)

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

[CozyPouchLink.js:116](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L116)

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

[CozyPouchLink.js:319](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L319)

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

[CozyPouchLink.js:260](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L260)

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

[CozyPouchLink.js:255](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L255)

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

[CozyPouchLink.js:241](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L241)

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

[CozyPouchLink.js:449](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L449)

***

### mergePartialIndexInSelector

▸ **mergePartialIndexInSelector**(`selector`, `partialFilter`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `selector` | `any` |
| `partialFilter` | `any` |

*Returns*

`any`

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

[CozyPouchLink.js:150](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L150)

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

[CozyPouchLink.js:435](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L435)

***

### onLogin

▸ **onLogin**(): `Promise`<`void`>

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:169](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L169)

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

[CozyPouchLink.js:299](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L299)

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

[CozyPouchLink.js:390](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L390)

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

[CozyPouchLink.js:135](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L135)

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

[CozyPouchLink.js:342](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L342)

***

### reset

▸ **reset**(): `Promise`<`void`>

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:225](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L225)

***

### startReplication

▸ **startReplication**(): `void`

User of the link can call this to start ongoing replications.
Typically, it can be used when the application regains focus.

Emits pouchlink:sync:start event when the replication begins

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:274](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L274)

***

### stopReplication

▸ **stopReplication**(): `void`

User of the link can call this to stop ongoing replications.
Typically, it can be used when the applications loses focus.

Emits pouchlink:sync:stop event

*Returns*

`void`

*Defined in*

[CozyPouchLink.js:291](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L291)

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

[CozyPouchLink.js:327](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L327)

***

### syncImmediately

▸ **syncImmediately**(): `Promise`<`void`>

*Returns*

`Promise`<`void`>

*Defined in*

[CozyPouchLink.js:633](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L633)

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

[CozyPouchLink.js:573](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L573)

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

[CozyPouchLink.js:578](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L578)

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

[CozyPouchLink.js:111](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/CozyPouchLink.js#L111)
