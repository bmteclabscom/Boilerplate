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
        case Actions.REQUESTING_LOGIN:
            return { 
                ...state,
                isRequestingLogin: true
            };
        case Actions.RECEIVE_LOGIN:
            return { 
                ...state,
                isRequestingLogin: false
            };
        case Actions.RECEIVE_LOGOUT:
            return { 
                ...state,
                isRequestingLogin: true
            };
    }
    return state;
}

export default user;