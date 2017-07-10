const todos = require('./todos.json'); // TODO: remoe this, using json just for sample

module.exports = {
    
    addTodo: function(todo, callback) {
        // TODO: change this to a real db call
        const newTodo = Object.assign(todo, {id: todos.length, done: false});
        todos.push(newTodo);
        callback(newTodo);
    },
    
    getTodos: function(callback = function() {}) {
        // TODO: change this to a real db call
        callback(todos);
    }
}