var mongoose = require('mongoose'),
	Config   = require('../../config/config.js');

//status

var StatusSchema = new mongoose.Schema({
	id: 		{ type: String },
	author:     {
		id: 	{},
		username: { type: String }
	},
	date: 		{ type: Date, default: Date.now },
	likes: 		[],
	text:		{ type: String }
});

module.exports = mongoose.model('Status', StatusSchema);