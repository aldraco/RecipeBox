var Recipe = require('../models/recipe');
var express = require('express');
var router = express.Router();			//starts the router
var passport = require('passport');
var recipes = require('../controllers/recipes.js');

//middleware specific to this router
router.use(isLoggedIn);

//function to check if user is logged in

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} 
	//if not, go default route
	res.redirect('login');
}

//these are routes for /recipes
router.route('/')
	.post(recipes.create)

	// User has access to their own recipes through their profile page.
	// This function will eventually allow them to search for recipes across the site.
	.get();

router.route('/:recipe_id')
	.get(recipes.read)
	// this is an edit recipe route
	.post(recipes.update)
	.delete(recipes.delete);

module.exports = router;