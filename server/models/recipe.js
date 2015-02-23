//this is the schema for a recipe

var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema ({
	name: {type: String, default: ''},
	meal: {type: String, default: ''},
	//ingredients: {type: Array, default: []},
	rating: Number,

});

module.exports = mongoose.model('Recipe', recipeSchema);