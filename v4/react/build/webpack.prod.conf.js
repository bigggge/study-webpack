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
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash:16].js'
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          // 导出css文件
          MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: { localIdentName: '[local]__[hash:7]' } } },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.(less)$/,
        use: [
          MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: { localIdentName: '[local]__[hash:7]' } } },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' }
        ]
      }
    ]
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
    },
    minimizer: [
      new OptimizeCSSAssetsWebpackPlugin({
        cssProcessorOptions: {
          map: { inline: false }
        }
      })
    ]
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
    new CleanWebpackPlugin(['../dist'], { allowExternal: true }),
    new MiniCSSExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    })
  ]
});
