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
	generateSpawn();
	function generateSpawn() {
		console.log('hello');
		var data = spawn.spawn();
		socket.emit('spawn', data);
		players[socket.id] ={socket: socket, player: new Player(data.x, data.y)};
		
	}
	
	socket.on('move', changeDirection);
	function changeDirection(data) {
		
		players[socket.id].player.direction = data;
	}
	setInterval(update, 100);
}

function update() {
	for (s in players) {
		p = players[s].player;
		p.move();
		var data = {x: p.x, y: p.y, r: p.r};
		
		io.sockets.emit('draw', data);
	}
}

function Player(x, y) {
	this.x = x;
	this.y = y;
	this.r = 10;
	this.speedX = 0;
	this.speedY = 0;
	this.maxSpeed = 2;
	this.direction = {up: false, right: false, down: false, left: false};
	this.draw = function() {
		ctx.clearRect(0,0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	}
	
	this.move = function() {
		if (this.direction.right) {
			this.speedX++;
		} else if (this.direction.left) {
			this.speedX--;
		} else {
			this.speedX = 0;
		}
		if (this.direction.up) {
			this.speedY--;
		} else if (this.direction.down) {
			this.speedY++;
		} else {
			this.speedY = 0;
		}
		this.speedX = Math.min(this.speedX, this.maxSpeed); this.speedX = Math.max(this.speedX, -this.maxSpeed);
		this.speedY = Math.min(this.speedY, this.maxSpeed); this.speedY = Math.max(this.speedY, -this.maxSpeed);
		this.x += this.speedX;
		this.y += this.speedY;
	}
}