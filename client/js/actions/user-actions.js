import Services from '../utils/services';
import {Actions} from '../utils/constants';

/**
 * Authenticate user
 * 
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

export function logout() {
    return function (dispatch) {
        dispatch(requestLogout());
        return Services.login(username, password).then(user => {
            dispatch(receiveLogout(user))
        }).catch(error => {
            dispatch(receiveLogoutError(error));
        });
    }
}

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