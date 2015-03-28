var mongoose = require('mongoose');
var _ = require('lodash');
var Recipe = require('../models/recipe');


// Create function for recipes

exports.create = function(req, res) {

	var recipe = new Recipe({});
	recipe = _.extend(recipe, req.body);
	recipe._creator = req.user._id;

	// save the recipe to the user's personal box since they created it
	user.recipes.push(recipe._id);
	
	// save user again to the database
	user.save(function(err) {
		if (err) {
			res.send(err);
		}
	});

	// save the recipe
	recipe.save(function(err) {
		if (err) {
			res.send(err);
		}
		res.json(recipe);
	});
	
};

exports.read = function(req, res) {
	Recipe.findById(req.params.id, function (err, recipe){
	if (err) {
		res.sendStatus(404);
	} else {
		res.json(recipe);
	}		
	});
};

exports.list = function(req, res) {
	// will have a search functionality?
}

exports.getOwnRecipes = function(req, res) {
	Recipe.where('_creator', req.user._id).exec(function (err, recipes){
		if (err) {
			console.log("cannot get recipes because of error");
			res.send(err);
		}			
		res.json(recipes);
	});
}

exports.update = function(req, res) {
	// changes the fields given
	Recipe.findById(req.params.id, function(err, recipe) {
		recipe = _.extend(recipe, req.body);

		recipe.save(function(err) {
			if (err) {
				res.send(err);
			} else {
				res.json(recipe);
			}
		});
	});

};

exports.delete = function(req, res) {
	Recipe.findByIdAndRemove(req.params.id, function(err, recipe) {
		res.json(recipe);
	});
}