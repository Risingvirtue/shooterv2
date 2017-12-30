var express = require('express');
var app = express();
var path = require('path');

var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

app('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/home.html'));
});

function newConnection(socket) {
	console.log('New Connection: ' + socket.id);
	
	
}
