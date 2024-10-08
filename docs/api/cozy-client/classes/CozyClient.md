[cozy-client](../README.md) / CozyClient

# Class: CozyClient

Responsible for

- Creating observable queries
- Hydration
- Creating plan for saving documents
- Associations

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
          doctype: 'io.cozy.persons',
        },
      },
    },
  },
});
```

Cozy-Client will automatically call `this.login()` if provided with a token and an uri

_Parameters_

| Name         | Type            | Description |
| :----------- | :-------------- | :---------- |
| `rawOptions` | `ClientOptions` | Options     |

_Defined in_

[packages/cozy-client/src/CozyClient.js:155](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L155)

## Properties

### appMetadata

• **appMetadata**: `AppMetadata`

_Defined in_

[packages/cozy-client/src/CozyClient.js:168](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L168)

---

### capabilities

• **capabilities**: `ClientCapabilities`

_Defined in_

[packages/cozy-client/src/CozyClient.js:196](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L196)

---

### chain

• **chain**: `any`

_Defined in_

[packages/cozy-client/src/CozyClient.js:189](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L189)

---

### client

• **client**: `any`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1700](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1700)

---

### instanceOptions

• **instanceOptions**: `Object`

_Defined in_

[packages/cozy-client/src/CozyClient.js:176](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L176)

---

### isLogged

• **isLogged**: `boolean`

_Defined in_

[packages/cozy-client/src/CozyClient.js:175](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L175)

---

### isRevoked

• **isRevoked**: `boolean`

_Defined in_

[packages/cozy-client/src/CozyClient.js:490](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L490)

---

### links

• **links**: `any`\[]

_Defined in_

[packages/cozy-client/src/CozyClient.js:186](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L186)

---

### loginPromise

• **loginPromise**: `Promise`<`void`>

_Defined in_

[packages/cozy-client/src/CozyClient.js:169](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L169)

---

### options

• **options**: `Object`

_Type declaration_

| Name                       | Type       | Description                                                                                                                                                                                                                                                                          |
| :------------------------- | :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoHydrate`              | `boolean`  | -                                                                                                                                                                                                                                                                                    |
| `backgroundFetching`       | `boolean`  | If set to true, backgroundFetching will be enabled by default on every query. Meaning that, when the fetchStatus has already been loaded, it won't be updated during future fetches. Instead, a `isFetching` attribute will be used to indicate when background fetching is started. |
| `client`                   | `any`      | -                                                                                                                                                                                                                                                                                    |
| `oauth`                    | `any`      | -                                                                                                                                                                                                                                                                                    |
| `onError`                  | `Function` | Default callback if a query is errored                                                                                                                                                                                                                                               |
| `onTokenRefresh`           | `Function` | -                                                                                                                                                                                                                                                                                    |
| `stackClient`              | `any`      | -                                                                                                                                                                                                                                                                                    |
| `store`                    | `boolean`  | If set to false, the client will not instantiate a Redux store automatically. Use this if you want to merge cozy-client's store with your own redux store. See [here](https://docs.cozy.io/en/cozy-client/react-integration/#1b-use-your-own-redux-store) for more information.      |
| `token`                    | `any`      | -                                                                                                                                                                                                                                                                                    |
| `uri`                      | `string`   | -                                                                                                                                                                                                                                                                                    |
| `warningForCustomHandlers` | `boolean`  | -                                                                                                                                                                                                                                                                                    |

_Defined in_

[packages/cozy-client/src/CozyClient.js:172](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L172)

---

### plugins

• **plugins**: `Object`

_Defined in_

[packages/cozy-client/src/CozyClient.js:199](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L199)

---

### queryIdGenerator

• **queryIdGenerator**: `QueryIDGenerator`

_Defined in_

[packages/cozy-client/src/CozyClient.js:174](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L174)

---

### schema

• **schema**: `Schema`

_Defined in_

[packages/cozy-client/src/CozyClient.js:191](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L191)

---

### stackClient

• **stackClient**: `any`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1675](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1675)

---

### store

• **store**: `any`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1605](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1605)

---

### storeAccesors

• **storeAccesors**: `any`

_Defined in_

[packages/cozy-client/src/CozyClient.js:224](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L224)

---

### storeAccessors

• **storeAccessors**: `Object`

_Type declaration_

| Name       | Type                                        |
| :--------- | :------------------------------------------ |
| `dispatch` | `any`                                       |
| `get`      | `any`                                       |
| `mutate`   | (`def`: `any`, `opts`: `any`) => `any`      |
| `query`    | (`def`: `any`, `opts`: `any`) => `any`      |
| `save`     | (`document`: `any`, `opts`: `any`) => `any` |

_Defined in_

[packages/cozy-client/src/CozyClient.js:1358](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1358)

---

### fetchPolicies

▪ `Static` **fetchPolicies**: `Object`

