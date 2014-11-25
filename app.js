var express  		    = require('express'),
    http	 		      = require('http'),
    path 	 		      = require('path'),
    mongoose        = require('mongoose'),
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
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

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
      // console.log(req.body.role);
      // console.log(username);
      // console.log(password);
      auth.register(username, password, req.body.role, function(err,user){
        console.log(err+' error here');
        // if (err) throw err;

        if (user === "UserAlreadyExists") {
          console.log("COULD NOT REGISTER");
          req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
          done(null, false);
        }

        else {
          console.log(user);
          console.log("REGISTERED: " + user.username);
          req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
          done(null, user);
        }

      });
    }
));

// Use the LocalStrategy within Passport to Register/"signup" users.
passport.use('local-auth', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    // console.log(req.body.role);
    // console.log(username);
    // console.log(password);
    auth.login(username, password, function(err,user){
      if (err) throw err;

      if (user === "UserAlreadyExists") {
        console.log("COULD NOT REGISTER");
        req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
        done(null, false);
      }

      else {
        console.log(user);
        console.log("REGISTERED: " + user.username);
        req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
        done(null, user);
      }

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
  successRedirect: '/success',
  failureRedirect: '/failed'
  })
);

app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/success',
  failureRedirect: '/failed'
  })
  
  // var data = req.body;
  // console.log(data.username + ' ' + data.password);
  // res.send(data.username + ' ' + data.password);
);

app.post('/logout', function(req,res){
  res.send('logout page');
});

app.get('/users', function(req, res){
  res.send('hello world');
});

app.get('/success', function(req,res){
  res.send('it was a success!');
})

app.get('/failed', function(req,res){
  res.send('it faaailed!');
});

var port = Number(process.env.PORT || 8000);
app.listen(port, function() {
  console.log("Listening on " + port);
});