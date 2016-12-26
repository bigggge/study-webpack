/**
 * webpack.config.js
 *
 * Created by xiepan on 2016/11/22 上午9:53.
 */

module.exports = {

    // 配置如何生成Source Maps
    // 详见：https://webpack.js.org/configuration/devtool/
    devtool: 'eval-source-map',
    // 入口文件
    entry: __dirname + "/app/main.js",
    output: {
        // 打包后的文件存放的地方
        path: __dirname + "/public",
        // 打包后输出文件的文件名
        filename: "bundle.js"
    },


    module: {
        loaders: [
            {
                // 一个匹配 loader 所处理的文件的拓展名的正则表达式
                test: /\.json$/,
                // loader 的名称
                loader: 'json'
            },
            {
                test: /\.js$/,
                // 屏蔽不需要处理的文件
                exclude: /node_modules/,
                loader: 'babel',
                // 为 loader 提供额外的设置选项
                // query: {
                //     presets: ['es2015', 'react']
                // }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    // 提供本地服务器进行自动刷新
    // 详见：https://webpack.js.org/configuration/dev-server/#devserver
    devServer: {
        contentBase: "./public",
        colors: true,
        historyApiFallback: true,
        // 实时刷新
        inline: true
    }
};