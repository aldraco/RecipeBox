var express = require('express');
var router = express.Router();
var passport = require('passport');
//var Recipe = require('/server/models/recipe');
var mongoose = require('mongoose');
var User = require('../models/user');
var users = require('../controllers/users.js');


//user must be logged in to see this page.
router.get('/profile/:user_id', isLoggedIn, users.profile);
router.get('/editprofile', isLoggedIn);
router.get('/session', isLoggedIn, function(req, res) {
  res.send({
    loginStatus: true,
    user: req.user
  });
});

//GET logout route
router.get('/logout', function(req, res) {
	req.logout();
	res.status(200).redirect('/');

});

//login route
router.post('/login', function(req, res, next) {
	passport.authenticate('local-login', function(err, user) {
    if (err) {
    	return next(err); 
    }
    if (!user) { 
    	return res.send({loginStatus: false, msg: 'Unable to login'}, 400); 
    }
    req.logIn(user, function(err) {
      if (err) { 
      	return res.send({msg: 'Error logging in', err: err}, 500); 
      }
      return res.send({loginStatus: true, user: user});
    });
  })(req, res, next);
});

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

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	//if not, send "needs to authenticate" status
	res.sendStatus(401);
}

module.exports = router;
