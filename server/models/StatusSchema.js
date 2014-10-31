var mongoose = require('mongoose'),
	Config   = require('../../config/config.js');

//status

var StatusSchema = new mongoose.Schema({
	id: 		{},
	author:     {
		id: 	{},
		username: { type: String }
	},
	date: 		{ type: String },
	likes: 		[],
	text:		{ type: String }
});

module.exports = mongoose.model('Status', StatusSchema);