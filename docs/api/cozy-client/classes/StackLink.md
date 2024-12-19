[cozy-client](../README.md) / StackLink

# Class: StackLink

Transfers queries and mutations to a remote stack

## Hierarchy

*   [`CozyLink`](CozyLink.md)

    ↳ **`StackLink`**

## Constructors

### constructor

• **new StackLink**(`[options]?`)

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `[options]` | `StackLinkOptions` | Options |

*Overrides*

[CozyLink](CozyLink.md).[constructor](CozyLink.md#constructor)

*Defined in*

[packages/cozy-client/src/StackLink.js:70](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L70)

## Properties

### isOnline

• **isOnline**: `any`

*Defined in*

[packages/cozy-client/src/StackLink.js:78](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L78)

***

### performanceApi

• **performanceApi**: `PerformanceAPI`

*Defined in*

[packages/cozy-client/src/StackLink.js:81](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L81)

***

### stackClient

• **stackClient**: `any`

*Defined in*

[packages/cozy-client/src/StackLink.js:77](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L77)

## Methods

### executeMutation

▸ **executeMutation**(`mutation`, `result`, `forward`): `Promise`<`any`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `mutation` | `any` |
| `result` | `any` |
| `forward` | `any` |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/StackLink.js:141](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L141)

***

### executeQuery

▸ **executeQuery**(`query`): `Promise`<`any`>

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `query` | [`QueryDefinition`](QueryDefinition.md) | Query to execute |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/StackLink.js:118](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L118)

***

### persistCozyData

▸ **persistCozyData**(`data`, `forward`): `Promise`<`any`>

Persist the given data into the links storage

*Parameters*

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `forward` | `any` |

*Returns*

`Promise`<`any`>

*Overrides*

[CozyLink](CozyLink.md).[persistCozyData](CozyLink.md#persistcozydata)

*Defined in*

[packages/cozy-client/src/StackLink.js:110](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L110)

***

### registerClient

▸ **registerClient**(`client`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `client` | `any` |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/StackLink.js:84](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L84)

***

### request

▸ **request**(`operation`, `result`, `forward`): `Promise`<`any`>

Request the given operation from the link

*Parameters*

| Name | Type |
| :------ | :------ |
| `operation` | `any` |
| `result` | `any` |
| `forward` | `any` |

*Returns*

`Promise`<`any`>

*Overrides*

[CozyLink](CozyLink.md).[request](CozyLink.md#request)

*Defined in*

[packages/cozy-client/src/StackLink.js:92](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L92)

***

### reset

▸ **reset**(): `Promise`<`void`>

Reset the link data

*Returns*

`Promise`<`void`>

*Overrides*

[CozyLink](CozyLink.md).[reset](CozyLink.md#reset)

*Defined in*

[packages/cozy-client/src/StackLink.js:88](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L88)
