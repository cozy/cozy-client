/**
 * @typedef {string} jws - A JSON Web Signature
 */

/**
 * @typedef {string} base64string - A JSON Web Signature
 */

/**
 * @typedef {object} AttestationResult - An app attestation from the app store
 * @property {string} platform
 * @property {jws|base64string} attestation
 * @property {string} [keyId]
 * @property {string} [issuer]
 */

/**
 * @typedef {object} CertificationConfig - Configuration to access the stores certification API
 * @property {string} cloudProjectNumber
 */

export default {}
