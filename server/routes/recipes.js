var Recipe = require('../models/recipe');
var express = require('express');
var router = express.Router();			//starts the router

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
		recipe.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.json({message: "Recipe posted"});
		});
	})
	.get(function(req, res) {
		Recipe.find(function (err, recipes){
			if (err) res.send(err);
			res.json(recipes);
		});
	});

//middleware for recipe handling

router.route('/recent')
	.get(function(req, res) {
		//returns all recent recipes
		res.send("Here are some recent recipes");
	});

router.route(':recipe_id')
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