//使用electron
//如果下载太慢 可以直接从淘宝镜像 https://npm.taobao.org/mirrors/electron/ 里下载
//下载zip好之后在项目文件夹node_module的electron文件夹
//新建一个dist文件夹 然后将下载的zip解压到dist里面
//然后再electron目录新建一个path.txt文件 里面写上 electron.exe 就这么多即可

//或者可以使用npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
//将下载源改为淘宝的 并且要将ELECTRON_CUSTOM_DIR改为你要使用的electron版本
//例子如如 npm config set ELECTRON_CUSTOM_DIR=8.1.1

//也可以直接打开config文件一起改
//npm config edit 指令可以打开 .npmrc 文件 也就是总体的config文件
//然后就可以看到下面这一段了
/*
registry=https://registry.npm.taobao.org/
ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
ELECTRON_CUSTOM_DIR=8.1.1
*/

//使用electron要在项目的根目录 不是src 在根目录创建main.js文件
//这个文件的模板可以直接用electron官方文档里的

//大概的模板如下

// 引入electron并创建一个Browserwindow
const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

const pkg = require('./package.json') // 引用package.json 

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow

function createWindow() {
    //创建浏览器窗口,宽高自定义具体大小你开心就好
    mainWindow = new BrowserWindow({ width: 800, height: 600 })

    
    // 加载应用----适用于 react 项目
    //判断是否是开发模式 
    if (pkg.DEV) {
        //这个地址是react的打开路径
        mainWindow.loadURL("http://localhost:3000/")
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, './build/index.html'),
            protocol: 'file:',
            slashes: true
        }))
    }
    // 打开开发者工具，默认不打开
    // mainWindow.webContents.openDevTools()

    // 关闭window时触发下列事件.
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow)

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
    // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
    if (mainWindow === null) {
        createWindow()
    }
})

// 你可以在这个脚本中续写或者使用require引入独立的js文件.  

//关于package.json里面的electron-packager的运行配置
//scripts里面的设置
/*
"scripts": {
    //"ele-start": "electron ."是electron的启动指令
    //注意如果监听地址是loclahost：3000的话
    //需要开两个终端 一个启动react 一个启动electron
    //如果地址是react打包之后的build/index.html文件 那只启动electron即可
    "ele-start": "electron .",

    //package是electron-packager的指令 生成exe文件
    //注意下方--win暂时不知道用处 别的都是关键指令
    //--platform=win32是可用的--platform=darwin无法生成exe文件
    "package": "electron-packager ./build todolist --platform=win32 --arch=x64 --win --out=./dist --overwrite"
}
*/

//关键部分
//关键部分
//在打包指令之前 必须要把main.js和package.json文件复制到bulid文件根目录下
//否则生成的exe文件无法打开 大概是因为build文件夹里面没有配置文件依赖json和main.js入口
//并且main.js文件里面的路径要从'./build/index.html'改成'./index.html'
//因为此时main.js文件已经在build文件夹里了
//如下
/*
mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file:',
    slashes: true
}))
*/