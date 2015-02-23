//var recipe = require('../models/recipe');
var express = require('express');
var router = express.Router();			//starts the router

//middleware specific to this router
router.use(function (req, res, next) {
	console.log("All requests go through here");
	next();
});

router.get('/', function(req, res, next) {
	res.send("Hello World.");
	next();
});

//middleware for recipe handling

router.route('/recipes')
	.post(function(req, res) {
		//creates a new recipe
		//saves data
		res.send("new recipe created and saved.");
	})
	.get(function(req, res) {
		//returns all recent recipes
		res.send("Here are some recent recipes");
	});

router.route('/recipes/:recipe_id')
	.put(function(req, res) {
		//edits a reicipe
		res.send("recipe edited.");
	})
	.get(function(req, res) {
		//gets a particular recipe
		res.send("Here is the recipe you requested.");
	})
	.delete(function(req, res) {
		//deletes a particular recipe
		res.send("recipe deleted.");
	});

module.exports = router;