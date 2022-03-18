[cozy-client](../README.md) / [models](models.md) / applications

# Namespace: applications

[models](models.md).applications

## Functions

### getAppDisplayName

▸ **getAppDisplayName**(`app`, `lang`): `string`

getAppDisplayName - Combines the translated prefix and name of the app into a single string.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `app` | `any` | io.cozy.apps or io.cozy.konnectors document |
| `lang` | `string` | Locale to use |

*Returns*

`string`

Name of the app suitable for display

*Defined in*

[packages/cozy-client/src/models/applications.js:73](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/applications.js#L73)

***

### getStoreInstallationURL

▸ **getStoreInstallationURL**(`appData?`, `app?`): `string`

Returns the store URL to install/update an app/konnector

*Parameters*

| Name | Type | Default value |
| :------ | :------ | :------ |
| `appData` | `any`\[] | `[]` |
| `app` | `any` | `{}` |

*Returns*

`string`

URL as string

*Defined in*

[packages/cozy-client/src/models/applications.js:34](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/applications.js#L34)

***

### getStoreURL

▸ **getStoreURL**(`appData?`, `app?`): `string`

Returns the store URL of an app/konnector

*Parameters*

| Name | Type | Default value |
| :------ | :------ | :------ |
| `appData` | `any`\[] | `[]` |
| `app` | `any` | `{}` |

*Returns*

`string`

URL as string

*Defined in*

[packages/cozy-client/src/models/applications.js:11](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/applications.js#L11)

***

### getUrl

▸ **getUrl**(`app`): `string`

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `app` | `any` | io.cozy.apps document |

*Returns*

`string`

url to the app

*Defined in*

[packages/cozy-client/src/models/applications.js:61](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/applications.js#L61)

***

### isInstalled

▸ **isInstalled**(`apps?`, `wantedApp?`): `any`

*Parameters*

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `apps` | `any`\[] | `[]` | Array of apps returned by /apps /konnectors |
| `wantedApp` | `any` | `{}` | io.cozy.app with at least a slug |

*Returns*

`any`

The io.cozy.app is installed or undefined if not

*Defined in*

[packages/cozy-client/src/models/applications.js:50](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/applications.js#L50)
