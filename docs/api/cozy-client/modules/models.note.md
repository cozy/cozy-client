[cozy-client](../README.md) / [models](models.md) / note

# Namespace: note

[models](models.md).note

## Functions

### fetchURL

▸ **fetchURL**(`client`, `file`, `options?`): `Promise`<`string`>

Fetch and build an URL to open a note.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `any` | CozyClient instance |
| `file` | `any` | io.cozy.file object |
| `options` | `Object` | Options |
| `options.pathname` | `string` | - |

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

[packages/cozy-client/src/models/note.js:9](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/note.js#L9)

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

[packages/cozy-client/src/models/note.js:18](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/note.js#L18)
