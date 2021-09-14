[cozy-client](../README.md) / HasOne

# Class: HasOne

## Hierarchy

*   [`Association`](association.md)

    ↳ **`HasOne`**

## Constructors

### constructor

• **new HasOne**(`target`, `name`, `doctype`, `options`)

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

[Association](association.md).[constructor](association.md#constructor)

*Defined in*

[packages/cozy-client/src/associations/Association.js:76](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L76)

## Properties

### dispatch

• **dispatch**: `Function`

Dispatch an action on the store.

*Inherited from*

[Association](association.md).[dispatch](association.md#dispatch)

*Defined in*

[packages/cozy-client/src/associations/Association.js:139](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L139)

***

### doctype

• **doctype**: `string`

Doctype of the relationship

**`example`** 'io.cozy.authors'

*Inherited from*

[Association](association.md).[doctype](association.md#doctype)

*Defined in*

[packages/cozy-client/src/associations/Association.js:102](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L102)

***

### get

• **get**: `Function`

Returns the document from the store

*Inherited from*

[Association](association.md).[get](association.md#get)

*Defined in*

[packages/cozy-client/src/associations/Association.js:110](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L110)

***

### mutate

• **mutate**: `Function`

Performs a mutation on the relationship.

**`function`**

*Inherited from*

[Association](association.md).[mutate](association.md#mutate)

*Defined in*

[packages/cozy-client/src/associations/Association.js:125](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L125)

***

### name

• **name**: `string`

The name of the relationship.

**`example`** 'author'

*Inherited from*

[Association](association.md).[name](association.md#name)

*Defined in*

[packages/cozy-client/src/associations/Association.js:95](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L95)

***

### query

• **query**: `Function`

Performs a query to retrieve relationship documents.

**`param`**

**`function`**

*Inherited from*

[Association](association.md).[query](association.md#query)

*Defined in*

[packages/cozy-client/src/associations/Association.js:117](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L117)

***

### save

• **save**: `Function`

Saves the relationship in store.

*Inherited from*

[Association](association.md).[save](association.md#save)

*Defined in*

[packages/cozy-client/src/associations/Association.js:132](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L132)

***

### target

• **target**: `any`

The original document declaring the relationship

*Inherited from*

[Association](association.md).[target](association.md#target)

*Defined in*

[packages/cozy-client/src/associations/Association.js:89](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L89)

## Accessors

### data

• `get` **data**(): `any`

Returns the document(s) from the store

For document with relationships stored as JSON API spec :

```js
const book = {
  title: 'Moby Dick',
  relationships: {
    author: {
      data: {
        doctype: 'io.cozy.authors',
        id: 'herman'
      }
    }
  }
 }
```

`data` will be

```json
{
  "_id": "herman"
  "_type": "io.cozy.authors",
  "firstName": "herman",
  "name": "Melville"
}
```

Derived `Association`s need to implement this method.

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/associations/HasOne.js:12](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasOne.js#L12)

***

### raw

• `get` **raw**(): `any`

Returns the raw relationship data as stored in the original document

For a document with relationships stored as JSON API spec:

```js
const book = {
  title: 'Moby Dick',
  relationships: {
    author: {
      data: {
        doctype: 'io.cozy.authors',
        id: 'herman'
      }
    }
  }
 }
```

Raw value will be

```json
{
  "doctype": "io.cozy.authors",
  "id": "herman"
}
```

Derived `Association`s need to implement this method.

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/associations/HasOne.js:8](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasOne.js#L8)

## Methods

### add

▸ **add**(`doc`): `CozyClientDocument`

Add the relationship to the target document

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | `CozyClientDocument` | Document to add as a relationship |

*Returns*

`CozyClientDocument`

The saved target document

*Defined in*

[packages/cozy-client/src/associations/HasOne.js:41](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasOne.js#L41)

***

### dehydrate

▸ **dehydrate**(`doc`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doc` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/associations/HasOne.js:89](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasOne.js#L89)

***

### remove

▸ **remove**(): `CozyClientDocument`

Remove the relationship from the target document

*Returns*

`CozyClientDocument`

The saved target document

*Defined in*

[packages/cozy-client/src/associations/HasOne.js:51](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasOne.js#L51)

***

### set

▸ **set**(`doc`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doc` | `any` |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/associations/HasOne.js:75](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasOne.js#L75)

***

### setRelationship

▸ **setRelationship**(`doc`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `doc` | `any` |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/associations/HasOne.js:56](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasOne.js#L56)

***

### unset

▸ **unset**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/associations/HasOne.js:82](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasOne.js#L82)

***

### query

▸ `Static` **query**(`document`, `client`, `assoc`): [`QueryDefinition`](querydefinition.md) | `CozyClientDocument`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `CozyClientDocument` | Document to query |
| `client` | `any` | The CozyClient instance |
| `assoc` | [`Association`](association.md) | The query params |

*Returns*

[`QueryDefinition`](querydefinition.md) | `CozyClientDocument`

*Overrides*

[Association](association.md).[query](association.md#query)

*Defined in*

[packages/cozy-client/src/associations/HasOne.js:27](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasOne.js#L27)
