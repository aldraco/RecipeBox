var Recipe = require('../models/recipe');
var express = require('express');
var router = express.Router();			//starts the router
var passport = require('passport');

//middleware specific to this router
router.use(function (req, res, next) {
	next();
});

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
	.post(isLoggedIn, function(req, res) {
			//creates a new recipe
		var user = req.user;
		var recipe = new Recipe({
			name: req.body.name,
			meal: req.body.meal,
			rating: req.body.rating,
			ingredients: req.body.ingredients,
			steps: req.body.steps,
			_creator: user._id
		});
		user.recipes.push(recipe._id);
		user.save(function(err) {
			if (err) {
				res.send(err);
			}
		});
		recipe.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.json({message: "Recipe posted"});
		});
		
	})
	//GET fetches the basic recipe BOX, not the profile page but all of the user's recipes
	.get(isLoggedIn, function(req, res) {
		// this finds all recipes
		Recipe.where('_creator', req.user._id).exec(function (err, recipes){
			if (err) {
				console.log("cannot get recipes because of error");
				res.send(err);
			}			
			//res.json(recipes);
			res.render('recipebox.ejs', {
				user: req.user,
				// find each recipe and send those recipes to the template
				recipes: recipes
			});
		});
	});

router.route('/add')
	.get(function(req, res) {
		res.render('addrecipe.ejs', {
			user: req.user
		})
	});

router.route('/edit')
	.get(function(req, res) {
		// find the recipe specified in the req
		Recipe.findById(req.params.id, function(err, recipe) {
			res.render('editrecipe.ejs', {
				recipe: recipe
			});
		});
	});

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
	// this is an edit recipe route
	.put(function(req, res) {
		Recipe.findById(req.params.recipe_id, function(err, recipe) {
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