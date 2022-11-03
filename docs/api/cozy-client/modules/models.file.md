[cozy-client](../README.md) / [models](models.md) / file

# Namespace: file

[models](models.md).file

## Interfaces

*   [FileUploadOptions](../interfaces/models.file.FileUploadOptions.md)

## Variables

### ALBUMS_DOCTYPE

• `Const` **ALBUMS_DOCTYPE**: `"io.cozy.photos.albums"`

*Defined in*

[packages/cozy-client/src/models/file.js:15](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L15)

## Functions

### doMobileUpload

▸ **doMobileUpload**(`client`, `fileURL`, `options`): `Promise`<`any`>

Upload a file on a mobile

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/CozyClient.md) | The CozyClient instance |
| `fileURL` | `string` | The local file path (file://) |
| `options` | [`FileUploadOptions`](../interfaces/models.file.FileUploadOptions.md) | The upload options |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/models/file.js:547](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L547)

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

[packages/cozy-client/src/models/file.js:137](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L137)

***

### fetchBlobFileById

▸ **fetchBlobFileById**(`client`, `fileId`): `Promise`<`Blob`>

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/CozyClient.md) | Instance of CozyClient |
| `fileId` | `string` | Id of io.cozy.files document |

*Returns*

`Promise`<`Blob`>

*Defined in*

[packages/cozy-client/src/models/file.js:593](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L593)

***

### fetchFilesByQualificationRules

▸ **fetchFilesByQualificationRules**(`client`, `docRules`): `Promise`<`any`>

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

[packages/cozy-client/src/models/file.js:257](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L257)

***

### generateFileNameForRevision

▸ **generateFileNameForRevision**(`file`, `revision`, `f`): `string`

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

[packages/cozy-client/src/models/file.js:429](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L429)

***

### generateNewFileNameOnConflict

▸ **generateNewFileNameOnConflict**(`filenameWithoutExtension`): `string`

Method to generate a new filename if there is a conflict

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `filenameWithoutExtension` | `string` | A filename without the extension |

*Returns*

`string`

A filename with the right suffix

*Defined in*

[packages/cozy-client/src/models/file.js:404](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L404)

***

### getFullpath

▸ **getFullpath**(`client`, `dirId`, `name`): `Promise`<`string`>

async getFullpath - Gets a file's path

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/CozyClient.md) | The CozyClient instance |
| `dirId` | `string` | The id of the parent directory |
| `name` | `string` | The file's name |

*Returns*

`Promise`<`string`>

The full path of the file in the cozy

*Defined in*

[packages/cozy-client/src/models/file.js:292](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L292)

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

[packages/cozy-client/src/models/file.js:151](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L151)

***

### getSharingShortcutStatus

▸ **getSharingShortcutStatus**(`file`): `string`

Returns the status of a sharing shortcut.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`string`

A description of the status

*Defined in*

[packages/cozy-client/src/models/file.js:163](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L163)

***

### getSharingShortcutTargetDoctype

▸ **getSharingShortcutTargetDoctype**(`file`): `string`

Returns the doctype of the target of the sharing shortcut.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`string`

A doctype

*Defined in*

[packages/cozy-client/src/models/file.js:183](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L183)

***

### getSharingShortcutTargetMime

▸ **getSharingShortcutTargetMime**(`file`): `string`

Returns the mime type of the target of the sharing shortcut, if it is a file.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`string`

The mime-type of the target file, or an empty string is the target is not a file.

*Defined in*

[packages/cozy-client/src/models/file.js:173](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L173)

***

### hasCertifications

▸ **hasCertifications**(`file`): `boolean`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:573](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L573)

***

### hasMetadataAttribute

▸ **hasMetadataAttribute**(`params`): `boolean`

Whether the file's metadata attribute exists

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | Param |
| `params.attribute` | `string` | Metadata attribute to check |
| `params.file` | `IOCozyFile` | An io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:281](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L281)

***

### hasQualifications

▸ **hasQualifications**(`file`): `boolean`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:565](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L565)

***

### isDirectory

▸ **isDirectory**(`file`): `boolean`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:47](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L47)

***

### isEncrypted

▸ **isEncrypted**(`file`): `boolean`

Whether the file is client-side encrypted

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:75](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L75)

***

### isFile

▸ **isFile**(`file`): `boolean`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:41](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L41)

***

### isFromKonnector

▸ **isFromKonnector**(`file`): `boolean`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:584](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L584)

***

### isNote

▸ **isNote**(`file`): `boolean`

Is file param a correct note

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:55](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L55)

***

### isOnlyOfficeFile

▸ **isOnlyOfficeFile**(`file`): `boolean`

