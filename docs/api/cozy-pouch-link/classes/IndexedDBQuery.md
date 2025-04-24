[cozy-pouch-link](../README.md) / IndexedDBQuery

# Class: IndexedDBQuery

## Hierarchy

*   `DatabaseQueryEngine`

    ↳ **`IndexedDBQuery`**

## Constructors

### constructor

• **new IndexedDBQuery**(`pouchManager`, `doctype`)

*Parameters*

| Name | Type |
| :------ | :------ |
| `pouchManager` | `any` |
| `doctype` | `any` |

*Overrides*

DatabaseQueryEngine.constructor

*Defined in*

[db/idb/idb.js:15](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/idb/idb.js#L15)

## Properties

### client

• **client**: `any`

*Defined in*

[db/idb/idb.js:18](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/idb/idb.js#L18)

***

### db

• **db**: `IDBDatabase`

*Defined in*

[db/idb/idb.js:17](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/idb/idb.js#L17)

***

### doctype

• **doctype**: `any`

*Defined in*

[db/idb/idb.js:19](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/idb/idb.js#L19)

***

### openRequest

• **openRequest**: `IDBOpenDBRequest`

*Defined in*

[db/idb/idb.js:35](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/idb/idb.js#L35)

***

### storeName

• **storeName**: `string`

*Defined in*

[db/idb/idb.js:20](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/idb/idb.js#L20)

## Methods

### allDocs

▸ **allDocs**(`__namedParameters?`): `Promise`<{ `data`: `any` = doc; `meta`: `undefined` ; `next`: `undefined` ; `skip`: `undefined`  } | { `data`: `any`\[] = parsedResults; `meta`: { `count`: `number` = parsedResults.length } ; `next`: `boolean` ; `skip`: `number`  }>

*Parameters*

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.limit` | `number` |
| `__namedParameters.skip` | `number` |

*Returns*

`Promise`<{ `data`: `any` = doc; `meta`: `undefined` ; `next`: `undefined` ; `skip`: `undefined`  } | { `data`: `any`\[] = parsedResults; `meta`: { `count`: `number` = parsedResults.length } ; `next`: `boolean` ; `skip`: `number`  }>

*Overrides*

DatabaseQueryEngine.allDocs

*Defined in*

[db/idb/idb.js:42](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/idb/idb.js#L42)

***

### find

▸ **find**(`options`): `Promise`<{ `data`: `any` = doc; `meta`: `undefined` ; `next`: `undefined` ; `skip`: `undefined`  } | { `data`: `any`\[] = parsedResults; `meta`: { `count`: `number` = parsedResults.length } ; `next`: `boolean` ; `skip`: `number`  }>

*Parameters*

| Name | Type |
| :------ | :------ |
| `options` | `any` |

*Returns*

`Promise`<{ `data`: `any` = doc; `meta`: `undefined` ; `next`: `undefined` ; `skip`: `undefined`  } | { `data`: `any`\[] = parsedResults; `meta`: { `count`: `number` = parsedResults.length } ; `next`: `boolean` ; `skip`: `number`  }>

*Overrides*

DatabaseQueryEngine.find

*Defined in*

[db/idb/idb.js:91](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/idb/idb.js#L91)

***

### getById

▸ **getById**(`id`): `Promise`<{ `data`: `any` = doc; `meta`: `undefined` ; `next`: `undefined` ; `skip`: `undefined`  } | { `data`: `any`\[] = parsedResults; `meta`: { `count`: `number` = parsedResults.length } ; `next`: `boolean` ; `skip`: `number`  }>

*Parameters*

| Name | Type |
| :------ | :------ |
| `id` | `any` |

*Returns*

`Promise`<{ `data`: `any` = doc; `meta`: `undefined` ; `next`: `undefined` ; `skip`: `undefined`  } | { `data`: `any`\[] = parsedResults; `meta`: { `count`: `number` = parsedResults.length } ; `next`: `boolean` ; `skip`: `number`  }>

*Overrides*

DatabaseQueryEngine.getById

*Defined in*

[db/idb/idb.js:58](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/idb/idb.js#L58)

***

### getByIds

▸ **getByIds**(`ids`): `Promise`<{ `data`: `any` = doc; `meta`: `undefined` ; `next`: `undefined` ; `skip`: `undefined`  } | { `data`: `any`\[] = parsedResults; `meta`: { `count`: `number` = parsedResults.length } ; `next`: `boolean` ; `skip`: `number`  }>

*Parameters*

| Name | Type |
| :------ | :------ |
| `ids` | `any` |

*Returns*

`Promise`<{ `data`: `any` = doc; `meta`: `undefined` ; `next`: `undefined` ; `skip`: `undefined`  } | { `data`: `any`\[] = parsedResults; `meta`: { `count`: `number` = parsedResults.length } ; `next`: `boolean` ; `skip`: `number`  }>

*Overrides*

DatabaseQueryEngine.getByIds

*Defined in*

[db/idb/idb.js:74](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/idb/idb.js#L74)

***

### openDB

▸ **openDB**(`dbName`, `version?`, `__namedParameters?`): `void`

*Parameters*

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dbName` | `any` | `undefined` |
| `version` | `any` | `undefined` |
| `__namedParameters` | `Object` | `{}` |
| `__namedParameters.forceName` | `boolean` | `undefined` |

*Returns*

`void`

*Overrides*

DatabaseQueryEngine.openDB

*Defined in*

[db/idb/idb.js:24](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/idb/idb.js#L24)
