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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
})
