import Services from '../utils/services';
import {Actions} from '../utils/constants';

/**
 * Login
 * @param {string} username 
 * @param {string} password 
 */
export function login(username, password) {
    return function (dispatch) {
        dispatch(requestLogin());
        return Services.login(username, password).then(user => {
            dispatch(receiveLogin(user))
        }).catch(error => {
            dispatch(receiveLoginError(error));
        });
    }
}

/**
 * Logout
 */
export function logout() {
    return function (dispatch) {
        dispatch(requestLogout());
        return Services.logout().then(user => {
            dispatch(receiveLogout())
        }).catch(error => {
            dispatch(receiveLogoutError(error));
        });
    }
}

/**
 * Verifies if user is logged
 */
export function checkAuthentication() {
    return function(dispatch) {
        dispatch(requestCheckAuthentication());
        return Services.isAuthenticated()
            .then(user => dispatch(receiveLogin(user)))
            .catch(_ => dispatch(receiveLogout()))
    }
}

/**
 * Requesting and Error Actions
 */
export function requestLogin() {
    return {
        type: Actions.REQUESTING_LOGIN
    }
}

export function requestLogout() {
    return {
        type: Actions.REQUESTING_LOGOUT
    }
}

export function requestCheckAuthentication() {
    return {
        type: Actions.REQUESTING_CHECK_AUTHENTICATION
    }
}

export function receiveLogin(user) {
    return {
        type: Actions.RECEIVE_LOGIN,
        user
    }
}

export function receiveLogout() {
    return {
        type: Actions.RECEIVE_LOGOUT
    }
}

export function receiveLoginError(error) {
    return {
        type: Actions.RECEIVE_LOGIN_ERROR,
        error
    }
}

export function receiveLogoutError(error) {
    return {
        type: Actions.RECEIVE_LOGOUT_ERROR,
        error
    }
}