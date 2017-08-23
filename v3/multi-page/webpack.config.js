'use strict';

const {join, resolve} = require('path');
const webpack = require('webpack');
// https://github.com/isaacs/node-glob
const glob = require('glob');

/**
 * Simplifies creation of HTML files to serve your webpack bundles
 * @link https://github.com/jantimon/html-webpack-plugin
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * Extract text from bundle into a file.
 * @link https://github.com/webpack-contrib/extract-text-webpack-plugin
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/**
 * https://doc.webpack-china.org/plugins/commons-chunk-plugin/
 */
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
/**
 * optimize \ minimize CSS assets.
 * https://github.com/NMFR/optimize-css-assets-webpack-plugin
 */
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
/**
 * minify your JavaScript
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 */
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
/**
 * remove your build folder(s) before building
 * https://github.com/johnagan/clean-webpack-plugin
 */
const CleanWebpackPlugin = require('clean-webpack-plugin');

// const extractCSS = new ExtractTextPlugin({
//   filename: 'assets/css/[name]-css.css',
//   allChunks: true
// });
//
// const extractSASS = new ExtractTextPlugin({
//   filename: 'assets/css/[name]-sass.css',
//   allChunks: true
// });

const isProd = process.env.NODE_ENV === 'production';
const entries = {};
const chunks = [];
let cssLoaders = {};
let cssRules = {};

console.log('\x1b[32m%s\x1b[0m', '----------');
console.log('\x1b[36m', 'ENV: ' + process.env.NODE_ENV);
console.log('\x1b[32m%s\x1b[0m', '[path]');
// Perform a synchronous glob search.
glob.sync('./src/pages/**/app.js').forEach(path => {
  console.log('path: ', path);
  const chunk = path.split('./src/pages/')[1].split('/app.js')[0];
  entries[chunk] = path;
  chunks.push(chunk);
});

console.log('\x1b[32m%s\x1b[0m', '[entries]');
console.log(entries);
console.log('\x1b[32m%s\x1b[0m', '[chunks]');
console.log('chunks ', chunks);
console.log('\x1b[32m%s\x1b[0m', '----------');

if (isProd) {
  cssLoaders = {
    css: ExtractTextPlugin.extract({
      use: 'css-loader',
      // loader(e.g 'style-loader') that should be used when the CSS is not extracted
      // (i.e. in an additional chunk when allChunks: false)
      fallback: 'style-loader'
    }),
    scss: ExtractTextPlugin.extract({
      use: ['css-loader', 'postcss-loader', 'sass-loader'],
      fallback: 'style-loader'
    })

  };

  cssRules = [
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'postcss-loader'],
        fallback: 'style-loader'
      })
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
        fallback: 'style-loader'
      })
    }
  ];
} else {

  cssLoaders = {
    'scss': 'vue-style-loader!css-loader!sass-loader',
    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
  };

  cssRules = [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }];
}

const config = {
  entry: entries,
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'assets/js/[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    // 创建 import 或 require 的别名，来确保模块引入变得更简单。
    alias: {
      assets: join(__dirname, '/src/assets'),
      components: join(__dirname, '/src/components'),
      root: join(__dirname, 'node_modules')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: cssLoaders
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      /**
       * https://doc.webpack-china.org/loaders/html-loader/
       * https://github.com/webpack-contrib/html-loader
       */
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      /**
       * https://doc.webpack-china.org/loaders/url-loader/
       * https://github.com/webpack-contrib/url-loader
       */
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/img/[name].[hash:7].[ext]'
          }
        }]
      }
    ].concat(cssRules)
  },
  plugins: [
    // https://webpack.js.org/plugins/module-concatenation-plugin/
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  devServer: {
    port: 8060,
    open: true,
    openPage: 'user/login.html'
  },
  devtool: 'eval-source-map'
  //or devtool: 'inline-source-map'
};

glob.sync('./src/pages/**/*.html').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/app.html')[0];
  config.plugins.push(new HtmlWebpackPlugin(
    {
      filename: chunk + '.html',
      template: path,
      inject: 'body',
      favicon: './src/assets/img/logo.png',
      hash: process.env.NODE_ENV === 'production',
      chunks: ['vendors', chunk]
    }
  ));
});

module.exports = config;

if (isProd) {
  config.output.filename = 'assets/js/[name].[chunkhash].js';
  config.output.chunkFilename = 'assets/js/[id].[chunkhash].js';
  config.devtool = 'source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  config.plugins = (module.exports.plugins || []).concat([
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJSPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extractCSS,
    // extractSASS
    new ExtractTextPlugin({
      filename: 'assets/css/[name].[contenthash].css',
      allChunks: true
    }),
    new OptimizeCSSPlugin(),
    new CommonsChunkPlugin({
      name: 'vendors',
      // filename: 'assets/js/vendors.js',
      chunks: chunks,
      minChunks: chunks.length
    })
  ]);
}


