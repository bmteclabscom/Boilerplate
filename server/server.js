const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const SessionFileStore = require('session-file-store')(session);
const express = require('express');
const exphbs = require('express-handlebars');
const delay = require('express-delay');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const IndexRouter = require('./routes/index.js');
const ApiRouter = require('./routes/api.js');
const Auth = require('./auth.js');
const Logger = require('./utils/logger.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

const hbs = exphbs.create({
    helpers: {
        getStaticAsset: function (path) { 
            // on dev mode, use the webpack server
            return isDeveloping ? `http://localhost:3001/${path}` : path;
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

if (!isDeveloping) { // use memory session on prod
    app.use(session({name: 'asg.sid', secret: 'asg1234', resave: false, saveUninitialized: false, cookie: {}}));
} else { // use file session on dev so if server is reloaded with changes session is not lost
    app.use(session({store: new SessionFileStore, secret: 'asg1234', resave: true, saveUninitialized: true}));
}

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
passport.use(new LocalStrategy(Auth.onPassportLocalOrBasicStrategy));
passport.use(new BasicStrategy(Auth.onPassportLocalOrBasicStrategy));
passport.serializeUser(Auth.serializeUser);
passport.deserializeUser(Auth.deserializeUser);
app.use(passport.initialize());
app.use(passport.session());

if (!isDeveloping) {
    Logger.info('initializing server in production mode');
    app.use('/build', express.static('build')); // on production mode, serve the generated build folder
} else {
    app.use(delay(600));
    Logger.info('initializing server in development mode');
}

app.use('/', IndexRouter);
app.use('/api/v1', [ApiRouter, function errorMiddleware(error, req, res, next) {
    if (error) {
        Logger.error(error.stack);
        return res.status(500).json({error: 'There was a problem in the API'});
    }
    return next();
}]);


app.listen(port, '0.0.0.0', function (error) {
    if (error) {
        Logger.error(error);
    }
    console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});