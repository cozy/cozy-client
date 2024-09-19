[cozy-client](../README.md) / CozyLink

# Class: CozyLink

## Hierarchy

*   **`CozyLink`**

    ↳ [`StackLink`](StackLink.md)

    ↳ [`FlagshipLink`](FlagshipLink.md)

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

### persistCozyData

▸ **persistCozyData**(`data`, `forward`): `Promise`<`any`>

Persist the given data into the links storage

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | The document to persist |
| `forward` | `any` | The next persistCozyData of the chain |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/CozyLink.js:31](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyLink.js#L31)

***

### request

▸ **request**(`operation`, `result`, `forward`): `Promise`<`any`>

Request the given operation from the link

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `operation` | `any` | The operation to request |
| `result` | `any` | The result from the previous request of the chain |
| `forward` | `any` | The next request of the chain |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/CozyLink.js:20](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyLink.js#L20)

***

### reset

▸ **reset**(): `Promise`<`any`>

Reset the link data

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/CozyLink.js:40](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/CozyLink.js#L40)
