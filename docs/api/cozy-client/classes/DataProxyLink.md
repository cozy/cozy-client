[cozy-client](../README.md) / DataProxyLink

# Class: DataProxyLink

## Hierarchy

*   [`CozyLink`](CozyLink.md)

    ↳ **`DataProxyLink`**

## Constructors

### constructor

• **new DataProxyLink**(`[options]?`)

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `[options]` | `Object` | Options |
| `[options].dataproxy` | `any` | - |

*Overrides*

[CozyLink](CozyLink.md).[constructor](CozyLink.md#constructor)

*Defined in*

[packages/cozy-client/src/links/DataProxyLink.js:8](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/links/DataProxyLink.js#L8)

## Properties

### dataproxy

• **dataproxy**: `any`

*Defined in*

[packages/cozy-client/src/links/DataProxyLink.js:10](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/links/DataProxyLink.js#L10)

## Methods

### persistCozyData

▸ **persistCozyData**(`data`, `forward`): `Promise`<`void`>

Persist the given data into the links storage

*Parameters*

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `forward` | `any` |

*Returns*

`Promise`<`void`>

*Overrides*

[CozyLink](CozyLink.md).[persistCozyData](CozyLink.md#persistcozydata)

*Defined in*

[packages/cozy-client/src/links/DataProxyLink.js:42](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/links/DataProxyLink.js#L42)

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

[packages/cozy-client/src/links/DataProxyLink.js:13](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/links/DataProxyLink.js#L13)

***

### registerDataProxy

▸ **registerDataProxy**(`dataproxy`): `void`

When the link is given to a cozy-client instance, the dataproxy might not be ready yet.
Thus, this method will be typically called afterwards by the DataProxyProvider once
the dataproxy is ready and set

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataproxy` | `any` | The dataproxy instance |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/links/DataProxyLink.js:24](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/links/DataProxyLink.js#L24)

***

### request

▸ **request**(`operation`, `options`, `result`, `forward`): `Promise`<`any`>

Request the given operation from the link

*Parameters*

| Name | Type |
| :------ | :------ |
| `operation` | `any` |
| `options` | `any` |
| `result` | `any` |
| `forward` | `any` |

*Returns*

`Promise`<`any`>

*Overrides*

[CozyLink](CozyLink.md).[request](CozyLink.md#request)

*Defined in*

[packages/cozy-client/src/links/DataProxyLink.js:32](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/links/DataProxyLink.js#L32)

***

### reset

▸ **reset**(): `Promise`<`void`>

Reset the link data

*Returns*

`Promise`<`void`>

*Overrides*

[CozyLink](CozyLink.md).[reset](CozyLink.md#reset)

*Defined in*

[packages/cozy-client/src/links/DataProxyLink.js:28](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/links/DataProxyLink.js#L28)
