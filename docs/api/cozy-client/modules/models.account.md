[cozy-client](../README.md) / [models](models.md) / account

# Namespace: account

[models](models.md).account

## Functions

### buildAccount

▸ **buildAccount**(`konnector`, `authData`): `IOCozyAccount`

Transforms account auth data to io.cozy.accounts document

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `konnector` | `IOCozyKonnector` | Konnector related to account |
| `authData` | `any` | Authentication data |

*Returns*

`IOCozyAccount`

io.cozy.accounts attributes

*Defined in*

[packages/cozy-client/src/models/account.js:109](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/account.js#L109)

***

### getAccountLogin

▸ **getAccountLogin**(`account`): `string`

Get the account login field value from a given account

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `IOCozyAccount` | the given cozy account |

*Returns*

`string`

*   Account login

*Defined in*

[packages/cozy-client/src/models/account.js:78](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/account.js#L78)

***

### getAccountName

▸ **getAccountName**(`account`): `string`

Get the account name from a given account

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `IOCozyAccount` | the given cozy account |

*Returns*

`string`

*   Account name

*Defined in*

[packages/cozy-client/src/models/account.js:93](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/account.js#L93)

***

### getContractSyncStatusFromAccount

▸ **getContractSyncStatusFromAccount**(`account`, `contractId`): `boolean`

Returns whether a contract is synced from account relationship

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `IOCozyAccount` | Cozy account |
| `contractId` | `string` | contract identifier |

*Returns*

`boolean`

synchronisation status

*Defined in*

[packages/cozy-client/src/models/account.js:43](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/account.js#L43)

***

### getMutedErrors

▸ **getMutedErrors**(`account`): `any`\[]

getMutedErrors - Returns the list of errors that have been muted for the given account

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `IOCozyAccount` | io.cozy.accounts |

*Returns*

`any`\[]

An array of errors with a `type` and `mutedAt` field

*Defined in*

[packages/cozy-client/src/models/account.js:14](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/account.js#L14)

***

### muteError

▸ **muteError**(`account`, `errorType`): `IOCozyAccount`

muteError - Adds an error to the list of muted errors for the given account

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `IOCozyAccount` | io.cozy.accounts |
| `errorType` | `string` | The type of the error to mute |

*Returns*

`IOCozyAccount`

An updated io.cozy.accounts

*Defined in*

[packages/cozy-client/src/models/account.js:24](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/account.js#L24)

***

### setContractSyncStatusInAccount

▸ **setContractSyncStatusInAccount**(`account`, `contractId`, `syncStatus`): `IOCozyAccount`

Sets contract sync status into account relationship

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `IOCozyAccount` | Cozy account |
| `contractId` | `string` | contract identifier |
| `syncStatus` | `string` | synchronisation status |

*Returns*

`IOCozyAccount`

*Defined in*

[packages/cozy-client/src/models/account.js:59](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/account.js#L59)