_Type declaration_

| Name        | Type                              |
| :---------- | :-------------------------------- |
| `noFetch`   | () => `boolean`                   |
| `olderThan` | (`delay`: `number`) => `Function` |

---

### hooks

▪ `Static` **hooks**: `Object`

---

### version

▪ `Static` **version**: `string`

## Methods

### \_login

▸ **\_login**(`options`): `Promise`<`void`>

_Parameters_

| Name      | Type  |
| :-------- | :---- |
| `options` | `any` |

_Returns_

`Promise`<`void`>

_Defined in_

[packages/cozy-client/src/CozyClient.js:469](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L469)

---

### addSchema

▸ **addSchema**(`schemaDefinition`): `void`

_Parameters_

| Name               | Type  |
| :----------------- | :---- |
| `schemaDefinition` | `any` |

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:425](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L425)

---

### all

▸ **all**(`doctype`): [`QueryDefinition`](QueryDefinition.md)

_Parameters_

| Name      | Type  |
| :-------- | :---- |
| `doctype` | `any` |

_Returns_

[`QueryDefinition`](QueryDefinition.md)

_Defined in_

[packages/cozy-client/src/CozyClient.js:570](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L570)

---

### authorize

▸ **authorize**(`[options]?`): `Promise`<`any`>

Creates an OAuth token with needed permissions for the current client.
The authorization page URL generation can be overriding by passing a function pointer as `openURLCallback` parameter
It is possible to skip the session creation process (when using an in-app browser) by passing a sessionCode (see https://docs.cozy.io/en/cozy-stack/auth/#post-authsession_code)

_Parameters_

| Name                        | Type              | Description           |
| :-------------------------- | :---------------- | :-------------------- |
| `[options]`                 | `Object`          | Authorization options |
| `[options].openURLCallback` | `OpenURLCallback` | -                     |
| `[options].pkceCodes`       | `PKCECodes`       | -                     |
| `[options].sessionCode`     | `string`          | -                     |

_Returns_

`Promise`<`any`>

Contains the fetched token and the client information. These should be stored and used to restore the client.

_Defined in_

[packages/cozy-client/src/CozyClient.js:1521](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1521)

---

### certifyFlagship

▸ **certifyFlagship**(): `Promise`<`void`>

Perform the Flagship certification process for verifying that the current running app is a genuine Cozy application

This mechanism is described in https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/flagship-certification/README.md

_Returns_

`Promise`<`void`>

_Defined in_

[packages/cozy-client/src/CozyClient.js:1502](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1502)

---

### checkForRevocation

▸ **checkForRevocation**(): `Promise`<`any`>

Returns whether the client has been revoked on the server

_Returns_

`Promise`<`any`>

_Defined in_

[packages/cozy-client/src/CozyClient.js:1617](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1617)

---

### collection

▸ **collection**(`doctype`): `any`

Forwards to a stack client instance and returns
a [DocumentCollection](https://docs.cozy.io/en/cozy-client/api/cozy-stack-client/#DocumentCollection) instance.

_Parameters_

| Name      | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `doctype` | `string` | The collection doctype. |

_Returns_

`any`

Collection corresponding to the doctype

_Defined in_

[packages/cozy-client/src/CozyClient.js:562](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L562)

---

### create

▸ **create**(`type`, `doc`, `references`, `options?`): `Promise`<`any`>

Creates a document and saves it on the server

**`example`**

```js
await client.create('io.cozy.todos', {
  label: 'My todo',
  relationships: {
    authors: {
      data: [{ _id: 1, _type: 'io.cozy.persons' }],
    },
  },
});
```

_Parameters_

| Name         | Type     | Description             |
| :----------- | :------- | :---------------------- |
| `type`       | `string` | Doctype of the document |
| `doc`        | `any`    | Document to save        |
| `references` | `Object` | -                       |
| `options`    | `any`    | Mutation options        |

_Returns_

`Promise`<`any`>

_Defined in_

[packages/cozy-client/src/CozyClient.js:617](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L617)

---

### createClient

▸ **createClient**(): `void`

If no stack client has been passed in options, creates a default stack
client and attaches handlers for revocation and token refresh.
If a stackClient has been passed in options, ensure it has handlers for
revocation and token refresh.

If `oauth` options are passed, stackClient is an OAuthStackClient.

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1655](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1655)

---

### destroy

▸ **destroy**(`document`, `mutationOptions?`): `Promise`<`CozyClientDocument`>

Destroys a document. {before,after}:destroy hooks will be fired.

_Parameters_

| Name              | Type                 | Description            |
| :---------------- | :------------------- | :--------------------- |
| `document`        | `CozyClientDocument` | Document to be deleted |
| `mutationOptions` | `Object`             | -                      |

_Returns_

`Promise`<`CozyClientDocument`>

The document that has been deleted

_Defined in_

[packages/cozy-client/src/CozyClient.js:873](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L873)

---

### dispatch

▸ **dispatch**(`action`): `any`

_Parameters_

| Name     | Type  |
| :------- | :---- |
| `action` | `any` |

_Returns_

`any`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1726](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1726)

