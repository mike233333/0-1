
//总结
/*
webpack中：
module部分的设置是作用到打包的js文件中的
即必须在entry的js文件中import或者require引入要打包的css文件和图片文件 甚至是html文件
然后执行完命令之后 根据设置会单独或者产生多个js文件 以及一个index.html文件
只要打开html文件就可以得到和打包之前相同的效果

而plugin部分的设置是可以做到将css html和图片都分离出来 单独压缩的
执行命令之后的结果是生成你指定的文件目录 可以做到和打包之前一样的数据结构
如js一个文件夹 css一个文件夹 img一个文件夹之类的
*/

const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: //glob.sync('./xxxx/**/*.js'),
    {
        'global': './xxxxx/scripts/global.js'
    },
    output: {
        filename: 'scripts/[name]_[hash:8].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                //使用style-loader类的话 css文件会直接并入js文件中
                //如果使用minicss插件的话 会生成css文件的压缩版
                test: /\.css$/,
                use: [/*MiniCssExtractPlugin.loader*/ 'style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [/*MiniCssExtractPlugin.loader*/ 'style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options:{
                            //[hash:5]是指在文件名末尾加上五位的哈希码
                            //[ext]则是自适应目标的后缀名
                            name:'[name][hash:5].[ext]',
                            outputPath:'./image'
                        }
                    }
                ]
            },
            {
                test: /\.(jsx|js)$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            //template是模板的html 一般啥都没有
            template: './xxxxx/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            chunks: ['global']
        }),
        new MiniCssExtractPlugin({
            filename: 'style/[name].css'
        }),
    ]
};
