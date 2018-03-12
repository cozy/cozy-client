const path = require('path')

module.exports = env => ({
  entry: `./packages/${env.package}/src/index.js`,
  output: {
    path: path.resolve(__dirname, './packages'),
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
