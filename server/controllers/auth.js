var bcrypt = require('bcrypt-nodejs'),
    mongoose = require('mongoose-q')(),
    User = require('../models/UserSchema'),
    Q = require('q');

exports.register = function (username, password) {
  var deferred = Q.defer(); 
  var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  var user = {
    "username": username,
    "password": hash
  };
  //check if username is already assigned in our database
  User.findOneQ({username: username})
  .then(function (result){ //case in which user already exists in db
    // console.log('result' + result.body);
    console.log(result);
    console.log('username already exists');
    deferred.resolve(false); //username already exists
  })
  .fail(function (result) {//case in which user does not already exist in db
      console.log(result.body);
      if (result.body.message == 'The requested items could not be found.'){
        console.log('Username is free for use');

        user.saveQ()
        .then(function(){
            console.log('user saved!');
            deferred.resolve(user);
        })
        .fail(function (err) {
          console.log("PUT FAIL:" + err.body);
          deferred.reject(new Error(err.body));
        });
      } else {
        deferred.reject(new Error(result.body));
      }
  });

  return deferred.promise;
};