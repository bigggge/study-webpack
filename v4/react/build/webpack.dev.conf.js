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
  rules: [
    {
      test: /\.(css)$/,
      use: [
        // 导出css文件
        { loader: 'style-loader' },
        { loader: 'css-loader', options: { modules: true, localIdentName: '[local]__[hash:7]' } },
        { loader: 'postcss-loader' }
      ]
    },
    {
      test: /\.(less)$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: { modules: true, localIdentName: '[local]__[hash:7]' } },
        { loader: 'postcss-loader' },
        { loader: 'less-loader' }
      ]
    }
  ],
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
    port: '3015',
    contentBase: path.join(__dirname, '../public'),
    compress: true, // gzip
    historyApiFallback: true,
    hot: true, // 启用 webpack 的模块热替换特性
    https: false,
    noInfo: false,
    open: true, // open the browser
    proxy: {}
  }
});