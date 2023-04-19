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

[packages/cozy-client/src/StackLink.js:62](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L62)

## Properties

### stackClient

• **stackClient**: `any`

*Defined in*

[packages/cozy-client/src/StackLink.js:69](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L69)

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

[packages/cozy-client/src/StackLink.js:114](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L114)

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

[packages/cozy-client/src/StackLink.js:91](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L91)

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

[packages/cozy-client/src/StackLink.js:72](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L72)

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

[packages/cozy-client/src/StackLink.js:80](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L80)

***

### reset

▸ **reset**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/StackLink.js:76](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L76)