---

### emit

▸ **emit**(...`args`): `void`

Gets overrided by MicroEE.mixin
This is here just so typescript does not scream

TODO Find a better way to make TS understand that emit is
a method from cozy-client

_Parameters_

| Name      | Type     |
| :-------- | :------- |
| `...args` | `any`\[] |

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:238](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L238)

---

### ensureCozyMetadata

▸ **ensureCozyMetadata**(`document`, `options?`): `CozyClientDocument`

_Parameters_

| Name            | Type                 | Description                 |
| :-------------- | :------------------- | :-------------------------- |
| `document`      | `CozyClientDocument` | Document that will be saved |
| `options`       | `Object`             | -                           |
| `options.event` | `string`             | -                           |

_Returns_

`CozyClientDocument`

_Defined in_

[packages/cozy-client/src/CozyClient.js:687](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L687)

---

### ensureQueryExists

▸ **ensureQueryExists**(`queryId`, `queryDefinition`, `options`): `void`

Makes sure that the query exists in the store

_Parameters_

| Name              | Type                                    | Description             |
| :---------------- | :-------------------------------------- | :---------------------- |
| `queryId`         | `string`                                | Id of the query         |
| `queryDefinition` | [`QueryDefinition`](QueryDefinition.md) | Definition of the query |
| `options`         | `QueryOptions`                          | -                       |

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:894](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L894)

---

### ensureStore

▸ **ensureStore**(): `void`

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1608](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1608)

---

### fetch

▸ **fetch**(`method`, `path`, `body`, `options?`): `any`

_Parameters_

| Name      | Type     |
| :-------- | :------- |
| `method`  | `any`    |
| `path`    | `any`    |
| `body`    | `any`    |
| `options` | `Object` |

_Returns_

`any`

_Defined in_

[packages/cozy-client/src/CozyClient.js:566](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L566)

---

### fetchQueryAndGetFromState

▸ **fetchQueryAndGetFromState**(`query`): `Promise`<`QueryState`>

Executes a query and returns the results from internal store.

Can be useful in pure JS context (without React)
Has a behavior close to <Query /> or useQuery

_Parameters_

| Name               | Type                                    | Description                       |
| :----------------- | :-------------------------------------- | :-------------------------------- |
| `query`            | `Object`                                | Query with definition and options |
| `query.definition` | [`QueryDefinition`](QueryDefinition.md) | Query Definition                  |
| `query.options`    | `QueryOptions`                          | Query Options                     |

_Returns_

`Promise`<`QueryState`>

Query state

_Defined in_

[packages/cozy-client/src/CozyClient.js:1455](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1455)

---

### find

▸ **find**(`doctype`, `selector?`): [`QueryDefinition`](QueryDefinition.md)

_Parameters_

| Name       | Type  | Default value |
| :--------- | :---- | :------------ |
| `doctype`  | `any` | `undefined`   |
| `selector` | `any` | `undefined`   |

_Returns_

[`QueryDefinition`](QueryDefinition.md)

_Defined in_

[packages/cozy-client/src/CozyClient.js:579](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L579)

---

### generateRandomId

▸ **generateRandomId**(): `string`

_Returns_

`string`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1333](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1333)

---

### get

▸ **get**(`doctype`, `id`): [`QueryDefinition`](QueryDefinition.md)

_Parameters_

| Name      | Type  |
| :-------- | :---- |
| `doctype` | `any` |
| `id`      | `any` |

_Returns_

[`QueryDefinition`](QueryDefinition.md)

_Defined in_

[packages/cozy-client/src/CozyClient.js:586](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L586)

---

### getAssociation

▸ **getAssociation**(`document`, `associationName`): `any`

Creates an association that is linked to the store.

_Parameters_

| Name              | Type  |
| :---------------- | :---- |
| `document`        | `any` |
| `associationName` | `any` |

_Returns_

`any`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1340](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1340)

---

### getClient

▸ **getClient**(): `any`

_Returns_

`any`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1708](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1708)

---

### getCollectionFromState

▸ **getCollectionFromState**(`type`): `CozyClientDocument`\[]

Get a collection of documents from the internal store.

_Parameters_

| Name   | Type     | Description               |
| :----- | :------- | :------------------------ |
| `type` | `string` | Doctype of the collection |

_Returns_

`CozyClientDocument`\[]

Array of documents or null if the collection does not exist.

_Defined in_

[packages/cozy-client/src/CozyClient.js:1376](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1376)

---

### getDocumentFromState

▸ **getDocumentFromState**(`type`, `id`): `CozyClientDocument`

Get a document from the internal store.

_Parameters_