Whether the file is supported by Only Office

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.file document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:85](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L85)

***

### isPlainText

▸ **isPlainText**(`mimeType?`, `fileName?`): `boolean`

*Parameters*

| Name | Type | Default value |
| :------ | :------ | :------ |
| `mimeType` | `string` | `''` |
| `fileName` | `string` | `''` |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:557](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L557)

***

### isSharingShorcut

▸ **isSharingShorcut**(`file`): `boolean`

Returns whether the file is a shortcut to a sharing

**`deprecated`** Prefer to use isSharingShortcut.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:203](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L203)

***

### isSharingShorcutNew

▸ **isSharingShorcutNew**(`file`): `boolean`

Returns whether the sharing shortcut is new

**`deprecated`** Prefer to use isSharingShortcutNew.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `any` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:228](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L228)

***

### isSharingShortcut

▸ **isSharingShortcut**(`file`): `boolean`

Returns whether the file is a shortcut to a sharing

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:193](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L193)

***

### isSharingShortcutNew

▸ **isSharingShortcutNew**(`file`): `boolean`

Returns whether the sharing shortcut is new

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

*Defined in*

[packages/cozy-client/src/models/file.js:217](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L217)

***

### isShortcut

▸ **isShortcut**(`file`): `boolean`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files document |

*Returns*

`boolean`

true if the file is a shortcut

*Defined in*

[packages/cozy-client/src/models/file.js:110](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L110)

***

### move

▸ **move**(`client`, `fileId`, `destination`, `force?`): `Promise`<`any`>

Move file to destination.

*Parameters*

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/CozyClient.md) | `undefined` | The CozyClient instance |
| `fileId` | `string` | `undefined` | The file's id (required) |
| `destination` | `Object` | `undefined` | The destination object containing: |
| `destination.folderId` | `string` | `undefined` | The destination folder's id (required) |
| `destination.path` | `string` | `undefined` | The file's path after the move (optional, used to optimize performance in case of conflict) |
| `force` | `boolean` | `false` | Whether we should overwrite, i.e. put to trash, the destination in case of conflict (defaults to false). |

*Returns*

`Promise`<`any`>

*   A promise that returns the move action response and the deleted file id (if any) if resolved or an Error if rejected

*Defined in*

[packages/cozy-client/src/models/file.js:316](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L316)

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

[packages/cozy-client/src/models/file.js:123](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L123)

***

### overrideFileForPath

▸ **overrideFileForPath**(`client`, `dirPath`, `file`, `metadata`): `Promise`<`IOCozyFile`>

Method to upload a file even if a file with the same name already exists.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/CozyClient.md) | The CozyClient instance |
| `dirPath` | `string` | Fullpath of directory to upload to ex: path/to/ |
| `file` | `any` | HTML Object file |
| `metadata` | `any` | An object containing the wanted metadata to attach |

*Returns*

`Promise`<`IOCozyFile`>

The overrided file

*Defined in*

[packages/cozy-client/src/models/file.js:371](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L371)

***

### readMobileFile

▸ **readMobileFile**(`fileURL`): `Promise`<`any`>

Read a file on a mobile

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `fileURL` | `string` | The local file path (file://) |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/models/file.js:500](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L500)

***

### saveFileQualification

▸ **saveFileQualification**(`client`, `file`, `qualification`): `Promise`<`IOCozyFile`>

Save the file with the given qualification

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/CozyClient.md) | The CozyClient instance |
| `file` | `IOCozyFile` | The file to qualify |
| `qualification` | `any` | The file qualification |

*Returns*

`Promise`<`IOCozyFile`>

The saved file

*Defined in*

[packages/cozy-client/src/models/file.js:243](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L243)

***

### shouldBeOpenedByOnlyOffice

▸ **shouldBeOpenedByOnlyOffice**(`file`): `boolean`

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

[packages/cozy-client/src/models/file.js:100](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L100)

***

### splitFilename

▸ **splitFilename**(`file`): `any`

Returns base filename and extension

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | An io.cozy.files |

*Returns*

`any`

{filename, extension}

*Defined in*

[packages/cozy-client/src/models/file.js:25](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L25)

***

### uploadFileWithConflictStrategy

▸ **uploadFileWithConflictStrategy**(`client`, `file`, `options`): `any`

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
| `client` | [`CozyClient`](../classes/CozyClient.md) | The CozyClient instance |
| `file` | `string` | `ArrayBuffer` | Can be the file path (file://) or the binary itself |
| `options` | [`FileUploadOptions`](../interfaces/models.file.FileUploadOptions.md) | The upload options |

*Returns*

`any`

*Defined in*

[packages/cozy-client/src/models/file.js:461](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L461)
