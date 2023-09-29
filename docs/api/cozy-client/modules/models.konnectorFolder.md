[cozy-client](../README.md) / [models](models.md) / konnectorFolder

# Namespace: konnectorFolder

[models](models.md).konnectorFolder

## Functions

### buildFolderPath

▸ **buildFolderPath**(`konnector`, `account`, `magicFolders?`): `string`

Build folder path for a given konnector and a given account.

If konnector.folders\[0].defaultDir exists, it is used as default directory.

Occurrences of following strings in base directory are replaced by:

*   `$administrative`: Administrative folder
*   `$photos`: Photos folder

Occurrences of following strings in path are replaced by:

*   `$account: Account label (id or name)`
*   `$konnector`: Konnector name

If no konnectors.folders\[0].defaultDir is set, the default dir used is

*   `$administrative/$konnector/$account`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `konnector` | `IOCozyKonnector` | Konnector document |
| `account` | `IOCozyAccount` | Account document |
| `magicFolders` | `Object` | Object containing a mapping from folder identifiers (ex: $administrative) to their localized values (ex: Administratif). |

*Returns*

`string`

The result path

*Defined in*

[packages/cozy-client/src/models/konnectorFolder.js:115](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/konnectorFolder.js#L115)

***

### buildFolderPermission

▸ **buildFolderPermission**(`folder`): `any`

Returns a permission ready to be passed to
client.collection('io.cozy.permissions').add().

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `folder` | `IOCozyFolder` | The folder which the konnector should have access |

*Returns*

`any`

Permission object

*Defined in*

[packages/cozy-client/src/models/konnectorFolder.js:227](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/konnectorFolder.js#L227)

***

### createDirectoryByPath

▸ **createDirectoryByPath**(`client`, `path`): `Promise`<`IOCozyFolder`>

Creates a directory from a given path

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/CozyClient.md) | CozyClient |
| `path` | `string` | Directory path |

*Returns*

`Promise`<`IOCozyFolder`>

Directory attributes

*Defined in*

[packages/cozy-client/src/models/konnectorFolder.js:63](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/konnectorFolder.js#L63)

***

### ensureKonnectorFolder

▸ **ensureKonnectorFolder**(`client`, `options`): `Promise`<`IOCozyFolder`>

Ensures the destination folder of a konnector exists and is initiated with proper permissions and references

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/CozyClient.md) | CozyClient instance |
| `options` | `Object` | options object |
| `options.account` | `IOCozyAccount` | io.cozy.accounts document |
| `options.konnector` | `IOCozyKonnector` | io.cozy.konnectors document |
| `options.lang` | `string` | instance current language. ex: 'fr' |

*Returns*

`Promise`<`IOCozyFolder`>

*Defined in*

[packages/cozy-client/src/models/konnectorFolder.js:25](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/konnectorFolder.js#L25)

***

### statDirectoryByPath

▸ **statDirectoryByPath**(`client`, `path`): `Promise`<`IOCozyFolder`>

Retrieves a directory from its path

**`throws`** will throw an error on any error without status === 404

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/CozyClient.md) | CozyClient |
| `path` | `string` | Directory path |

*Returns*

`Promise`<`IOCozyFolder`>

Created io.cozy.files document

*Defined in*

[packages/cozy-client/src/models/konnectorFolder.js:78](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/konnectorFolder.js#L78)
