var express = require('express'),
	api 	= express.Router(),
	User 	= require('../models/User.js').User;


api.post('/createUser', function(req,res){
    var data = req.body;
    console.log('sup');

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

module.exports = api;