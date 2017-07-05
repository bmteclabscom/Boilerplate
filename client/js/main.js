import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, IndexRedirect, browserHistory, Redirect, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';

import mainCss from '../css/main.scss';
import store, {history} from './stores/global-store';
import Dashboard from './containers/dashboard';
import Login from './containers/login';

render((
    <Provider store={store}>   
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/dashboard" component={Dashboard}/>
            </Switch>
        </Router>
    </Provider>
), document.querySelector('application'));
