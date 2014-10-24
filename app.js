var express  = require('express'),
	app		 = express(),
	http	 = require('http'),
	path 	 = require('path'),
	server	 = http.createServer(app).listen(8000);

var	emotions = require('./emotions');

app.use(express.static(path.join(__dirname, 'dist')));
app.use(emotions);