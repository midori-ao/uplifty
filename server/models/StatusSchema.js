var mongoose = require('mongoose');

//status

var statusSchema = new mongoose.Schema({
	author:     {
		id: 	{ type: String },
		username: { type: String }
	},
	date: 		{ type: String },
	category: 	{ type: String },
	text:		{ type: String }
});

statusSchema.set('collection', 'Status');

module.exports = mongoose.model('Status', statusSchema);