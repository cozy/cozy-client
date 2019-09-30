module.exports = function(api) {
  api.cache(true)

  return {
    presets: [
      [
        'cozy-app',
        {
          transformRuntime: {
            regenerator: false
          }
        }
      ]
    ]
  }
}
