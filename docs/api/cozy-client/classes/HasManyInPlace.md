[cozy-client](../README.md) / HasManyInPlace

# Class: HasManyInPlace

Used when related documents are stored directly under the attribute with
only the ids.

**`property`** {Function} get

**`description`**

An example document representing a TODO. See as the related
tasks are represented via ids.

```js
const todo = {
  label: "Protect people's privacy",
  tasks: [1, 2]
}
```

Here is the `Schema` that would represent this kind of document.
Components receiving todos via `Query`s would have an instance of `HasManyInPlace`
as their `tasks` attribute.

```js
const schema = {
  todos: {
     doctype: 'io.cozy.todos',
     relationships: {
       tasks: {
         doctype: 'io.cozy.tasks',
         type: 'has-many-in-place'
       }
     }
   }
}

const todo = {
  label: "Get rich",
  tasks: [1, 2]
}
```

## Hierarchy

*   [`Association`](Association.md)

    ↳ **`HasManyInPlace`**

## Constructors

### constructor

• **new HasManyInPlace**(`target`, `name`, `doctype`, `options`)

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

[Association](Association.md).[constructor](Association.md#constructor)

*Defined in*

[packages/cozy-client/src/associations/Association.js:88](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L88)

## Properties

### dispatch

• **dispatch**: `Function`

Dispatch an action on the store.

*Inherited from*

[Association](Association.md).[dispatch](Association.md#dispatch)

*Defined in*

[packages/cozy-client/src/associations/Association.js:145](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L145)

***

### doctype

• **doctype**: `string`

Doctype of the relationship

**`example`** 'io.cozy.authors'

*Inherited from*

[Association](Association.md).[doctype](Association.md#doctype)

*Defined in*

[packages/cozy-client/src/associations/Association.js:110](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L110)

***

### get

• **get**: `Function`

Returns the document from the store

*Inherited from*

[Association](Association.md).[get](Association.md#get)

*Defined in*

[packages/cozy-client/src/associations/Association.js:117](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L117)

***

### mutate

• **mutate**: `Function`

Performs a mutation on the relationship.

**`function`**

*Inherited from*

[Association](Association.md).[mutate](Association.md#mutate)

*Defined in*

[packages/cozy-client/src/associations/Association.js:132](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L132)

***

### name

• **name**: `string`

The name of the relationship.

**`example`** 'author'

*Inherited from*

[Association](Association.md).[name](Association.md#name)

*Defined in*

[packages/cozy-client/src/associations/Association.js:102](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L102)

***

### query

• **query**: `Function`

Performs a query to retrieve relationship documents.

**`param`**

**`function`**

*Inherited from*

[Association](Association.md).[query](Association.md#query)

*Defined in*

[packages/cozy-client/src/associations/Association.js:125](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L125)

***

### save

• **save**: `Function`

Saves the relationship in store.

*Inherited from*

[Association](Association.md).[save](Association.md#save)

*Defined in*

[packages/cozy-client/src/associations/Association.js:139](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L139)

***

### target

• **target**: `any`

The original document declaring the relationship

*Inherited from*

[Association](Association.md).[target](Association.md#target)

*Defined in*

[packages/cozy-client/src/associations/Association.js:95](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/Association.js#L95)

## Accessors

### data

• `get` **data**(): `any`\[]

*Returns*

`any`\[]

*Overrides*

Association.data

*Defined in*

[packages/cozy-client/src/associations/HasManyInPlace.js:88](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasManyInPlace.js#L88)

***

### raw

• `get` **raw**(): `string`\[]

Raw property

*Returns*

`string`\[]

*Overrides*

Association.raw

*Defined in*

[packages/cozy-client/src/associations/HasManyInPlace.js:54](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasManyInPlace.js#L54)

## Methods

### addById

▸ **addById**(`id`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `id` | `any` |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/associations/HasManyInPlace.js:58](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasManyInPlace.js#L58)

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

[packages/cozy-client/src/associations/HasManyInPlace.js:81](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasManyInPlace.js#L81)

***

### existsById

▸ **existsById**(`id`): `boolean`

*Parameters*

| Name | Type |
| :------ | :------ |
| `id` | `any` |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/associations/HasManyInPlace.js:71](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasManyInPlace.js#L71)

***

### getRelationship

▸ **getRelationship**(): `any`

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/associations/HasManyInPlace.js:76](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasManyInPlace.js#L76)

***

### removeById

▸ **removeById**(`id`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `id` | `any` |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/associations/HasManyInPlace.js:63](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasManyInPlace.js#L63)

***

### query

▸ `Static` **query**(`document`, `client`, `assoc`): `CozyClientDocument` | [`QueryDefinition`](QueryDefinition.md)

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `CozyClientDocument` | Document to query |
| `client` | `any` | The CozyClient instance |
| `assoc` | [`Association`](Association.md) | The query params |

*Returns*

`CozyClientDocument` | [`QueryDefinition`](QueryDefinition.md)

*Overrides*

[Association](Association.md).[query](Association.md#query)

*Defined in*

[packages/cozy-client/src/associations/HasManyInPlace.js:100](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/associations/HasManyInPlace.js#L100)
