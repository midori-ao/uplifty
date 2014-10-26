var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

//user
var UserSchema = {
	username:	{ type: String, required:true, unique:true, index: true },
	email:		{ type: String, required:true, unique:true, index: true },
	password:	{ type: String },
	testField: 	{ type: String }
};

var userschema = new mongoose.Schema(UserSchema);
var User = mongoose.model('user', userschema);
module.exports = { User: User };
