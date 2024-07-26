[cozy-client](../README.md) / FlagshipLink

# Class: FlagshipLink

## Hierarchy

*   [`CozyLink`](CozyLink.md)

    ↳ **`FlagshipLink`**

## Constructors

### constructor

• **new FlagshipLink**(`[options]?`)

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `[options]` | `Object` | Options |
| `[options].client` | `any` | - |
| `[options].stackClient` | `any` | - |
| `[options].webviewIntent` | `WebviewService` | - |

*Overrides*

[CozyLink](CozyLink.md).[constructor](CozyLink.md#constructor)

*Defined in*

[packages/cozy-client/src/FlagshipLink.js:11](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/FlagshipLink.js#L11)

## Properties

### stackClient

• **stackClient**: `any`

*Defined in*

[packages/cozy-client/src/FlagshipLink.js:18](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/FlagshipLink.js#L18)

***

### webviewIntent

• **webviewIntent**: `WebviewService`

*Defined in*

[packages/cozy-client/src/FlagshipLink.js:19](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/FlagshipLink.js#L19)

## Methods

### persistData

▸ **persistData**(`data`, `forward`): `Promise`<`void`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `forward` | `any` |

*Returns*

`Promise`<`void`>

*Overrides*

[CozyLink](CozyLink.md).[persistData](CozyLink.md#persistdata)

*Defined in*

[packages/cozy-client/src/FlagshipLink.js:34](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/FlagshipLink.js#L34)

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

[packages/cozy-client/src/FlagshipLink.js:22](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/FlagshipLink.js#L22)

***

### request

▸ **request**(`operation`, `result`, `forward`): `Promise`<`boolean`>

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

[packages/cozy-client/src/FlagshipLink.js:30](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/FlagshipLink.js#L30)

***

### reset

▸ **reset**(): `void`

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/FlagshipLink.js:26](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/FlagshipLink.js#L26)