| Name   | Type     | Description             |
| :----- | :------- | :---------------------- |
| `type` | `string` | Doctype of the document |
| `id`   | `string` | Id of the document      |

_Returns_

`CozyClientDocument`

Document or null if the object does not exist.

_Defined in_

[packages/cozy-client/src/CozyClient.js:1393](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1393)

---

### getDocumentSavePlan

▸ **getDocumentSavePlan**(`document`, `referencesByName`): `any`

Creates a list of mutations to execute to create a document and its relationships.

```js
const baseDoc = { _type: 'io.cozy.todo', label: 'Go hiking' };
// relations can be arrays or single objects
const relationships = {
  attachments: [
    { _id: 12345, _type: 'io.cozy.files' },
    { _id: 6789, _type: 'io.cozy.files' },
  ],
  bills: { _id: 9999, _type: 'io.cozy.bills' },
};
client.getDocumentSavePlan(baseDoc, relationships);
```

_Parameters_

| Name               | Type                 | Description        |
| :----------------- | :------------------- | :----------------- |
| `document`         | `CozyClientDocument` | Document to create |
| `referencesByName` | `Object`             | -                  |

_Returns_

`any`

One or more mutation to execute

_Defined in_

[packages/cozy-client/src/CozyClient.js:786](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L786)

---

### getIncludesRelationships

▸ **getIncludesRelationships**(`queryDefinition`): `Dictionary`<`any`>

_Parameters_

| Name              | Type  |
| :---------------- | :---- |
| `queryDefinition` | `any` |

_Returns_

`Dictionary`<`any`>

_Defined in_

[packages/cozy-client/src/CozyClient.js:1260](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1260)

---

### getInstanceOptions

▸ **getInstanceOptions**(): `any`

getInstanceOptions - Returns current instance options, such as domain or app slug

_Returns_

`any`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1735](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1735)

---

### getQueryFromState

▸ **getQueryFromState**(`id`, `options?`): `QueryState`

Get a query from the internal store.

_Parameters_

| Name                    | Type      | Description                              |
| :---------------------- | :-------- | :--------------------------------------- |
| `id`                    | `string`  | Id of the query (set via Query.props.as) |
| `options`               | `Object`  | Options                                  |
| `options.hydrated`      | `boolean` | -                                        |
| `options.singleDocData` | `any`     | -                                        |

_Returns_

`QueryState`

- Query state or null if it does not exist.

_Defined in_

[packages/cozy-client/src/CozyClient.js:1414](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1414)

---

### getRelationshipStoreAccessors

▸ **getRelationshipStoreAccessors**(): `Object`

Returns the accessors that are given to the relationships for them
to deal with the stores.

Relationships need to have access to the store to ping it when
a modification (addById/removeById etc...) has been done. This wakes
the store up, which in turn will update the `<Query>`s and re-render the data.

_Returns_

`Object`

| Name       | Type                                        |
| :--------- | :------------------------------------------ |
| `dispatch` | `any`                                       |
| `get`      | `any`                                       |
| `mutate`   | (`def`: `any`, `opts`: `any`) => `any`      |
| `query`    | (`def`: `any`, `opts`: `any`) => `any`      |
| `save`     | (`document`: `any`, `opts`: `any`) => `any` |

_Defined in_

[packages/cozy-client/src/CozyClient.js:1356](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1356)

---

### getSettings

▸ **getSettings**<`T`>(`slug`, `keys`): `Promise`<`Record`<`T`, `any`>>

Query the cozy-app settings corresponding to the given slug and
extract the value corresponding to the given `key`

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `string` |

_Parameters_

| Name   | Type     | Description                                                                        |
| :----- | :------- | :--------------------------------------------------------------------------------- |
| `slug` | `string` | the cozy-app's slug containing the setting (can be 'instance' for global settings) |
| `keys` | `T`\[]   | The names of the settings to retrieve                                              |

_Returns_

`Promise`<`Record`<`T`, `any`>>

- The value of the requested setting

_Defined in_

[packages/cozy-client/src/CozyClient.js:1836](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1836)

---

### getStackClient

▸ **getStackClient**(): `any`

_Returns_

`any`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1715](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1715)

---

### handleRevocationChange

▸ **handleRevocationChange**(`state`): `void`

Sets public attribute and emits event related to revocation

_Parameters_

| Name    | Type  |
| :------ | :---- |
| `state` | `any` |

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1626](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1626)

---

### handleTokenRefresh

▸ **handleTokenRefresh**(`token`): `void`

Emits event when token is refreshed

_Parameters_

| Name    | Type  |
| :------ | :---- |
| `token` | `any` |

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1637](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1637)

---

### hydrateDocument

▸ **hydrateDocument**(`document`, `schemaArg`): `any`

Resolves relationships on a document.

The original document is kept in the target attribute of
the relationship

_Parameters_

