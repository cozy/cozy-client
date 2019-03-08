let mimeTypes
try {
  mimeTypes = require('mime-types')
} catch (e) {
  mimeTypes = {
    lookup: () => {
      console.warn(
        'Package mime-types is not installed, cannot guess file type. Please add mime-types to your project via npm/yarn if you want this functionality'
      )
    }
  }
}

module.exports = mimeTypes
