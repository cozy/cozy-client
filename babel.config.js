const pacakgeJson = require('./packages/cozy-client/package.json')

module.exports = function(api) {
  const isTest = api.env('test')
  api.cache(true)

  return {
    presets: [
      [
        'cozy-app',
        {
          transformRuntime: {
            regenerator: isTest
          }
        }
      ]
    ],
    plugins: [
      [
        'search-and-replace',
        {
          rules: [
            {
              search: 'COZY_CLIENT_VERSION_PACKAGE',
              replace: pacakgeJson.version
            }
          ]
        }
      ]
    ]
  }
}
