var express  		    = require('express'),
    http	 		      = require('http'),
    path 	 		      = require('path'),
    mongoose 		    = require('mongoose'),
    passport		    = require('passport'),
    morgan 			    = require('morgan'),
    bodyParser 		  = require('body-parser'),
    methodOverride  = require('method-override'),
    cookieParser    = require('cookie-parser'),
    cookieSession 	= require('cookie-session'),
    session 		    = require('express-session'),
    redis 			    = require('redis'),
    RedisStore 		  = require('connect-redis')(session),
    csrf 			      = require('csurf');

var Config = require('./config/config.js');
var app = module.exports = express();


//mongo
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL || Config.mongo.address ||
  'mongodb://localhost/uplifty';

mongoose.connect(mongoUri);

//models
var User = require('./server/api/User.js');

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

var env = process.env.NODE_ENV || 'development';
if ('development' === env || 'production' === env) {
    app.use(csrf());
    app.use(function(req, res, next) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        next();
    });
}

//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.localStrategy);
// passport.use(User.facebookStrategy());
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

//routes
require('./server/routes.js')(app);

var port = Number(process.env.PORT || 8000);
app.listen(port, function() {
  console.log("Listening on " + port);
});