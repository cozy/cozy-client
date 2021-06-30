[cozy-client](../README.md) / StackLink

# Class: StackLink

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

[packages/cozy-client/src/StackLink.js:7](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L7)

## Properties

### stackClient

• **stackClient**: `any`

*Defined in*

[packages/cozy-client/src/StackLink.js:19](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L19)

## Methods

### executeMutation

▸ **executeMutation**(`mutation`, `result`, `forward`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `mutation` | `any` |
| `result` | `any` |
| `forward` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/StackLink.js:59](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L59)

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

[packages/cozy-client/src/StackLink.js:38](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L38)

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

[packages/cozy-client/src/StackLink.js:23](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L23)

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

[packages/cozy-client/src/StackLink.js:31](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L31)

***

### reset

▸ **reset**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/StackLink.js:27](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/StackLink.js#L27)
