[cozy-client](../README.md) / [models](models.md) / file

# Namespace: file

[models](models.md).file

## Interfaces

*   [FileUploadOptions](../interfaces/models.file.fileuploadoptions.md)

## Variables

### ALBUMS_DOCTYPE

• `Const` **ALBUMS_DOCTYPE**: `"io.cozy.photos.albums"`

*Defined in*

[packages/cozy-client/src/models/file.js:14](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L14)

## Functions

### doMobileUpload

▸ `Const` **doMobileUpload**(`client`, `fileURL`, `options`): `Promise`<`any`>

Upload a file on a mobile

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/cozyclient.md) | The CozyClient instance |
| `fileURL` | `string` | The local file path (file://) |
| `options` | [`FileUploadOptions`](../interfaces/models.file.fileuploadoptions.md) | The upload options |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/models/file.js:559](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L559)

***

### ensureFilePath

▸ **ensureFilePath**(`file`, `parent`): `any`

Ensure the file has a `path` attribute, or build it

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `any` | object representing the file |
| `parent` | `any` | parent directory for the file |

*Returns*

`any`

file object with path attribute

*Defined in*

[packages/cozy-client/src/models/file.js:126](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L126)

***

### fetchFilesByQualificationRules

▸ `Const` **fetchFilesByQualificationRules**(`client`, `docRules`): `Promise`<`any`>

Helper to query files based on qualification rules

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `any` | The CozyClient instance |
| `docRules` | `any` | the rules containing the searched qualification and the count |

*Returns*

`Promise`<`any`>

The files found by the rules

*Defined in*

[packages/cozy-client/src/models/file.js:246](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L246)

***

### generateFileNameForRevision

▸ `Const` **generateFileNameForRevision**(`file`, `revision`, `f`): `string`

Generate a file name for a revision

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |
| `revision` | `any` | The revision containing the updated_at |
| `f` | `Function` | A function taking a a date and a format as arguments to generate the name. |

*Returns*

`string`

*Defined in*

[packages/cozy-client/src/models/file.js:441](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L441)

***

### generateNewFileNameOnConflict

▸ `Const` **generateNewFileNameOnConflict**(`filenameWithoutExtension`): `string`

Method to generate a new filename if there is a conflict

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `filenameWithoutExtension` | `string` | A filename without the extension |

*Returns*

`string`

A filename with the right suffix

*Defined in*

[packages/cozy-client/src/models/file.js:416](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L416)

***

### getFullpath

▸ `Const` **getFullpath**(`client`, `dirId`, `name`): `Promise`<`string`>

async getFullpath - Gets a file's path

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/cozyclient.md) | The CozyClient instance |
| `dirId` | `string` | The id of the parent directory |
| `name` | `string` | The file's name |

*Returns*

`Promise`<`string`>

The full path of the file in the cozy

*Defined in*

[packages/cozy-client/src/models/file.js:304](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L304)

***

### getParentFolderId

▸ **getParentFolderId**(`file`): `string`

Get the id of the parent folder (`null` for the root folder)

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `any` | io.cozy.files document |

*Returns*

`string`

id of the parent folder, if any

*Defined in*

[packages/cozy-client/src/models/file.js:140](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L140)

***

### getSharingShortcutStatus

▸ `Const` **getSharingShortcutStatus**(`file`): `string`

Returns the status of a sharing shortcut.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`string`

A description of the status

*Defined in*

[packages/cozy-client/src/models/file.js:152](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L152)

***

### getSharingShortcutTargetDoctype

▸ `Const` **getSharingShortcutTargetDoctype**(`file`): `string`

Returns the doctype of the target of the sharing shortcut.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`string`

A doctype

*Defined in*

[packages/cozy-client/src/models/file.js:172](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L172)

***

### getSharingShortcutTargetMime

▸ `Const` **getSharingShortcutTargetMime**(`file`): `string`

Returns the mime type of the target of the sharing shortcut, if it is a file.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`string`

The mime-type of the target file, or an empty string is the target is not a file.

*Defined in*

[packages/cozy-client/src/models/file.js:162](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L162)

***

### hasCertifications

▸ `Const` **hasCertifications**(`file`): `boolean`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:585](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L585)

***

### hasMetadataAttribute

▸ `Const` **hasMetadataAttribute**(`__namedParameters`): `boolean`

Whether the file's metadata attribute exists

