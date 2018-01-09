var socket;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var direction = {up: false, left: false, right: false, down: false};
var r = 10;
var maxSpeed = 2;
var speedX = 0; var speedY = 0;
var x;
var y;
$(document).ready(function() {
	fitToContainer(canvas);
	socket = io.connect('http://localhost:3000');
	socket.on('spawn', spawn);
	socket.emit('spawn', {});
	socket.on('draw', drawShooter);
	//update();
	
});


function fitToContainer(canvas){
	// Make it visually fill the positioned parent
	canvas.style.width ='100%';
	canvas.style.height='100%';
	// ...then set the internal size to match
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	canvas.height = Math.floor($(window).height() * 2 / 3);
}

function spawn(data) {
	x = data.x * canvas.width;
	y = data.y * canvas.height;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	ctx.fill();
	ctx.closePath();
}

function drawShooter(data) {
	console.log('weird');
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.arc(data.x, data.y, data.r, 0, Math.PI * 2);
	ctx.fill();
	ctx.closePath();
}

document.body.addEventListener("keydown", function (e) {
	var keyCode = e.keyCode;
	if (keyCode == '87') {
		direction.up = true;
	} else if (keyCode == '68') {
		direction.right = true;
	} else if (keyCode == '83') {
		direction.down = true;
	} else if (keyCode = '65') {
		direction.left = true;
	}
	socket.emit('move', direction);
});

document.body.addEventListener("keyup", function (e) {
	var keyCode = e.keyCode;
	switch (keyCode) {
		case 87:
			direction.up = false;
			break;
		case 68:
			direction.right = false;
			break;
		case 83:
			direction.down = false;
			break;
		case 65:
			direction.left = false;
			break;
	}
	socket.emit('move', direction);
});