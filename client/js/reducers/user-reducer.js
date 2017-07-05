import {Actions} from '../utils/constants';

/**
 * 
 * User REDUX reducer
 * 
 * @param {*} state 
 * @param {*} action 
 */
function user(state = {}, action) {
    switch (action.type) {
        /**
         * Login Actions
         */
        case Actions.REQUESTING_LOGIN:
            return { 
                ...state,
                isRequestingLogin: true,
                loginError: false
            };
        case Actions.RECEIVE_LOGIN:
            return { 
                ...state,
                isRequestingLogin: false,
                isCheckingAuthentication: false,
                isUserLogged: true
            };
        case Actions.RECEIVE_LOGIN_ERROR:
            return { 
                ...state,
                isRequestingLogin: false,
                loginError: true
            };
        /**
         * Logout Actions
         */
        case Actions.REQUESTING_LOGOUT:
            return { 
                ...state,
                isRequestingLogout: true,
                logoutError: false
            };
        case Actions.RECEIVE_LOGOUT:
            return { 
                ...state,
                isUserLogged: false,
                isRequestingLogout: false,
                isCheckingAuthentication: false
            };
        case Actions.RECEIVE_LOGOUT_ERROR:
            return { 
                ...state,
                isRequestingLogin: false,
                isCheckingAuthentication: false,
                logoutError: true
            };
        /**
         * Request if there is a current authenticated user
         */
        case Actions.REQUESTING_CHECK_AUTHENTICATION:
            return { 
                ...state,
                isCheckingAuthentication: true
            };
    }
    return state;
}

export default user;