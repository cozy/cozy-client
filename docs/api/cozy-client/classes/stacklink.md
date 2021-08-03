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

[packages/cozy-client/src/StackLink.js:38](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L38)

## Properties

### stackClient

• **stackClient**: `any`

*Defined in*

[packages/cozy-client/src/StackLink.js:50](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L50)

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

[packages/cozy-client/src/StackLink.js:90](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L90)

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

[packages/cozy-client/src/StackLink.js:69](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L69)

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

[packages/cozy-client/src/StackLink.js:54](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L54)

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

[packages/cozy-client/src/StackLink.js:62](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L62)

***

### reset

▸ **reset**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/StackLink.js:58](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L58)
