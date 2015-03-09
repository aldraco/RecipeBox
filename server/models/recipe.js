//this is the schema for a recipe

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var recipeSchema = new mongoose.Schema ({
	_creator : { type: Schema.Types.ObjectId, ref: 'User' },
	name: {type: String, default: ''},
	meal: {type: String, default: ''},
	ingredients: String,
	steps: String,
	rating: Number,

});

module.exports = mongoose.model('Recipe', recipeSchema);