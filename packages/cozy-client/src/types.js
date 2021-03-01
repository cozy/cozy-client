/**
 * @typedef {object} Link
 * @typedef {object} Mutation
 * @typedef {object} DocumentCollection
 * @typedef {object} QueryResult
 * @typedef {object} HydratedDocument
 * @typedef {object} ReduxStore
 * @typedef {object} QueryState
 * @typedef {object} Token
 * @typedef {object} ClientResponse
 * @typedef {object} Manifest
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
 * @property {string} [_id] - Id of the folder
 * @property {string} [_type] - Id of the folder
 * @property {string} [relationships] - Id of the folder
 */

/**
 * @typedef {object} IOCozyFile - An io.cozy.files document
 * @property {string} _id - Id of the file
 * @property {string} name - Name of the file
 * @property {object} metadata - Metadata of the file
 * @property {object} type - Type of the file
 * @property {object} class - Class of the file
 */

/**
 * @typedef {object} IOCozyFolder - An io.cozy.files document
 * @property {string} _id - Id of the folder
 * @property {string} name - Name of the folder
 * @property {object} metadata - Metadata of the folder
 * @property {object} type - Type of the folder
 */

/**
 * @typedef {object} ClientError
 * @property {string} [status]
 */

/**
 * @typedef FilePlugin
 * @property {object} [externalRootDirectory]
 * @property {object} [cacheDirectory]
 * @property {object} [externalCacheDirectory]
 * @property {object} [dataDirectory]
 */

/**
 * @typedef Cordova
 * @property {FilePlugin} file
 * @property {object} plugins
 */

/**
 * @typedef  CordovaWindow
 * @property {Cordova} cordova
 * @property {Function} resolveLocalFileSystemURL
 */

export default {}
