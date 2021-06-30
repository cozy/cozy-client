[cozy-client](../README.md) / [models](models.md) / permission

# Namespace: permission

[models](models.md).permission

## Interfaces

*   [Document](../interfaces/models.permission.document.md)
*   [Permission](../interfaces/models.permission.permission.md)
*   [PermissionItem](../interfaces/models.permission.permissionitem.md)

## Type aliases

### PermissionVerb

Ƭ **PermissionVerb**<>: `"ALL"` | `"GET"` | `"PATCH"` | `"POST"` | `"PUT"` | `"DELETE"`

*Defined in*

[packages/cozy-client/src/models/permission.js:16](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/permission.js#L16)

## Functions

### fetchOwn

▸ **fetchOwn**(`client`): `Promise`<[`PermissionItem`](../interfaces/models.permission.permissionitem.md)\[]>

Fetches the list of permissions blocks

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/cozyclient.md) | - |

*Returns*

`Promise`<[`PermissionItem`](../interfaces/models.permission.permissionitem.md)\[]>

list of permissions

*Defined in*

[packages/cozy-client/src/models/permission.js:51](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/permission.js#L51)

***

### isDocumentReadOnly

▸ **isDocumentReadOnly**(`args`): `Promise`<`boolean`>

*Parameters*

| Name | Type |
| :------ | :------ |
| `args` | `any` |

*Returns*

`Promise`<`boolean`>

*Defined in*

[packages/cozy-client/src/models/permission.js:127](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/permission.js#L127)

***

### isForType

▸ **isForType**(`permission`, `type`): `boolean`

Checks if the permission item is about a specific doctype

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `permission` | [`PermissionItem`](../interfaces/models.permission.permissionitem.md) | - |
| `type` | `string` | doctype |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/permission.js:65](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/permission.js#L65)

***

### isShortcutCreatedOnTheRecipientCozy

▸ `Const` **isShortcutCreatedOnTheRecipientCozy**(`permission`): `boolean`

When a cozy to cozy sharing is created Cozy's stack creates a
shortcut in `/Inbox of sharing` on the recipient's cozy to have a
quick access even when the sharing is not accepted yet.

However, this file is created only if the stack knows the URL of the cozy.
This is not always the case.

This method is here to tell us if the shortcut's file is created
on the recipient's cozy. It can be used to make an UI distinction between the
both situation.

**`property`** {object} data Permission document

**`property`** {Array} included Member information from the sharing

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `permission` | [`Permission`](../interfaces/models.permission.permission.md) | From getOwnPermissions mainly |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/permission.js:165](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/permission.js#L165)
