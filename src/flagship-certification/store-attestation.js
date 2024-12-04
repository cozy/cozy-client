/**
 * Retrieve the app's attestation from the app's store
 * /!\ This is a mock implementation that should never be called
 *
 * @param {string} nonce - the Nonce string retrieved from the stack
 * @param {import("./typedefs").CertificationConfig} certificationConfig - Configuration to access the stores certification API
 * @returns {Promise<import("./typedefs").AttestationResult>} the app's attestation
 */
const validateAppMock = async (nonce, certificationConfig) => {
  throw new Error(
    `getAppAttestationFromStore can only be called from a React Native container`
  )
}

export const getAppAttestationFromStore = validateAppMock
