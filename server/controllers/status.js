var _ =           require('underscore')
    , Status =      require('../models/StatusSchema')
    , userRoles = require('../../client/js/routingConfig').userRoles;

module.exports = {
    index: function(req, res) {
        var statuses = Status.find({}, function(err,statuses){
            if (err) return next(err);
            res.json(statuses);
        });
    }
};