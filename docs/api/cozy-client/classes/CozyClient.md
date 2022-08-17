[cozy-client](../README.md) / CozyClient

# Class: CozyClient

Responsible for

*   Creating observable queries
*   Hydration
*   Creating plan for saving documents
*   Associations

## Constructors

### constructor

• **new CozyClient**(`rawOptions?`)

**`example`**

```js
const client = new CozyClient({
  schema: {
    todos: {
      doctype: 'io.cozy.todos',
      relationships: {
        authors: {
          type: 'has-many',
          doctype: 'io.cozy.persons'
        }
      }
    }
  }
})
```

Cozy-Client will automatically call `this.login()` if provided with a token and an uri

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `rawOptions` | `ClientOptions` | Options |

*Defined in*

[packages/cozy-client/src/CozyClient.js:166](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L166)

## Properties

### appMetadata

• **appMetadata**: `any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:179](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L179)

***

### capabilities

• **capabilities**: `any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:207](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L207)

***

### chain

• **chain**: `any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:200](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L200)

***

### client

• **client**: `any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1615](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1615)

***

### instanceOptions

• **instanceOptions**: `Object`

*Defined in*

[packages/cozy-client/src/CozyClient.js:187](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L187)

***

### isLogged

• **isLogged**: `boolean`

*Defined in*

[packages/cozy-client/src/CozyClient.js:186](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L186)

***

### isRevoked

• **isRevoked**: `boolean`

*Defined in*

[packages/cozy-client/src/CozyClient.js:496](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L496)

***

### links

• **links**: `any`\[]

*Defined in*

[packages/cozy-client/src/CozyClient.js:197](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L197)

***

### loginPromise

• **loginPromise**: `Promise`<`void`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:472](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L472)

***

### options

• **options**: `Object`

*Type declaration*

| Name | Type | Description |
| :------ | :------ | :------ |
| `autoHydrate` | `boolean` | - |
| `backgroundFetching` | `boolean` | If set to true, backgroundFetching will be enabled by default on every query. Meaning that, when the fetchStatus has already been loaded, it won't be updated during future fetches. Instead, a `isFetching` attribute will be used to indicate when background fetching is started. |
| `client` | `any` | - |
| `oauth` | `any` | - |
| `onError` | `Function` | Default callback if a query is errored |
| `onTokenRefresh` | `Function` | - |
| `stackClient` | `any` | - |
| `store` | `boolean` | If set to false, the client will not instantiate a Redux store automatically. Use this if you want to merge cozy-client's store with your own redux store. See [here](https://docs.cozy.io/en/cozy-client/react-integration/#1b-use-your-own-redux-store) for more information. |
| `token` | `any` | - |
| `uri` | `string` | - |
| `warningForCustomHandlers` | `boolean` | - |

*Defined in*

[packages/cozy-client/src/CozyClient.js:183](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L183)

***

### plugins

• **plugins**: `Object`

*Defined in*

[packages/cozy-client/src/CozyClient.js:210](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L210)

***

### queryIdGenerator

• **queryIdGenerator**: `QueryIDGenerator`

*Defined in*

[packages/cozy-client/src/CozyClient.js:185](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L185)

***

### schema

• **schema**: `Schema`

*Defined in*

[packages/cozy-client/src/CozyClient.js:202](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L202)

***

### stackClient

• **stackClient**: `any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1590](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1590)

***

### store

• **store**: `any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1524](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1524)

***

### storeAccesors

