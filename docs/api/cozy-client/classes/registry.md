[cozy-client](../README.md) / [Exports](../modules.md) / Registry

# Class: Registry

**`property`** {string} slug

**`property`** {object} terms

**`property`** {boolean} installed

## Constructors

### constructor

• **new Registry**(`options`)

*Parameters*

| Name | Type |
| :------ | :------ |
| `options` | `any` |

*Defined in*

[packages/cozy-client/src/registry.js:35](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L35)

## Properties

### client

• **client**: `any`

*Defined in*

[packages/cozy-client/src/registry.js:39](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L39)

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

[packages/cozy-client/src/registry.js:125](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L125)

***

### fetchApps

▸ **fetchApps**(`params`): `Promise`<`RegistryApp`\[]>

Fetch at most 200 apps from the channel

*Parameters*

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | Fetching parameters |
| `params.channel` | `string` | "dev"/"beta"/"stable" |
| `params.limit` | `string` | maximum number of fetched apps - defaults to 200 |
| `params.type` | `string` | "webapp" or "konnector" |

*Returns*

`Promise`<`RegistryApp`\[]>

*Defined in*

[packages/cozy-client/src/registry.js:89](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L89)

***

### fetchAppsInMaintenance

▸ **fetchAppsInMaintenance**(): `RegistryApp`\[]

Fetch the list of apps that are in maintenance mode

*Returns*

`RegistryApp`\[]

*Defined in*

[packages/cozy-client/src/registry.js:114](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L114)

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

[packages/cozy-client/src/registry.js:52](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L52)

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

[packages/cozy-client/src/registry.js:73](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/registry.js#L73)
