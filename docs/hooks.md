## Embedded hooks

In addition to our [React Integration](./react-integration), Cozy Client comes with several hooks.

- [useAppLinkWithStoreFallback](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hooks/useAppLinkWithStoreFallback.jsx): Returns the URL of an app if this app is installed. If not, returns the URL to the store to install it. 
- [useCapabilities](https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/hooks/useCapabilities.jsx): Returns the [capabilities](https://docs.cozy.io/en/cozy-stack/settings/#get-settingscapabilities) for an instance