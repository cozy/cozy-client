[cozy-client](../README.md) / HasManyTriggers

# Class: HasManyTriggers

Association used for konnectors to retrieve all their related triggers.

## Hierarchy

*   [`HasMany`](hasmany.md)

    ↳ **`HasManyTriggers`**

## Constructors

### constructor

• **new HasManyTriggers**(`target`, `name`, `doctype`, `options`)

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `any` | Original object containing raw data |
| `name` | `string` | Attribute under which the association is stored |
| `doctype` | `string` | Doctype of the documents managed by the association |
| `options` | `Object` | Options passed from the client |
| `options.dispatch` | `Function` | Store's dispatch, comes from the client |
| `options.get` | `Function` | Get a document from the store |
| `options.mutate` | `Function` | Execute client mutate |
| `options.query` | `Function` | Execute client query |
| `options.save` | `Function` | Execute client save |

*Inherited from*

[HasMany](hasmany.md).[constructor](hasmany.md#constructor)

*Defined in*

[packages/cozy-client/src/associations/Association.js:76](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L76)

## Properties

### dispatch

• **dispatch**: `Function`

Dispatch an action on the store.

*Inherited from*

[HasMany](hasmany.md).[dispatch](hasmany.md#dispatch)

*Defined in*

[packages/cozy-client/src/associations/Association.js:139](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L139)

***

### doctype

• **doctype**: `string`

Doctype of the relationship

**`example`** 'io.cozy.authors'

*Inherited from*

[HasMany](hasmany.md).[doctype](hasmany.md#doctype)

*Defined in*

[packages/cozy-client/src/associations/Association.js:102](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L102)

***

### get

• **get**: `Function`

Returns the document from the store

*Inherited from*

[HasMany](hasmany.md).[get](hasmany.md#get)

*Defined in*

[packages/cozy-client/src/associations/Association.js:110](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L110)

***

### mutate

• **mutate**: `Function`

Performs a mutation on the relationship.

**`function`**

*Inherited from*

[HasMany](hasmany.md).[mutate](hasmany.md#mutate)

*Defined in*

[packages/cozy-client/src/associations/Association.js:125](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L125)

***

### name

• **name**: `string`

The name of the relationship.

**`example`** 'author'

*Inherited from*

[HasMany](hasmany.md).[name](hasmany.md#name)

*Defined in*

[packages/cozy-client/src/associations/Association.js:95](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L95)

***

### query

• **query**: `Function`

Performs a query to retrieve relationship documents.

**`param`**

**`function`**

*Inherited from*

[HasMany](hasmany.md).[query](hasmany.md#query)

*Defined in*

[packages/cozy-client/src/associations/Association.js:117](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L117)

***

### save

• **save**: `Function`

Saves the relationship in store.

*Inherited from*

[HasMany](hasmany.md).[save](hasmany.md#save)

*Defined in*

[packages/cozy-client/src/associations/Association.js:132](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L132)

***

### target

• **target**: `any`

The original document declaring the relationship

*Inherited from*

[HasMany](hasmany.md).[target](hasmany.md#target)

*Defined in*

[packages/cozy-client/src/associations/Association.js:89](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L89)

## Accessors

### count

• `get` **count**(): `number`

Returns the total number of documents in the relationship.
Does not handle documents absent from the store. If you want
to do that, you can use .data.length.

*Returns*

`number`

*   Total number of documents in the relationships

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:93](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L93)

***

### data

• `get` **data**(): `any`

Returns store documents

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/associations/HasManyTriggers.js:12](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasManyTriggers.js#L12)

***

### hasMore

• `get` **hasMore**(): `any`

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:82](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L82)

***

### raw

• `get` **raw**(): `any`

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:69](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L69)

## Methods

### add

▸ **add**(`docsArg`): `CozyClientDocument`

Add the relationships to the target document

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `docsArg` | `CozyClientDocument`\[] | Documents to add as relationships |

*Returns*

`CozyClientDocument`

The saved target document

*Inherited from*

[HasMany](hasmany.md).[add](hasmany.md#add)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:124](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L124)

***

### addById

▸ **addById**(`idsArg`): `any`

Add a referenced document by id. You need to call save()
in order to synchronize your document with the store.

**`todo`** We shouldn't create the array of relationship manually since
it'll not be present in the store as well.
We certainly should use something like `updateRelationship`

*Parameters*

| Name | Type |
| :------ | :------ |
| `idsArg` | `any` |

*Returns*

`any`

*Inherited from*

[HasMany](hasmany.md).[addById](hasmany.md#addbyid)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:174](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L174)

***

### addTargetRelationships

▸ **addTargetRelationships**(`idsArg`): `void`

Update target document with relationships

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `idsArg` | `string`\[] | The ids to add as a relationship |

*Returns*

`void`

*Inherited from*

[HasMany](hasmany.md).[addTargetRelationships](hasmany.md#addtargetrelationships)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:147](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L147)

***

### containsById

▸ **containsById**(`id`): `boolean`

*Parameters*

| Name | Type |
| :------ | :------ |
| `id` | `any` |

*Returns*

`boolean`

*Inherited from*

[HasMany](hasmany.md).[containsById](hasmany.md#containsbyid)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:108](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L108)

***

### dehydrate

▸ **dehydrate**(`doc`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doc` | `any` |

*Returns*

`any`

*Inherited from*

[HasMany](hasmany.md).[dehydrate](hasmany.md#dehydrate)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:256](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L256)

***

### exists

▸ **exists**(`document`): `boolean`

*Parameters*

| Name | Type |
| :------ | :------ |
| `document` | `any` |

*Returns*

`boolean`

*Inherited from*

[HasMany](hasmany.md).[exists](hasmany.md#exists)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:104](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L104)

***

### existsById

▸ **existsById**(`id`): `boolean`

*Parameters*

| Name | Type |
| :------ | :------ |
| `id` | `any` |

*Returns*

`boolean`

*Inherited from*

[HasMany](hasmany.md).[existsById](hasmany.md#existsbyid)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:114](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L114)

***

### fetchMore

▸ **fetchMore**(): `void`

*Returns*

`void`

*Inherited from*

[HasMany](hasmany.md).[fetchMore](hasmany.md#fetchmore)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:100](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L100)

***

### getRelationship

▸ **getRelationship**(): `any`

*Returns*

`any`

*Inherited from*

[HasMany](hasmany.md).[getRelationship](hasmany.md#getrelationship)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:207](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L207)

***

### remove

▸ **remove**(`docsArg`): `CozyClientDocument`

Remove the relationships from the target document

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `docsArg` | `CozyClientDocument`\[] | Documents to remove as relationships |

*Returns*

`CozyClientDocument`

The saved target document

*Inherited from*

[HasMany](hasmany.md).[remove](hasmany.md#remove)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:136](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L136)

***

### removeById

▸ **removeById**(`idsArg`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `idsArg` | `any` |

*Returns*

`any`

*Inherited from*

[HasMany](hasmany.md).[removeById](hasmany.md#removebyid)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:193](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L193)

***

### removeTargetRelationships

▸ **removeTargetRelationships**(`idsArg`): `void`

Remove relationships from target document

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `idsArg` | `string`\[] | The ids to remove from the target relationships |

*Returns*

`void`

*Inherited from*

[HasMany](hasmany.md).[removeTargetRelationships](hasmany.md#removetargetrelationships)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:184](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L184)

***

### updateMetaCount

▸ **updateMetaCount**(): `void`

*Returns*

`void`

*Inherited from*

[HasMany](hasmany.md).[updateMetaCount](hasmany.md#updatemetacount)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:198](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L198)

***

### updateRelationship

▸ **updateRelationship**(`target`, `updateFn`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `target` | `any` |
| `updateFn` | `any` |

*Returns*

`any`

*Inherited from*

[HasMany](hasmany.md).[updateRelationship](hasmany.md#updaterelationship)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:228](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L228)

***

### updateRelationshipData

▸ **updateRelationshipData**(`getUpdatedRelationshipData`): (`dispatch`: `any`, `getState`: `any`) => `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `getUpdatedRelationshipData` | `any` |

*Returns*

`fn`

▸ (`dispatch`, `getState`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `dispatch` | `any` |
| `getState` | `any` |

*Returns*

`void`

*Inherited from*

[HasMany](hasmany.md).[updateRelationshipData](hasmany.md#updaterelationshipdata)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:232](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L232)

***

### updateTargetRelationship

▸ **updateTargetRelationship**(`store`, `updateFn`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `store` | `any` |
| `updateFn` | `any` |

*Returns*

`void`

*Inherited from*

[HasMany](hasmany.md).[updateTargetRelationship](hasmany.md#updatetargetrelationship)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:221](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L221)

***

### getHasManyItem

▸ `Static` **getHasManyItem**(`doc`, `relName`, `relItemId`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doc` | `any` |
| `relName` | `string` |
| `relItemId` | `string` |

*Returns*

`any`

*Inherited from*

[HasMany](hasmany.md).[getHasManyItem](hasmany.md#gethasmanyitem)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:289](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L289)

***

### getHasManyItems

▸ `Static` **getHasManyItems**(`doc`, `relName`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doc` | `any` |
| `relName` | `any` |

*Returns*

`any`

*Inherited from*

[HasMany](hasmany.md).[getHasManyItems](hasmany.md#gethasmanyitems)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:298](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L298)

***

### query

▸ `Static` **query**(`doc`, `client`): [`QueryDefinition`](querydefinition.md)

In this association the query is special, we need to fetch all the triggers
having for the 'konnector' worker, and then filter them based on their
`message.konnector` attribute

*Parameters*

| Name | Type |
| :------ | :------ |
| `doc` | `any` |
| `client` | `any` |

*Returns*

[`QueryDefinition`](querydefinition.md)

*Overrides*

[HasMany](hasmany.md).[query](hasmany.md#query)

*Defined in*

[packages/cozy-client/src/associations/HasManyTriggers.js:21](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasManyTriggers.js#L21)

***

### removeHasManyItem

▸ `Static` **removeHasManyItem**(`doc`, `relName`, `relItemId`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doc` | `any` |
| `relName` | `string` |
| `relItemId` | `string` |

*Returns*

`any`

*Inherited from*

[HasMany](hasmany.md).[removeHasManyItem](hasmany.md#removehasmanyitem)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:336](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L336)

***

### setHasManyItem

▸ `Static` **setHasManyItem**(`doc`, `relName`, `relItemId`, `relItemAttrs`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doc` | `any` |
| `relName` | `string` |
| `relItemId` | `string` |
| `relItemAttrs` | `any` |

*Returns*

`any`

*Inherited from*

[HasMany](hasmany.md).[setHasManyItem](hasmany.md#sethasmanyitem)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:310](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L310)

***

### updateHasManyItem

▸ `Static` **updateHasManyItem**(`doc`, `relName`, `relItemId`, `updater`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doc` | `any` |
| `relName` | `string` |
| `relItemId` | `string` |
| `updater` | `Function` |

*Returns*

`any`

*Inherited from*

[HasMany](hasmany.md).[updateHasManyItem](hasmany.md#updatehasmanyitem)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:360](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L360)

***

### updateRelationship

▸ `Static` **updateRelationship**(`doc`, `relName`, `updateFn`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doc` | `any` |
| `relName` | `any` |
| `updateFn` | `any` |

*Returns*

`any`

*Inherited from*

[HasMany](hasmany.md).[updateRelationship](hasmany.md#updaterelationship)

*Defined in*

[packages/cozy-client/src/associations/HasMany.js:371](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasMany.js#L371)
