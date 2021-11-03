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

[packages/cozy-client/src/CozyClient.js:122](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L122)

## Properties

### appMetadata

• **appMetadata**: `any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:156](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L156)

***

### capabilities

• **capabilities**: `any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:179](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L179)

***

### chain

• **chain**: `any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:175](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L175)

***

### client

• **client**: `any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1519](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1519)

***

### instanceOptions

• **instanceOptions**: `Object`

*Defined in*

[packages/cozy-client/src/CozyClient.js:163](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L163)

***

### isLogged

• **isLogged**: `boolean`

*Defined in*

[packages/cozy-client/src/CozyClient.js:162](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L162)

***

### isRevoked

• **isRevoked**: `boolean`

*Defined in*

[packages/cozy-client/src/CozyClient.js:470](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L470)

***

### links

• **links**: `any`\[]

*Defined in*

[packages/cozy-client/src/CozyClient.js:172](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L172)

***

### loginPromise

• **loginPromise**: `Promise`<`void`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:447](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L447)

***

### options

• **options**: `Object`

*Type declaration*

| Name | Type | Description |
| :------ | :------ | :------ |
| `autoHydrate` | `boolean` | - |
| `client` | `any` | - |
| `oauth` | `any` | - |
| `onTokenRefresh` | `Function` | - |
| `stackClient` | `any` | - |
| `store` | `boolean` | If set to false, the client will not instantiate a Redux store automatically. Use this if you want to merge cozy-client's store with your own redux store. See [here](https://docs.cozy.io/en/cozy-client/react-integration/#1b-use-your-own-redux-store) for more information. |
| `token` | `any` | - |
| `uri` | `string` | - |
| `warningForCustomHandlers` | `boolean` | - |

*Defined in*

[packages/cozy-client/src/CozyClient.js:158](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L158)

***

### plugins

• **plugins**: `Object`

*Defined in*

[packages/cozy-client/src/CozyClient.js:184](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L184)

***

### queryIdGenerator

• **queryIdGenerator**: `QueryIDGenerator`

*Defined in*

[packages/cozy-client/src/CozyClient.js:160](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L160)

***

### schema

• **schema**: `Schema`

*Defined in*

[packages/cozy-client/src/CozyClient.js:177](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L177)

***

### stackClient

• **stackClient**: `any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1495](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1495)

***

### store

• **store**: `any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1428](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1428)

***

### storeAccesors

• **storeAccesors**: `any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:197](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L197)

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

[packages/cozy-client/src/CozyClient.js:1226](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1226)

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

[packages/cozy-client/src/CozyClient.js:450](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L450)

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

[packages/cozy-client/src/CozyClient.js:406](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L406)

***

### all

▸ **all**(`doctype`): [`QueryDefinition`](querydefinition.md)

*Parameters*

| Name | Type |
| :------ | :------ |
| `doctype` | `any` |

*Returns*

[`QueryDefinition`](querydefinition.md)

*Defined in*

[packages/cozy-client/src/CozyClient.js:547](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L547)

***

### authorize

▸ **authorize**(`openURLCallback`): `Promise`<`Object`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `openURLCallback` | `any` |

*Returns*

`Promise`<`Object`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:1361](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1361)

***

### checkForRevocation

▸ **checkForRevocation**(): `Promise`<`any`>

Returns whether the client has been revoked on the server

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:1442](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1442)

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

[packages/cozy-client/src/CozyClient.js:539](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L539)

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

[packages/cozy-client/src/CozyClient.js:594](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L594)

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

[packages/cozy-client/src/CozyClient.js:1476](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1476)

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

[packages/cozy-client/src/CozyClient.js:836](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L836)

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

[packages/cozy-client/src/CozyClient.js:1547](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1547)

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

[packages/cozy-client/src/CozyClient.js:224](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L224)

***

### ensureCozyMetadata

▸ **ensureCozyMetadata**(`document`, `options?`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `document` | `any` |
| `options` | `Object` |
| `options.event` | `string` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:656](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L656)

***

### ensureQueryExists

▸ **ensureQueryExists**(`queryId`, `queryDefinition`, `options`): `void`

Makes sure that the query exists in the store

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryId` | `string` | Id of the query |
| `queryDefinition` | [`QueryDefinition`](querydefinition.md) | Definition of the query |
| `options` | `QueryOptions` | - |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:857](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L857)

***

### ensureStore

▸ **ensureStore**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1433](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1433)

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

[packages/cozy-client/src/CozyClient.js:543](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L543)

***

### fetchQueryAndGetFromState

▸ **fetchQueryAndGetFromState**(`query`): `Promise`<`QueryState`>

Executes a query and returns the results from internal store.

Can be useful in pure JS context (without React)
Has a behavior close to <Query /> or useQuery

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | `any` | Query with definition and options |

*Returns*

`Promise`<`QueryState`>

Query state

*Defined in*

[packages/cozy-client/src/CozyClient.js:1322](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1322)

***

### find

