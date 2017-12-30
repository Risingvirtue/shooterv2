var express = require('express');
var app = express();
var path = require('path');

var socket = require('socket.io');
var io = socket(server);

app('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/home.html'));
});