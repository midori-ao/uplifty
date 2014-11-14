var express  		    = require('express'),
    http	 		      = require('http'),
    path 	 		      = require('path'),
    mongoose 		    = require('mongoose'),
    passport		    = require('passport'),
    LocalStrategy   = require('passport-local'),
    morgan 			    = require('morgan'),
    bodyParser 		  = require('body-parser'),
    methodOverride  = require('method-override'),
    cookieParser    = require('cookie-parser'),
    cookieSession 	= require('cookie-session'),
    session 		    = require('express-session'),
    redis 			    = require('redis'),
    RedisStore 		  = require('connect-redis')(session);

var Config = require('./config/config.js');
var app = module.exports = express();
var auth = require('./server/controllers/auth');


//mongo
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL || Config.mongo.address ||
  'mongodb://localhost/uplifty';

mongoose.connect(mongoUri);

//models
// var User = require('./server/api/User.js');

app.set('views', __dirname + '/client/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'client')));

//redis session cookie
app.use(cookieParser());
app.use(session({
  store: new RedisStore({
    host: Config.redis.host,
    port: Config.redis.port,
    pass: Config.redis.pass
  }),
  secret: '1234567890QWERTY'
}));

// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

// Use the LocalStrategy within Passport to Register/"signup" users.
passport.use('local-register', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    auth.register(username, password)
    .then(function (user) {
      if (user) {
        console.log("REGISTERED: " + user.username);
        req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        // console.log("COULD NOT REGISTER");
        req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));

// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please sign in!';
  res.redirect('/signin');
}

app.post('/register', passport.authenticate('local-register', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

app.post('/login', function(req,res){
  var data = req.body;
  console.log(data.username + ' ' + data.password);
  res.send(data.username + ' ' + data.password);
});

app.post('/logout', function(req,res){
  res.send('logout page');
});

app.get('/users', function(req, res){
  res.send('hello world');
});

app.get('/*', function(req,res){
  res.send('any page');
});

// //passport
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(User.localStrategy);
// // passport.use(User.facebookStrategy());
// passport.serializeUser(User.serializeUser);
// passport.deserializeUser(User.deserializeUser);

// //routes
// require('./server/routes.js')(app);

var port = Number(process.env.PORT || 8000);
app.listen(port, function() {
  console.log("Listening on " + port);
});