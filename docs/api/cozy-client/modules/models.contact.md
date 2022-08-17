[cozy-client](../README.md) / [models](models.md) / contact

# Namespace: contact

[models](models.md).contact

## Functions

### getDefaultSortIndexValue

▸ **getDefaultSortIndexValue**(`contact`): `string`

Returns 'byFamilyNameGivenNameEmailCozyUrl' index of a contact

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   the contact's 'byFamilyNameGivenNameEmailCozyUrl' index

*Defined in*

[packages/cozy-client/src/models/contact.js:198](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L198)

***

### getDisplayName

▸ **getDisplayName**(`contact`): `string`

Returns a display name for the contact

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   the contact's display name

*Defined in*

[packages/cozy-client/src/models/contact.js:160](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L160)

***

### getFullname

▸ **getFullname**(`contact`): `string`

Returns the contact's fullname

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's fullname

*Defined in*

[packages/cozy-client/src/models/contact.js:122](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L122)

***

### getIndexByFamilyNameGivenNameEmailCozyUrl

▸ **getIndexByFamilyNameGivenNameEmailCozyUrl**(`contact`): `string`

Returns 'byFamilyNameGivenNameEmailCozyUrl' index of a contact

**`deprecated`** Prefer to use getDefaultSortIndexValue.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   the contact's 'byFamilyNameGivenNameEmailCozyUrl' index

*Defined in*

[packages/cozy-client/src/models/contact.js:219](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L219)

***

### getInitials

▸ **getInitials**(`contact`): `string`

Returns the initials of the contact.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   the contact's initials

*Defined in*

[packages/cozy-client/src/models/contact.js:16](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L16)

***

### getPrimaryAddress

▸ **getPrimaryAddress**(`contact`): `string`

Returns the contact's main address

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's main address

*Defined in*

[packages/cozy-client/src/models/contact.js:89](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L89)

***

### getPrimaryCozy

▸ **getPrimaryCozy**(`contact`): `string`

Returns the contact's main cozy

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's main cozy

*Defined in*

[packages/cozy-client/src/models/contact.js:54](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L54)

***

### getPrimaryCozyDomain

▸ **getPrimaryCozyDomain**(`contact`): `string`

Returns the contact's main cozy url without protocol

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's main cozy url

*Defined in*

[packages/cozy-client/src/models/contact.js:65](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L65)

***

### getPrimaryEmail

▸ **getPrimaryEmail**(`contact`): `string`

Returns the contact's main email

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's main email

*Defined in*

[packages/cozy-client/src/models/contact.js:43](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L43)

***

### getPrimaryOrFirst

▸ **getPrimaryOrFirst**(`property`): (`obj`: `any`) => `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `property` | `any` |

*Returns*

`fn`

▸ (`obj`): `any`

*Parameters*

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/models/contact.js:5](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L5)

***

### getPrimaryPhone

▸ **getPrimaryPhone**(`contact`): `string`

Returns the contact's main phone number

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's main phone number

*Defined in*

[packages/cozy-client/src/models/contact.js:80](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L80)

***

### makeDefaultSortIndexValue

▸ **makeDefaultSortIndexValue**(`contact`): `string`

Makes 'byFamilyNameGivenNameEmailCozyUrl' index of a contact

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   the contact's 'byFamilyNameGivenNameEmailCozyUrl' index

*Defined in*

[packages/cozy-client/src/models/contact.js:174](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L174)

***

### makeDisplayName

▸ **makeDisplayName**(`contact`): `string`

Makes displayName from contact data

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's displayName

*Defined in*

[packages/cozy-client/src/models/contact.js:136](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L136)

***

### makeFullname

▸ **makeFullname**(`contact`): `string`

Makes fullname from contact name

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's fullname

*Defined in*

[packages/cozy-client/src/models/contact.js:98](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L98)
