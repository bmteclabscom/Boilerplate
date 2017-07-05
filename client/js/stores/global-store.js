import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'; // required for store time traveling tool, otherwise regular react-router works fine
import { createBrowserHistory } from 'history';
import { reducer as reduxFormReducer } from 'redux-form';
// import the root reducer
import thunkMiddleware from 'redux-thunk';
import userReducer from '../reducers/user-reducer';
import todosReducer from '../reducers/todos-reducer';

/**
 * Global store
 * 
 */

// create an object with the default data
export const defaultState = {
    user: {
        attributes: {},
        isUserLogged: false,
        loginFormData: {
            username: '',
            password: ''
        },
        isRequestingLogin: false, // true if is logging in
        isRequestingLogout: false, // true if is logging out
        isCheckingAuthentication: false, // true if is checking user authentication
        loginError: false,
        logoutError: false
    },
    todos: {
        list: [],
        isRequestingTodos: false,
        todosRequestError: false
    }
};

// enhancers config
const devToolsEnhancer = window.devToolsExtension ? window.devToolsExtension() : (f) => f;
const middlewareEnhancer = applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
);

let enhancers = compose(middlewareEnhancer);
if (process.env.NODE_ENV !== 'production') {
    enhancers = compose(middlewareEnhancer, devToolsEnhancer)
}

// store creation
const store = createStore(combineReducers({
    user: userReducer,
    todos: todosReducer,
    routing: routerReducer,
    form: reduxFormReducer
}), defaultState, enhancers);

export const history = syncHistoryWithStore(createBrowserHistory(), store);

export default store;
