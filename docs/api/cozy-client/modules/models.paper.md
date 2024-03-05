[cozy-client](../README.md) / [models](models.md) / paper

# Namespace: paper

[models](models.md).paper

## Type aliases

### IOCozyFile

Ƭ **IOCozyFile**<>: `IOCozyFile`

*Defined in*

[packages/cozy-client/src/models/paper.js:5](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L5)

***

### MetadataQualificationType

Ƭ **MetadataQualificationType**<>: `"date"` | `"information"` | `"contact"` | `"other"`

*Defined in*

[packages/cozy-client/src/models/paper.js:263](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L263)

## Variables

### KNOWN_DATE_METADATA_NAMES

• `Const` **KNOWN_DATE_METADATA_NAMES**: `string`\[]

*Defined in*

[packages/cozy-client/src/models/paper.js:18](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L18)

***

### KNOWN_INFORMATION_METADATA_NAMES

• `Const` **KNOWN_INFORMATION_METADATA_NAMES**: `string`\[]

*Defined in*

[packages/cozy-client/src/models/paper.js:31](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L31)

***

### KNOWN_OTHER_METADATA_NAMES

• `Const` **KNOWN_OTHER_METADATA_NAMES**: `string`\[]

*Defined in*

[packages/cozy-client/src/models/paper.js:41](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L41)

## Functions

### computeExpirationDate

▸ **computeExpirationDate**(`file`): `Date`

**`description`** Computes et returns the expiration date of the given file, or null if it is not expiring

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`Date`

Expiration date

*Defined in*

[packages/cozy-client/src/models/paper.js:116](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L116)

***

### computeExpirationNoticeDate

▸ **computeExpirationNoticeDate**(`file`): `Date`

**`description`** Computes et returns the expiration notice date of the given file, or null if it is not expiring

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`Date`

Expiration notice date

*Defined in*

[packages/cozy-client/src/models/paper.js:152](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L152)

***

### computeExpirationNoticeLink

▸ **computeExpirationNoticeLink**(`file`): `string`

**`description`** Computes and returns the expiration notice link of the given file, or null if it has none

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`string`

Expiration notice link

*Defined in*

[packages/cozy-client/src/models/paper.js:171](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L171)

***

### formatMetadataQualification

▸ **formatMetadataQualification**(`metadata`): { `name`: `string` ; `value`: `string`  }\[]

**`description`** Computes and returns the displayable metadata of a paper

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `metadata` | `any` | An io.cozy.files metadata object |

*Returns*

{ `name`: `string` ; `value`: `string`  }\[]

\[]} Array of formated metadata

*Defined in*

[packages/cozy-client/src/models/paper.js:224](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L224)

***

### getMetadataQualificationType

▸ **getMetadataQualificationType**(`metadataName`): [`MetadataQualificationType`](models.paper.md#metadataqualificationtype)

**`description`** Computes and returns the displayable metadata of a paper

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `metadataName` | `string` | An io.cozy.files metadata object |

*Returns*

[`MetadataQualificationType`](models.paper.md#metadataqualificationtype)

Array of formated metadata

*Defined in*

[packages/cozy-client/src/models/paper.js:271](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L271)

***

### isExpired

▸ **isExpired**(`file`): `boolean`

**`description`** Tells if the given file is expiring and if today is after its expiration date

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/paper.js:183](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L183)

***

### isExpiring

▸ **isExpiring**(`file`): `boolean`

**`description`** Tells if a given file matches one of the known types of expiring papers

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/paper.js:98](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L98)

***

### isExpiringSoon

▸ **isExpiringSoon**(`file`): `boolean`

**`description`** Tells if the given file is expiring and if today is between its expiration notice date and its expiration date

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/paper.js:195](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L195)
