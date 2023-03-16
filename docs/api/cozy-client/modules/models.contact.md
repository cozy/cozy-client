[cozy-client](../README.md) / [models](models.md) / contact

# Namespace: contact

[models](models.md).contact

## Variables

### CONTACTS_DOCTYPE

• `Const` **CONTACTS_DOCTYPE**: `"io.cozy.contacts"`

*Defined in*

[packages/cozy-client/src/models/contact.js:6](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L6)

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

[packages/cozy-client/src/models/contact.js:201](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L201)

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

[packages/cozy-client/src/models/contact.js:163](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L163)

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

[packages/cozy-client/src/models/contact.js:125](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L125)

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

[packages/cozy-client/src/models/contact.js:222](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L222)

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

[packages/cozy-client/src/models/contact.js:19](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L19)

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

[packages/cozy-client/src/models/contact.js:92](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L92)

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

[packages/cozy-client/src/models/contact.js:57](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L57)

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

[packages/cozy-client/src/models/contact.js:68](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L68)

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

[packages/cozy-client/src/models/contact.js:46](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L46)

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

[packages/cozy-client/src/models/contact.js:8](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L8)

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

[packages/cozy-client/src/models/contact.js:83](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L83)

***

### isContact

▸ **isContact**(`doc`): `boolean`

Whether the document is a contact

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | `any` | A document (from io.cozy.something, or com.bitwarden or anything else) |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/contact.js:236](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L236)

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

[packages/cozy-client/src/models/contact.js:177](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L177)

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

[packages/cozy-client/src/models/contact.js:139](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L139)

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

[packages/cozy-client/src/models/contact.js:101](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L101)
