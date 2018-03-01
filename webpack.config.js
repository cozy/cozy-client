const path = require('path')

module.exports = {
  entry: {
    'cozy-stack-client': './packages/cozy-stack-client/src/index.js',
    'cozy-client': './packages/cozy-client/src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './packages'),
    filename: './[name]/dist/[name].js',
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
}
