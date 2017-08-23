/**
 * webpack.config.js
 *
 * Created by xiepan on 2016/11/22 上午9:53.
 */
const path = require('path');

module.exports = {

  // 配置如何生成Source Maps
  // 详见：https://webpack.js.org/configuration/devtool/
  devtool: 'eval-source-map',
  // 入口文件
  entry: __dirname + '/app/main.js',
  output: {
    // 打包后的文件存放的地方
    path: __dirname + '/public',
    // 打包后输出文件的文件名
    filename: 'bundle.js'
    // path: path.resolve(__dirname, "dist"),
    // filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        // 屏蔽不需要处理的文件
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  // 提供本地服务器进行自动刷新
  // 详见：https://webpack.js.org/configuration/dev-server/#devserver
  devServer: {
    // contentBase: path.join(__dirname, "public"),
    // contentBase: "./",
    historyApiFallback: true,
    // 实时刷新
    inline: true
  }
};