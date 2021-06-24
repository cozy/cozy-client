[cozy-client](README.md) / Exports

# cozy-client

## Namespaces

*   [manifest](modules/manifest.md)
*   [models](modules/models.md)

## Classes

*   [Association](classes/association.md)
*   [CozyClient](classes/cozyclient.md)
*   [CozyLink](classes/cozylink.md)
*   [CozyProvider](classes/cozyprovider.md)
*   [HasMany](classes/hasmany.md)
*   [HasManyInPlace](classes/hasmanyinplace.md)
*   [HasManyTriggers](classes/hasmanytriggers.md)
*   [HasOne](classes/hasone.md)
*   [HasOneInPlace](classes/hasoneinplace.md)
*   [Query](classes/query.md)
*   [QueryDefinition](classes/querydefinition.md)
*   [Registry](classes/registry.md)
*   [StackLink](classes/stacklink.md)

## Properties

### RealTimeQueries

• **RealTimeQueries**: `MemoExoticComponent`<`fn`>

## Variables

### MutationTypes

• `Const` **MutationTypes**: `Object`

*Type declaration*

| Name | Type |
| :------ | :------ |
| `ADD_REFERENCED_BY` | `string` |
| `ADD_REFERENCES_TO` | `string` |
| `CREATE_DOCUMENT` | `string` |
| `DELETE_DOCUMENT` | `string` |
| `REMOVE_REFERENCED_BY` | `string` |
| `REMOVE_REFERENCES_TO` | `string` |
| `UPDATE_DOCUMENT` | `string` |
| `UPLOAD_FILE` | `string` |

*Defined in*

[packages/cozy-client/src/queries/dsl.js:445](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L445)

***

### Mutations

• `Const` **Mutations**: `Object`

*Type declaration*

| Name | Type |
| :------ | :------ |
| `addReferencedBy` | (`document`: `any`, `referencedDocuments`: `any`) => { `document`: `any` ; `mutationType`: `string` ; `referencedDocuments`: `any`  } |
| `addReferencesTo` | (`document`: `any`, `referencedDocuments`: `any`) => { `document`: `any` ; `mutationType`: `string` ; `referencedDocuments`: `any`  } |
| `createDocument` | (`document`: `any`) => { `document`: `any` ; `mutationType`: `string`  } |
| `deleteDocument` | (`document`: `any`) => { `document`: `any` ; `mutationType`: `string`  } |
| `removeReferencedBy` | (`document`: `any`, `referencedDocuments`: `any`) => { `document`: `any` ; `mutationType`: `string` ; `referencedDocuments`: `any`  } |
| `removeReferencesTo` | (`document`: `any`, `referencedDocuments`: `any`) => { `document`: `any` ; `mutationType`: `string` ; `referencedDocuments`: `any`  } |
| `updateDocument` | (`document`: `any`) => { `document`: `any` ; `mutationType`: `string`  } |
| `uploadFile` | (`file`: `any`, `dirPath`: `any`) => { `dirPath`: `any` ; `file`: `any` ; `mutationType`: `string`  } |

*Defined in*

[packages/cozy-client/src/queries/dsl.js:434](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L434)

***

### fetchPolicies

• `Const` **fetchPolicies**: `Object`

Use those fetch policies with `<Query />` to limit the number of re-fetch.

**`example`**

    import { fetchPolicies } from 'cozy-client'
    const olderThan30s = fetchPolicies.olderThan(30 * 1000)
    <Query fetchPolicy={olderThan30s} />

*Type declaration*

| Name | Type |
| :------ | :------ |
| `noFetch` | () => `boolean` |
| `olderThan` | (`delay`: `number`) => `Function` |

*Defined in*

