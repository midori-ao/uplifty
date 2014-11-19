var bcrypt = require('bcrypt-nodejs'),
    mongoose = require('mongoose'),
    User = require('../models/UserSchema');

exports.register = function (username, password, callback) {
  
  var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

  User.find({}, function(err, users){
                if (err) return console.log(err);             
                User.findOne({'username': username}, function(err, user) {
                    if (user) if (user.username == username)  return callback(null,"UserAlreadyExists");
                    var user2 = {
                                    username:   username,
                                    password:   hash
                                };
                    User.create(user2, function (err) {
                        if (err) return console.log(err);
                        callback(null, user2);
                    });
                });
  });
};