| Name        | Type                 | Description                              |
| :---------- | :------------------- | :--------------------------------------- |
| `document`  | `CozyClientDocument` | for which relationships must be resolved |
| `schemaArg` | `Schema`             | -                                        |

_Returns_

`any`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1303](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1303)

---

### hydrateDocuments

▸ **hydrateDocuments**(`doctype`, `documents`): `any`\[]

Returns documents with their relationships resolved according to their schema.
If related documents are not in the store, they will not be fetched automatically.
Instead, the relationships will have null documents.

_Parameters_

| Name        | Type                    | Description                             |
| :---------- | :---------------------- | :-------------------------------------- |
| `doctype`   | `string`                | Doctype of the documents being hydrated |
| `documents` | `CozyClientDocument`\[] | Documents to be hydrated                |

_Returns_

`any`\[]

_Defined in_

[packages/cozy-client/src/CozyClient.js:1280](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1280)

---

### hydrateRelationships

▸ **hydrateRelationships**(`document`, `schemaRelationships`): `Object`

_Parameters_

| Name                  | Type  |
| :-------------------- | :---- |
| `document`            | `any` |
| `schemaRelationships` | `any` |

_Returns_

`Object`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1314](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1314)

---

### isReactNative

▸ **isReactNative**(): `boolean`

_Returns_

`boolean`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1478](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1478)

---

### loadInstanceOptionsFromDOM

▸ **loadInstanceOptionsFromDOM**(`selector?`): `void`

loadInstanceOptionsFromDOM - Loads the dataset injected by the Stack in web pages and exposes it through getInstanceOptions

_Parameters_

| Name       | Type     | Default value          |
| :--------- | :------- | :--------------------- |
| `selector` | `string` | `'[role=application]'` |

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1746](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1746)

---

### loadInstanceOptionsFromStack

▸ **loadInstanceOptionsFromStack**(): `Promise`<`void`>

loadInstanceOptionsFromStack - Loads the instance options from cozy-stack and exposes it through getInstanceOptions

This method is not iso with loadInstanceOptionsFromDOM for now.

_Returns_

`Promise`<`void`>

_Defined in_

[packages/cozy-client/src/CozyClient.js:1767](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1767)

---

### login

▸ **login**(`options`): `Promise`<`any`>

Notify the links that they can start and set isLogged to true.

On mobile, where url/token are set after instantiation, use this method
to set the token and uri via options.

Emits

- "beforeLogin" at the beginning, before links have been set up
- "login" when the client is fully logged in and links have been set up

_Parameters_

| Name            | Type     | Description                               |
| :-------------- | :------- | :---------------------------------------- |
| `options`       | `Object` | -                                         |
| `options.token` | `string` | If passed, the token is set on the client |
| `options.uri`   | `string` | If passed, the uri is set on the client   |

_Returns_

`Promise`<`any`>

- Resolves when all links have been setup and client is fully logged in

_Defined in_

[packages/cozy-client/src/CozyClient.js:458](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L458)

---

### logout

▸ **logout**(): `Promise`<`any`>

Logs out the client and reset all the links

Emits

- "beforeLogout" at the beginning, before links have been reset
- "logout" when the client is fully logged out and links have been reset

_Returns_

`Promise`<`any`>

- Resolves when all links have been reset and client is fully logged out

_Defined in_

[packages/cozy-client/src/CozyClient.js:509](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L509)

---

### makeNewDocument

▸ **makeNewDocument**(`doctype`): `any`

Creates (locally) a new document for the given doctype.
This document is hydrated : its relationships are there
and working.

_Parameters_

| Name      | Type  |
| :-------- | :---- |
| `doctype` | `any` |

_Returns_

`any`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1326](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1326)

---

### makeObservableQuery

▸ **makeObservableQuery**(`queryDefinition`, `options?`): `default`

_Parameters_

| Name              | Type     |
| :---------------- | :------- |
| `queryDefinition` | `any`    |
| `options`         | `Object` |

_Returns_

`default`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1043](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1043)

---

### mutate

▸ **mutate**(`mutationDefinition`, `[options]?`): `Promise`<`any`>

Mutate a document

_Parameters_

| Name                      | Type       | Description           |
| :------------------------ | :--------- | :-------------------- |
| `mutationDefinition`      | `any`      | Describe the mutation |
| `[options]`               | `Object`   | Options               |
| `[options].as`            | `string`   | -                     |
| `[options].update`        | `Function` | -                     |
| `[options].updateQueries` | `Function` | -                     |

_Returns_

`Promise`<`any`>

_Defined in_

[packages/cozy-client/src/CozyClient.js:1061](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1061)

---

### on

▸ **on**(...`args`): `void`

_Parameters_

| Name      | Type     |
| :-------- | :------- |
| `...args` | `any`\[] |

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:239](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L239)

---

### prepareDocumentForSave

