[cozy-client](../README.md) / [models](models.md) / account

# Namespace: account

[models](models.md).account

## Type aliases

### CozyAccount

Ƭ **CozyAccount**<>: `object`

*Defined in*

[packages/cozy-client/src/models/account.js:7](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/account.js#L7)

## Functions

### getContractSyncStatusFromAccount

▸ `Const` **getContractSyncStatusFromAccount**(`account`, `contractId`): `any`

Returns whether a contract is synced from account relationship

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `any` | Cozy account |
| `contractId` | `any` | - |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/models/account.js:44](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/account.js#L44)

***

### getMutedErrors

▸ `Const` **getMutedErrors**(`account`): `any`\[]

getMutedErrors - Returns the list of errors that have been muted for the given account

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `any` | io.cozy.accounts |

*Returns*

`any`\[]

An array of errors with a `type` and `mutedAt` field

*Defined in*

[packages/cozy-client/src/models/account.js:17](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/account.js#L17)

***

### muteError

▸ `Const` **muteError**(`account`, `errorType`): `any`

muteError - Adds an error to the list of muted errors for the given account

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `any` | io.cozy.accounts |
| `errorType` | `string` | The type of the error to mute |

*Returns*

`any`

An updated io.cozy.accounts

*Defined in*

[packages/cozy-client/src/models/account.js:27](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/account.js#L27)

***

### setContractSyncStatusInAccount

▸ `Const` **setContractSyncStatusInAccount**(`account`, `contractId`, `syncStatus`): `any`

Sets contract sync status into account relationship

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `any` | Cozy account |
| `contractId` | `any` | - |
| `syncStatus` | `any` | - |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/models/account.js:57](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/account.js#L57)
