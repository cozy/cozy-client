[cozy-client](../README.md) / [Exports](../modules.md) / QueryDefinition

# Class: QueryDefinition

Chainable API to create query definitions to retrieve documents
from a Cozy. `QueryDefinition`s are sent to links.

## Constructors

### constructor

• **new QueryDefinition**(`options?`)

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Initial options for the query definition |
| `options.bookmark` | `string` | - |
| `options.cursor` | `Cursor` | - |
| `options.doctype` | `string` | - |
| `options.fields` | `any`\[] | - |
| `options.id` | `string` | - |
| `options.ids` | `any`\[] | - |
| `options.includes` | `string`\[] | - |
| `options.indexedFields` | `any`\[] | - |
| `options.limit` | `number` | - |
| `options.partialFilter` | `any` | - |
| `options.referenced` | `string` | - |
| `options.selector` | `any` | - |
| `options.skip` | `number` | - |
| `options.sort` | `any`\[] | - |

*Defined in*

[packages/cozy-client/src/queries/dsl.js:27](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L27)

## Properties

### bookmark

• **bookmark**: `string`

*Defined in*

[packages/cozy-client/src/queries/dsl.js:60](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L60)

***

### cursor

• **cursor**: `Cursor`

*Defined in*

[packages/cozy-client/src/queries/dsl.js:59](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L59)

***

### doctype

• **doctype**: `string`

*Defined in*

[packages/cozy-client/src/queries/dsl.js:47](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L47)

***

### fields

• **fields**: `any`\[]

*Defined in*

[packages/cozy-client/src/queries/dsl.js:51](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L51)

***

### id

• **id**: `string`

*Defined in*

[packages/cozy-client/src/queries/dsl.js:48](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L48)

***

### ids

• **ids**: `any`\[]

*Defined in*

[packages/cozy-client/src/queries/dsl.js:49](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L49)

***

### includes

• **includes**: `string`\[]

*Defined in*

[packages/cozy-client/src/queries/dsl.js:55](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L55)

***

### indexedFields

• **indexedFields**: `any`\[]

*Defined in*

[packages/cozy-client/src/queries/dsl.js:52](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L52)

***

### limit

• **limit**: `number`

*Defined in*

[packages/cozy-client/src/queries/dsl.js:57](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L57)

***

### partialFilter

• **partialFilter**: `any`

*Defined in*

[packages/cozy-client/src/queries/dsl.js:53](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L53)

***

### referenced

• **referenced**: `string`

*Defined in*

[packages/cozy-client/src/queries/dsl.js:56](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L56)

***

### selector

• **selector**: `any`

*Defined in*

[packages/cozy-client/src/queries/dsl.js:50](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L50)

***

### skip

• **skip**: `number`

*Defined in*

[packages/cozy-client/src/queries/dsl.js:58](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L58)

***

### sort

• **sort**: `any`\[]

*Defined in*

[packages/cozy-client/src/queries/dsl.js:54](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L54)

## Methods

### UNSAFE_noLimit

▸ **UNSAFE_noLimit**(): [`QueryDefinition`](querydefinition.md)

*Returns*

[`QueryDefinition`](querydefinition.md)

*Defined in*

[packages/cozy-client/src/queries/dsl.js:235](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L235)

***

### checkSelector

▸ **checkSelector**(`selector`): `void`

Checks the selector predicates.

It is useful to warn the developer when a partial index might be used.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `selector` | `any` | The selector definition |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/queries/dsl.js:108](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L108)

***

### checkSortOrder

▸ **checkSortOrder**(`__namedParameters`): `void`

Checks if the sort order matches the index' fields order.

When sorting with CouchDB, it is required to:

*   use indexed fields
*   keep the same order than the indexed fields.

See https://docs.cozy.io/en/tutorials/data/queries/#sort-data-with-mango

*Parameters*

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `PartialQueryDefinition` |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/queries/dsl.js:75](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L75)

***

### getById

▸ **getById**(`id`): [`QueryDefinition`](querydefinition.md)

Query a single document on its id.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The document id. |

*Returns*

[`QueryDefinition`](querydefinition.md)

The QueryDefinition object.

*Defined in*

[packages/cozy-client/src/queries/dsl.js:129](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L129)

***

### getByIds

▸ **getByIds**(`ids`): [`QueryDefinition`](querydefinition.md)

Query several documents on their ids.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `ids` | `any`\[] | The documents ids. |

*Returns*

[`QueryDefinition`](querydefinition.md)

The QueryDefinition object.

*Defined in*

[packages/cozy-client/src/queries/dsl.js:142](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L142)

***

### include

▸ **include**(`includes`): [`QueryDefinition`](querydefinition.md)

Includes documents having a relationships with the ones queried.
For example, query albums including the photos.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `includes` | `any`\[] | The documents to include. |

*Returns*

[`QueryDefinition`](querydefinition.md)

The QueryDefinition object.

*Defined in*

[packages/cozy-client/src/queries/dsl.js:218](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L218)

***

### indexFields

▸ **indexFields**(`indexedFields`): [`QueryDefinition`](querydefinition.md)

Specify which fields should be indexed. This prevent the automatic indexing of the mango fields.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `indexedFields` | `any`\[] | The fields to index. |

*Returns*

[`QueryDefinition`](querydefinition.md)

The QueryDefinition object.

*Defined in*

[packages/cozy-client/src/queries/dsl.js:175](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L175)

***

### limitBy

