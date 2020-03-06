var http = require("http");
var fs = require("fs");
var url=require("url");
 
 
function onRequest(request, response){
 console.log("Request received.");
 response.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});//可以解决跨域的请求
 //response.writeHead(200,{"Content-Type":'application/json',   'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
 //response.write("Hello World 8888\n");

 //ajax的get方法参数直接就在url里 可以直接读取或者使用url模块读取
 //var params=url.parse(request.url,true).query;
 //console.log(params)

 //post方法则需要使用request的监听函数 监听data
 //每次接收到客户端来的数据 就累加到str中保存
 let str='';
 request.on('data',function(chunk){
     str+=chunk;
 });
 //监听到end事件之后就得到了所有传来的参数
 request.on('end',function(){
     console.log(str);
 })

 //下面是发送到客户端的数据
 response.write('this is the message send by nodejs-server');
 response.end();
}
 
http.createServer(onRequest).listen(8888);
 
console.log("Server has started.port on 8888\n");
