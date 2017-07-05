import Services from '../utils/services';
import {Actions} from '../utils/constants';

/**
 * Get todos
 */
export function getTodos(username, password) {
    return function (dispatch) {
        dispatch(requestTodos());
        return Services.getTodos().then(todos => {
            dispatch(receiveTodos(todos))
        }).catch(error => {
            dispatch(receiveTodosError(error));
        });
    }
}

/**
 * Requesting and Error Actions
 */
export function requestTodos() {
    return {
        type: Actions.REQUESTING_TODOS
    }
}

export function receiveTodos(todos) {
    return {
        type: Actions.RECEIVE_TODOS,
        todos
    }
}

export function receiveTodosError(error) {
    return {
        type: Actions.RECEIVE_TODOS_ERROR,
        error
    }
}