▸ **limitBy**(`limit`): [`QueryDefinition`](querydefinition.md)

Maximum number of documents returned, useful for pagination. Default is 100.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `limit` | `number` | The document's limit. |

*Returns*

[`QueryDefinition`](querydefinition.md)

The QueryDefinition object.

*Defined in*

[packages/cozy-client/src/queries/dsl.js:231](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L231)

***

### offset

▸ **offset**(`skip`): [`QueryDefinition`](querydefinition.md)

Skip the first ‘n’ documents, where ‘n’ is the value specified.

Beware, this [performs badly](http://docs.couchdb.org/en/stable/ddocs/views/pagination.html#paging-alternate-method) on view's index.
Prefer cursor-based pagination in such situation.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `skip` | `number` | The number of documents to skip. |

*Returns*

[`QueryDefinition`](querydefinition.md)

The QueryDefinition object.

*Defined in*

[packages/cozy-client/src/queries/dsl.js:248](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L248)

***

### offsetBookmark

▸ **offsetBookmark**(`bookmark`): [`QueryDefinition`](querydefinition.md)

Use [bookmark](https://docs.couchdb.org/en/2.2.0/api/database/find.html#pagination) pagination.
Note this only applies for mango-queries (not views) and is way more efficient than skip pagination.
The bookmark is a string returned by the \_find response and can be seen as a pointer in
the index for the next query.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `bookmark` | `string` | The bookmark to continue a previous paginated query. |

*Returns*

[`QueryDefinition`](querydefinition.md)

The QueryDefinition object.

*Defined in*

[packages/cozy-client/src/queries/dsl.js:286](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L286)

***

### offsetCursor

▸ **offsetCursor**(`cursor`): [`QueryDefinition`](querydefinition.md)

Use [cursor-based](https://docs.cozy.io/en/cozy-stack/jsonapi/#pagination) pagination.
*Warning*: this is only useful for views.
The cursor is a \[startkey, startkey_docid] array, where startkey is the view's key,
e.g. \["io.cozy.photos.albums", "album-id"] and startkey_docid is the id of
the starting document of the query, e.g. "file-id".
Use the last docid of each query as startkey_docid to paginate or leave blank for the first query.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `cursor` | `Cursor` | The cursor for pagination. |

*Returns*

[`QueryDefinition`](querydefinition.md)

The QueryDefinition object.

*Defined in*

[packages/cozy-client/src/queries/dsl.js:268](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L268)

***

### partialIndex

▸ **partialIndex**(`partialFilter`): [`QueryDefinition`](querydefinition.md)

Specify a [partial index](https://docs.couchdb.org/en/stable/api/database/find.html#find-partial-indexes).
The filter must follow the same syntax than the selector.

A partial index includes a filter, used to select documents before the indexing.
You can find more information about partial indexes [here](https://docs.cozy.io/en/tutorials/data/advanced/#partial-indexes)

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `partialFilter` | `any` | The filter definition. |

*Returns*

[`QueryDefinition`](querydefinition.md)

*Defined in*

[packages/cozy-client/src/queries/dsl.js:189](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L189)

***

### referencedBy

▸ **referencedBy**(`document`): [`QueryDefinition`](querydefinition.md)

Use the [file reference system](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/)

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `any` | The reference document |

*Returns*

[`QueryDefinition`](querydefinition.md)

The QueryDefinition object.

*Defined in*

[packages/cozy-client/src/queries/dsl.js:301](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L301)

***

### select

▸ **select**(`fields`): [`QueryDefinition`](querydefinition.md)

Specify which fields of each object should be returned. If it is omitted, the entire object is returned.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `fields` | `any`\[] | The fields to return. |

*Returns*

[`QueryDefinition`](querydefinition.md)

The QueryDefinition object.

*Defined in*

[packages/cozy-client/src/queries/dsl.js:165](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L165)

***

### sortBy

▸ **sortBy**(`sort`): [`QueryDefinition`](querydefinition.md)

Specify how to sort documents, following the [sort syntax](http://docs.couchdb.org/en/latest/api/database/find.html#find-sort)

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `sort` | `any`\[] | The list of field name and direction pairs. |

*Returns*

[`QueryDefinition`](querydefinition.md)

The QueryDefinition object.

*Defined in*

[packages/cozy-client/src/queries/dsl.js:199](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L199)

***

### toDefinition

▸ **toDefinition**(): `Object`

*Returns*

`Object`

| Name | Type |
| :------ | :------ |
| `bookmark` | `string` |
| `cursor` | `Cursor` |
| `doctype` | `string` |
| `fields` | `any`\[] |
| `id` | `string` |
| `ids` | `any`\[] |
| `includes` | `string`\[] |
| `indexedFields` | `any`\[] |
| `limit` | `number` |
| `partialFilter` | `any` |
| `referenced` | `string` |
| `selector` | `any` |
| `skip` | `number` |
| `sort` | `any`\[] |

*Defined in*

[packages/cozy-client/src/queries/dsl.js:305](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L305)

***

### where

▸ **where**(`selector`): [`QueryDefinition`](querydefinition.md)

Query documents with a [mango selector](http://docs.couchdb.org/en/latest/api/database/find.html#find-selectors).
Each field passed in the selector will be indexed, except if the indexField option is used.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `selector` | `any` | The Mango selector. |

*Returns*

[`QueryDefinition`](querydefinition.md)

The QueryDefinition object.

*Defined in*

[packages/cozy-client/src/queries/dsl.js:153](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L153)
