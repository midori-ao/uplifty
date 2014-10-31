var User
    , _ =               	require('underscore')
    , passport =        	require('passport')
    , LocalStrategy =   	require('passport-local').Strategy
    , check =           	require('validator').check
    , userRoles =       	require('../../client/js/routingConfig').userRoles
    , bcrypt 			= 	require('bcrypt-nodejs')
    , User =                require('./mongo');

module.exports = {
    addUser: function(username, password, role, callback) {
    	User.find({}, function(err, users){
                if (err) return console.log(err);
                var maxid = parseInt(_.max(users, function(user) { return user.id; }).id) + 1 || 1;             
            	User.findOne({'username': username}, function(err, user) {
                    if (user) if (user.username == username)  return callback("UserAlreadyExists");
                    var user2 = {
            			            id:         maxid,
            			            username:   username,
            			            password:   module.exports.generateHash(password),
            			            role:       role
            			        };
                    User.create(user2, function (err) {
            			if (err) return console.log(err);
            			callback(null, user2);
                    });
                });

        });
        
    },


//    findOrCreateOauthUser: function(provider, providerId) {
//        var user = module.exports.findByProviderId(provider, providerId);
//        if(!user) {
//            user = {
//                id: _.max(users, function(user) { return user.id; }).id + 1,
//                username: provider + '_user', // Should keep Oauth users anonymous on demo site
//                role: userRoles.user,
//                provider: provider
//            };
//            user[provider] = providerId;
//            users.push(user);
//        }
//
//        return user;
//   },

    findAll: function() {
    	return User.find({}, function(err, users){
    		if (err) {
    			return next(err);
    		}
    			return users;
    		});
    },

    findById: function(id) {
        return User.findOne({'id' : id}, function(err, users){
    		if (err) {
    			return next(err);
    		}
    			return users;
    		});
    },

    findByUsername: function(username) {
        return User.findOne({'username' : username}, function(err, users){
    		if (err) {
    			//console.log("from findByusername err:"+err);
    			return next(err);
    			
    		}
    			//console.log("from findByusername user found:"+users);
    			return users;
    		});    },

//   findByProviderId: function(provider, id) {
//       return _.find(users, function(user) { return user[provider] === id; });
//   },

	generateHash: function(password){
    	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },

    validPassword: function(password, hashed) {
    	return bcrypt.compareSync(password, hashed);
	},

    validate: function(user) {
        check(user.username, 'Username must be 1-20 characters long').len(1, 20);
        check(user.password, 'Password must be 5-60 characters long').len(5, 60);
        check(user.username, 'Invalid username').not(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);

        // TODO: Seems node-validator's isIn function doesn't handle Number arrays very well...
        // Till this is rectified Number arrays must be converted to string arrays
        // https://github.com/chriso/node-validator/issues/185
        var stringArr = _.map(_.values(userRoles), function(val) { return val.toString();});
        check(user.role, 'Invalid user role given').isIn(stringArr);
    },

    localStrategy: new LocalStrategy(
        function(username, password, done) {

            
            var users = User.findOne({'username' : username}, function(err, users){
                if (err) {
                    //console.log("from findByusername err:"+err);
                    return done(err);
                }                
                if(!users) {
                    //console.log("Incorrect username.");
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if(!module.exports.validPassword(password , users.password)) {
                    //console.log("Incorrect password."+users.password);
                    return done(null, false, { message: 'Incorrect password.' });
                }
                else {
                    //console.log(users);
                    return done(null, users);
                }
            });   
            

        }
    ),

    // twitterStrategy: function() {
    //     if(!process.env.TWITTER_CONSUMER_KEY)    throw new Error('A Twitter Consumer Key is required if you want to enable login via Twitter.');
    //     if(!process.env.TWITTER_CONSUMER_SECRET) throw new Error('A Twitter Consumer Secret is required if you want to enable login via Twitter.');

    //     return new TwitterStrategy({
    //         consumerKey: process.env.TWITTER_CONSUMER_KEY,
    //         consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    //         callbackURL: process.env.TWITTER_CALLBACK_URL || 'http://localhost:8000/auth/twitter/callback'
    //     },
    //     function(token, tokenSecret, profile, done) {
    //         var user = module.exports.findOrCreateOauthUser(profile.provider, profile.id);
    //         done(null, user);
    //     });
    // },

    // facebookStrategy: function() {
    //     if(!process.env.FACEBOOK_APP_ID)     throw new Error('A Facebook App ID is required if you want to enable login via Facebook.');
    //     if(!process.env.FACEBOOK_APP_SECRET) throw new Error('A Facebook App Secret is required if you want to enable login via Facebook.');

    //     return new FacebookStrategy({
    //         clientID: process.env.FACEBOOK_APP_ID,
    //         clientSecret: process.env.FACEBOOK_APP_SECRET,
    //         callbackURL: process.env.FACEBOOK_CALLBACK_URL || "http://localhost:8000/auth/facebook/callback"
    //     },
    //     function(accessToken, refreshToken, profile, done) {
    //         var user = module.exports.findOrCreateOauthUser(profile.provider, profile.id);
    //         done(null, user);
    //     });
    // },

    // googleStrategy: function() {

    //     return new GoogleStrategy({
    //         returnURL: process.env.GOOGLE_RETURN_URL || "http://localhost:8000/auth/google/return",
    //         realm: process.env.GOOGLE_REALM || "http://localhost:8000/"
    //     },
    //     function(identifier, profile, done) {
    //         var user = module.exports.findOrCreateOauthUser('google', identifier);
    //         done(null, user);
    //     });
    // },

    // linkedInStrategy: function() {
    //     if(!process.env.LINKED_IN_KEY)     throw new Error('A LinkedIn App Key is required if you want to enable login via LinkedIn.');
    //     if(!process.env.LINKED_IN_SECRET) throw new Error('A LinkedIn App Secret is required if you want to enable login via LinkedIn.');

    //     return new LinkedInStrategy({
    //         consumerKey: process.env.LINKED_IN_KEY,
    //         consumerSecret: process.env.LINKED_IN_SECRET,
    //         callbackURL: process.env.LINKED_IN_CALLBACK_URL || "http://localhost:8000/auth/linkedin/callback"
    //       },
    //        function(token, tokenSecret, profile, done) {
    //         var user = module.exports.findOrCreateOauthUser('linkedin', profile.id);
    //         done(null,user); 
    //       }
    //     );
    // },


    serializeUser: function(user, done) {
        done(null, user.id);
    },

    deserializeUser: function(id, done) {
        var user = User.findOne(id, function(err, user){

        if(user)    { done(null, user); }
        else        { done(null, false); }
        });
    }
};