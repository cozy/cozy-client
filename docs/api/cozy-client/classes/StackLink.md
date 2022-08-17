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
| `[options].stackClient` | `any` | - |

*Overrides*

[CozyLink](CozyLink.md).[constructor](CozyLink.md#constructor)

*Defined in*

[packages/cozy-client/src/StackLink.js:63](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L63)

## Properties

### stackClient

• **stackClient**: `any`

*Defined in*

[packages/cozy-client/src/StackLink.js:70](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L70)

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

[packages/cozy-client/src/StackLink.js:115](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L115)

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

[packages/cozy-client/src/StackLink.js:92](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L92)

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

[packages/cozy-client/src/StackLink.js:73](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L73)

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

[packages/cozy-client/src/StackLink.js:81](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L81)

***

### reset

▸ **reset**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/StackLink.js:77](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L77)
