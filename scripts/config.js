const babel = require('rollup-plugin-babel')
// Rollup by default doesn't handle resolving ./folder to ./folder/index.js internally
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const path = require('path')

const defaultInputOptions = {
  external: ['react'],
  plugins: [
    babel({
      sourceMap: true,
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        'react',
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
    }),
    resolve({
      extensions: ['.js', '.json', '.jsx']
    }),
    // So that rollup can handle `import React, { Component }`...
    commonjs({
      include: ['node_modules/**'],
      namedExports: {
        'node_modules/react/index.js': [
          'Children',
          'Component',
          'PropTypes',
          'createElement'
        ],
        'node_modules/react-dom/index.js': ['render']
      }
    })
  ]
}

const defaultOutputOptions = {
  sourcemap: true,
  globals: {
    react: 'React'
  }
}

const bundles = [
  {
    name: 'cozy-stack-client',
    global: 'CozyStackClient'
  },
  {
    name: 'cozy-client',
    global: 'CozyClient'
  }
]

function getInputOptions(bundleDesc) {
  return Object.assign({}, defaultInputOptions, {
    input: path.resolve(
      __dirname,
      `../packages/${bundleDesc.name}/src/index.js`
    )
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
