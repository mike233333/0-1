//常用webpack模板
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        global: './scripts/global.js'
    },
    output: {
        filename: 'scripts/global_[hash:8].js',
        path: path.resolve(__dirname, './dist'),
    },
    devServer: {
        contentBase: path.resolve(__dirname, './'),
        host: 'localhost',
        port: 8081,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jsx|js)$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'hello world'
        })
    ]
}

//分割线---------------------------------------------------------
//分割线---------------------------------------------------------
//分割线---------------------------------------------------------
//分割线---------------------------------------------------------
//分割线---------------------------------------------------------
//webpack笔记
/*
//总结
webpack中：
module部分的设置是作用到打包的js文件中的
即必须在entry的js文件中import或者require引入要打包的css文件和图片文件 甚至是html文件
然后执行完命令之后 根据设置会单独或者产生多个js文件 以及一个index.html文件
只要打开html文件就可以得到和打包之前相同的效果

而plugin部分的设置是可以做到将css html和图片都分离出来 单独压缩的
执行命令之后的结果是生成你指定的文件目录 可以做到和打包之前一样的数据结构
如js一个文件夹 css一个文件夹 img一个文件夹之类的

const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack=require('webpack');

module.exports = {
    mode: 'development',
    entry: glob.sync('./登陆注册/xx/x.js'),//glob引用所有文件用的是星号*
    //{
    //    'global': './xxxxx/scripts/global.js'
    //},
    output: {
        filename: 'scripts/[name]_[hash:8].js',
        path: path.resolve(__dirname, './dist')
    },
    devServer:{
        host:'localhost',
        hot:true,
        port:8081
    },
    module: {
        rules: [
            {
                //使用style-loader类的话 css文件会直接并入js文件中
                //如果使用minicss插件的话 会生成css文件的压缩版
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
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
        new webpack.HotModuleReplacementPlugin(),
    ]
};
*/

//分割线---------------------------------------------------------
//分割线---------------------------------------------------------
//分割线---------------------------------------------------------
//分割线---------------------------------------------------------
//分割线---------------------------------------------------------
//分割线---------------------------------------------------------
//分割线---------------------------------------------------------
//webpack插件
//
//
//页面自动刷新
//webpack-dev-server本体带有改变js代码自动刷新页面的功能
//可以不用手动刷新页面
//配置方法为在module中加入devServer设置
//其实只需要加contentBase也行了 设置如下
/*
devServer:{
    //打开index的路径名
    contentBase:path.resolve(__dirname,'./'),
    //路径
    host:'localhost',
    //端口
    port:8081,
}
*/
//另外页面自动刷新和热更新页面似乎都需要html页面引用的js是打包出来的那一个
//所以需要配置new HtmlWebpackPlugin模板html页面来自动引用打包后的js
//而且因为热刷新的时候打包完的bundle.js文件是不会实际出现在文件夹里的
//所以只好使用插件模板html页面自动进行引用 也比较方便
//当然也可以主动设置output的fliename 然后html页面手动引用对的js文件名字
//
//
//模块热更新
//表现为不需要刷新页面 而是只渲染js代码改变的一部分
//webpack自带插件webpack.HotModuleReplacementPlugin()
//需要先require进来webpack模块 然后调用
//配置方法为在plugins中加入new webpack.HotModuleReplacementPlugin(),
//然后在devServer中加入hot:true配置
/*
    devServer:{
        //同上
        contentBase:path.resolve(__dirname,'./'),
        host:'localhost',
        port:8081,
        //热更新设定
        hot:true,
        //hotOnly:true设置了之后 页面自动刷新功能关闭 此时只启动模块热加载功能
        //也就是说改变非热加载模块 页面也不会刷新
        //此时无论怎么改index.js页面都不会变
        //如果没有设置 则页面自动刷新正常启用
        hotOnly:true
    },
    plugins:[
        //模块热更新
        new webpack.HotModuleReplacementPlugin(),
        //模板html
        new HtmlWebpackPlugin({
            title:'hello world'
        })
    ]
*/
//然后要在入口的js文件处（一般是index.js）
//添加对于你要模块热更新的js文件(此处为你编写的app的文件 本文件夹的例子是print.js)
//在index.js顶部import引入xxxx.js文件 这个没啥好解释的
//之后在index.js文件中添加下面的代码
/*
if (module.hot) {
    module.hot.accept('./xxxx.js', function() { //告诉 webpack 接受热替换的模块 也就是你要热更新的文件
        console.log('Accepting the updated printMe module!');
        xxxxx();//此处可以调用xxxx.js里面的函数
    })
}
*/
//之后xxxx.js就启动了模块热更新
//而作为入口文件的index.js是没有启动模块热更新的 目前不知道如何对index.js启动该设置
//
//
//package.json的引用指令 页面自动刷新和模块热更新在此的设置相同
//
//下方设置为dev：webpack-dev-server是启动的指令
//
//后来测试了 webpack-dev-server后方不加--open也是可以启动的
//而--open的作用是自动帮你打开html页面
//不加的话就只能自己在地址栏里输入http://localhost:8081/（这里是上边你设置的地址）来打开页面
//后方加什么--inline --hot都没啥用 好像还会让热更新出现问题
/*
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    //下面是启动webpack-dev-server的指令
    "dev":"webpack-dev-server --open"
},
*/
//之后在终端中输入npm run dev回车后即可启动