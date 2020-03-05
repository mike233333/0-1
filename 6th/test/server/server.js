var http = require('http');//引入http模块
var fs = require('fs');

var documentRoot = 'F:/wenjian/js/test';
//开启服务，监听8888端口
//端口号最好为6000以上
var server = http.createServer(function (req, res) {
    /*
      req用来接受客户端数据
      res用来向客户端发送服务器数据
    */
    //创建连接成功显示在后台
    console.log('有客户端连接');

    //客户端输入的url，例如如果输入localhost:8888/index.html
    //那么这里的url == /index.html
    let url = req.url;

    let file = documentRoot + url;
    console.log(url);

    /*
    一参为文件路径
    二参为回调函数
    回调函数的一参为读取错误返回的信息，返回空就没有错误
    二参为读取成功返回的文本内容
    */
    fs.readFile(file, (err, data) => {
        if (err){
            res.writeHead(404,{
                'content-type':'text/html;charset="utf-8"'
            });
            res.write('<h1>404 not found</h1>');
            res.end();
        }else{
            res.writeHead(200,{
                'content-type':'text/html;charset="utf-8"'
            });
            //将index.html显示在客户端
            res.write(data);
            res.end();
        }
    })
}).listen(8888);



console.log('服务器开启成功');