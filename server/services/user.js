
const user = { // TODO: remove this, just for sample
    id: 'da34ba78b',
    firstName: 'John',
    lastName: 'Doe',
    username: 'admin@domain.com',
    validPassword: function(password) {
        return password === 'admin';
    }
}

module.exports = {

    /**
     * Finds user by user id
     */
    findUserById: function(id, callback) {
        // TODO: change this
        if (id === user.id) {
            return callback(user);
        }
        return callback(null);
    },

    /**
     * Finds user by username/email
     */
    findUserByUsername: function(username, callback) {
        // TODO: change this
        if (username === user.username) {
            return callback(user);
        }
        return callback(null);
    }
}