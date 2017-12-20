const path = require('path')

module.exports = {
  entry: {
    es6: './src/index.js',
    // commonjs: './src/commonjs/index.js'
  },
  output: {
    filename: '[name].[id].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}