[cozy-client](../README.md) / [Exports](../modules.md) / [models](models.md) / file

# Namespace: file

[models](models.md).file

## Variables

### ALBUMS_DOCTYPE

• `Const` **ALBUMS_DOCTYPE**: `"io.cozy.photos.albums"`

*Defined in*

[packages/cozy-client/src/models/file.js:12](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L12)

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

[packages/cozy-client/src/models/file.js:124](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L124)

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

[packages/cozy-client/src/models/file.js:244](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L244)

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

[packages/cozy-client/src/models/file.js:138](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L138)

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

[packages/cozy-client/src/models/file.js:150](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L150)

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

[packages/cozy-client/src/models/file.js:170](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L170)

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

[packages/cozy-client/src/models/file.js:160](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L160)

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

[packages/cozy-client/src/models/file.js:291](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L291)

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

[packages/cozy-client/src/models/file.js:44](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L44)

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

[packages/cozy-client/src/models/file.js:38](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L38)

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

[packages/cozy-client/src/models/file.js:50](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L50)

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

[packages/cozy-client/src/models/file.js:72](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L72)

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

[packages/cozy-client/src/models/file.js:266](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L266)

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

[packages/cozy-client/src/models/file.js:190](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L190)

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

[packages/cozy-client/src/models/file.js:215](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L215)

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

[packages/cozy-client/src/models/file.js:180](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L180)

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

[packages/cozy-client/src/models/file.js:204](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L204)

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

[packages/cozy-client/src/models/file.js:97](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L97)

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

[packages/cozy-client/src/models/file.js:110](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L110)

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

[packages/cozy-client/src/models/file.js:230](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L230)

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

[packages/cozy-client/src/models/file.js:87](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L87)

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

[packages/cozy-client/src/models/file.js:22](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/file.js#L22)
