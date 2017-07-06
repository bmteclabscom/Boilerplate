import {Actions} from '../utils/constants';

/**
 * 
 * Todos REDUX reducer
 * 
 * @param {*} state 
 * @param {*} action 
 */
function todos(state = {}, action) {
    switch (action.type) {
        /**
         * Get todos actions
         */
        case Actions.REQUESTING_TODOS:
            return { 
                ...state,
                isRequestingTodos: true,
                todosRequestError: null
            };
        case Actions.RECEIVE_TODOS:
            return { 
                ...state,
                list: action.todos.list,
                isRequestingTodos: false
            };
        case Actions.RECEIVE_TODOS_ERROR:
            return { 
                ...state,
                isRequestingTodos: false,
                todosRequestError: action.error
            };
    }
    return state;
}

export default todos;