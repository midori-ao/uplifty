var mongoose = require('mongoose'),
	Config   = require('../../config/config.js');

//status

var StatusSchema = new mongoose.Schema({
	id: 		{ type: Number },
	author:     {
		id: 	{ type: String },
		username: { type: String }
	},
	date: 		{ type: String },
	// likes: 		[],
	category: 	{ type: String },
	text:		{ type: String }
});

module.exports = mongoose.model('Status', StatusSchema);