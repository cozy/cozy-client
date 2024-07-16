[cozy-client](../README.md) / CozyLink

# Class: CozyLink

## Hierarchy

*   **`CozyLink`**

    ↳ [`StackLink`](StackLink.md)

## Constructors

### constructor

• **new CozyLink**(`requestHandler`, `persistHandler`)

*Parameters*

| Name | Type |
| :------ | :------ |
| `requestHandler` | `any` |
| `persistHandler` | `any` |

*Defined in*

[packages/cozy-client/src/CozyLink.js:2](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyLink.js#L2)

## Methods

### persistData

▸ **persistData**(`data`, `forward`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `forward` | `any` |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyLink.js:16](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyLink.js#L16)

***

### request

▸ **request**(`operation`, `result`, `forward`): `void`

*Parameters*

| Name | Type |
| :------ | :------ |
| `operation` | `any` |
| `result` | `any` |
| `forward` | `any` |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/CozyLink.js:12](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyLink.js#L12)
