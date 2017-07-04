module.exports = {
    findUser: function(username, callback) {
        // TODO: change this
        if (username === 'admin') {
            return callback({
                id: 'da34ba78b',
                username: 'admin',
                password: 'admin'
            });
        }
        return callback(null);
    }
}