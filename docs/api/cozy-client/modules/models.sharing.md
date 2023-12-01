[cozy-client](../README.md) / [models](models.md) / sharing

# Namespace: sharing

[models](models.md).sharing

## Functions

### getSharingLink

▸ **getSharingLink**(`client`, `filesIds`): `Promise`<`string`>

Generate Sharing link for one or many files

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`CozyClient`](../classes/CozyClient.md) | Instance of CozyClient |
| `filesIds` | `string`\[] | Array of io.cozy.files ids |

*Returns*

`Promise`<`string`>

Shared link

*Defined in*

[packages/cozy-client/src/models/sharing.js:12](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/sharing.js#L12)
