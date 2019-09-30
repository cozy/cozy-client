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
    ]
  }
}
