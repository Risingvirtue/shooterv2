var express = require('express');
var app = express();
var path = require('path');
var server = app.listen('3000');
var socket = require('socket.io');
var io = socket(server);

app.use(express.static('public'));
var spawn = require('./helper/spawn.js');
io.sockets.on('connection', newConnection);

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/home.html'));
});


var players = {};

function newConnection(socket) {
	console.log('New Connection: ' + socket.id);
	socket.on('spawn', generateSpawn);
	function generateSpawn() {
		var data = spawn.spawn();
		socket.emit('spawn', data);
		players[id] ={socket: socket, player: new Player(data.x, data.y)};
	}
	
	socket.on('move', move);
	function move(data) {
		socket.id
	}
	
}


function Player(x, y) {
	this.x = x;
	this.y = y;
	this.direction = {up: false, right: false, down: false, left: false};
	this.draw = function() {
		
	}
}