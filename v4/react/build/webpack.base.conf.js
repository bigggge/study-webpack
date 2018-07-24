/**
 * webpack.base.conf.js
 *
 * @author bigggge(me@haoduoyu.cc)
 * 2018/7/23.
 */

const path = require('path');
const APP_PATH = path.resolve(__dirname, '../app');
const DIST_PATH = path.resolve(__dirname, '../dist');

module.exports = {
  entry: {
    app: './app/index.js',
    vendors: ['react', 'react-dom']
  },
  output: {
    filename: 'js/bundle.js',
    path: DIST_PATH
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        include: APP_PATH
      }
    ]
  }
};