/**
 * webpack.prod.conf.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/7/23.
 */

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:16].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: 'vendors',
          name: 'vendors'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new CleanWebpackPlugin(['../dist'], { allowExternal: true })
  ]
});