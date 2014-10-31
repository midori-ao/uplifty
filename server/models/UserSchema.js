var mongoose = require('mongoose'),
	Config   = require('../../config/config.js');

//user
var UserSchema = new mongoose.Schema({
	id: 		{ type: String },
	username:	{ type: String, required:true, unique:true, index: true },
	password:	{ type: String },
	role: 		{},
	categories: [],
	email: 		{ type: String },
	profile: 	{ type: String }
});

module.exports = mongoose.model('User', UserSchema);