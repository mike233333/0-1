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
//注意websocket也是服务器 不需要再开一个http的服务器了
//只需要在本地的文件管理直接打开客户端发送websocket的html文件就可以读到
//如果开一个localhost会和websocket堵塞 毕竟这也是服务器
//会返回什么200 404之类的错误