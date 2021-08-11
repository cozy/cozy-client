[cozy-client](../README.md) / Registry

# Class: Registry

## Constructors

### constructor

• **new Registry**(`options`)

*Parameters*

| Name | Type |
| :------ | :------ |
| `options` | `any` |

*Defined in*

[packages/cozy-client/src/registry.js:39](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L39)

## Properties

### client

• **client**: `any`

*Defined in*

[packages/cozy-client/src/registry.js:43](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L43)

## Methods

### fetchApp

▸ **fetchApp**(`slug`): `RegistryApp`

Fetch the status of a single app on the registry

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `slug` | `string` | The slug of the app to fetch |

*Returns*

`RegistryApp`

*Defined in*

[packages/cozy-client/src/registry.js:129](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L129)

***

### fetchAppLatestVersion

▸ **fetchAppLatestVersion**(`params`): `RegistryApp`

Fetch the latest version of an app for the given channel and slug

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | Fetching parameters |
| `params.channel` | `RegistryAppChannel` | The channel of the app to fetch |
| `params.slug` | `string` | The slug of the app to fetch |

*Returns*

`RegistryApp`

*Defined in*

[packages/cozy-client/src/registry.js:142](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L142)

***

### fetchApps

▸ **fetchApps**(`params`): `Promise`<`RegistryApp`\[]>

Fetch at most 200 apps from the channel

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | Fetching parameters |
| `params.channel` | `RegistryAppChannel` | The channel of the apps to fetch |
| `params.limit` | `string` | maximum number of fetched apps - defaults to 200 |
| `params.type` | `string` | "webapp" or "konnector" |

*Returns*

`Promise`<`RegistryApp`\[]>

*Defined in*

[packages/cozy-client/src/registry.js:93](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L93)

***

### fetchAppsInMaintenance

▸ **fetchAppsInMaintenance**(): `RegistryApp`\[]

Fetch the list of apps that are in maintenance mode

*Returns*

`RegistryApp`\[]

*Defined in*

[packages/cozy-client/src/registry.js:118](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L118)

***

### installApp

▸ **installApp**(`app`, `source`): `Promise`<`any`>

Installs or updates an app from a source.

Accepts the terms if the app has them.

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `app` | `RegistryApp` | App to be installed |
| `source` | `string` | String (ex: registry://drive/stable) |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/registry.js:56](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L56)

***

### uninstallApp

▸ **uninstallApp**(`app`): `Promise`<`any`>

Uninstalls an app.

*Parameters*

| Name | Type |
| :------ | :------ |
| `app` | `any` |

*Returns*

`Promise`<`any`>

*Defined in*

[packages/cozy-client/src/registry.js:77](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L77)
