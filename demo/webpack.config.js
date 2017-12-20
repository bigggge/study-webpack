const path = require('path')
const webpack = require('webpack')
//用于插入html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
//清除输出目录，免得每次手动删除
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash:4].js'
  },
  module: {},
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    //持久化moduleId，主要是为了之后研究加载代码好看一点。
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ]
}
