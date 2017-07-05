const express = require('express')
const router = express.Router();
const passport = require('passport');

const Logger = require('../utils/logger.js');
const Auth = require('../auth.js');
const TodosService = require('../services/todos.js');

router.get('/todos/list', Auth.routeAuthMiddlewareWithLog, function(req, res) {
    TodosService.getTodos(function(todos) {
        res.send({list: todos});
    })
});

router.post('/user/login', passport.authenticate('local'), function (req, res) {  
    res.send(req.user);
});

router.get('/user/check-login', Auth.routeAuthMiddleware, function (req, res) {  
    res.send(req.user);
});

router.post('/user/logout', function(req, res) {
    Logger.info(`${req.user.username} is logging out`);
    req.logOut();
    res.sendStatus(200);
});

module.exports = router;