• **storeAccesors**: `any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:227](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L227)

***

### storeAccessors

• **storeAccessors**: `Object`

*Type declaration*

| Name | Type |
| :------ | :------ |
| `dispatch` | `any` |
| `get` | `any` |
| `mutate` | (`def`: `any`, `opts`: `any`) => `any` |
| `query` | (`def`: `any`, `opts`: `any`) => `any` |
| `save` | (`document`: `any`, `opts`: `any`) => `any` |

*Defined in*

[packages/cozy-client/src/CozyClient.js:1277](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1277)

***

### fetchPolicies

▪ `Static` **fetchPolicies**: `Object`

*Type declaration*

| Name | Type |
| :------ | :------ |
| `noFetch` | () => `boolean` |
| `olderThan` | (`delay`: `number`) => `Function` |

***

### hooks

▪ `Static` **hooks**: `Object`

***

### version

▪ `Static` **version**: `string`

## Methods

### \_login

▸ **\_login**(`options`): `Promise`<`void`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `options` | `any` |

*Returns*

`Promise`<`void`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:475](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L475)

***

### addSchema

▸ **addSchema**(`schemaDefinition`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `schemaDefinition` | `any` |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:431](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L431)

***

### all

▸ **all**(`doctype`): [`QueryDefinition`](QueryDefinition.md)

*Parameters*

| Name | Type |
| :------ | :------ |
| `doctype` | `any` |

*Returns*

[`QueryDefinition`](QueryDefinition.md)

*Defined in*

[packages/cozy-client/src/CozyClient.js:576](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L576)

***

### authorize

▸ **authorize**(`[options]?`): `Promise`<`any`>

Creates an OAuth token with needed permissions for the current client.
The authorization page URL generation can be overriding by passing a function pointer as `openURLCallback` parameter
It is possible to skip the session creation process (when using an in-app browser) by passing a sessionCode (see https://docs.cozy.io/en/cozy-stack/auth/#post-authsession_code)

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `[options]` | `Object` | Authorization options |
| `[options].openURLCallback` | `OpenURLCallback` | - |
| `[options].pkceCodes` | `PKCECodes` | - |
| `[options].sessionCode` | `string` | - |

*Returns*

`Promise`<`any`>

Contains the fetched token and the client information. These should be stored and used to restore the client.

*Defined in*

[packages/cozy-client/src/CozyClient.js:1440](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1440)

***

### certifyFlagship

▸ **certifyFlagship**(): `Promise`<`void`>

Perform the Flagship certification process for verifying that the current running app is a genuine Cozy application

This mechanism is described in https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/flagship-certification/README.md

*Returns*

`Promise`<`void`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:1421](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1421)

***

### checkForRevocation

▸ **checkForRevocation**(): `Promise`<`any`>

Returns whether the client has been revoked on the server

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:1536](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1536)

***

### collection

▸ **collection**(`doctype`): `any`

Forwards to a stack client instance and returns
a [DocumentCollection](https://docs.cozy.io/en/cozy-client/api/cozy-stack-client/#DocumentCollection) instance.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `doctype` | `string` | The collection doctype. |

*Returns*

`any`

Collection corresponding to the doctype

*Defined in*

[packages/cozy-client/src/CozyClient.js:568](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L568)

***

### create

▸ **create**(`type`, `doc`, `references`, `options?`): `Promise`<`any`>

Creates a document and saves it on the server

**`example`**

```js
await client.create('io.cozy.todos', {
  label: 'My todo',
  relationships: {
    authors: {
      data: [{_id: 1, _type: 'io.cozy.persons'}]
    }
  }
})
```

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | Doctype of the document |
| `doc` | `any` | Document to save |
| `references` | `Object` | - |
| `options` | `any` | Mutation options |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:623](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L623)

***

### createClient

▸ **createClient**(): `void`

If no stack client has been passed in options, creates a default stack
client and attaches handlers for revocation and token refresh.
If a stackClient has been passed in options, ensure it has handlers for
revocation and token refresh.

If `oauth` options are passed, stackClient is an OAuthStackClient.

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1570](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1570)

***

### destroy

▸ **destroy**(`document`, `mutationOptions?`): `Promise`<`CozyClientDocument`>

Destroys a document. {before,after}:destroy hooks will be fired.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `CozyClientDocument` | Document to be deleted |
| `mutationOptions` | `Object` | - |

*Returns*

`Promise`<`CozyClientDocument`>

The document that has been deleted

*Defined in*

[packages/cozy-client/src/CozyClient.js:873](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L873)

***

### dispatch

▸ **dispatch**(`action`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `action` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1641](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1641)

***

### emit

▸ **emit**(...`args`): `void`

Gets overrided by MicroEE.mixin
This is here just so typescript does not scream

TODO Find a better way to make TS understand that emit is
a method from cozy-client

*Parameters*

| Name | Type |
| :------ | :------ |
| `...args` | `any`\[] |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:249](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L249)

***

### ensureCozyMetadata

▸ **ensureCozyMetadata**(`document`, `options?`): `CozyClientDocument`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `CozyClientDocument` | Document that will be saved |
| `options` | `Object` | - |
| `options.event` | `string` | - |

*Returns*

`CozyClientDocument`

*Defined in*

[packages/cozy-client/src/CozyClient.js:693](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L693)

***

### ensureQueryExists

▸ **ensureQueryExists**(`queryId`, `queryDefinition`, `options`): `void`

Makes sure that the query exists in the store

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryId` | `string` | Id of the query |
| `queryDefinition` | [`QueryDefinition`](QueryDefinition.md) | Definition of the query |
| `options` | `QueryOptions` | - |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:894](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L894)

