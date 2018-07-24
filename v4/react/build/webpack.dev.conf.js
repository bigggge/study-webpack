/**
 * webpack.dev.conf.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/7/23.
 */

const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: 'js/[name].[hash:16].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      minify: {
        html5: true
      },
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: '3013',
    contentBase: path.join(__dirname, '../public'),
    compress: true, // gzip
    historyApiFallback: true,
    hot: true, // 启用 webpack 的模块热替换特性
    https: false,
    noInfo: false,
    open: false, // open the browser
    proxy: {}
  }
});