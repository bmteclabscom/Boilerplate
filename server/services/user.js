module.exports = {
    findUser: function(username, callback) {
        // TODO: change this
        if (username === 'admin@domain.com') {
            return callback({
                id: 'da34ba78b',
                firstName: 'John',
                lastName: 'Doe',
                username: 'admin@domain.com',
                validPassword: function(password) {
                    return password === 'admin';
                }
            });
        }
        return callback(null);
    }
}