▸ **prepareDocumentForSave**(`doc`): `CozyClientDocument`

Dehydrates and adds metadata before saving a document

_Parameters_

| Name  | Type                 | Description                 |
| :---- | :------------------- | :-------------------------- |
| `doc` | `CozyClientDocument` | Document that will be saved |

_Returns_

`CozyClientDocument`

_Defined in_

[packages/cozy-client/src/CozyClient.js:757](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L757)

---

### query

▸ **query**(`queryDefinition`, `[options]?`): `Promise`<`any`>

Executes a query and returns its results.

Results from the query will be saved internally and can be retrieved via
`getQueryFromState` or directly using `<Query />`. `<Query />` automatically
executes its query when mounted if no fetch policy has been indicated.

If the query is called under the fetch policy's delay, then the query
is not executed and nothing is returned. If you need a result anyway,
please use `fetchQueryAndGetFromState` instead

_Parameters_

| Name              | Type                                    | Description                      |
| :---------------- | :-------------------------------------- | :------------------------------- |
| `queryDefinition` | [`QueryDefinition`](QueryDefinition.md) | Definition that will be executed |
| `[options]`       | `QueryOptions`                          | Options                          |

_Returns_

`Promise`<`any`>

_Defined in_

[packages/cozy-client/src/CozyClient.js:921](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L921)

---

### queryAll

▸ **queryAll**(`queryDefinition`, `options?`): `Promise`<`any`>

Will fetch all documents for a `queryDefinition`, automatically fetching more
documents if the total of documents is superior to the pagination limit. Can
result in a lot of network requests.

_Parameters_

| Name              | Type                                    | Description               |
| :---------------- | :-------------------------------------- | :------------------------ |
| `queryDefinition` | [`QueryDefinition`](QueryDefinition.md) | Definition to be executed |
| `options`         | `QueryOptions`                          | -                         |

_Returns_

`Promise`<`any`>

All documents matching the query

_Defined in_

[packages/cozy-client/src/CozyClient.js:1003](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1003)

---

### reducer

▸ **reducer**(): (`state`: { `documents`: {} = {}; `queries`: {} = {} }, `action`: `any`) => { `documents`: `any` ; `queries`: `QueriesStateSlice` }

_Returns_

`fn`

▸ (`state?`, `action`): `Object`

_Parameters_

| Name              | Type     | Default value  |
| :---------------- | :------- | :------------- |
| `state`           | `Object` | `initialState` |
| `state.documents` | `Object` | `{}`           |
| `state.queries`   | `Object` | `{}`           |
| `action`          | `any`    | `undefined`    |

_Returns_

`Object`

| Name        | Type                |
| :---------- | :------------------ |
| `documents` | `any`               |
| `queries`   | `QueriesStateSlice` |

_Defined in_

[packages/cozy-client/src/CozyClient.js:1722](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1722)

---

### register

▸ **register**(`cozyURL`): `any`

Performs a complete OAuth flow using a Cordova webview
or React Native WebView for auth.
The `register` method's name has been chosen for compat reasons with the Authentication compo.

_Parameters_

| Name      | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `cozyURL` | `string` | Receives the URL of the cozy instance. |

_Returns_

`any`

Contains the fetched token and the client information.

_Defined in_

[packages/cozy-client/src/CozyClient.js:1472](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1472)

---

### registerClientOnLinks

▸ **registerClientOnLinks**(): `void`

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:429](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L429)

---

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
    this.client = client;
    this.options = options;
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.client.on('login', this.handleLogin);
    this.client.on('logout', this.handleLogout);
  }

  handleLogin() {
    alert(this.options.onLoginAlert);
  }

  handleLogout() {
    alert(this.options.onLogoutAlert);
  }
}

AlertPlugin.pluginName = 'alerts';

client.registerPlugin(AlertPlugin, {
  onLoginAlert: 'client has logged in !',
  onLogoutAlert: 'client has logged out !',
});

