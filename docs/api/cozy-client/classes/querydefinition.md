[cozy-client](../README.md) / QueryDefinition

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
| `options.cursor` | `CouchDBViewCursor` | - |
| `options.doctype` | `string` | - |
| `options.fields` | `string`\[] | - |
| `options.id` | `string` | - |
| `options.ids` | `string`\[] | - |
| `options.includes` | `string`\[] | - |
| `options.indexedFields` | `string`\[] | - |
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

• **cursor**: `CouchDBViewCursor`

*Defined in*

[packages/cozy-client/src/queries/dsl.js:59](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L59)

***

### doctype

• **doctype**: `string`

*Defined in*

[packages/cozy-client/src/queries/dsl.js:47](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L47)

***

### fields

• **fields**: `string`\[]

*Defined in*

[packages/cozy-client/src/queries/dsl.js:51](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L51)

***

### id

• **id**: `string`

*Defined in*

[packages/cozy-client/src/queries/dsl.js:48](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L48)

***

### ids

• **ids**: `string`\[]

*Defined in*

[packages/cozy-client/src/queries/dsl.js:49](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L49)

***

### includes

• **includes**: `string`\[]

*Defined in*

[packages/cozy-client/src/queries/dsl.js:55](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L55)

***

### indexedFields

• **indexedFields**: `string`\[]

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

[packages/cozy-client/src/queries/dsl.js:243](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L243)

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

[packages/cozy-client/src/queries/dsl.js:114](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L114)

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

[packages/cozy-client/src/queries/dsl.js:137](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L137)

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

[packages/cozy-client/src/queries/dsl.js:150](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L150)

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

[packages/cozy-client/src/queries/dsl.js:226](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L226)

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

[packages/cozy-client/src/queries/dsl.js:183](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L183)

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

[packages/cozy-client/src/queries/dsl.js:239](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L239)

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

[packages/cozy-client/src/queries/dsl.js:256](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L256)

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

[packages/cozy-client/src/queries/dsl.js:294](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L294)

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
| `cursor` | `CouchDBViewCursor` | The cursor for pagination. |

*Returns*

[`QueryDefinition`](querydefinition.md)

The QueryDefinition object.

*Defined in*

[packages/cozy-client/src/queries/dsl.js:276](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L276)

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

[packages/cozy-client/src/queries/dsl.js:197](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L197)

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

[packages/cozy-client/src/queries/dsl.js:309](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L309)

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

[packages/cozy-client/src/queries/dsl.js:173](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L173)

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

[packages/cozy-client/src/queries/dsl.js:207](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L207)

***

### toDefinition

▸ **toDefinition**(): `Object`

*Returns*

`Object`

| Name | Type |
| :------ | :------ |
| `bookmark` | `string` |
| `cursor` | `CouchDBViewCursor` |
| `doctype` | `string` |
| `fields` | `string`\[] |
| `id` | `string` |
| `ids` | `string`\[] |
| `includes` | `string`\[] |
| `indexedFields` | `string`\[] |
| `limit` | `number` |
| `partialFilter` | `any` |
| `referenced` | `string` |
| `selector` | `any` |
| `skip` | `number` |
| `sort` | `any`\[] |

*Defined in*

[packages/cozy-client/src/queries/dsl.js:313](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L313)

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

[packages/cozy-client/src/queries/dsl.js:161](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L161)