▸ **find**(`doctype`, `selector?`): [`QueryDefinition`](querydefinition.md)

*Parameters*

| Name | Type |
| :------ | :------ |
| `doctype` | `any` |
| `selector` | `any` |

*Returns*

[`QueryDefinition`](querydefinition.md)

*Defined in*

[packages/cozy-client/src/CozyClient.js:556](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L556)

***

### generateRandomId

▸ **generateRandomId**(): `string`

*Returns*

`string`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1202](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1202)

***

### get

▸ **get**(`doctype`, `id`): [`QueryDefinition`](querydefinition.md)

*Parameters*

| Name | Type |
| :------ | :------ |
| `doctype` | `any` |
| `id` | `any` |

*Returns*

[`QueryDefinition`](querydefinition.md)

*Defined in*

[packages/cozy-client/src/CozyClient.js:563](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L563)

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

[packages/cozy-client/src/CozyClient.js:1209](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1209)

***

### getClient

▸ **getClient**(): `any`

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1529](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1529)

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

[packages/cozy-client/src/CozyClient.js:1245](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1245)

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

[packages/cozy-client/src/CozyClient.js:1262](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1262)

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
| `document` | `any` | Document to create |
| `referencesByName` | `Object` | - |

*Returns*

`any`

One or more mutation to execute

*Defined in*

[packages/cozy-client/src/CozyClient.js:749](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L749)

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

[packages/cozy-client/src/CozyClient.js:1129](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1129)

***

### getInstanceOptions

▸ **getInstanceOptions**(): `any`

getInstanceOptions - Returns current instance options, such as domain or app slug

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1556](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1556)

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

[packages/cozy-client/src/CozyClient.js:1283](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1283)

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

[packages/cozy-client/src/CozyClient.js:1225](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1225)

***

### getStackClient

▸ **getStackClient**(): `any`

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1536](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1536)

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

[packages/cozy-client/src/CozyClient.js:1447](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1447)

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

[packages/cozy-client/src/CozyClient.js:1458](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1458)

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

[packages/cozy-client/src/CozyClient.js:1172](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1172)

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

[packages/cozy-client/src/CozyClient.js:1149](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1149)

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

[packages/cozy-client/src/CozyClient.js:1183](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1183)

***

### isReactNative

▸ **isReactNative**(): `boolean`

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1345](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1345)

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

[packages/cozy-client/src/CozyClient.js:1567](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1567)

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

[packages/cozy-client/src/CozyClient.js:439](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L439)

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

[packages/cozy-client/src/CozyClient.js:486](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L486)

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

[packages/cozy-client/src/CozyClient.js:1195](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1195)

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

[packages/cozy-client/src/CozyClient.js:971](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L971)

***

### mutate

▸ **mutate**(`mutationDefinition`, `__namedParameters?`): `Promise`<`any`>

Mutate a document

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `mutationDefinition` | `any` | Describe the mutation |
| `__namedParameters` | `Object` | - |
| `__namedParameters.as` | `string` | - |
| `__namedParameters.update` | `Function` | - |
| `__namedParameters.updateQueries` | `Function` | - |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:989](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L989)

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

[packages/cozy-client/src/CozyClient.js:225](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L225)

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

[packages/cozy-client/src/CozyClient.js:720](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L720)

***

### query

▸ **query**(`queryDefinition`, `__namedParameters?`): `Promise`<`any`>

Executes a query and returns its results.

Results from the query will be saved internally and can be retrieved via
`getQueryFromState` or directly using `<Query />`. `<Query />` automatically
executes its query when mounted if no fetch policy has been indicated.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryDefinition` | [`QueryDefinition`](querydefinition.md) | Definition that will be executed |
| `__namedParameters` | `QueryOptions` | - |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:880](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L880)

***

### queryAll

▸ **queryAll**(`queryDefinition`, `options?`): `Promise`<`any`>

Will fetch all documents for a `queryDefinition`, automatically fetching more
documents if the total of documents is superior to the pagination limit. Can
result in a lot of network requests.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryDefinition` | [`QueryDefinition`](querydefinition.md) | Definition to be executed |
| `options` | `QueryOptions` | - |

*Returns*

`Promise`<`any`>

All documents matching the query

*Defined in*

[packages/cozy-client/src/CozyClient.js:936](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L936)

***

### reducer

▸ **reducer**(): (`state`: { `documents`: {} = {}; `queries`: {} = {} }, `action`: `any`) => { `documents`: `any` ; `queries`: `Record`<`string`, `QueryState`>  }

*Returns*

`fn`

▸ (`state?`, `action`): `Object`

*Parameters*

| Name | Type |
| :------ | :------ |
| `state` | `Object` |
| `state.documents` | `Object` |
| `state.queries` | `Object` |
| `action` | `any` |

*Returns*

`Object`

| Name | Type |
| :------ | :------ |
| `documents` | `any` |
| `queries` | `Record`<`string`, `QueryState`> |

*Defined in*

