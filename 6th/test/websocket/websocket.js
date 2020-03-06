var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: 8181 });
wss.on('connection', function (ws) {
  console.log('client connected');
  ws.send('hello websockets!');
  ws.on('message', function (message) {
    console.log(message);
  });
  ws.on('close',function(){
    console.log('websocekt close')
  })
});
//websocket
//注意websocket也是服务器
//只需要在本地的文件管理直接打开客户端发送websocket的html文件就可以读到
//如果开一个localhost服务器再打开html也是可行的 但是不能和ws使用同一个端口
//即不能为8181 否则
//会返回什么200 404之类的错误