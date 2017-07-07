const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const delay = require('express-delay');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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

app.use(cookieParser());
app.use(session({name: 'asg.sid', secret: 'asg1234', resave: false, saveUninitialized: false, cookie: {}}));
app.use(bodyParser.urlencoded({extended: false}));
passport.use(new LocalStrategy(Auth.onPassportLocalStrategy));
passport.serializeUser(Auth.serializeUser);
passport.deserializeUser(Auth.deserializeUser);
app.use(passport.initialize());
app.use(passport.session());

if (!isDeveloping) {
    Logger.info('initializing server in production mode');
    app.use('/build', express.static('build')); // on production mode, serve the generated build folder
} else {
    app.use(delay(1000));
    Logger.info('initializing server in development mode');
}

app.use('/', IndexRouter);
app.use('/api/v1', ApiRouter);


app.listen(port, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
    }
    console.info('==> Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});