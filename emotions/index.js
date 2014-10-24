var express		= require('express');
var model		= require('./model');

module.exports	= app = express();

app.get('/emotions',model.getEmotion);