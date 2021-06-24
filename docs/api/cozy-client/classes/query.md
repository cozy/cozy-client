[cozy-client](../README.md) / [Exports](../modules.md) / Query

# Class: Query

## Hierarchy

*   `Component`

    ↳ **`Query`**

## Constructors

### constructor

• **new Query**(`props`, `context`)

*Parameters*

| Name | Type |
| :------ | :------ |
| `props` | `any` |
| `context` | `any` |

*Overrides*

Component.constructor

*Defined in*

[packages/cozy-client/src/Query.jsx:91](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/Query.jsx#L91)

## Properties

### childrenArgs

• **childrenArgs**: `any`\[]

*Defined in*

[packages/cozy-client/src/Query.jsx:163](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/Query.jsx#L163)

***

### client

• **client**: [`CozyClient`](cozyclient.md)

Current client

*Defined in*

[packages/cozy-client/src/Query.jsx:99](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/Query.jsx#L99)

***

### observableQuery

• **observableQuery**: `default`

Observable query to connect store to query

*Defined in*

[packages/cozy-client/src/Query.jsx:106](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/Query.jsx#L106)

***

### queryUnsubscribe

• **queryUnsubscribe**: `Function`

Callback to unsubscribe from observable query

*Defined in*

[packages/cozy-client/src/Query.jsx:112](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/Query.jsx#L112)

***

### contextTypes

▪ `Static` **contextTypes**: `Object`

*Type declaration*

| Name | Type |
| :------ | :------ |
| `client` | `Requireable`<`object`> |
| `store` | `Requireable`<`object`> |

***

### defaultProps

▪ `Static` **defaultProps**: `Object`

*Type declaration*

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

***

### propTypes

▪ `Static` **propTypes**: `Object`

*Type declaration*

| Name | Type |
| :------ | :------ |
| `as` | `Requireable`<`string`> |
| `children` | `Validator`<`fn`> |
| `enabled` | `Requireable`<`boolean`> |
| `fetchPolicy` | `Requireable`<`fn`> |
| `query` | `Validator`<`object`> |

## Methods

### componentDidMount

▸ **componentDidMount**(): `void`

*Returns*

`void`

*Overrides*

Component.componentDidMount

*Defined in*

[packages/cozy-client/src/Query.jsx:124](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/Query.jsx#L124)

***

### componentDidUpdate

▸ **componentDidUpdate**(`prevProps`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `prevProps` | `any` |

*Returns*

`void`

*Overrides*

Component.componentDidUpdate

*Defined in*

[packages/cozy-client/src/Query.jsx:146](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/Query.jsx#L146)

***

### componentWillUnmount

▸ **componentWillUnmount**(): `void`

*Returns*

`void`

*Overrides*

Component.componentWillUnmount

*Defined in*

[packages/cozy-client/src/Query.jsx:152](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/Query.jsx#L152)

***

### executeQueryRespectingFetchPolicy

▸ **executeQueryRespectingFetchPolicy**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/Query.jsx:131](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/Query.jsx#L131)

***

### onQueryChange

▸ **onQueryChange**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/Query.jsx:158](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/Query.jsx#L158)

***

### recomputeChildrenArgs

▸ **recomputeChildrenArgs**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/Query.jsx:163](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/Query.jsx#L163)

***

### render

▸ **render**(): `any`

*Returns*

`any`

*Overrides*

Component.render

*Defined in*

[packages/cozy-client/src/Query.jsx:167](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/Query.jsx#L167)
