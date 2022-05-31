[cozy-client](../README.md) / [models](models.md) / dacc

# Namespace: dacc

[models](models.md).dacc

## Functions

### checkMeasureParams

▸ **checkMeasureParams**(`measure`): `void`

Throw an errror if a DACC parameter is incorrect.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `measure` | `DACCMeasure` | The DACC measure |

*Returns*

`void`

*Defined in*

[packages/cozy-client/src/models/dacc.js:9](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/dacc.js#L9)

***

### sendMeasureToDACC

▸ **sendMeasureToDACC**(`client`, `remoteDoctype`, `measure`): `Promise`<`void`>

Send measures to a DACC through a remote doctype

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `any` | The CozyClient instance |
| `remoteDoctype` | `string` | The remote doctype to use |
| `measure` | `DACCMeasure` | The DACC measure |

*Returns*

`Promise`<`void`>

*Defined in*

[packages/cozy-client/src/models/dacc.js:57](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/dacc.js#L57)
