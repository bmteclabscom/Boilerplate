const express = require('express')
const router = express.Router();
const passport = require('passport');

const Auth = require('../auth.js');

router.get('/todos', Auth.routeAuthMiddleware, function(req, res) {
    res.send({todos: []});
});

router.post('/login', passport.authenticate('local'), function (req, res) {  
    res.send(req.user);
});

router.post('/logout', function(req, res){
    req.logOut();
    res.sendStatus(200);
});

module.exports = router;