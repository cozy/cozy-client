[cozy-client](../README.md) / [models](models.md) / sharing

# Namespace: sharing

[models](models.md).sharing

## Functions

### getSharingLink

▸ **getSharingLink**(`client`, `filesIds`, `isFlatDomain`): `Promise`<`string`>

Generate Sharing link for one or many files

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/CozyClient.md) | Instance of CozyClient |
| `filesIds` | `string`\[] | Array of io.cozy.files ids |
| `isFlatDomain` | `boolean` | - |

*Returns*

`Promise`<`string`>

Shared link

*Defined in*

[packages/cozy-client/src/models/sharing.js:13](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/sharing.js#L13)
