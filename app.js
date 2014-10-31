var express  		= require('express'),
	http	 		= require('http'),
	path 	 		= require('path'),
	mongoose 		= require('mongoose'),
	passport		= require('passport'),
	morgan 			= require('morgan'),
    bodyParser 		= require('body-parser'),
    methodOverride  = require('method-override'),
    cookieParser    = require('cookie-parser'),
    cookieSession 	= require('cookie-session'),
    session 		= require('express-session'),
    redis 			= require('redis'),
    RedisStore 		= require('connect-redis')(session),
    csrf 			= require('csurf');

var Config = require('./config/config.js');
var app = module.exports = express();

//models
var User = require('./server/models/User.js');

//passport integration
app.set('views', __dirname + '/client/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'client')));

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

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.localStrategy);
// passport.use(User.facebookStrategy());

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

//routes
require('./server/routes.js')(app);

// //move to another folder
// app.post('/createUser', function(req,res){
//     var data = req.body;
//     console.log('sup');

//     var createUser = new User(data);
//     createUser.username = 'dumb';
//     createUser.password = 'dummypassword';
//     createUser.email = 'derp';
//     createUser.testField = 'test';

//     console.log(createUser);
//     createUser.save(function(err){
//     	res.send(createUser);
//     });
// });

// //angular app
// if (process.NODE_ENV === 'production') {
// 	app.use(express.static(path.join(__dirname, 'dist')));
// } else {
// 	app.use(express.static(path.join(__dirname, 'dist'))); //src, but dist for now as it's not working correctly
// }

app.set('port', process.env.PORT || 8000);
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});