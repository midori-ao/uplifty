var express		= require('express');
var bodyParser	= require('body-parser'),
	model		= require('./model');

module.exports	= app = express();

// app.use(bodyParser.json());
app.get('/emotions',model.getEmotion);