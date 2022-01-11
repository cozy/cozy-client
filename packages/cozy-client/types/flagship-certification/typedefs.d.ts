/**
 * A JSON Web Signature
 */
type jws = string;
/**
 * A JSON Web Signature
 */
type base64string = string;
/**
 * An app attestation from the app store
 */
type AttestationResult = {
    platform: string;
    attestation: jws | base64string;
    keyId?: string;
};
/**
 * Configuration to access the stores certification API
 */
type CertificationConfig = {
    androidSafetyNetApiKey: string;
};
