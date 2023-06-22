[cozy-client](../README.md) / [models](models.md) / instance

# Namespace: instance

[models](models.md).instance

## Interfaces

*   [SettingsInfo](../interfaces/models.instance.SettingsInfo.md)

## Type aliases

### ContextInfo

Ƭ **ContextInfo**<>: `object`

*Defined in*

[packages/cozy-client/src/models/instance.js:9](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L9)

***

### DiskUsageInfo

Ƭ **DiskUsageInfo**<>: `object`

*Defined in*

[packages/cozy-client/src/models/instance.js:10](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L10)

***

### InstanceInfo

Ƭ **InstanceInfo**<>: `object`

*Defined in*

[packages/cozy-client/src/models/instance.js:8](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L8)

## Functions

### arePremiumLinksEnabled

▸ **arePremiumLinksEnabled**(`instanceInfo`): `boolean`

*Parameters*

| Name | Type |
| :------ | :------ |
| `instanceInfo` | `any` |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/instance.js:24](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L24)

***

### buildPremiumLink

▸ **buildPremiumLink**(`instanceInfo`): `string`

Returns the link to the Premium page on the Cozy's Manager

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `instanceInfo` | `any` | Instance information |

*Returns*

`string`

*Defined in*

[packages/cozy-client/src/models/instance.js:71](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L71)

***

### getUuid

▸ **getUuid**(`instanceInfo`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `instanceInfo` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/models/instance.js:33](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L33)

***

### hasAnOffer

▸ **hasAnOffer**(`data`): `boolean`

Returns if an instance has subscribed to one of our offers

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`SettingsInfo`](../interfaces/models.instance.SettingsInfo.md) | Object containing all the results from /settings/\* |

*Returns*

`boolean`

Does the cozy have offers

*Defined in*

[packages/cozy-client/src/models/instance.js:57](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L57)

***

### hasPasswordDefinedAttribute

▸ **hasPasswordDefinedAttribute**(`client`): `Promise`<`boolean`>

Checks the value of the password_defined attribute

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/CozyClient.md) | The CozyClient instance |

*Returns*

`Promise`<`boolean`>

*   Returns the value of the password_defined attribute

*Defined in*

[packages/cozy-client/src/models/instance.js:91](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L91)

***

### isFreemiumUser

▸ **isFreemiumUser**(`instanceInfo`): `boolean`

*Parameters*

| Name | Type |
| :------ | :------ |
| `instanceInfo` | `any` |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/instance.js:29](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L29)

***

### isSelfHosted

▸ **isSelfHosted**(`instanceInfo`): `boolean`

**`property`** {ContextInfo} context - Object returned by /settings/context

**`property`** {InstanceInfo} instance - Object returned by /settings/instance

**`property`** {DiskUsageInfo} diskUsage - Object returned by /settings/disk-usage

*Parameters*

| Name | Type |
| :------ | :------ |
| `instanceInfo` | `any` |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/instance.js:21](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L21)

***

### shouldDisplayOffers

▸ **shouldDisplayOffers**(`data`): `boolean`

Returns whether an instance is concerned by our offers

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`SettingsInfo`](../interfaces/models.instance.SettingsInfo.md) | Object containing all the results from /settings/\* |

*Returns*

`boolean`

Should we display offers

*Defined in*

[packages/cozy-client/src/models/instance.js:43](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L43)
