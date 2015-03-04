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
	categories: {
		type: [String],
		default: []
	},
	timesMade: {
		type: Number,
		default: 0
	},
	totalTime: {
		type: Schema.Types.Mixed,
		default: 0
	},
	difficulty: {
		type: Number,
		default: 3,
		min: 1,
		max: 5
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
	directions: {
		type: [String],
		default: ['Please explain how to make this recipe.']
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Recipe', RecipeSchema);