***

### ensureStore

▸ **ensureStore**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1527](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1527)

***

### fetch

▸ **fetch**(`method`, `path`, `body`, `options?`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `method` | `any` |
| `path` | `any` |
| `body` | `any` |
| `options` | `Object` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:572](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L572)

***

### fetchQueryAndGetFromState

▸ **fetchQueryAndGetFromState**(`query`): `Promise`<`QueryState`>

Executes a query and returns the results from internal store.

Can be useful in pure JS context (without React)
Has a behavior close to <Query /> or useQuery

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `Object` | Query with definition and options |
| `query.definition` | [`QueryDefinition`](QueryDefinition.md) | Query Definition |
| `query.options` | `QueryOptions` | Query Options |

*Returns*

`Promise`<`QueryState`>

Query state

*Defined in*

[packages/cozy-client/src/CozyClient.js:1374](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1374)

***

### find

▸ **find**(`doctype`, `selector?`): [`QueryDefinition`](QueryDefinition.md)

*Parameters*

| Name | Type | Default value |
| :------ | :------ | :------ |
| `doctype` | `any` | `undefined` |
| `selector` | `any` | `undefined` |

*Returns*

[`QueryDefinition`](QueryDefinition.md)

*Defined in*

[packages/cozy-client/src/CozyClient.js:585](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L585)

***

### generateRandomId

▸ **generateRandomId**(): `string`

*Returns*

`string`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1252](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1252)

***

### get

▸ **get**(`doctype`, `id`): [`QueryDefinition`](QueryDefinition.md)

*Parameters*

| Name | Type |
| :------ | :------ |
| `doctype` | `any` |
| `id` | `any` |

*Returns*

[`QueryDefinition`](QueryDefinition.md)

*Defined in*

[packages/cozy-client/src/CozyClient.js:592](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L592)

***

### getAssociation

▸ **getAssociation**(`document`, `associationName`): `any`

Creates an association that is linked to the store.

*Parameters*

| Name | Type |
| :------ | :------ |
| `document` | `any` |
| `associationName` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1259](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1259)

***

### getClient

▸ **getClient**(): `any`

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1623](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1623)

***

### getCollectionFromState

▸ **getCollectionFromState**(`type`): `CozyClientDocument`\[]

Get a collection of documents from the internal store.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | Doctype of the collection |

*Returns*

`CozyClientDocument`\[]

Array of documents or null if the collection does not exist.

*Defined in*

[packages/cozy-client/src/CozyClient.js:1295](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1295)

***

### getDocumentFromState

▸ **getDocumentFromState**(`type`, `id`): `CozyClientDocument`

Get a document from the internal store.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | Doctype of the document |
| `id` | `string` | Id of the document |

*Returns*

`CozyClientDocument`

Document or null if the object does not exist.

*Defined in*

[packages/cozy-client/src/CozyClient.js:1312](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1312)

***

### getDocumentSavePlan

▸ **getDocumentSavePlan**(`document`, `referencesByName`): `any`

Creates a list of mutations to execute to create a document and its relationships.

```js
const baseDoc = { _type: 'io.cozy.todo', label: 'Go hiking' }
// relations can be arrays or single objects
const relationships = {
  attachments: [{ _id: 12345, _type: 'io.cozy.files' }, { _id: 6789, _type: 'io.cozy.files' }],
  bills: { _id: 9999, _type: 'io.cozy.bills' }
}
client.getDocumentSavePlan(baseDoc, relationships)
```

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `CozyClientDocument` | Document to create |
| `referencesByName` | `Object` | - |

*Returns*

`any`

One or more mutation to execute

*Defined in*

[packages/cozy-client/src/CozyClient.js:786](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L786)

***

