var sys = require('sys');
var fs = require('fs');

var ws = require("websocket.io");

var target = process.argv[2];


var server=ws.listen(8100,'itelepass02.local',
  function () {
    console.log("ws start");
  }
);


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



server.addListener("connection", function(connection){
	readFile();
	fs.watchFile(target,readFile);
});

function readFile(curr,prev) {
	fs.readFile(target,'UTF-8', function(err,data) {
	//sys.log("data changed"+data);
	sys.log("data is updated !!");
        server.clients.forEach(
          function(client) {
            client.send(data);
          }
        );
	});
}
