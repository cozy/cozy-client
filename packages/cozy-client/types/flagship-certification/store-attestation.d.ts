/**
 * Retrieve the app's attestation from the app's store
 * /!\ This is a mock implementation that should never be called
 *
 * @param {string} nonce - the Nonce string retrieved from the stack
 * @param {CertificationConfig} certificationConfig - Configuration to access the stores certification API
 * @returns {Promise<AttestationResult>} the app's attestation
 */
export function getAppAttestationFromStore(nonce: string, certificationConfig: CertificationConfig): Promise<AttestationResult>;
import { CertificationConfig } from "./typedefs";
import { AttestationResult } from "./typedefs";
