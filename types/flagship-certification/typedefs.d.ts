declare var _default: {};
export default _default;
/**
 * - A JSON Web Signature
 */
export type jws = string;
/**
 * - A JSON Web Signature
 */
export type base64string = string;
/**
 * - An app attestation from the app store
 */
export type AttestationResult = {
    platform: string;
    attestation: jws | base64string;
    keyId?: string;
    issuer?: string;
};
/**
 * - Configuration to access the stores certification API
 */
export type CertificationConfig = {
    cloudProjectNumber: string;
};
