/**
 * General utility functions
 * 
 */
const Tools = {

    /**
     * Executes callback if user has active session
     * Compares user redux states to verify if it is valid
     * 
     * @param {Function} callback 
     * @param {Object} user
     * @param {Object} nextUserState 
     */
    doIfLogged(callback, user, nextUserState = null) {
        if (!nextUserState && user.isUserLogged) {
            return callback();
        }
        if (!nextUserState) {
            return;
        }
        if (nextUserState.isUserLogged && nextUserState.isUserLogged !== user.isUserLogged) {
            return callback();
        }
    }

};

export default Tools;