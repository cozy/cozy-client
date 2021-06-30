[cozy-client](../README.md) / manifest

# Namespace: manifest

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

[packages/cozy-client/src/manifest.js:33](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/manifest.js#L33)

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

[packages/cozy-client/src/manifest.js:37](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/manifest.js#L37)

***

### sanitize

▸ **sanitize**(`manifest`): `any`

Normalize app manifest, retrocompatibility for old manifests

*Parameters*

| Name | Type |
| :------ | :------ |
| `manifest` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/manifest.js:47](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/manifest.js#L47)

***

### sanitizeCategories

▸ **sanitizeCategories**(`categories`): `any`

Filters unauthorized categories. Defaults to \['others'] if no suitable category.

*Parameters*

| Name | Type |
| :------ | :------ |
| `categories` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/manifest.js:26](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/manifest.js#L26)
