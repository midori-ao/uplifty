var express  = require('express'),
	app		 = express(),
	http	 = require('http'),
	path 	 = require('path'),
	mongoose = require('mongoose'),
	server	 = http.createServer(app).listen(8000);

//user
var UserSchema = {
	username:	{ type: String, required:true, unique:true, index: true },
	email:		{ type: String, required:true, unique:true, index: true },
	password:	{ type: String },
	testField: 	{ type: String }
};

var userschema = new mongoose.Schema(UserSchema);
var User = mongoose.model('user', userschema);


//mongo
mongoose.connect('mongodb://localhost/upliftydb');

// var user = require('./api/userProfile');
// app.use('/createUser', user);

app.post('/createUser', function(req,res){
    var data = req.body;
    console.log('sup');

    // if(data){
    //     //some validation here
    // } else {
    //     console.log(error);
    //     return;
    // }

    var createUser = new User(data);
    createUser.username = 'dumb';
    createUser.password = 'dummypassword';
    createUser.email = 'derp';
    createUser.testField = 'test';

    console.log(createUser);
    createUser.save(function(err){
    	res.send(createUser);
    });
});

//local db - move it to mongo
var	emotions = require('./emotions');

//angular app
if (process.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'dist')));
} else {
	app.use(express.static(path.join(__dirname, 'dist')));
}

app.use(emotions);

module.exports = app;