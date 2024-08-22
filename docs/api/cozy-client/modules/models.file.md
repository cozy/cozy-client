[cozy-client](../README.md) / [models](models.md) / file

# Namespace: file

[models](models.md).file

## Interfaces

*   [FileUploadOptions](../interfaces/models.file.FileUploadOptions.md)

## Variables

### ALBUMS_DOCTYPE

• `Const` **ALBUMS_DOCTYPE**: `"io.cozy.photos.albums"`

*Defined in*

[packages/cozy-client/src/models/file.js:16](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L16)

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

[packages/cozy-client/src/models/file.js:606](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L606)

***

### downloadFile

▸ **downloadFile**(`params`): `Promise`<`any`>

Download the requested file

This method can be used in a web page context or in a WebView hosted by a Flagship app

When used in a FlagshipApp WebView context, then the action is redirected to the host app
that will process the download

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | The download parameters |
| `params.client` | [`CozyClient`](../classes/CozyClient.md) | Instance of CozyClient |
| `params.file` | `IOCozyFile` | io.cozy.files metadata of the document to downloaded |
| `params.url` | `string` | - |
| `params.webviewIntent` | `WebviewService` | - |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/models/file.js:676](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L676)

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

[packages/cozy-client/src/models/file.js:138](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L138)

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

[packages/cozy-client/src/models/file.js:652](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L652)

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

[packages/cozy-client/src/models/file.js:258](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L258)

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

[packages/cozy-client/src/models/file.js:486](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L486)

***

### generateNewFileNameOnConflict

▸ **generateNewFileNameOnConflict**(`filenameWithoutExtension`, `conflictOptions`): `string`

Method to generate a new filename if there is a conflict

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `filenameWithoutExtension` | `string` | A filename without the extension |
| `conflictOptions` | `ConflictOptions` | - |

*Returns*

`string`

A filename with the right suffix

*Defined in*

[packages/cozy-client/src/models/file.js:456](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L456)

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

[packages/cozy-client/src/models/file.js:293](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L293)

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

[packages/cozy-client/src/models/file.js:152](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L152)

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

[packages/cozy-client/src/models/file.js:164](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L164)

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

[packages/cozy-client/src/models/file.js:184](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L184)

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

[packages/cozy-client/src/models/file.js:174](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L174)

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

[packages/cozy-client/src/models/file.js:632](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L632)

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

[packages/cozy-client/src/models/file.js:282](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L282)

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

[packages/cozy-client/src/models/file.js:624](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L624)

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

[packages/cozy-client/src/models/file.js:48](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L48)

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

[packages/cozy-client/src/models/file.js:76](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L76)

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

[packages/cozy-client/src/models/file.js:42](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L42)

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

[packages/cozy-client/src/models/file.js:643](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L643)

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

[packages/cozy-client/src/models/file.js:56](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L56)

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

[packages/cozy-client/src/models/file.js:86](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L86)

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

[packages/cozy-client/src/models/file.js:616](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L616)

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

[packages/cozy-client/src/models/file.js:204](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L204)

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

[packages/cozy-client/src/models/file.js:229](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L229)

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

[packages/cozy-client/src/models/file.js:194](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L194)

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

[packages/cozy-client/src/models/file.js:218](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L218)

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

[packages/cozy-client/src/models/file.js:111](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L111)

***

### move

▸ **move**(`client`, `file`, `destination`, `options?`): `Promise`<{ `deleted`: `string`\[] ; `moved`: `IOCozyFile`  }>

Move file to destination.
Manage 4 cases :

*   Move inside a Cozy server
*   Move inside a Nextcloud server
*   Move from a Nextcloud server to Cozy
*   Move from Cozy to a Nextcloud server

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/CozyClient.md) | The CozyClient instance |
| `file` | `IOCozyFile` | `NextcloudFile` | The file to move (required) |
| `destination` | `NextcloudFile` | `IOCozyFolder` | The destination folder (required) |
| `options` | `Object` | The options |
| `options.force` | `boolean` | Whether we should overwrite, i.e. put to trash, the destination in case of conflict (defaults to false). |

*Returns*

`Promise`<{ `deleted`: `string`\[] ; `moved`: `IOCozyFile`  }>

> } - A promise that returns the move action response (if any)
> and the deleted file id (if any) if resolved or an Error if rejected

*Defined in*

[packages/cozy-client/src/models/file.js:322](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L322)

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

[packages/cozy-client/src/models/file.js:124](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L124)

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

[packages/cozy-client/src/models/file.js:422](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L422)

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

[packages/cozy-client/src/models/file.js:559](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L559)

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

[packages/cozy-client/src/models/file.js:244](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L244)

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

[packages/cozy-client/src/models/file.js:101](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L101)

***

### splitFilename

▸ **splitFilename**(`file`): `Object`

Returns base filename and extension

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | An io.cozy.files |

*Returns*

`Object`

| Name | Type |
| :------ | :------ |
| `extension` | `string` |
| `filename` | `string` |

*Defined in*

[packages/cozy-client/src/models/file.js:26](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L26)

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

[packages/cozy-client/src/models/file.js:519](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L519)
