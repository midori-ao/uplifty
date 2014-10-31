var mongoose = require('mongoose'),
	Config   = require('../../config/config.js');

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL || Config.mongo.address ||
  'mongodb://localhost/uplifty';

mongoose.connect(mongoUri);

//user
var schema = new mongoose.Schema({
	id: 		{ type: String },
	username:	{ type: String, required:true, unique:true, index: true },
	password:	{ type: String },
	role: 		{}
});

module.exports = mongoose.model('User', schema);