// the instance of the plugin is accessible via
client.plugins.alerts;
```

_Parameters_

| Name      | Type  |
| :-------- | :---- |
| `Plugin`  | `any` |
| `options` | `any` |

_Returns_

`any`

_Defined in_

[packages/cozy-client/src/CozyClient.js:289](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L289)

---

### removeListener

▸ **removeListener**(...`args`): `void`

_Parameters_

| Name      | Type     |
| :-------- | :------- |
| `...args` | `any`\[] |

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:240](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L240)

---

### renewAuthorization

▸ **renewAuthorization**(): `any`

Renews the token if, for instance, new permissions are required or token
has expired.

_Returns_

`any`

Contains the fetched token and the client information.

_Defined in_

[packages/cozy-client/src/CozyClient.js:1567](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1567)

---

### requestMutation

▸ **requestMutation**(`definition`): `any`

_Parameters_

| Name         | Type  |
| :----------- | :---- |
| `definition` | `any` |

_Returns_

`any`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1244](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1244)

---

### resetQuery

▸ **resetQuery**(`queryId`): `Promise`<`QueryState`>

Reset a query

This method will reset the query state to its initial state and refetch it.

_Parameters_

| Name      | Type     | Description |
| :-------- | :------- | :---------- |
| `queryId` | `string` | Query id    |

_Returns_

`Promise`<`QueryState`>

- Query state or null if the query does not exist

_Defined in_

[packages/cozy-client/src/CozyClient.js:1865](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1865)

---

### save

▸ **save**(`doc`, `mutationOptions?`): `Promise`<`any`>

Create or update a document on the server

_Parameters_

| Name              | Type  | Description      |
| :---------------- | :---- | :--------------- |
| `doc`             | `any` | Document to save |
| `mutationOptions` | `any` | Mutation options |

_Returns_

`Promise`<`any`>

_Defined in_

[packages/cozy-client/src/CozyClient.js:639](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L639)

---

### saveAfterFetchSettings

▸ **saveAfterFetchSettings**<`T`>(`slug`, `itemsOrSetter`, `setterKeys`): `Promise`<`any`>

Save the given value into the corresponding cozy-app setting

This methods will first query the cozy-app's settings before injecting the new value and then
save the new resulting settings into database

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `string` |

_Parameters_

| Name            | Type                      | Description                                                                                                           |
| :-------------- | :------------------------ | :-------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `slug`          | `string`                  | the cozy-app's slug containing the setting (can be 'instance' for global settings)                                    |
| `itemsOrSetter` | `Record`<`string`, `any`> | (`oldValue`: `any`) => `Record`<`T`, `any`>                                                                           | The new values of the settings to save. It can be a raw dictionary, or a callback that should return a new dictionary |
| `setterKeys`    | `T`\[]                    | The new values of the settings to save. It can be a raw dictionary, or a callback that should return a new dictionary |

_Returns_

`Promise`<`any`>

- The result of the `client.save()` call

_Defined in_

[packages/cozy-client/src/CozyClient.js:1853](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1853)

---

### saveAll

▸ **saveAll**(`docs`, `mutationOptions?`): `Promise`<`void`>

Saves multiple documents in one batch

- Can only be called with documents from the same doctype
- Does not support automatic creation of references

_Parameters_

| Name                            | Type                    | Description                     |
| :------------------------------ | :---------------------- | :------------------------------ |
| `docs`                          | `CozyClientDocument`\[] | Documents from the same doctype |
| `mutationOptions`               | `Object`                | Mutation Options                |
| `mutationOptions.as`            | `string`                | -                               |
| `mutationOptions.update`        | `Function`              | -                               |
| `mutationOptions.updateQueries` | `Function`              | -                               |

_Returns_

`Promise`<`void`>

_Defined in_

[packages/cozy-client/src/CozyClient.js:660](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L660)

---

### setAppMetadata

▸ **setAppMetadata**(`newAppMetadata`): `void`

_Parameters_

| Name             | Type          | Description           |
| :--------------- | :------------ | :-------------------- |
| `newAppMetadata` | `AppMetadata` | AppMetadata to update |

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1819](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1819)

---

### setData

▸ **setData**(`data`): `void`

Directly set the data in the store, without using a query
This is useful for cases like Pouch replication, which wants to
set some data in the store.

_Parameters_

| Name   | Type  | Description                                                     |
| :----- | :---- | :-------------------------------------------------------------- |
| `data` | `any` | Data that is inserted in the store. Shape: { doctype: \[data] } |

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1792](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1792)

---

### setOnError

▸ **setOnError**(`onError`): `void`

At any time put an error function

**`throws`** {Error} onError should not have been defined yet

_Parameters_

| Name      | Type       |
| :-------- | :--------- |
| `onError` | `Function` |

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1805](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1805)

---

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

_Parameters_

| Name              | Type      | Description   |
| :---------------- | :-------- | :------------ |
| `store`           | `any`     | A redux store |
| `[options]`       | `Object`  | Options       |
| `[options].force` | `boolean` | -             |

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1593](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1593)

---

### startOAuthFlow

▸ **startOAuthFlow**(`openURLCallback`): `Promise`<`any`>

Performs a complete OAuth flow, including updating the internal token at the end.

_Parameters_

| Name              | Type              | Description                                                                                                                                                                |
| :---------------- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openURLCallback` | `OpenURLCallback` | Receives the URL to present to the user as a parameter, and should return a promise that resolves with the URL the user was redirected to after accepting the permissions. |

_Returns_

`Promise`<`any`>

Contains the fetched token and the client information. These should be stored and used to restore the client.

_Defined in_

[packages/cozy-client/src/CozyClient.js:1488](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1488)

---

### toJSON

▸ **toJSON**(): `CozyClient`

_Returns_

