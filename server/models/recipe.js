var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema ({
	name: {type: String, default: ''},
	meal: {type: String, default: ''},
	ingredients: {type: Array, default: []},
	rating: Number,

});

module.exports = mongoose.model('Recipe', RecipeSchema);