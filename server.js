'use strict';

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');

//modules to store session
var session = require('express-session');
var MongoStore =require('connect-mongo')(session);

var routes = require('./server/routes/index');
var recipes = require('./server/routes/recipes');
var users = require('./server/routes/users');

//configuration file
var config = require('./server/config/config.js');
//use config to connect to the database and check for errors
mongoose.connect(config.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {"Hello Mongoose"});

var app = express();

// passport config
require('./server/config/passport')(passport);

//var server = require('http').createServer(app);
//var io = require('socket.io').listen(server);

//view engine set up
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');


app.use(favicon());
app.use(logger('dev'));
//use body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//static assets? app.use?
app.use(express.static(path.join(__dirname, 'public')));

//required for passport secret for session
app.use(session({
	secret: 'sometextgohere',
	saveUninitialized: true,
	resave: true,
	//store session on MongoDV using express-session ++ connect mongo
	store: new MongoStore({
		url: config.url,
		collection: 'sessions'
	})
}));

//flash warning messages
app.use(flash());

//init passport auth
app.use(passport.initialize());
//persistent login sessions
app.use(passport.session());

//set routes
app.use('/', routes);
app.use('/recipes', recipes);
//app.use('/users', users);


//Catch 404 errors
app.use(function(req, res, next) {
	var err = new Error('not Found');
	err.status = 404;
	next(err);
});

//DEV error handler
//will print a stack trace
if (app.get('env') == 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

//production error handler
//no stack traces
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


//old route
/*app.get('/', function(req, res) {
	res.sendFile('./public/index.html');
});*/


module.exports = app;

app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port '+server.address().port);
});


//tutorial has a different port setup
/*
var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port '+server.address().port);
});

OLD SETUP
app.listen(8080, function() {
	console.log("The server is running on port 8080.");
});
*/