var sys = require('sys');
var fs = require('fs');

var ws = require("websocket.io");

var target = process.argv[2];

console.log("file = ",target);

var server=ws.listen(8100,
  function () {
    console.log("ws start");
  }
);

console.log("file2 = ",target);

server.on("connection",
  function(socket) {
    socket.on("message",
      function(data) {
        console.log("message " + data);
        server.clients.forEach(
          function(client) {
            client.send(data);
          }
        );
      }
    );
  }
);


console.log("file3 = ",target);

server.addListener("connection", function(connection){
	readFile();
	fs.watchFile(target,readFile);
});

function readFile(curr,prev) {
	fs.readFile(target,'UTF-8', function(err,data) {
	sys.log("data "+data);
        server.clients.forEach(
          function(client) {
            client.send(data);
          }
        );
	});
}
