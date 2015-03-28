var mongoose = require('mongoose');
var _ = require('lodash');
var User = require('../models/user');

exports.profile = function(req, res) {
	User.findById(req.params.user_id).populate('recipes').exec(function(err, user) {
		if (err) {
			return res.send(err);
		}
		if (!user) {
			res.sendStatus(404);
		}

		var o = {
			email: user.local.email,
			profile: user.profile,
			recipes: user.recipes
		};
		res.json(o);
	});
};

exports.addRecipe = function(req, res) {
	// users add recipes from the recipe page itself

	var recipe_id = req.params.recipe_id;

	User.findById(req.user._id, function(err, user) {
		user.recipes.push(recipe_id);
		user.save(function(err) {
			if (err) {
				return done(err);
			} else {
				res.json(user);
			}
		});
	});

};

exports.setupProfile = function(req, res) {
	// ask user to pick a username
	
}