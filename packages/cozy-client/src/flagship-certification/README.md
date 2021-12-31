# Flagship certification

Flagship certification is the process of verifying that the current running app is a genuine Cozy application.

This verification is done by querying an app certificate from the app store (Apple AppStore or Google Play) and sending  the resulting certificate to `cozy-stack`. Then `cozy-stack` will be able to an analyze the certificate and conclude if the app is genuine or not.

## Nomenclature

- `flagship`: refers to the Cozy main application
- `store certification`: process of verifying app's genuineness through the platform's store 
- `attestation`: result from the `store certification`
- `challenge`: unique token given to the app by `cozy-stack` that may be encrypted in the `attestation` as a proof of authenticity
- `nonce`: data type used to store the `challenge` token
- `SafetyNet`: Google's implementation of the `store certification`
- `AppAttest`: Apple's implementation of the `store certification`

## Android certification

Android certification is based on [SafetyNet](https://developer.android.com/training/safetynet/index.html).

This process requires to query a `challenge` from `cozy-stack` and to use it to init the `store certification` process through `SafetyNet`. Then the received `attestation` is send to `cozy-stack` for verification.

The resulting `attestation` is in the form of a `JSON Web Signature` that embbed the following `JSON`:
```json
{
    "apkCertificateDigestSha256": [
        "base64 encoded, SHA-256 hash of the certificate used to sign requesting app="
    ],
    "apkDigestSha256": "kNv83tJLFqwliYQ/6HUPCeGkBzLLCX/nvT+EF3OEB2I=",
    "apkPackageName": "com.package.name.of.requesting.app",
    "basicIntegrity": true,
    "ctsProfileMatch": true, 
    "evaluationType": "BASIC",
    "nonce": "R2Rra24fVm5xa2Mg",
    "timestampMs": 9860437986543
}
```

The `attestation`'s content is described in the SafetyNet's documentation: https://developer.android.com/training/safetynet/attestation#use-response-server

## iOS certification

iOS certification is based on [AppAttest](https://developer.apple.com/documentation/devicecheck).

This process requires to query a `challenge` from `cozy-stack` and to use it to init the `store certification` process through `AppAttest`. Then the received `attestation` is send to `cozy-stack` for verification.

The resulting `attestation` is in the form of a `base64` token.

The `attestation`'s content is described in the `AppAttest`'s documentation: https://developer.apple.com/documentation/devicecheck/validating_apps_that_connect_to_your_server#3576643

## Client's configuration

In order to configure `flagship` certification on an app, the OAuth property of `cozy-client` must contain `shouldRequireFlagshipPermissions` property set to `true` and `certificationConfig` property filled with required API keys.

Example of `cozy-client` configuration:
```js
const client = await initClient(uri, {
    scope: [
      'io.cozy.apps'
    ],
    oauth: {
      redirectURI: 'REDIRECT_URI',
      softwareID: 'YOUR_APP_ID',
      clientKind: 'mobile',
      clientName: 'YOUR_APP_NAME',
      shouldRequireFlagshipPermissions: true,
      certificationConfig: {
        androidSafetyNetApiKey: 'YOUR_GOOGLE_SAFETY_NET_API_KEY'
      }
    },
```

## Stacks' configuration

In order to certify an app, the `cozy-stack` needs to have the following data:
- App's package name
  - The app's package name is set on the react-native project
  - It should be put in `flagship.apk_package_names` in the `cozy-stack`'s configuration file
- iOS app's id
  - The iOS app's id is the concatenation of the developper team's id and the app's package name as defined in the XCode project
  - If team's id is `ABCDEFGHIJ` and package name is `io.cozy.some_app` then the resulting app's id should be `ABCDEFGHIJ.io.cozy.some_app`
  - It should be put in `flagship.apple_app_ids` in the `cozy-stack`'s configuration file
- Android app's certificate digest
  - The Android certificate digest can be found in the Google Play app's Console, in `Configuration/App integrity` page
  - The certificate digest is the `App signing key certificate` in SHA-256 format converted from HEX to base64
  - It should be put in `flagship.apk_certificate_digests` in the `cozy-stack`'s configuration file