[packages/cozy-client/src/CozyClient.js:1543](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1543)

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

[packages/cozy-client/src/CozyClient.js:1339](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1339)

***

### registerClientOnLinks

▸ **registerClientOnLinks**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:410](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L410)

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

[packages/cozy-client/src/CozyClient.js:275](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L275)

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

[packages/cozy-client/src/CozyClient.js:226](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L226)

***

### renewAuthorization

▸ **renewAuthorization**(): `any`

Renews the token if, for instance, new permissions are required or token
has expired.

*Returns*

`any`

Contains the fetched token and the client information.

*Defined in*

[packages/cozy-client/src/CozyClient.js:1392](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1392)

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

[packages/cozy-client/src/CozyClient.js:1113](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1113)

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

[packages/cozy-client/src/CozyClient.js:616](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L616)

***

### saveAll

▸ **saveAll**(`docs`, `mutationOptions?`): `Promise`<`void`>

Saves multiple documents in one batch

*   Can only be called with documents from the same doctype
*   Does not support automatic creation of references

*Parameters*

| Name | Type |
| :------ | :------ |
| `docs` | `CozyClientDocument`\[] |
| `mutationOptions` | `any` |

*Returns*

`Promise`<`void`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:634](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L634)

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

[packages/cozy-client/src/CozyClient.js:1588](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1588)

***

### setStore

▸ **setStore**(`store`, `__namedParameters?`): `void`

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
| `__namedParameters` | `Object` | - |
| `__namedParameters.force` | `boolean` | - |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1418](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1418)

***

### startOAuthFlow

▸ **startOAuthFlow**(`openURLCallback`): `Promise`<`any`>

Performs a complete OAuth flow, including updating the internal token at the end.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `openURLCallback` | `Function` | Receives the URL to present to the user as a parameter, and should return a promise that resolves with the URL the user was redirected to after accepting the permissions. |

*Returns*

`Promise`<`any`>

Contains the fetched token and the client information. These should be stored and used to restore the client.

*Defined in*

[packages/cozy-client/src/CozyClient.js:1355](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1355)

***

### toJSON

▸ **toJSON**(): `CozyClient`

*Returns*

`CozyClient`

*Defined in*

[packages/cozy-client/src/CozyClient.js:1595](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1595)

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

[packages/cozy-client/src/CozyClient.js:821](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L821)

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

[packages/cozy-client/src/CozyClient.js:846](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L846)

***

### validate

▸ **validate**(`document`): `Promise`<`Object`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `document` | `any` |

*Returns*

`Promise`<`Object`>

*Defined in*

[packages/cozy-client/src/CozyClient.js:605](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L605)

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

[packages/cozy-client/src/CozyClient.js:964](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L964)

***

### fromDOM

▸ `Static` **fromDOM**(`options?`, `selector?`): [`CozyClient`](cozyclient.md)

When used from an app, CozyClient can be instantiated from the data injected by the stack in
the DOM.

*Parameters*

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `options` | `any` | `{}` | CozyClient constructor options |
| `selector` | `string` | `'[role=application]'` | Options |

*Returns*

[`CozyClient`](cozyclient.md)

*   CozyClient instance

*Defined in*

[packages/cozy-client/src/CozyClient.js:373](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L373)

***

### fromEnv

▸ `Static` **fromEnv**(`envArg`, `options?`): [`CozyClient`](cozyclient.md)

In konnector/service context, CozyClient can be instantiated from
environment variables

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `envArg` | `any` | - |
| `options` | `any` | Options |

*Returns*

[`CozyClient`](cozyclient.md)

*Defined in*

[packages/cozy-client/src/CozyClient.js:345](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L345)

***

### fromOldClient

▸ `Static` **fromOldClient**(`oldClient`, `options`): [`CozyClient`](cozyclient.md)

To help with the transition from cozy-client-js to cozy-client, it is possible to instantiate
a client with a cookie-based instance of cozy-client-js.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `oldClient` | `any` | An instance of the deprecated cozy-client |
| `options` | `any` | CozyStackClient options |

*Returns*

[`CozyClient`](cozyclient.md)

*Defined in*

[packages/cozy-client/src/CozyClient.js:299](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L299)

***

### fromOldOAuthClient

▸ `Static` **fromOldOAuthClient**(`oldClient`, `options`): `Promise`<[`CozyClient`](cozyclient.md)>

To help with the transition from cozy-client-js to cozy-client, it is possible to instantiate
a client with an OAuth-based instance of cozy-client-js.

Warning: unlike other instantiators, this one needs to be awaited.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `oldClient` | `any` | An OAuth instance of the deprecated cozy-client |
| `options` | `any` | CozyStackClient options |

*Returns*

`Promise`<[`CozyClient`](cozyclient.md)>

An instance of a client, configured from the old client

*Defined in*

[packages/cozy-client/src/CozyClient.js:317](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L317)

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

[packages/cozy-client/src/CozyClient.js:815](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L815)
