/**
 * Retrieve the app's attestation from the app's store
 * /!\ This is a mock implementation that should never be called
 *
 * @param {string} nonce - the Nonce string retrieved from the stack
 * @param {import("./typedefs").CertificationConfig} certificationConfig - Configuration to access the stores certification API
 * @returns {Promise<import("./typedefs").AttestationResult>} the app's attestation
 */
export function getAppAttestationFromStore(nonce: string, certificationConfig: import("./typedefs").CertificationConfig): Promise<import("./typedefs").AttestationResult>;
