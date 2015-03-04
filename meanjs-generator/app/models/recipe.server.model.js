'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Recipe Schema
 */
var RecipeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Recipe name',
		trim: true
	},
	description: {
		type: String,
		default: '',
	},
	mealType: {
		type: String,
		default: '',
	},
	totalTime: {
		type: String,
		default: '',
	},
	ingredients: {
		type: String,
		default: '',
		required: 'Please list the ingredients.'
	},
	steps: {
		type: String,
		default: '',
		required: 'Please list how to make this recipe.'
	},
	created: {
		type: Date,
		default: Date.now
	},
	isPrivate: {
		type: Boolean,
		default: false,
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Recipe', RecipeSchema);