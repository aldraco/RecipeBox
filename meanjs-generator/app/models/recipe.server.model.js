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
	tags: {
		type: [String],
		default: []
	},
	timesMade: {
		type: Number,
		default: 0
	},
	totalTime: {
		type: Number,
		default: 0
	},
	reviews: {
		type: [Schema.Types.Mixed],
	},
	photos: {
		type: [String],
	},
	description: {
		type: String,
		default: 'A short description can go here.'
	},
	author: {
		type: String,
		default: ''
	},
	servings: {
		type: Number,
		default: 4
	},
	ingredients: {
		type: [String],
		default: ['Ingredients go here.']
	},
	steps: {
		type: [String],
		default: ['Please explain how to make this recipe.']
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Recipe', RecipeSchema);