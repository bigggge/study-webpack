const path = require('path')
const webpack = require('webpack');

module.exports = {
  entry: {
    // import2: './src/index.js',
    commonjs2: './src/commonjs/index.js'
  },
  output: {
    filename: '[name].[id].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // new webpack.HashedModuleIdsPlugin()
  ]
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /(node_modules|bower_components)/,
  //       use: {
  //         loader: 'babel-loader'
  //       }
  //     }
  //   ]
  // }
}