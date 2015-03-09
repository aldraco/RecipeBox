var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

//define the schema for our user model
var userSchema = new Schema({
	local: {
		email: String,
		password: String
	},
	username: String,
	facebook: String,
	twitter: String, 
	recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
	profile: {
		username: {type: String, default: 'No username given'},
		bio: String,
		name: String,
		gender: String,
		location: String,
		picture: String, 
		twitterHandle: String
	}

});

//generating a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//validating password
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

//create the model for users and export to app
module.exports = mongoose.model('User', userSchema);

