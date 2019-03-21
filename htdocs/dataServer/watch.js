#!/usr/bin/env node
var fs   = require('fs');
var http = require('http');
var md   = require('markdown');

var server = http.createServer();

var target = process.argv[2];
	if (! target) {
    	console.error('usage: ' + process.argv.join(' ') + ' <filename>');
   	process.exit(1);
	}

server.on('request', doRequest);
server.listen(3000,'edison.local');
console.log('http://edison.local:3000');

// リクエストの処理
   function doRequest(req, res) {
    fs.readFile('./d3g.html', 'UTF-8',
        function(err, html) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        });
 }


var io = require('socket.io').listen(server);
io.sockets.on("connection", function (socket) {
   socket.on("connected", function (name) {
    io.sockets.emit("publish", {value: data.value});
  });
  socket.on("publish", function (data) {
    io.sockets.emit("publish", {value:data.value});
  });
 socket.on("disconnect", function () {
    if (userHash[socket.id]) {
      delete userHash[socket.id];
      io.sockets.emit("publish", {value: data.value});
    }
  });
});

/*
var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(
        '<!DOCTYPE html><html><head><script type="text/javascript" 
	src="/socket.io/socket.io.js"></script>' +
        '<script type="text/javascript">
	var socket = io.connect();
	socket.on("change", 
	function (html) { 
		document.getElementById("preview").innerHTML = html; 
	});
	</script>' +
        '</head><body><div id="preview"></div></body></html>'
    );
});
server.listen(3000);
*/

var iof = require('socket.io').listen(server);
  fs.stat(target, function (err, stat) {
    if (err) { throw err; }
    if(! stat.isFile()) {
        console.error(target + ' is not file');
        process.exit(1);
    }

    fs.watchFile(target, { interval: 500 }, function (curr, prev) {
        fs.readFile(target, 'utf8', function (err, text) {
            if (err) { throw err; }

//            iof.sockets.emit('change', md.parse(text));

		console.log('data changed');
        });
    });
});
