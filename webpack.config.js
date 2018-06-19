const path = require('path')

const packagesPath = path.resolve(__dirname, './packages')

module.exports = env => ({
  entry: `${packagesPath}/${env.package}/src/index.js`,
  output: {
    path: packagesPath,
    filename: `./${env.package}/dist/${env.package}.js`,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  externals: {
    react: 'react'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          extends: ['cozy-app'],
          emitWarning: false
        }
      },
      {
        enforce: 'pre',
        test: /\.jsx$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          extends: ['cozy-app/react'],
          emitWarning: false
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
})
