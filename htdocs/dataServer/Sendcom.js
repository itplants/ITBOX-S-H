var sys = require('sys')
  , http = require("http")
  , ws = require("node-websocket-server");
var iostat = require('child_process').spawn("sendcom", ["-e A"]);
var httpServer = http.createServer();
var server = ws.createServer({}, httpServer);

function format (data) {
// JSON形式にOutputを変換するコード
}

// Handle WebSocket Requests
server.addListener("connection", function(conn){
  server.send(conn.id, "Connected as: "+conn.id);
  iostat.stdout.on('data', function (data) {
    server.send(conn.id, format(data));
  });
});
server.addListener("close", function(conn){
  sys.log("closed connection: "+conn.id);
});
server.listen(8101,'edison.local');
