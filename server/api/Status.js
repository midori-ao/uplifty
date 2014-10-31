var _             = require('underscore'),
    check         = require('validator').check,
    userRoles     = require('../../client/js/routingConfig').userRoles,
    Status        = require('../models/StatusSchema');

module.exports = {

    createStatus: function(username, password, role, callback) {
    	Status.find({}, function(err, statuses){
                if (err) return console.log(err);
                var maxid = parseInt(_.max(statuses, function(status) { return status.id; }).id) + 1 || 1;             
            	Status.findOne({'username': username}, function(err, status) {
                    if (user) if (user.username == username)  return callback("UserAlreadyExists");
                    var status2 = {
            			            id:         maxid,
            			            author:     {
                                        id: maxid ,
                                        username: username
                                    },
            			            date:       'test',
            			            likes:      role,
                                    text:       text
            			        };
                    Status.create(status2, function (err) {
            			if (err) return console.log(err);
            			callback(null, status2);
                    });
                });
        });
    },

    findAll: function() {
    	return Status.find({}, function(err, statuses){
    		if (err) {
    			return next(err);
    		}
    			return statuses;
    		});
    },

    findById: function(id) {
        return Status.findOne({'id' : id}, function(err, statuses){
    		if (err) {
    			return next(err);
    		}
    			return statuses;
    		});
    },

    findByUsername: function(username) {
        return Status.findOne({'username' : username}, function(err, statuses){
    		if (err) {
    			//console.log("from findByusername err:"+err);
    			return next(err);
    			
    		}
    			//console.log("from findByusername user found:"+statuses);
    			return statuses;
    		});
    },

    updateStatus: function(status) {

    },

    deleteStatus: function(status) {

    },

    // validate: function(user) {
    //     check(user.username, 'Username must be 1-20 characters long').len(1, 20);
    //     check(user.password, 'Password must be 5-60 characters long').len(5, 60);
    //     check(user.username, 'Invalid username').not(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);

    //     // TODO: Seems node-validator's isIn function doesn't handle Number arrays very well...
    //     // Till this is rectified Number arrays must be converted to string arrays
    //     // https://github.com/chriso/node-validator/issues/185
    //     var stringArr = _.map(_.values(userRoles), function(val) { return val.toString();});
    //     check(user.role, 'Invalid user role given').isIn(stringArr);
    // }
};