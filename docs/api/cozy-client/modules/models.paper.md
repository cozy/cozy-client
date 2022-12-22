[cozy-client](../README.md) / [models](models.md) / paper

# Namespace: paper

[models](models.md).paper

## Type aliases

### IOCozyFile

Ƭ **IOCozyFile**<>: `IOCozyFile`

*Defined in*

[packages/cozy-client/src/models/paper.js:5](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L5)

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

[packages/cozy-client/src/models/paper.js:89](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L89)

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

[packages/cozy-client/src/models/paper.js:125](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L125)

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

[packages/cozy-client/src/models/paper.js:144](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L144)

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

[packages/cozy-client/src/models/paper.js:156](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L156)

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

[packages/cozy-client/src/models/paper.js:71](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L71)

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

[packages/cozy-client/src/models/paper.js:168](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/paper.js#L168)
