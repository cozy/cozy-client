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

[packages/cozy-client/src/registry.js:38](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L38)

## Properties

### client

• **client**: `any`

*Defined in*

[packages/cozy-client/src/registry.js:42](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L42)

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

[packages/cozy-client/src/registry.js:128](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L128)

***

### fetchAppVersion

▸ **fetchAppVersion**(`params`): `RegistryApp`

Fetch the latest version of an app for the given channel and slug

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | Fetching parameters |
| `params.channel` | `RegistryAppChannel` | The channel of the app to fetch |
| `params.slug` | `string` | The slug of the app to fetch |
| `params.version` | `string` | The version of the app to fetch. Can also be "latest" |

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

[packages/cozy-client/src/registry.js:92](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L92)

***

### fetchAppsInMaintenance

▸ **fetchAppsInMaintenance**(): `RegistryApp`\[]

Fetch the list of apps that are in maintenance mode

*Returns*

`RegistryApp`\[]

*Defined in*

[packages/cozy-client/src/registry.js:117](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L117)

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

[packages/cozy-client/src/registry.js:55](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L55)

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

[packages/cozy-client/src/registry.js:76](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L76)