*Parameters*

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.attribute` | `string` |
| `__namedParameters.file` | `IOCozyFile` |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:293](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L293)

***

### hasQualifications

▸ `Const` **hasQualifications**(`file`): `boolean`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:577](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L577)

***

### isDirectory

▸ `Const` **isDirectory**(`file`): `boolean`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:46](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L46)

***

### isFile

▸ `Const` **isFile**(`file`): `boolean`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:40](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L40)

***

### isFromKonnector

▸ `Const` **isFromKonnector**(`file`): `boolean`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:596](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L596)

***

### isNote

▸ `Const` **isNote**(`file`): `boolean`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:52](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L52)

***

### isOnlyOfficeFile

▸ `Const` **isOnlyOfficeFile**(`file`): `boolean`

Whether the file is supported by Only Office

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.file document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:74](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L74)

***

### isPlainText

▸ `Const` **isPlainText**(`mimeType?`, `fileName?`): `boolean`

*Parameters*

| Name | Type | Default value |
| :------ | :------ | :------ |
| `mimeType` | `string` | `''` |
| `fileName` | `string` | `''` |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:569](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L569)

***

### isReferencedByAlbum

▸ `Const` **isReferencedByAlbum**(`file`): `boolean`

Whether the file is referenced by an album

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | An io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:268](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L268)

***

### isSharingShorcut

▸ `Const` **isSharingShorcut**(`file`): `boolean`

Returns whether the file is a shortcut to a sharing

**`deprecated`** Prefer to use isSharingShortcut.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:192](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L192)

***

### isSharingShorcutNew

▸ `Const` **isSharingShorcutNew**(`file`): `boolean`

Returns whether the sharing shortcut is new

**`deprecated`** Prefer to use isSharingShortcutNew.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `any` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:217](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L217)

***

### isSharingShortcut

▸ `Const` **isSharingShortcut**(`file`): `boolean`

Returns whether the file is a shortcut to a sharing

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:182](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L182)

***

### isSharingShortcutNew

▸ `Const` **isSharingShortcutNew**(`file`): `boolean`

Returns whether the sharing shortcut is new

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:206](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L206)

***

### isShortcut

▸ `Const` **isShortcut**(`file`): `boolean`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

true if the file is a shortcut

*Defined in*

[packages/cozy-client/src/models/file.js:99](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L99)

***

### move

▸ `Const` **move**(`client`, `fileId`, `destination`, `force?`): `Promise`<`any`>

Move file to destination.

*Parameters*

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/cozyclient.md) | `undefined` | The CozyClient instance |
| `fileId` | `string` | `undefined` | The file's id (required) |
| `destination` | `Object` | `undefined` |  |
| `destination.folderId` | `string` | `undefined` | The destination folder's id (required) |
| `destination.path` | `string` | `undefined` | The file's path after the move (optional, used to optimize performance in case of conflict) |
| `force` | `boolean` | `false` | Whether we should overwrite, i.e. put to trash, the destination in case of conflict (defaults to false). |

*Returns*

`Promise`<`any`>

*   A promise that returns the move action response and the deleted file id (if any) if resolved or an Error if rejected

*Defined in*

[packages/cozy-client/src/models/file.js:328](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L328)

***

### normalize

▸ **normalize**(`file`): `any`

Normalizes an object representing a io.cozy.files object

Ensures existence of `_id` and `_type`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `any` | object representing the file |

*Returns*

`any`

full normalized object

*Defined in*

[packages/cozy-client/src/models/file.js:112](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L112)

***

### overrideFileForPath

▸ `Const` **overrideFileForPath**(`client`, `dirPath`, `file`, `metadata`): `Promise`<`IOCozyFile`>

Method to upload a file even if a file with the same name already exists.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/cozyclient.md) | The CozyClient instance |
| `dirPath` | `string` | Fullpath of directory to upload to ex: path/to/ |
| `file` | `any` | HTML Object file |
| `metadata` | `any` | An object containing the wanted metadata to attach |

*Returns*

`Promise`<`IOCozyFile`>

The overrided file

*Defined in*

[packages/cozy-client/src/models/file.js:383](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L383)

***

### readMobileFile

▸ `Const` **readMobileFile**(`fileURL`): `Promise`<`any`>

Read a file on a mobile

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileURL` | `string` | The local file path (file://) |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/models/file.js:512](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L512)

***

### saveFileQualification

▸ `Const` **saveFileQualification**(`client`, `file`, `qualification`): `Promise`<`IOCozyFile`>

Save the file with the given qualification

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/cozyclient.md) | The CozyClient instance |
| `file` | `IOCozyFile` | The file to qualify |
| `qualification` | `any` | The file qualification |

*Returns*

`Promise`<`IOCozyFile`>

The saved file

*Defined in*

[packages/cozy-client/src/models/file.js:232](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L232)

***

### shouldBeOpenedByOnlyOffice

▸ `Const` **shouldBeOpenedByOnlyOffice**(`file`): `boolean`

Whether the file should be opened by only office
We want to be consistent with the stack so we check the class attributes
But we want to exclude .txt and .md because the CozyUI Viewer can already show them

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.file document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:89](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L89)

***

### splitFilename

▸ `Const` **splitFilename**(`file`): `any`

Returns base filename and extension

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | An io.cozy.files |

*Returns*

`any`

{filename, extension}

*Defined in*

[packages/cozy-client/src/models/file.js:24](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L24)

***

### uploadFileWithConflictStrategy

▸ `Const` **uploadFileWithConflictStrategy**(`client`, `file`, `options`): `any`

The goal of this method is to upload a file based on a conflict strategy.
Be careful: We need to check if the file exists by doing a statByPath query
before trying to upload the file since if we post and the stack return a
409 conflict, we will get a SPDY_ERROR_PROTOCOL on Chrome. This is the only
viable workaround
If there is no conflict, then we upload the file.
If there is a conflict, then we apply the conflict strategy : `erase` or `rename`:

*   The `erase` strategy means an upload with a new version
*   The `rename` strategy means a new upload with a new name

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/cozyclient.md) | The CozyClient instance |
| `file` | `string` | `ArrayBuffer` | Can be the file path (file://) or the binary itself |
| `options` | [`FileUploadOptions`](../interfaces/models.file.fileuploadoptions.md) | The upload options |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/models/file.js:473](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L473)
