const SystemRoles = require('../system-config/system-roles.json');

/**
 * With provided user roles list checks if 
 * resource permission is valid to proceed with an action
 * 
 */
module.exports.PermissionChecker = {

    /**
     * Checks if user is allowed to do something with resource
     * for example, if user A, is allowed to write(action) a book(resource)
     * @param {object} user 
     * @param {string} resource 
     * @param {string|array} actions 
     * 
     * @return {boolean}
     */
    isAllowed: function(user, resource, actions) {
        if (!user.roles || user.roles.length === 0) {
            return false;
        }
        if (typeof actions === 'string') {
            return _isAllowed(user.roles, resource, [actions]);
        }
        if (Array.isArray(actions)) {
            return _isAllowed(user.roles, resource, actions);
        }
        return false;
    },

    /**
     * ExpressJS backend route middleware
     *  
     * @param {string} resource 
     * @param {string|array} actions
     * 
     * @return {function} middleware function
     */
    middleware: function(resource, actions) {
        return (req, res, next) => {
            if (this.isAllowed(req.user, resource, actions)) {
                return next();
            }
            return res.status(401).json({error: 'Authenticated user does not have permissions to access this resource'});
        }
    }

};

 /**
  * Checks if user is allowed to do something with resource
  * for example, if user A roles, are allowed to write(action) a book(resource)
  * @param {Array} userRoles 
  * @param {string} resource 
  * @param {array} actions 
  * 
  * @return {boolean}
  */
const _isAllowed = function(userRoles, resource, actions) {
    const allowedRoles = SystemRoles.filter(role => {
        if (userRoles.indexOf(role.name) != -1) {
            if (role.permissions === '*') {  // verifies if has superadmin permissions
                return true;
            }
            const permissionMatched = role.permissions.filter(permission => permission.resource === resource);
            if (permissionMatched.length) {
                const permission = permissionMatched[0];
                return actions.every(action => permission.actions.indexOf(action) > -1);
            }
            return false;
        }
        return false;
    });
    return allowedRoles.length > 0;
}