'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// passport config
require('./server/config/passport')(passport);

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

//configuration file
var config = require('./server/config/config.js');

//for Mongoose, database
var mongoose = require('mongoose');
//flash, for passport
var flash = require('connect-flash');
var passport = require('passport');
//modules to store session
var session = require('express-session');
var MongoStore =require('connect-mongo');


/*
I've got an app and a server listening ... which is which? what makes them different?
*/

app.listen(8080, function() {
	console.log("The server is running on port 8080.");
});

//use body parser middleware
app.use(bodyParser());
//flash warning messages
app.use(flash());
//init passport auth
app.use(passport.initialize());
//persistent login sessions
app.use(passport.session());
//required for passport secret for session
app.use(session({
	secret: 'sometextgohere',
	saveUninitialized: true,
	resave: true,
	//store session on MongoDV using express-session ++ connect mongo
	store: new MongoStore({
		url: config.url,
		colection: 'sessions'
	})
}));

//static assets? app.use?
app.use(express.static('public'));

//mounts the recipes router here, and tells the app to use it for routes that start with /recipes
var recipes = require('./server/routes/recipes');
app.use('/recipes', recipes);

//routes - where does the user go when they visit the app?
//this takes them to an HTML page.
app.get('/', function(req, res) {
	res.sendFile('./public/index.html');
});

//view engine set up
var path = require('path');
app.set('views', path.join(__dirname, 'server/views'));




mongoose.connect(config.url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {"Hello Mongoose"});