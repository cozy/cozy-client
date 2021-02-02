## Different entrypoints for node/browser

cozy-client has different entry points for browser and node (the node version does not export React components). 
It is implemented by using fields in `package.json`: 

- `browser` field is the entrypoint for browsers
- `main` field is for node

It causes an issue when writing tests that use React components from cozy-client (`Provider` for example) since
Jest does not support the `browser` field (contrary to webpack).

⚠️ If you use react APIs, you should configure Jest with the [`browser` option](https://jest-bot.github.io/jest/docs/configuration.html#browser-boolean)
in your `package.json` or `jest.config.js`:

```patch
   "jest": {
+    "browser": true
   }
```

There can be some problems since the `browser` field can clash with other node detection mechanism in other libraries 
(for example `iconv-lite`, see this [PR](https://github.com/ashtuchkin/iconv-lite/pull/222)), an alternative is to use the `moduleNameMapper` option to point Jest to the correct entrypoint only for `cozy-client`.

```
"moduleNameMapper": {
  "^cozy-client$": "cozy-client/dist/index"
}
```

This will force Jest to use the browser entry point.

See [this page](https://github.com/marko-js/jest#why-override-the-resolver-enhanced-resolve-jest)
for another alternative solution that overrides the jest resolver so that it supports the `browser` field.
