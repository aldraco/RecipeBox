var Recipe = require('../models/recipe');
var express = require('express');
var router = express.Router();			//starts the router
//var path = require('path');

//middleware specific to this router
router.use(function (req, res, next) {
	console.log("All requests go through here");
	next();
});

//these are routes for /recipes
router.route('/')
	.post(function(req, res) {
			//creates a new recipe
		var recipe = new Recipe();
		recipe.name = req.body.name;
		recipe.meal = req.body.meal;
		recipe.rating = req.body.rating;
		recipe.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.json({message: "Recipe posted"});
		});
	})
	//GET fetches the basic recipe BOX, not the profile page but all of the user's recipes
	.get(function(req, res) {
		Recipe.find(function (err, recipes){
			if (err) res.send(err);
			//res.json(recipes);
			res.render('recipebox.ejs');
		});
	});

//middleware for recipe handling

router.route('/recent')
	.get(function(req, res) {
		//returns all recent recipes
		//filter by timestamp
		res.send("Here are some recent recipes");
	});

router.route('/:recipe_id')
	.get(function(req, res) {
	//gets a particular recipe
		Recipe.findById(req.params.recipe_id, function(err, recipe){
			if (err) {
				res.send(err);
			}
		res.json(recipe);
		});
	})
	.put(function(req, res) {
		Speaker.findById(req.params.recipe_id, function(err, recipe) {
			if (err) res.send(err);
			recipe.name = req.body.name;
			recipe.save(function(err) {
				if (err) res.send(err);
				res.json({message: "recipe successfully updated!"})
			});

		});
	})
	.delete(function(req, res) {
		//deletes a particular recipe
		Recipe.remove({
			_id: req.params.recipe_id
		}, function(err, recipe) {
			if (err) res.send(err);
			res.json({message: "record successfully deleted"});
		});
	});


//makes these routes available to the server. Then you have to mount them there, also.
module.exports = router;