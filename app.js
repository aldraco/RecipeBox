'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(8080, function() {
	console.log("The server is running on port 8080.");
});

//static assets? app.use?
app.use(express.static('public'));

//routes - where does the user go when they visit the app?
//this takes them to an HTML page.
app.get('/', function(req, res) {
	res.sendFile('./public/index.html');
});
