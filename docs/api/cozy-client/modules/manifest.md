[cozy-client](../README.md) / manifest

# Namespace: manifest

## Interfaces

*   [FrequencyOptions](../interfaces/manifest.FrequencyOptions.md)
*   [randomDayTimeResult](../interfaces/manifest.randomDayTimeResult.md)

## Variables

### ROLE_IDENTIFIER

• `Const` **ROLE_IDENTIFIER**: `"identifier"`

*Defined in*

[packages/cozy-client/src/models/manifest.js:6](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/manifest.js#L6)

***

### legacyLoginFields

• `Const` **legacyLoginFields**: `string`\[]

Legacy login fields declared by some konnectors

*Defined in*

[packages/cozy-client/src/models/manifest.js:21](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/manifest.js#L21)

## Functions

### areTermsValid

▸ **areTermsValid**(`terms`): `boolean`

*Parameters*

| Name | Type |
| :------ | :------ |
| `terms` | `any` |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/manifest.js:73](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/manifest.js#L73)

***

### getCronFromFrequency

▸ **getCronFromFrequency**(`frequency`, `options?`): `string`

Build a cron string for given frequency with given options
See https://docs.cozy.io/en/cozy-stack/jobs/#cron-syntax

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `frequency` | `"hourly"` | `"daily"` | `"weekly"` | `"monthly"` | Frequency |
| `options` | [`FrequencyOptions`](../interfaces/manifest.FrequencyOptions.md) | - |

*Returns*

`string`

*   The cron definition for trigger

*Defined in*

[packages/cozy-client/src/models/manifest.js:280](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/manifest.js#L280)

***

### getCronFromKonnector

▸ **getCronFromKonnector**(`konnector`, `startDate?`, `randomDayTimeFn?`): `string`

Build a cron string for given konnector and from a given start date

*Parameters*

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `konnector` | `IOCozyKonnector` | `undefined` | io.cozy.konnectors object |
| `startDate` | `Date` | `undefined` | start date |
| `randomDayTimeFn` | `Function` | `randomDayTime` | - |

*Returns*

`string`

*   The cron definition for trigger

*Defined in*

[packages/cozy-client/src/models/manifest.js:307](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/manifest.js#L307)

***

### getIdentifier

▸ **getIdentifier**(`fields?`): `string`

Returns the key for the field having the role=identifier attribute

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `fields` | `ManifestFields` | Konnector fields |

*Returns*

`string`

The key for the identifier field, example 'login'

*Defined in*

[packages/cozy-client/src/models/manifest.js:171](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/manifest.js#L171)

***

### isPartnershipValid

▸ **isPartnershipValid**(`partnership`): `boolean`

*Parameters*

| Name | Type |
| :------ | :------ |
| `partnership` | `any` |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/manifest.js:77](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/manifest.js#L77)

***

### randomDayTime

▸ **randomDayTime**(`start?`, `end?`, `randomize?`): [`randomDayTimeResult`](../interfaces/manifest.randomDayTimeResult.md)

Returns an hour of the day between two hours given in parameters

*Parameters*

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `start` | `number` | `0` | minimal start hour |
| `end` | `number` | `1` | maximal end hour |
| `randomize` | `Function` | `undefined` | The function used to generate random values |

*Returns*

[`randomDayTimeResult`](../interfaces/manifest.randomDayTimeResult.md)

Object containing two atributes : hours and minutes

*Defined in*

[packages/cozy-client/src/models/manifest.js:248](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/manifest.js#L248)

***

### sanitize

▸ **sanitize**(`manifest`): `any`

Normalize app manifest, retro-compatibility for old manifests

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `manifest` | `any` | app manifest to normalize |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/models/manifest.js:87](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/manifest.js#L87)

***

### sanitizeCategories

▸ **sanitizeCategories**(`categories`): `any`\[]

Filters unauthorized categories. Defaults to \['others'] if no suitable category.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `categories` | `any`\[] | Array of categories |

*Returns*

`any`\[]

sanitized categories

*Defined in*

[packages/cozy-client/src/models/manifest.js:66](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/manifest.js#L66)

***

### sanitizeIdentifier

▸ **sanitizeIdentifier**(`fields`): `ManifestFields`

Ensures that fields has at least one field with the role 'identifier'

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `fields` | `ManifestFields` | Manifest fields |

*Returns*

`ManifestFields`

*   Sanitized manifest fields

*Defined in*

[packages/cozy-client/src/models/manifest.js:140](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/manifest.js#L140)
