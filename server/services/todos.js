const todos = require('./todos.json');

module.exports = {
    getTodos: function(callback) {
        // TODO: change this
        return callback(todos);
    }
}