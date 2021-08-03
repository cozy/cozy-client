[cozy-client](../README.md) / StackLink

# Class: StackLink

Transfers queries and mutations to a remote stack

## Hierarchy

*   [`CozyLink`](cozylink.md)

    ↳ **`StackLink`**

## Constructors

### constructor

• **new StackLink**(`__namedParameters?`)

*Parameters*

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.client` | `any` |
| `__namedParameters.stackClient` | `any` |

*Overrides*

[CozyLink](cozylink.md).[constructor](cozylink.md#constructor)

*Defined in*

[packages/cozy-client/src/StackLink.js:25](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L25)

## Properties

### stackClient

• **stackClient**: `any`

*Defined in*

[packages/cozy-client/src/StackLink.js:37](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L37)

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

[packages/cozy-client/src/StackLink.js:77](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L77)

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

[packages/cozy-client/src/StackLink.js:56](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L56)

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

[packages/cozy-client/src/StackLink.js:41](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L41)

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

[CozyLink](cozylink.md).[request](cozylink.md#request)

*Defined in*

[packages/cozy-client/src/StackLink.js:49](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L49)

***

### reset

▸ **reset**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/StackLink.js:45](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L45)
