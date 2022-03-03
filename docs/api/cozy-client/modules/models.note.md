[cozy-client](../README.md) / [models](models.md) / note

# Namespace: note

[models](models.md).note

## Functions

### fetchURL

▸ `Const` **fetchURL**(`client`, `file`): `Promise`<`string`>

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

[packages/cozy-client/src/models/note.js:29](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/note.js#L29)

***

### generatePrivateUrl

▸ `Const` **generatePrivateUrl**(`notesAppUrl`, `file`, `options?`): `string`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `notesAppUrl` | `string` | URL to the Notes App (https://notes.foo.mycozy.cloud) |
| `file` | `any` | io.cozy.files object |
| `options` | `Object` | - |

*Returns*

`string`

*Defined in*

[packages/cozy-client/src/models/note.js:7](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/note.js#L7)

***

### generateUrlForNote

▸ `Const` **generateUrlForNote**(`notesAppUrl`, `file`): `string`

*Parameters*

| Name | Type |
| :------ | :------ |
| `notesAppUrl` | `any` |
| `file` | `any` |

*Returns*

`string`

*Defined in*

[packages/cozy-client/src/models/note.js:16](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/note.js#L16)
