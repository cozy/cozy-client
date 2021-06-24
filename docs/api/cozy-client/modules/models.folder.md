[cozy-client](../README.md) / [Exports](../modules.md) / [models](models.md) / folder

# Namespace: folder

[models](models.md).folder

## Variables

### MAGIC_FOLDERS

• `Const` **MAGIC_FOLDERS**: `Object`

*Type declaration*

| Name | Type |
| :------ | :------ |
| `ADMINISTRATIVE` | `string` |
| `HOME` | `string` |
| `NOTES` | `string` |
| `PHOTOS` | `string` |
| `PHOTOS_BACKUP` | `string` |
| `PHOTOS_UPLOAD` | `string` |

*Defined in*

[packages/cozy-client/src/models/folder.js:7](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/folder.js#L7)

## Functions

### createFolderWithReference

▸ `Const` **createFolderWithReference**(`client`, `path`, `document`): `Promise`<`IOCozyFile`>

Create a folder with a reference to the given document

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/cozyclient.md) | cozy-client instance |
| `path` | `string` | Folder path |
| `document` | `CozyClientDocument` | Document to make reference to. Any doctype. |

*Returns*

`Promise`<`IOCozyFile`>

Folder document

*Defined in*

[packages/cozy-client/src/models/folder.js:65](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/folder.js#L65)

***

### ensureMagicFolder

▸ `Const` **ensureMagicFolder**(`client`, `id`, `path`): `Promise`<`IOCozyFile`>

Returns a "Magic Folder", given its id. See https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.apps/#special-iocozyapps-doctypes

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/cozyclient.md) | cozy-client instance |
| `id` | `string` | Magic Folder id. `CozyFolder.magicFolders` contains the ids of folders that can be magic folders. |
| `path` | `string` | Default path to use if magic folder does not exist |

*Returns*

`Promise`<`IOCozyFile`>

Folder document

*Defined in*

[packages/cozy-client/src/models/folder.js:25](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/folder.js#L25)

***

### getReferencedFolder

▸ `Const` **getReferencedFolder**(`client`, `document`): `Promise`<`IOCozyFile`>

Returns the most recent folder referenced by the given document

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/cozyclient.md) | cozy-client instance |
| `document` | `CozyClientDocument` | Document to get references from |

*Returns*

`Promise`<`IOCozyFile`>

Folder referenced by the given document

*Defined in*

[packages/cozy-client/src/models/folder.js:86](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/folder.js#L86)
