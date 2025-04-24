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

[packages/cozy-client/src/models/applications.js:71](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/applications.js#L71)

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

[packages/cozy-client/src/models/applications.js:59](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/applications.js#L59)

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

***

### sortApplicationsList

▸ **sortApplicationsList**(`apps`, `slugsOrder`): `any`\[]

sortApplicationsList - Sort the apps based on the slugs in parameters. Apps listed in the slugsOrder array will be added first
and will respect the order defined by slugsOrder and other apps will be added after.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `apps` | `any`\[] | io.cozy.apps array |
| `slugsOrder` | `string`\[] | slugs array |

*Returns*

`any`\[]

io.cozy.apps array

*Defined in*

[packages/cozy-client/src/models/applications.js:97](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/models/applications.js#L97)
