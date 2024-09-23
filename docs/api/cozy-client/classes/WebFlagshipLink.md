[cozy-client](../README.md) / WebFlagshipLink

# Class: WebFlagshipLink

## Hierarchy

*   [`CozyLink`](CozyLink.md)

    ↳ **`WebFlagshipLink`**

## Constructors

### constructor

• **new WebFlagshipLink**(`[options]?`)

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `[options]` | `Object` | Options |
| `[options].webviewIntent` | `WebviewService` | - |

*Overrides*

[CozyLink](CozyLink.md).[constructor](CozyLink.md#constructor)

*Defined in*

[packages/cozy-client/src/WebFlagshipLink.js:8](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/WebFlagshipLink.js#L8)

## Properties

### webviewIntent

• **webviewIntent**: `WebviewService`

*Defined in*

[packages/cozy-client/src/WebFlagshipLink.js:10](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/WebFlagshipLink.js#L10)

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

[packages/cozy-client/src/WebFlagshipLink.js:25](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/WebFlagshipLink.js#L25)

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

[packages/cozy-client/src/WebFlagshipLink.js:13](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/WebFlagshipLink.js#L13)

***

### request

▸ **request**(`operation`, `result`, `forward`): `Promise`<`boolean`>

Request the given operation from the link

*Parameters*

| Name | Type |
| :------ | :------ |
| `operation` | `any` |
| `result` | `any` |
| `forward` | `any` |

*Returns*

`Promise`<`boolean`>

*Overrides*

[CozyLink](CozyLink.md).[request](CozyLink.md#request)

*Defined in*

[packages/cozy-client/src/WebFlagshipLink.js:21](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/WebFlagshipLink.js#L21)

***

### reset

▸ **reset**(): `Promise`<`void`>

Reset the link data

*Returns*

`Promise`<`void`>

*Overrides*

[CozyLink](CozyLink.md).[reset](CozyLink.md#reset)

*Defined in*

[packages/cozy-client/src/WebFlagshipLink.js:17](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/WebFlagshipLink.js#L17)
