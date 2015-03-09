
var mongoose = require('mongoose');
var User = require('../models/user');

exports.edit = function(req, res) {
	console.log("hitting the edit function");
	User.findById(req.params._id, function (err, user) {
		res.render('edit', {
			title: 'Edit Profile',
			user: user
		});
	});
};