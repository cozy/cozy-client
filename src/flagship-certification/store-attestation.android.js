//@ts-ignore next-line - this is a react-native module that is not installed in the monorepo, only in the consumer app
import PlayIntegrity from 'react-native-google-play-integrity'

/**
 * Retrieve the app's attestation from the Google Play store
 *
 * @param {string} nonce - the Nonce string retrieved from the stack
 * @param {import("./typedefs").CertificationConfig} certificationConfig - Configuration to access the stores certification API
 * @returns {Promise<import("./typedefs").AttestationResult>} the app's attestation
 */
export const getAppAttestationFromStore = async (
  nonce,
  certificationConfig
) => {
  try {
    const integrityToken = await PlayIntegrity.requestIntegrityToken(
      nonce,
      certificationConfig.cloudProjectNumber
    )

    return {
      platform: 'android',
      attestation: integrityToken,
      issuer: 'playintegrity'
    }
  } catch (e) {
    throw new Error(
      '[FLAGSHIP_CERTIFICATION] Something went wrong while requesting an attestation from Google Play Integrity API:\n' +
        e.message
    )
  }
}
