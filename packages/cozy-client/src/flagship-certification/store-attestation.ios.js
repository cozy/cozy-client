//@ts-ignore next-line
import RNIOS11DeviceCheck from 'react-native-ios11-devicecheck'

import { AttestationResult, CertificationConfig } from './typedefs'

/**
 * Retrieve the app's attestation from the Apple AppStore
 *
 * @param {string} nonce - the Nonce string retrieved from the stack
 * @param {CertificationConfig} certificationConfig - Configuration to access the stores certification API
 * @returns {Promise<AttestationResult>} the app's attestation
 */
export const getAppAttestationFromStore = async (
  nonce,
  certificationConfig
) => {
  try {
    const keyId = await RNIOS11DeviceCheck.generateKey()

    const attestKey = await RNIOS11DeviceCheck.attestKey(keyId, nonce)

    return {
      platform: 'ios',
      attestation: attestKey,
      keyId: keyId
    }
  } catch (e) {
    throw new Error(
      '[FLAGSHIP_CERTIFICATION] Something went wrong while requesting an attestation from Apple DeviceCheck:\n' +
        e.message
    )
  }
}