### getIncludesRelationships

▸ **getIncludesRelationships**(`queryDefinition`): `Dictionary`<`any`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `queryDefinition` | `any` |

*Returns*

`Dictionary`<`any`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:1179](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1179)

***

### getInstanceOptions

▸ **getInstanceOptions**(): `any`

getInstanceOptions - Returns current instance options, such as domain or app slug

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1650](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1650)

***

### getQueryFromState

▸ **getQueryFromState**(`id`, `options?`): `QueryState`

Get a query from the internal store.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | Id of the query (set via Query.props.as) |
| `options` | `Object` | Options |
| `options.hydrated` | `boolean` | - |
| `options.singleDocData` | `any` | - |

*Returns*

`QueryState`

*   Query state or null if it does not exist.

*Defined in*

[packages/cozy-client/src/CozyClient.js:1333](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1333)

***

### getRelationshipStoreAccessors

▸ **getRelationshipStoreAccessors**(): `Object`

Returns the accessors that are given to the relationships for them
to deal with the stores.

Relationships need to have access to the store to ping it when
a modification (addById/removeById etc...) has been done. This wakes
the store up, which in turn will update the `<Query>`s and re-render the data.

*Returns*

`Object`

| Name | Type |
| :------ | :------ |
| `dispatch` | `any` |
| `get` | `any` |
| `mutate` | (`def`: `any`, `opts`: `any`) => `any` |
| `query` | (`def`: `any`, `opts`: `any`) => `any` |
| `save` | (`document`: `any`, `opts`: `any`) => `any` |

*Defined in*

[packages/cozy-client/src/CozyClient.js:1275](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1275)

***

### getStackClient

▸ **getStackClient**(): `any`

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1630](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1630)

***

### handleRevocationChange

▸ **handleRevocationChange**(`state`): `void`

Sets public attribute and emits event related to revocation

*Parameters*

| Name | Type |
| :------ | :------ |
| `state` | `any` |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1541](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1541)

***

### handleTokenRefresh

▸ **handleTokenRefresh**(`token`): `void`

Emits event when token is refreshed

*Parameters*

| Name | Type |
| :------ | :------ |
| `token` | `any` |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1552](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1552)

***

### hydrateDocument

▸ **hydrateDocument**(`document`, `schemaArg`): `any`

Resolves relationships on a document.

The original document is kept in the target attribute of
the relationship

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `CozyClientDocument` | for which relationships must be resolved |
| `schemaArg` | `Schema` | - |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1222](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1222)

***

### hydrateDocuments

▸ **hydrateDocuments**(`doctype`, `documents`): `any`\[]

Returns documents with their relationships resolved according to their schema.
If related documents are not in the store, they will not be fetched automatically.
Instead, the relationships will have null documents.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `doctype` | `string` | Doctype of the documents being hydrated |
| `documents` | `CozyClientDocument`\[] | Documents to be hydrated |

*Returns*

`any`\[]

*Defined in*

[packages/cozy-client/src/CozyClient.js:1199](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1199)

***

### hydrateRelationships

▸ **hydrateRelationships**(`document`, `schemaRelationships`): `Object`

*Parameters*

| Name | Type |
| :------ | :------ |
| `document` | `any` |
| `schemaRelationships` | `any` |

*Returns*

`Object`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1233](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1233)

***

### isReactNative

▸ **isReactNative**(): `boolean`

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1397](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1397)

***

### loadInstanceOptionsFromDOM

▸ **loadInstanceOptionsFromDOM**(`selector?`): `void`

loadInstanceOptionsFromDOM - Loads the dataset injected by the Stack in web pages and exposes it through getInstanceOptions

*Parameters*

| Name | Type | Default value |
| :------ | :------ | :------ |
| `selector` | `string` | `'[role=application]'` |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1661](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1661)

***

### loadInstanceOptionsFromStack

▸ **loadInstanceOptionsFromStack**(): `Promise`<`void`>

loadInstanceOptionsFromStack - Loads the instance options from cozy-stack and exposes it through getInstanceOptions

For now only retrieving capabilities is supported

*Returns*

`Promise`<`void`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:1682](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1682)

***

### login

▸ **login**(`options`): `Promise`<`any`>

Notify the links that they can start and set isLogged to true.

