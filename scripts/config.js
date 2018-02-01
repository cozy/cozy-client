const babel = require('rollup-plugin-babel')
const path = require('path')

const defaultInputOptions = {
  plugins: [
    babel({
      sourceMap: true,
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false,
            targets: {
              browsers: ['last 2 versions', 'IE >= 11']
            }
          }
        ]
      ],
      plugins: [
        'external-helpers', // See https://github.com/rollup/rollup-plugin-babel#configuring-babel
        'transform-object-rest-spread',
        'transform-class-properties'
      ]
    })
  ]
}

const defaultOutputOptions = {
  sourcemap: true
}

const bundles = [
  {
    name: 'cozy-stack-link',
    global: 'CozyStackLink'
  }
]

function getInputOptions(bundleDesc) {
  return Object.assign({}, defaultInputOptions, {
    input: path.resolve(__dirname, `../packages/${bundleDesc.name}/src/index.js`)
  })
}
  
function getOutputOptions(bundleDesc) {
  return Object.assign({}, defaultOutputOptions, {
    file: path.resolve(
      __dirname,
      `../packages/${bundleDesc.name}/dist/${bundleDesc.name}.js`
    ),
    format: 'umd',
    name: bundleDesc.global
  })
}

module.exports = {
  bundles,
  getInputOptions,
  getOutputOptions
}