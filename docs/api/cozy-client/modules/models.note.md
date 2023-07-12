[cozy-client](../README.md) / [models](models.md) / note

# Namespace: note

[models](models.md).note

## Variables

### RETURN_URL_KEY

• `Const` **RETURN_URL_KEY**: `"returnUrl"`

*Defined in*

[packages/cozy-client/src/models/note.js:4](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/note.js#L4)

## Functions

### fetchURL

▸ **fetchURL**(`client`, `file`): `Promise`<`string`>

Fetch and build an URL to open a note.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `any` | CozyClient instance |
| `file` | `any` | io.cozy.file object |

*Returns*

`Promise`<`string`>

url

*Defined in*

[packages/cozy-client/src/models/note.js:33](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/note.js#L33)

***

### generatePrivateUrl

▸ **generatePrivateUrl**(`notesAppUrl`, `file`, `options?`): `string`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `notesAppUrl` | `string` | URL to the Notes App (https://notes.foo.mycozy.cloud) |
| `file` | `any` | io.cozy.files object |
| `options` | `Object` | - |

*Returns*

`string`

*Defined in*

[packages/cozy-client/src/models/note.js:11](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/note.js#L11)

***

### generateReturnUrlToNotesIndex

▸ **generateReturnUrlToNotesIndex**(`client`, `file`, `returnUrl`): `Promise`<`string`>

Create the URL to be used to edit a note

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `any` | CozyClient instance |
| `file` | `any` | io.cozy.file object |
| `returnUrl` | `string` | URL to use as returnUrl if you don't want the current location |

*Returns*

`Promise`<`string`>

URL where one can edit the note

*Defined in*

[packages/cozy-client/src/models/note.js:70](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/note.js#L70)

***

### generateUrlForNote

▸ **generateUrlForNote**(`notesAppUrl`, `file`): `string`

*Parameters*

| Name | Type |
| :------ | :------ |
| `notesAppUrl` | `any` |
| `file` | `any` |

*Returns*

`string`

*Defined in*

[packages/cozy-client/src/models/note.js:20](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/note.js#L20)
