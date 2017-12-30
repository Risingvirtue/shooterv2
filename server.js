var express = require('express');
var app = express();
var path = require('path');
var server = app.listen('3000');
var socket = require('socket.io');
var io = socket(server);

var spawn = require('./helper/spawn.js');
io.sockets.on('connection', newConnection);

app('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/home.html'));
});

function newConnection(socket) {
	console.log('New Connection: ' + socket.id);
	console.log(spawn.spawn());
	
}
