var passport = require('passport'),
    User     = require('../api/User.js'),
    Status   = require('../api/Status.js');

module.exports = {
    register: function(req, res, next) {
        try {
            User.validate(req.body);
        }
        catch(err) {
            return res.send(400, err.message);
        }

        User.addUser(req.body.username, req.body.password, req.body.role, function(err, user) {
            if(err === 'UserAlreadyExists') return res.send(403, "User already exists");
            else if(err)                    return res.send(500);

            req.logIn(user, function(err) {
                if(err)     { next(err); }
                else        { res.json(200, { "role": user.role, "username": user.username }); }
            });
        });
    },

    login: function(req, res, next) {
        passport.authenticate('local', function(err, user) {

            if(err)     { return next(err); }
            if(!user)   { return res.send(400); }


            req.logIn(user, function(err) {
                if(err) {
                    return next(err);
                }

                if(req.body.rememberme) req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
                res.json(200, { "role": user.role, "username": user.username });
            });
        })(req, res, next);
    },

    logout: function(req, res) {
        req.logout();
        res.send(200);
    },

    createStatus: function(req, res, next) {
        //some auth here..
        var json = req;
        console.log('console out'+json);
        Status.createStatus(req.body.username, req.body.text, function(err, status) {
        // Status.createStatus(function(err, status) {
            if(err) { next(err); }
            res.json(200, { "username": status.author.username, "text": status.text });

            console.log('is this working? i dont know what im doing. what do');
        });

    }
};