[packages/cozy-client/src/policies.js:11](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/policies.js#L11)

## Functions

### Q

▸ `Const` **Q**(`doctype`): [`QueryDefinition`](classes/querydefinition.md)

Helper to create a QueryDefinition. Recommended way to create
query definitions.

**`example`**

    import { Q } from 'cozy-client'

    const qDef = Q('io.cozy.todos').where({ _id: '1234' })

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `doctype` | `string` | Doctype of the query definition |

*Returns*

[`QueryDefinition`](classes/querydefinition.md)

*Defined in*

[packages/cozy-client/src/queries/dsl.js:338](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L338)

***

### cancelable

▸ `Const` **cancelable**(`promise`): `CancelablePromise`

Wraps a promise so that it can be canceled

Rejects with canceled: true as soon as cancel is called

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `promise` | `Promise`<`any`> | Promise |

*Returns*

`CancelablePromise`

*   Promise with .cancel method

*Defined in*

[packages/cozy-client/src/utils.js:14](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/utils.js#L14)

***

### createMockClient

▸ `Const` **createMockClient**(`__namedParameters`): [`CozyClient`](classes/cozyclient.md)

Creates a client suitable for use in tests

*   client.{query,save} are mocked
*   client.stackClient.fetchJSON is mocked

*Parameters*

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.clientOptions` | `any` |
| `__namedParameters.queries` | `any` |
| `__namedParameters.remote` | `any` |

*Returns*

[`CozyClient`](classes/cozyclient.md)

*Defined in*

[packages/cozy-client/src/mock.js:41](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/mock.js#L41)

***

### dehydrate

▸ `Const` **dehydrate**(`document`): `Object`

*Parameters*

| Name | Type |
| :------ | :------ |
| `document` | `any` |

*Returns*

`Object`

*Defined in*

[packages/cozy-client/src/helpers.js:3](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/helpers.js#L3)

***

### generateWebLink

▸ `Const` **generateWebLink**(`__namedParameters`): `string`

generateWebLink - Construct a link to a web app

This function does not get its cozy url from a CozyClient instance so it can
be used to build urls that point to other Cozies than the user's own Cozy.
This is useful when pointing to the Cozy of the owner of a shared note for
example.

*Parameters*

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.cozyUrl` | `string` |
| `__namedParameters.hash` | `string` |
| `__namedParameters.pathname` | `string` |
| `__namedParameters.searchParams` | `any`\[] |
| `__namedParameters.slug` | `string` |
| `__namedParameters.subDomainType` | `string` |

*Returns*

`string`

Generated URL

*Defined in*

[packages/cozy-client/src/helpers.js:51](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/helpers.js#L51)

***

### getDoctypeFromOperation

▸ `Const` **getDoctypeFromOperation**(`operation`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `operation` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/queries/dsl.js:412](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/queries/dsl.js#L412)

***

### getQueryFromState

▸ `Const` **getQueryFromState**(`state`, `queryId`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `state` | `any` |
| `queryId` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/store/index.js:99](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/store/index.js#L99)

***

### hasQueryBeenLoaded

▸ `Const` **hasQueryBeenLoaded**(`col`): `any`

Returns whether a query has been loaded at least once

*Parameters*

| Name | Type |
| :------ | :------ |
| `col` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/utils.js:48](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/utils.js#L48)

***

### isQueryLoading

▸ `Const` **isQueryLoading**(`col`): `boolean`

Returns whether the result of a query (given via queryConnect or Query)
is loading.

*Parameters*

| Name | Type |
| :------ | :------ |
| `col` | `any` |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/utils.js:37](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/utils.js#L37)

***

### queryConnect

▸ `Const` **queryConnect**(`querySpecs`): `Function`

**`function`**

**`description`** HOC creator to connect component to several queries in a declarative manner

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `querySpecs` | `any` | Definition of the queries |

*Returns*

`Function`

*   HOC to apply to a component

*Defined in*

[packages/cozy-client/src/hoc.jsx:73](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hoc.jsx#L73)

***

### queryConnectFlat

▸ `Const` **queryConnectFlat**(`querySpecs`): `Function`

**`function`**

**`description`** HOC creator to connect component to several queries in a declarative manner
The only difference with queryConnect is that it does not wrap the component in N component
if there are N queries, only 1 extra level of nesting is introduced.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `querySpecs` | `any` | Definition of the queries |

*Returns*

`Function`

*   HOC to apply to a component

*Defined in*

[packages/cozy-client/src/hoc.jsx:89](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hoc.jsx#L89)

***

### useAppLinkWithStoreFallback

▸ `Const` **useAppLinkWithStoreFallback**(`slug`, `client`, `path?`): `Object`

*Parameters*

| Name | Type | Default value |
| :------ | :------ | :------ |
| `slug` | `any` | `undefined` |
| `client` | `any` | `undefined` |
| `path` | `string` | `''` |

*Returns*

`Object`

| Name | Type |
| :------ | :------ |
| `fetchStatus` | `string` |
| `isInstalled` | `boolean` |
| `url` | `any` |

*Defined in*

[packages/cozy-client/src/hooks/useAppLinkWithStoreFallback.jsx:9](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hooks/useAppLinkWithStoreFallback.jsx#L9)

***

### useAppsInMaintenance

▸ `Const` **useAppsInMaintenance**(`client`): `"io.cozy.apps"`\[]

Returns all apps in maintenance

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](classes/cozyclient.md) | CozyClient instance |

*Returns*

`"io.cozy.apps"`\[]

An array with all apps in maintenance

*Defined in*

[packages/cozy-client/src/hooks/useAppsInMaintenance.jsx:13](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hooks/useAppsInMaintenance.jsx#L13)

***

### useCapabilities

▸ `Const` **useCapabilities**(`client`): `Object`

*Parameters*

| Name | Type |
| :------ | :------ |
| `client` | `any` |

*Returns*

`Object`

| Name | Type |
| :------ | :------ |
| `capabilities` | `undefined` |
| `fetchStatus` | `string` |

*Defined in*

[packages/cozy-client/src/hooks/useCapabilities.jsx:4](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hooks/useCapabilities.jsx#L4)

***

### useClient

▸ `Const` **useClient**(): [`CozyClient`](classes/cozyclient.md)

Returns the cozy client from the context

*Returns*

[`CozyClient`](classes/cozyclient.md)

*   Current cozy client

*Defined in*

[packages/cozy-client/src/hooks/useClient.js:9](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hooks/useClient.js#L9)

***

### useFetchShortcut

▸ `Const` **useFetchShortcut**(`client`, `id`): `Object`

*Parameters*

| Name | Type |
| :------ | :------ |
| `client` | `any` |
| `id` | `any` |

*Returns*

`Object`

| Name | Type |
| :------ | :------ |
| `fetchStatus` | `string` |
| `shortcutImg` | `any` |
| `shortcutInfos` | `any` |

*Defined in*

[packages/cozy-client/src/hooks/useFetchShortcut.jsx:3](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hooks/useFetchShortcut.jsx#L3)

***

### useQuery

▸ `Const` **useQuery**(`queryDefinition`, `options`): `UseQueryReturnValue`

Fetches a queryDefinition and returns the queryState

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `queryDefinition` | `any` | Definition created with Q() |
| `options` | `Object` | Options |
| `options.as` | `any` | Name for the query \[required] |
| `options.enabled` | `boolean` | If set to false, the query won't be executed |
| `options.fetchPolicy` | `any` | Fetch policy |
| `options.singleDocData` | `any` | If true, the "data" returned will be a single doc instead of an array for single doc queries. Defaults to false for backward compatibility but will be set to true in the future. |

*Returns*

`UseQueryReturnValue`

*Defined in*

[packages/cozy-client/src/hooks/useQuery.js:36](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hooks/useQuery.js#L36)

***

### withClient

▸ `Const` **withClient**(`WrappedComponent`): `Function`

**`function`**

**`description`** HOC to provide client from context as prop

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `WrappedComponent` | `Component`<`any`, `any`, `any`> | wrapped component |

*Returns*

`Function`

*   Component that will receive client as prop

*Defined in*

[packages/cozy-client/src/hoc.jsx:15](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hoc.jsx#L15)

***

### withMutation

▸ `Const` **withMutation**(`mutation`, `options?`): `Function`

*Parameters*

| Name | Type |
| :------ | :------ |
| `mutation` | `any` |
| `options` | `Object` |

*Returns*

`Function`

*Defined in*

[packages/cozy-client/src/withMutation.jsx:8](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/withMutation.jsx#L8)

***

### withMutations

▸ `Const` **withMutations**(...`mutations`): `Function`

**`function`**

**`description`** HOC to provide mutations to components. Needs client in context or as prop.

**`deprecated`** Prefer to use withClient and access directly the client.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `...mutations` | `Function`\[] | One ore more mutations, which are function taking CozyClient as parameter and returning an object containing one or more mutations as attributes. |

*Returns*

`Function`

*   Component that will receive mutations as props

*Defined in*

[packages/cozy-client/src/withMutations.jsx:23](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/withMutations.jsx#L23)
