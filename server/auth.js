const UserService = require('./services/user');

module.exports = {

    /**
     * Callback for passport js 
     */
    onPassportLocalStrategy: function (username, password, done) {
        UserService.findUser(username, function (user) {
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (user.password !== password) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });
    },

    /**
     * Route Middleware that can be applied to any route that requires user authentication
     */
    routeAuthMiddleware: function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    },

    /**
     * User serialization for passportjs
     */
    serializeUser: function (user, done) {
        done(null, user);
    },

    /**
     * User deserialization for passportjs
     */
    deserializeUser: function (user, done) {
        done(null, user);
    }
}