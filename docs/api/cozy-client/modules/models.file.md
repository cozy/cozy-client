[cozy-client](../README.md) / [models](models.md) / file

# Namespace: file

[models](models.md).file

## Variables

### ALBUMS_DOCTYPE

• `Const` **ALBUMS_DOCTYPE**: `"io.cozy.photos.albums"`

*Defined in*

[packages/cozy-client/src/models/file.js:13](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L13)

## Functions

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

[packages/cozy-client/src/models/file.js:125](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L125)

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

*   The files found by the rules

*Defined in*

[packages/cozy-client/src/models/file.js:245](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L245)

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

[packages/cozy-client/src/models/file.js:139](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L139)

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

[packages/cozy-client/src/models/file.js:151](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L151)

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

[packages/cozy-client/src/models/file.js:171](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L171)

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

[packages/cozy-client/src/models/file.js:161](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L161)

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

[packages/cozy-client/src/models/file.js:292](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L292)

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

[packages/cozy-client/src/models/file.js:45](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L45)

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

[packages/cozy-client/src/models/file.js:39](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L39)

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

[packages/cozy-client/src/models/file.js:51](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L51)

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

[packages/cozy-client/src/models/file.js:73](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L73)

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

[packages/cozy-client/src/models/file.js:267](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L267)

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

[packages/cozy-client/src/models/file.js:191](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L191)

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

[packages/cozy-client/src/models/file.js:216](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L216)

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

[packages/cozy-client/src/models/file.js:181](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L181)

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

[packages/cozy-client/src/models/file.js:205](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L205)

***

### isShortcut

▸ `Const` **isShortcut**(`file`): `boolean`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `IOCozyFile` | io.cozy.files |

*Returns*

`boolean`

true if the file is a shortcut

*Defined in*

[packages/cozy-client/src/models/file.js:98](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L98)

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

[packages/cozy-client/src/models/file.js:111](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L111)

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

*   The saved file

*Defined in*

[packages/cozy-client/src/models/file.js:231](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L231)

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

[packages/cozy-client/src/models/file.js:88](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L88)

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

[packages/cozy-client/src/models/file.js:23](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L23)
