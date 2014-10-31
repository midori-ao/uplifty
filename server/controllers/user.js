var _ =           require('underscore')
    , User =      require('../models/UserSchema')
    , userRoles = require('../../client/js/routingConfig').userRoles;

module.exports = {
    index: function(req, res) {
        var users = User.find({}, function(err,users){
            if (err) return next(err);
            _.each(users, function(user) {
                delete user.password;
                // delete user.facebook;
            });
            res.json(users);
        });
    }
};