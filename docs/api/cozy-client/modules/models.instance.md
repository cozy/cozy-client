[cozy-client](../README.md) / [Exports](../modules.md) / [models](models.md) / instance

# Namespace: instance

[models](models.md).instance

## Interfaces

*   [SettingsInfo](../interfaces/models.instance.settingsinfo.md)

## Type aliases

### ContextInfo

Ƭ **ContextInfo**<>: `object`

*Defined in*

[packages/cozy-client/src/models/instance.js:7](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L7)

***

### DiskUsageInfo

Ƭ **DiskUsageInfo**<>: `object`

*Defined in*

[packages/cozy-client/src/models/instance.js:8](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L8)

***

### InstanceInfo

Ƭ **InstanceInfo**<>: `object`

*Defined in*

[packages/cozy-client/src/models/instance.js:6](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L6)

## Functions

### arePremiumLinksEnabled

▸ `Const` **arePremiumLinksEnabled**(`instanceInfo`): `boolean`

*Parameters*

| Name | Type |
| :------ | :------ |
| `instanceInfo` | `any` |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/instance.js:22](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L22)

***

### buildPremiumLink

▸ `Const` **buildPremiumLink**(`instanceInfo`): `string`

Returns the link to the Premium page on the Cozy's Manager

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `instanceInfo` | `any` | Instance information |

*Returns*

`string`

*Defined in*

[packages/cozy-client/src/models/instance.js:69](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L69)

***

### getUuid

▸ `Const` **getUuid**(`instanceInfo`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `instanceInfo` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/models/instance.js:31](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L31)

***

### hasAnOffer

▸ `Const` **hasAnOffer**(`data`): `boolean`

Returns if an instance has subscribed to one of our offers

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`SettingsInfo`](../interfaces/models.instance.settingsinfo.md) | Object containing all the results from /settings/\* |

*Returns*

`boolean`

Does the cozy have offers

*Defined in*

[packages/cozy-client/src/models/instance.js:55](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L55)

***

### isFreemiumUser

▸ `Const` **isFreemiumUser**(`instanceInfo`): `boolean`

*Parameters*

| Name | Type |
| :------ | :------ |
| `instanceInfo` | `any` |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/instance.js:27](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L27)

***

### isSelfHosted

▸ `Const` **isSelfHosted**(`instanceInfo`): `boolean`

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

[packages/cozy-client/src/models/instance.js:19](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L19)

***

### shouldDisplayOffers

▸ `Const` **shouldDisplayOffers**(`data`): `boolean`

Returns whether an instance is concerned by our offers

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`SettingsInfo`](../interfaces/models.instance.settingsinfo.md) | Object containing all the results from /settings/\* |

*Returns*

`boolean`

Should we display offers

*Defined in*

[packages/cozy-client/src/models/instance.js:41](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/instance.js#L41)
