const passport = require('passport');
const UserService = require('./services/user');
const Logger = require('./utils/logger.js');
const Constants = require('./utils/constants.js');

module.exports = {

    /**
     * Callback for passport js 
     */
    onPassportLocalOrBasicStrategy: function (username, password, done) {
        UserService.findUserByUsername(username, function (user) {
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            Logger.info(`${username} authenticated succesfully`);
            return done(null, user);
        });
    },

    /**
     * Route Middleware that can be applied to any route that requires user authentication
     */
    routeAuthMiddleware: function (req, res, next) {
        if (!req.isAuthenticated()) { // check session authentication first
            passport.authenticate('basic', function(err, user, info) { // check basic authentication
                if (user) { // has basic authentication
                    next();
                } else {
                    Logger.error(`unauthenticated request to ${req.originalUrl}`)
                    res.status(401).json({ error: Constants.HTTP_401_MESSAGE });
                }
            })(req, res, next);
        } else { // has session authentication
            next();
        }
    },

    /**
     * User serialization for passportjs
     */
    serializeUser: function (user, done) {
        done(null, user.id); // stores only user id in memory session
    },

    /**
     * User deserialization for passportjs
     */
    deserializeUser: function (userId, done) {
        UserService.findUserById(userId, user => done(null, user)); // retrieves user from storage
    }
}