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
| `[options]` | `Object` | Options |
| `[options].client` | `any` | - |
| `[options].platform` | `any` | - |
| `[options].stackClient` | `any` | - |

*Overrides*

[CozyLink](CozyLink.md).[constructor](CozyLink.md#constructor)

*Defined in*

[packages/cozy-client/src/StackLink.js:64](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L64)

## Properties

### isOnline

• **isOnline**: `any`

*Defined in*

[packages/cozy-client/src/StackLink.js:72](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L72)

***

### stackClient

• **stackClient**: `any`

*Defined in*

[packages/cozy-client/src/StackLink.js:71](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L71)

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

[packages/cozy-client/src/StackLink.js:132](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L132)

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

[packages/cozy-client/src/StackLink.js:109](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L109)

***

### persistData

▸ **persistData**(`data`, `forward`): `Promise`<`any`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `forward` | `any` |

*Returns*

`Promise`<`any`>

*Overrides*

[CozyLink](CozyLink.md).[persistData](CozyLink.md#persistdata)

*Defined in*

[packages/cozy-client/src/StackLink.js:101](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L101)

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

[packages/cozy-client/src/StackLink.js:75](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L75)

***

### request

▸ **request**(`operation`, `result`, `forward`): `Promise`<`any`>

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

[packages/cozy-client/src/StackLink.js:83](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L83)

***

### reset

▸ **reset**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/StackLink.js:79](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L79)