`CozyClient`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1812](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1812)

---

### triggerHook

▸ **triggerHook**(`name`, `document`): `void`

_Parameters_

| Name       | Type  |
| :--------- | :---- |
| `name`     | `any` |
| `document` | `any` |

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:858](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L858)

---

### upload

▸ **upload**(`file`, `dirPath`, `mutationOptions?`): `Promise`<`any`>

_Parameters_

| Name              | Type     |
| :---------------- | :------- |
| `file`            | `any`    |
| `dirPath`         | `any`    |
| `mutationOptions` | `Object` |

_Returns_

`Promise`<`any`>

_Defined in_

[packages/cozy-client/src/CozyClient.js:883](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L883)

---

### validate

▸ **validate**(`document`): `Promise`<{}>

_Parameters_

| Name       | Type  |
| :--------- | :---- |
| `document` | `any` |

_Returns_

`Promise`<{}>

_Defined in_

[packages/cozy-client/src/CozyClient.js:628](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L628)

---

### watchQuery

▸ **watchQuery**(...`args`): `default`

_Parameters_

| Name      | Type     |
| :-------- | :------- |
| `...args` | `any`\[] |

_Returns_

`default`

_Defined in_

[packages/cozy-client/src/CozyClient.js:1036](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L1036)

---

### fromDOM

▸ `Static` **fromDOM**(`options?`, `selector?`): [`CozyClient`](CozyClient.md)

When used from an app, CozyClient can be instantiated from the data injected by the stack in
the DOM.

_Parameters_

| Name       | Type     | Default value          | Description                    |
| :--------- | :------- | :--------------------- | :----------------------------- |
| `options`  | `any`    | `{}`                   | CozyClient constructor options |
| `selector` | `string` | `'[role=application]'` | Options                        |

_Returns_

[`CozyClient`](CozyClient.md)

- CozyClient instance

_Defined in_

[packages/cozy-client/src/CozyClient.js:392](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L392)

---

### fromEnv

▸ `Static` **fromEnv**(`envArg`, `options?`): [`CozyClient`](CozyClient.md)

In konnector/service context, CozyClient can be instantiated from
environment variables

_Parameters_

| Name      | Type  | Description |
| :-------- | :---- | :---------- |
| `envArg`  | `any` | -           |
| `options` | `any` | Options     |

_Returns_

[`CozyClient`](CozyClient.md)

_Defined in_

[packages/cozy-client/src/CozyClient.js:363](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L363)

---

### fromOldClient

▸ `Static` **fromOldClient**(`oldClient`, `options`): [`CozyClient`](CozyClient.md)

To help with the transition from cozy-client-js to cozy-client, it is possible to instantiate
a client with a cookie-based instance of cozy-client-js.

_Parameters_

| Name        | Type  | Description                               |
| :---------- | :---- | :---------------------------------------- |
| `oldClient` | `any` | An instance of the deprecated cozy-client |
| `options`   | `any` | CozyStackClient options                   |

_Returns_

[`CozyClient`](CozyClient.md)

_Defined in_

[packages/cozy-client/src/CozyClient.js:313](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L313)

---

### fromOldOAuthClient

▸ `Static` **fromOldOAuthClient**(`oldClient`, `options`): `Promise`<[`CozyClient`](CozyClient.md)>

To help with the transition from cozy-client-js to cozy-client, it is possible to instantiate
a client with an OAuth-based instance of cozy-client-js.

Warning: unlike other instantiators, this one needs to be awaited.

_Parameters_

| Name        | Type  | Description                                     |
| :---------- | :---- | :---------------------------------------------- |
| `oldClient` | `any` | An OAuth instance of the deprecated cozy-client |
| `options`   | `any` | CozyStackClient options                         |

_Returns_

`Promise`<[`CozyClient`](CozyClient.md)>

An instance of a client, configured from the old client

_Defined in_

[packages/cozy-client/src/CozyClient.js:331](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L331)

---

### registerHook

▸ `Static` **registerHook**(`doctype`, `name`, `fn`): `void`

Hooks are an observable system for events on documents.
There are at the moment only 2 hooks available.

- before:destroy, called just before a document is destroyed via CozyClient::destroy
- after:destroy, called after a document is destroyed via CozyClient::destroy

**`example`**

    CozyClient.registerHook('io.cozy.bank.accounts', 'before:destroy', () => {
      console.log('A io.cozy.bank.accounts is being destroyed')
    })

_Parameters_

| Name      | Type       | Description                                  |
| :-------- | :--------- | :------------------------------------------- |
| `doctype` | `string`   | Doctype on which the hook will be registered |
| `name`    | `string`   | Name of the hook                             |
| `fn`      | `Function` | Callback to be executed                      |

_Returns_

`void`

_Defined in_

[packages/cozy-client/src/CozyClient.js:852](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyClient.js#L852)
