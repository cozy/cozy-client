//@ts-ignore next-line
import RNGoogleSafetyNet from 'react-native-google-safetynet'

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
    const attestationResult = await RNGoogleSafetyNet.sendAttestationRequestJWT(
      nonce,
      certificationConfig.androidSafetyNetApiKey
    )

    return {
      platform: 'android',
      attestation: attestationResult
    }
  } catch (e) {
    throw new Error(
      '[FLAGSHIP_CERTIFICATION] Something went wrong while requesting an attestation from Google Safetynet:\n' +
        e.message
    )
  }
}