On mobile, where url/token are set after instantiation, use this method
to set the token and uri via options.

Emits

*   "beforeLogin" at the beginning, before links have been set up
*   "login" when the client is fully logged in and links have been set up

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | - |
| `options.token` | `string` | If passed, the token is set on the client |
| `options.uri` | `string` | If passed, the uri is set on the client |

*Returns*

`Promise`<`any`>

*   Resolves when all links have been setup and client is fully logged in

*Defined in*

[packages/cozy-client/src/CozyClient.js:464](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L464)

***

### logout

▸ **logout**(): `Promise`<`any`>

Logs out the client and reset all the links

Emits

*   "beforeLogout" at the beginning, before links have been reset
*   "login" when the client is fully logged out and links have been reset

*Returns*

`Promise`<`any`>

*   Resolves when all links have been reset and client is fully logged out

*Defined in*

[packages/cozy-client/src/CozyClient.js:515](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L515)

***

### makeNewDocument

▸ **makeNewDocument**(`doctype`): `any`

Creates (locally) a new document for the given doctype.
This document is hydrated : its relationships are there
and working.

*Parameters*

| Name | Type |
| :------ | :------ |
| `doctype` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1245](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1245)

***

### makeObservableQuery

▸ **makeObservableQuery**(`queryDefinition`, `options?`): `default`

*Parameters*

| Name | Type |
| :------ | :------ |
| `queryDefinition` | `any` |
| `options` | `Object` |

*Returns*

`default`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1021](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1021)

***

### mutate

▸ **mutate**(`mutationDefinition`, `[options]?`): `Promise`<`any`>

Mutate a document

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `mutationDefinition` | `any` | Describe the mutation |
| `[options]` | `Object` | Options |
| `[options].as` | `string` | - |
| `[options].update` | `Function` | - |
| `[options].updateQueries` | `Function` | - |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:1039](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1039)

***

### on

▸ **on**(...`args`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `...args` | `any`\[] |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:250](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L250)

***

### prepareDocumentForSave

▸ **prepareDocumentForSave**(`doc`): `CozyClientDocument`

Dehydrates and adds metadata before saving a document

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | `CozyClientDocument` | Document that will be saved |

*Returns*

`CozyClientDocument`

*Defined in*

[packages/cozy-client/src/CozyClient.js:757](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L757)

***

### query

▸ **query**(`queryDefinition`, `[options]?`): `Promise`<`any`>

Executes a query and returns its results.

Results from the query will be saved internally and can be retrieved via
`getQueryFromState` or directly using `<Query />`. `<Query />` automatically
executes its query when mounted if no fetch policy has been indicated.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryDefinition` | [`QueryDefinition`](QueryDefinition.md) | Definition that will be executed |
| `[options]` | `QueryOptions` | Options |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:917](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L917)

***

### queryAll

▸ **queryAll**(`queryDefinition`, `options?`): `Promise`<`any`>

Will fetch all documents for a `queryDefinition`, automatically fetching more
documents if the total of documents is superior to the pagination limit. Can
result in a lot of network requests.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryDefinition` | [`QueryDefinition`](QueryDefinition.md) | Definition to be executed |
| `options` | `QueryOptions` | - |

*Returns*

`Promise`<`any`>

All documents matching the query

*Defined in*

[packages/cozy-client/src/CozyClient.js:986](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L986)

***

### reducer

▸ **reducer**(): (`state`: { `documents`: {} = {}; `queries`: {} = {} }, `action`: `any`) => { `documents`: `any` ; `queries`: `QueriesStateSlice`  }

*Returns*

`fn`

▸ (`state?`, `action`): `Object`

*Parameters*

| Name | Type | Default value |
| :------ | :------ | :------ |
| `state` | `Object` | `initialState` |
| `state.documents` | `Object` | `{}` |
| `state.queries` | `Object` | `{}` |
| `action` | `any` | `undefined` |

*Returns*

`Object`

| Name | Type |
| :------ | :------ |
| `documents` | `any` |
| `queries` | `QueriesStateSlice` |

*Defined in*

[packages/cozy-client/src/CozyClient.js:1637](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1637)

***

### register

▸ **register**(`cozyURL`): `any`

