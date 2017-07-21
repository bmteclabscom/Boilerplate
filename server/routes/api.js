const express = require('express')
const router = express.Router();
const passport = require('passport');

const Logger = require('../utils/logger.js');
const Auth = require('../auth.js');
const TodosService = require('../services/todos.js');
const PermissionChecker = require('../../shared/permission-checker.js').PermissionChecker;

router.get('/todos/list', [Auth.routeAuthMiddleware, PermissionChecker.middleware('todo', 'read')], function(req, res) {
    // const allowed = PermissionChecker.isAllowed(req.user, 'todo', 'read')); // if not using middleware, method can be called directly
    TodosService.getTodos(todos => res.send({list: todos}));
});

router.post('/todos/add', Auth.routeAuthMiddleware, function(req, res) {
    const todo = req.body;
    TodosService.addTodo(todo, _ => res.send(req.body));
});

router.post('/users/login', passport.authenticate('local'), function (req, res) {  
    res.send(req.user);
});

router.get('/users/check-login', Auth.routeAuthMiddleware, function (req, res) { 
    res.send(req.user);
});

router.post('/users/logout', function(req, res) {
    Logger.info(`${req.user.username} is logging out`);
    req.logOut();
    res.sendStatus(200);
});

module.exports = router;