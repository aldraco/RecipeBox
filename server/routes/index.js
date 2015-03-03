var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res) {
	res.render('index.ejs');
});


//user must be logged in to see this page.
router.get('/profile', isLoggedIn, function(req, res) {
	if (err) {
		console.log("cannot get profile because of error");
		res.send(err);
	}
	res.render('profile.ejs', {
		user: req.user
	});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	//if not, go default route
	console.log("please login");
	res.redirect('/login')
}


//GET logout route
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

//login page
router.get('/login', function(req, res) {
	res.render('login.ejs', {message: req.flash('loginMessage')});
});
router.post('/login', passport.authenticate('local-login', {
	//succes, goto profile page, fail goto lgoin page
	successRedirect: '/profile',
	failureRedirect: '/login',
	failureFlash: true
}));

//sigup page
router.get('/signup', function(req, res) {
	res.render('signup.ejs', { message: req.flash('signupMessage')
});
});

router.post('/signup', passport.authenticate('local-signup', {
	//success goto profile page, fail to go signup page
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true
}));


module.exports = router;