Performs a complete OAuth flow using a Cordova webview
or React Native WebView for auth.
The `register` method's name has been chosen for compat reasons with the Authentication compo.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `cozyURL` | `string` | Receives the URL of the cozy instance. |

*Returns*

`any`

Contains the fetched token and the client information.

*Defined in*

[packages/cozy-client/src/CozyClient.js:1391](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1391)

***

### registerClientOnLinks

▸ **registerClientOnLinks**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:435](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L435)

***

### registerPlugin

▸ **registerPlugin**(`Plugin`, `options`): `any`

A plugin is a class whose constructor receives the client as first argument.
The main mean of interaction with the client should be with events
like "login"/"logout".

The plugin system is meant to encourage separation of concerns, modularity
and testability : instead of registering events at module level, please
create a plugin that subscribes to events.

Plugin instances are stored internally in the `plugins` attribute of the client
and can be accessed via this mean. A plugin class must have the attribute
`pluginName` that will be use as the key in the `plugins` object.

Two plugins with the same `pluginName` cannot co-exist.

**`example`**

```js
class AlertPlugin {
  constructor(client, options) {
    this.client = client
    this.options = options
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.client.on("login", this.handleLogin)
    this.client.on("logout", this.handleLogout)
  }

  handleLogin() {
    alert(this.options.onLoginAlert)
  }

  handleLogout() {
    alert(this.options.onLogoutAlert)
  }
}

AlertPlugin.pluginName = 'alerts'

client.registerPlugin(AlertPlugin, {
  onLoginAlert: 'client has logged in !',
  onLogoutAlert: 'client has logged out !'
})

// the instance of the plugin is accessible via
client.plugins.alerts
```

*Parameters*

| Name | Type |
| :------ | :------ |
| `Plugin` | `any` |
| `options` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:300](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L300)

***

### removeListener

▸ **removeListener**(...`args`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `...args` | `any`\[] |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:251](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L251)

***

### renewAuthorization

▸ **renewAuthorization**(): `any`

Renews the token if, for instance, new permissions are required or token
has expired.

*Returns*

`any`

Contains the fetched token and the client information.

*Defined in*

[packages/cozy-client/src/CozyClient.js:1486](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1486)

***

### requestMutation

▸ **requestMutation**(`definition`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `definition` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1163](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1163)

***

### save

▸ **save**(`doc`, `mutationOptions?`): `Promise`<`any`>

Create or update a document on the server

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | `any` | Document to save |
| `mutationOptions` | `any` | Mutation options |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:645](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L645)

***

### saveAll

▸ **saveAll**(`docs`, `mutationOptions?`): `Promise`<`void`>

Saves multiple documents in one batch

*   Can only be called with documents from the same doctype
*   Does not support automatic creation of references

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `docs` | `CozyClientDocument`\[] | Documents from the same doctype |
| `mutationOptions` | `Object` | Mutation Options |
| `mutationOptions.as` | `string` | - |
| `mutationOptions.update` | `Function` | - |
| `mutationOptions.updateQueries` | `Function` | - |

*Returns*

`Promise`<`void`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:666](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L666)

***

### setData

▸ **setData**(`data`): `void`

Directly set the data in the store, without using a query
This is useful for cases like Pouch replication, which wants to
set some data in the store.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | Data that is inserted in the store. Shape: { doctype: \[data] } |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1701](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1701)

***

### setOnError

▸ **setOnError**(`onError`): `void`

At any time put an error function

**`throws`** {Error} onError should not have been defined yet

*Parameters*

| Name | Type |
| :------ | :------ |
| `onError` | `Function` |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1714](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1714)

***

### setStore

▸ **setStore**(`store`, `[options]?`): `void`

Sets the internal store of the client. Use this when you want to have cozy-client's
internal store colocated with your existing Redux store.

Typically, you would need to do this only once in your application, this is why
setStore throws if you do it twice. If you really need to set the store again,
use options.force = true.

**`example`**

    const client = new CozyClient()
    const store = createStore(combineReducers({
      todos: todoReducer,
      cozy: client.reducer()
    })
    client.setStore(store)

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `store` | `any` | A redux store |
| `[options]` | `Object` | Options |
| `[options].force` | `boolean` | - |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1512](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1512)

***

### startOAuthFlow

▸ **startOAuthFlow**(`openURLCallback`): `Promise`<`any`>

