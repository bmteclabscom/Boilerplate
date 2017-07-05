import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'; // required for store time traveling tool, otherwise regular react-router works fine
import { createBrowserHistory } from 'history';
import { reducer as reduxFormReducer } from 'redux-form';
// import the root reducer
import thunkMiddleware from 'redux-thunk';
import userReducer from '../reducers/user-reducer';
 
/**
 * Global store
 * 
 */

// create an object with the default data
export const defaultState = {
    user: {
        attributes: null,
        isUserLogged: false,
        isRequestingLogin: false,
        loginFormData: {
            username: '',
            password: ''
        }
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
    routing: routerReducer,
    form: reduxFormReducer
}), defaultState, enhancers);

export const history = syncHistoryWithStore(createBrowserHistory(), store);

export default store;
