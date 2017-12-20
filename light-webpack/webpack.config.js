const path = require('path')

module.exports = {
  entry: {
    import2: './src/index.js'
    // commonjs: './src/commonjs/index.js'
  },
  output: {
    filename: '[name].[id].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin()
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