Performs a complete OAuth flow, including updating the internal token at the end.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `openURLCallback` | `OpenURLCallback` | Receives the URL to present to the user as a parameter, and should return a promise that resolves with the URL the user was redirected to after accepting the permissions. |

*Returns*

`Promise`<`any`>

Contains the fetched token and the client information. These should be stored and used to restore the client.

*Defined in*

[packages/cozy-client/src/CozyClient.js:1407](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1407)

***

### toJSON

▸ **toJSON**(): `CozyClient`

*Returns*

`CozyClient`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1721](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1721)

***

### triggerHook

▸ **triggerHook**(`name`, `document`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `name` | `any` |
| `document` | `any` |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:858](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L858)

***

### upload

▸ **upload**(`file`, `dirPath`, `mutationOptions?`): `Promise`<`any`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `file` | `any` |
| `dirPath` | `any` |
| `mutationOptions` | `Object` |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:883](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L883)

***

### validate

▸ **validate**(`document`): `Promise`<{}>

*Parameters*

| Name | Type |
| :------ | :------ |
| `document` | `any` |

*Returns*

`Promise`<{}>

*Defined in*

[packages/cozy-client/src/CozyClient.js:634](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L634)

***

### watchQuery

▸ **watchQuery**(...`args`): `default`

*Parameters*

| Name | Type |
| :------ | :------ |
| `...args` | `any`\[] |

*Returns*

`default`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1014](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1014)

***

### fromDOM

▸ `Static` **fromDOM**(`options?`, `selector?`): [`CozyClient`](CozyClient.md)

When used from an app, CozyClient can be instantiated from the data injected by the stack in
the DOM.

*Parameters*

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `options` | `any` | `{}` | CozyClient constructor options |
| `selector` | `string` | `'[role=application]'` | Options |

*Returns*

[`CozyClient`](CozyClient.md)

*   CozyClient instance

*Defined in*

[packages/cozy-client/src/CozyClient.js:398](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L398)

***

### fromEnv

▸ `Static` **fromEnv**(`envArg`, `options?`): [`CozyClient`](CozyClient.md)

In konnector/service context, CozyClient can be instantiated from
environment variables

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `envArg` | `any` | - |
| `options` | `any` | Options |

*Returns*

[`CozyClient`](CozyClient.md)

*Defined in*

[packages/cozy-client/src/CozyClient.js:370](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L370)

***

### fromOldClient

▸ `Static` **fromOldClient**(`oldClient`, `options`): [`CozyClient`](CozyClient.md)

To help with the transition from cozy-client-js to cozy-client, it is possible to instantiate
a client with a cookie-based instance of cozy-client-js.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `oldClient` | `any` | An instance of the deprecated cozy-client |
| `options` | `any` | CozyStackClient options |

*Returns*

[`CozyClient`](CozyClient.md)

*Defined in*

[packages/cozy-client/src/CozyClient.js:324](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L324)

***

### fromOldOAuthClient

▸ `Static` **fromOldOAuthClient**(`oldClient`, `options`): `Promise`<[`CozyClient`](CozyClient.md)>

To help with the transition from cozy-client-js to cozy-client, it is possible to instantiate
a client with an OAuth-based instance of cozy-client-js.

Warning: unlike other instantiators, this one needs to be awaited.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `oldClient` | `any` | An OAuth instance of the deprecated cozy-client |
| `options` | `any` | CozyStackClient options |

*Returns*

`Promise`<[`CozyClient`](CozyClient.md)>

An instance of a client, configured from the old client

*Defined in*

[packages/cozy-client/src/CozyClient.js:342](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L342)

***

### registerHook

▸ `Static` **registerHook**(`doctype`, `name`, `fn`): `void`

Hooks are an observable system for events on documents.
There are at the moment only 2 hooks available.

*   before:destroy, called just before a document is destroyed via CozyClient::destroy
*   after:destroy, called after a document is destroyed via CozyClient::destroy

**`example`**

    CozyClient.registerHook('io.cozy.bank.accounts', 'before:destroy', () => {
      console.log('A io.cozy.bank.accounts is being destroyed')
    })

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `doctype` | `string` | Doctype on which the hook will be registered |
| `name` | `string` | Name of the hook |
| `fn` | `Function` | Callback to be executed |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:852](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L852)
