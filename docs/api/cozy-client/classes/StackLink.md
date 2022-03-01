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

[packages/cozy-client/src/StackLink.js:45](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L45)

## Properties

### stackClient

• **stackClient**: `any`

*Defined in*

[packages/cozy-client/src/StackLink.js:52](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L52)

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

[packages/cozy-client/src/StackLink.js:91](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L91)

***

### executeQuery

▸ **executeQuery**(`query`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `query` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/StackLink.js:70](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L70)

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

[packages/cozy-client/src/StackLink.js:55](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L55)

***

### request

▸ **request**(`operation`, `result`, `forward`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `operation` | `any` |
| `result` | `any` |
| `forward` | `any` |

*Returns*

`any`

*Overrides*

[CozyLink](CozyLink.md).[request](CozyLink.md#request)

*Defined in*

[packages/cozy-client/src/StackLink.js:63](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L63)

***

### reset

▸ **reset**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/StackLink.js:59](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L59)
