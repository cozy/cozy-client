/**
 * A JSON Web Signature
 * @typedef {string} jws
 */

/**
 * A JSON Web Signature
 * @typedef {string} base64string
 */

/**
 * An app attestation from the app store
 * @typedef {object} AttestationResult
 * @property {string} platform
 * @property {jws|base64string} attestation
 * @property {string} [keyId]
 */

/**
 * Configuration to access the stores certification API
 * @typedef {object} CertificationConfig
 * @property {string} androidSafetyNetApiKey
 */
