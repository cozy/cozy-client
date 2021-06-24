[cozy-client](../README.md) / [Exports](../modules.md) / [models](models.md) / contact

# Namespace: contact

[models](models.md).contact

## Functions

### getDefaultSortIndexValue

▸ `Const` **getDefaultSortIndexValue**(`contact`): `string`

Returns 'byFamilyNameGivenNameEmailCozyUrl' index of a contact

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   the contact's 'byFamilyNameGivenNameEmailCozyUrl' index

*Defined in*

[packages/cozy-client/src/models/contact.js:197](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L197)

***

### getDisplayName

▸ `Const` **getDisplayName**(`contact`): `string`

Returns a display name for the contact

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   the contact's display name

*Defined in*

[packages/cozy-client/src/models/contact.js:159](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L159)

***

### getFullname

▸ `Const` **getFullname**(`contact`): `string`

Returns the contact's fullname

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's fullname

*Defined in*

[packages/cozy-client/src/models/contact.js:121](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L121)

***

### getIndexByFamilyNameGivenNameEmailCozyUrl

▸ `Const` **getIndexByFamilyNameGivenNameEmailCozyUrl**(`contact`): `string`

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

[packages/cozy-client/src/models/contact.js:218](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L218)

***

### getInitials

▸ `Const` **getInitials**(`contact`): `string`

Returns the initials of the contact.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   the contact's initials

*Defined in*

[packages/cozy-client/src/models/contact.js:15](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L15)

***

### getPrimaryAddress

▸ `Const` **getPrimaryAddress**(`contact`): `string`

Returns the contact's main address

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's main address

*Defined in*

[packages/cozy-client/src/models/contact.js:88](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L88)

***

### getPrimaryCozy

▸ `Const` **getPrimaryCozy**(`contact`): `string`

Returns the contact's main cozy

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's main cozy

*Defined in*

[packages/cozy-client/src/models/contact.js:53](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L53)

***

### getPrimaryCozyDomain

▸ `Const` **getPrimaryCozyDomain**(`contact`): `string`

Returns the contact's main cozy url without protocol

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's main cozy url

*Defined in*

[packages/cozy-client/src/models/contact.js:64](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L64)

***

### getPrimaryEmail

▸ `Const` **getPrimaryEmail**(`contact`): `string`

Returns the contact's main email

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's main email

*Defined in*

[packages/cozy-client/src/models/contact.js:42](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L42)

***

### getPrimaryOrFirst

▸ `Const` **getPrimaryOrFirst**(`property`): (`obj`: `any`) => `any`

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

[packages/cozy-client/src/models/contact.js:4](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L4)

***

### getPrimaryPhone

▸ `Const` **getPrimaryPhone**(`contact`): `string`

Returns the contact's main phone number

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's main phone number

*Defined in*

[packages/cozy-client/src/models/contact.js:79](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L79)

***

### makeDefaultSortIndexValue

▸ `Const` **makeDefaultSortIndexValue**(`contact`): `string`

Makes 'byFamilyNameGivenNameEmailCozyUrl' index of a contact

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   the contact's 'byFamilyNameGivenNameEmailCozyUrl' index

*Defined in*

[packages/cozy-client/src/models/contact.js:173](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L173)

***

### makeDisplayName

▸ `Const` **makeDisplayName**(`contact`): `string`

Makes displayName from contact data

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's displayName

*Defined in*

[packages/cozy-client/src/models/contact.js:135](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L135)

***

### makeFullname

▸ `Const` **makeFullname**(`contact`): `string`

Makes fullname from contact name

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `contact` | `any` | A contact |

*Returns*

`string`

*   The contact's fullname

*Defined in*

[packages/cozy-client/src/models/contact.js:97](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/contact.js#L97)
