import { QueryDefinition } from './queries/dsl'

/**
 * @typedef {"io.cozy.accounts"} AccountsDoctype
 * @typedef {"io.cozy.triggers"} TriggersDoctype
 * @typedef {"io.cozy.konnectors"} KonnectorsDoctype
 * @typedef {"io.cozy.notes"} NotesDoctype
 * @typedef {"io.cozy.apps"} AppsDoctype
 * @typedef {"io.cozy.settings"} SettingsDoctype
 * @typedef {AccountsDoctype|TriggersDoctype|KonnectorsDoctype|NotesDoctype|AppsDoctype|SettingsDoctype} KnownDoctype
 * @typedef {KnownDoctype|string} Doctype
 */

/**
 * @typedef {object} Link
 * @typedef {object} Mutation
 * @typedef {object} DocumentCollection
 * @typedef {object} QueryResult
 * @typedef {object} HydratedDocument
 * @typedef {object} ReduxStore
 * @typedef {object} Token
 * @typedef {object} ClientResponse
 * @typedef {object} Manifest
 */

/**
 * @typedef {object} OldCozyClient
 */

/**
 * @typedef {object} NodeEnvironment
 */

/**
 * @typedef {"loading"|"loaded"|"pending"|"failed"} QueryFetchStatus
 */

/**
 * @typedef {object} QueryState
 * @property {string} id
 * @property {QueryDefinition} definition
 * @property {QueryFetchStatus} fetchStatus
 * @property {number} lastFetch
 * @property {number} lastUpdate
 * @property {Error} lastError
 * @property {boolean} hasMore
 * @property {number} count
 * @property {object|Array} data
 * @property {string} bookmark
 */

/**
 * @typedef {object} FetchMoreAble
 * @property {Function} fetchMore
 */

/**
 * @typedef {QueryState & FetchMoreAble} UseQueryReturnValue
 */

/**
 * A reference to a document (special case of a relationship used between photos and albums)
 * https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.files/#references
 *
 * @typedef {object} Reference
 * @property {string} _id - id of the document
 * @property {string} _type - doctype of the document
 */

/**
 * @typedef {Object.<string, Array<Reference>>} ReferenceMap
 */

/**
 * @typedef {object} MutationOptions
 * @property {string} [as]
 * @property {Function} [update]
 * @property {Function} [updateQueries]
 */

/**
 * @typedef {object} CozyClientDocument - A document
 * @property {string} [_id] - Id of the document
 * @property {string} [_type] - Type of the document
 * @property {object} [relationships] - Relationships of the document
 */

/**
 * @typedef {object} FileDocument - An io.cozy.files document
 * @property {string} _id - Id of the file
 * @property {string} name - Name of the file
 * @property {object} metadata - Metadata of the file
 * @property {object} type - Type of the file
 * @property {object} class - Class of the file
 * @typedef {CozyClientDocument & FileDocument} IOCozyFile - An io.cozy.files document
 */

/**
 * @typedef {object} FolderDocument - An io.cozy.files document
 * @property {string} _id - Id of the folder
 * @property {string} name - Name of the folder
 * @property {object} metadata - Metadata of the folder
 * @property {object} type - Type of the folder
 * @typedef {CozyClientDocument & FileDocument} IOCozyFolder - An io.cozy.files document
 */

/**
 * @typedef {object} ClientError
 * @property {string} [status]
 */

/**
 * @typedef FilePlugin
 * @property {object} [externalDataDirectory]
 * @property {object} [cacheDirectory]
 * @property {object} [externalCacheDirectory]
 * @property {object} [dataDirectory]
 */

/**
 * @typedef InAppBrowser
 * @property {Function} open
 */

/**
 * @typedef {object} AppMetadata
 */

/**
 * @typedef {object} ClientCapabilities
 *
 * @description Read more about client capabilities here https://docs.cozy.io/en/cozy-stack/settings/#get-settingscapabilities.
 *
 * @property {boolean} can_auth_with_oidc - Whether OIDC login is possible with this Cozy
 * @property {boolean} can_auth_with_password - Whether  password login is possible with this Cozy
 * @property {boolean} file_versioning - Whether file versioning is active on this Cozy
 * @property {boolean} flat_subdomains - Whether the stack has been configured to use flat subdomains
 */

/**
 * @typedef Cordova
 * @property {FilePlugin} file
 * @property {InAppBrowser} InAppBrowser
 * @property {object} plugins
 */

/**
 * @typedef  CordovaWindow
 * @property {Cordova} cordova
 * @property {object} SafariViewController
 * @property {Function} resolveLocalFileSystemURL
 * @property {Function} handleOpenURL
 */

export default {}
