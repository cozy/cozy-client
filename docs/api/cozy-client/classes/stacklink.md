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

[packages/cozy-client/src/StackLink.js:39](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L39)

## Properties

### stackClient

• **stackClient**: `any`

*Defined in*

[packages/cozy-client/src/StackLink.js:51](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L51)

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

[CozyLink](cozylink.md).[request](cozylink.md#request)

*Defined in*

[packages/cozy-client/src/StackLink.js:63](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L63)

***

### reset

▸ **reset**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/StackLink.js:59](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L59)
