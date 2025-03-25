[cozy-pouch-link](../README.md) / SQLiteQuery

# Class: SQLiteQuery

## Hierarchy

*   `DatabaseQueryEngine`

    ↳ **`SQLiteQuery`**

## Constructors

### constructor

• **new SQLiteQuery**(`pouchManager`, `doctype`)

*Parameters*

| Name | Type |
| :------ | :------ |
| `pouchManager` | `any` |
| `doctype` | `any` |

*Overrides*

DatabaseQueryEngine.constructor

*Defined in*

[db/sqlite/sqliteDb.js:23](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/sqlite/sqliteDb.js#L23)

## Properties

### client

• **client**: `any`

*Defined in*

[db/sqlite/sqliteDb.js:26](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/sqlite/sqliteDb.js#L26)

***

### db

• **db**: `any`

*Defined in*

[db/sqlite/sqliteDb.js:25](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/sqlite/sqliteDb.js#L25)

***

### doctype

• **doctype**: `any`

*Defined in*

[db/sqlite/sqliteDb.js:27](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/sqlite/sqliteDb.js#L27)

## Methods

### allDocs

▸ **allDocs**(`__namedParameters?`): `Promise`<{ `data`: `any` = doc; `meta`: `undefined` ; `next`: `undefined` ; `skip`: `undefined`  } | { `data`: `any`\[] = parsedResults; `meta`: { `count`: `number` = parsedResults.length } ; `next`: `boolean` ; `skip`: `number`  }>

*Parameters*

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.limit` | `any` |
| `__namedParameters.skip` | `number` |

*Returns*

`Promise`<{ `data`: `any` = doc; `meta`: `undefined` ; `next`: `undefined` ; `skip`: `undefined`  } | { `data`: `any`\[] = parsedResults; `meta`: { `count`: `number` = parsedResults.length } ; `next`: `boolean` ; `skip`: `number`  }>

*Overrides*

DatabaseQueryEngine.allDocs

*Defined in*

[db/sqlite/sqliteDb.js:45](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/sqlite/sqliteDb.js#L45)

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

[db/sqlite/sqliteDb.js:86](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/sqlite/sqliteDb.js#L86)

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

[db/sqlite/sqliteDb.js:60](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/sqlite/sqliteDb.js#L60)

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

[db/sqlite/sqliteDb.js:74](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/sqlite/sqliteDb.js#L74)

***

### openDB

▸ **openDB**(`dbName`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `dbName` | `any` |

*Returns*

`any`

*Overrides*

DatabaseQueryEngine.openDB

*Defined in*

[db/sqlite/sqliteDb.js:30](https://github.com/cozy/cozy-client/blob/master/packages/cozy-pouch-link/src/db/sqlite/sqliteDb.js#L30)
