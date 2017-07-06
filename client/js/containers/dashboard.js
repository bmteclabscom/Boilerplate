import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Navigation from '../components/navigation';
import ErrorNotification from '../components/error-notification';
import ProgressIndicator from '../components/progress-indicator';
import {strings} from '../utils/strings';
import Tools from '../utils/tools';
import * as userActionCreators from '../actions/user-actions';
import * as todosActionCreators from '../actions/todos-actions';
import Services from '../utils/services';

const actionCreators = {...userActionCreators, ...todosActionCreators};

class Dashboard extends Component {

    componentDidMount() {
        Tools.doIfLogged(_ => this.props.getTodos(), this.props.user);
    }

    componentDidUpdate() {
        const {user, getTodos} = this.props;
        if (!user.isUserLogged) {
            this.goToLogin();
        }
    }

    componentWillReceiveProps(nextProps) {
        Tools.doIfLogged(_ => this.props.getTodos(), this.props.user, nextProps.user);
    }

    render() {
        const {logout, user, todos, getTodos} = this.props;
        const {todosRequestError, isRequestingTodos} = todos;
        return (
            <div className="dashboard">
                <div className="container-fluid">
                    <div className="row-fluid">
                        <div className="col-md-12">
                            <Navigation user={user} onLogout={_ => logout()}/>
                        </div>
                    </div>
                    <div className="row-fluid">
                        <div className="col-md-3">
                            <ul className="nav nav-pills nav-stacked">
                                <li className="active"><a href="#">Home</a></li>
                                <li><a href="#">Categories</a></li>
                                <li><a href="#">Profile</a></li>
                            </ul>
                        </div>
                        <div className="col-md-9">
                            <div className="page-header">
                                <h1>Welcome {user.attributes.firstName} <small><a href="#" onClick={_ => getTodos()}>Refresh</a></small></h1>
                            </div>
                            <div className="list-group">
                                {todos.list.map((todo, index) => 
                                    <a key={index} href="#" className="list-group-item">
                                        <h4 className="list-group-item-heading">{todo.title}</h4>
                                        <p className="list-group-item-text">{todo.description}</p>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ProgressIndicator show={isRequestingTodos || user.isRequestingLogout}/>
                <ProgressIndicator show={user.isCheckingAuthentication} title={strings.checkingAuthentication} type="circular"/>
                <ErrorNotification show={!!todosRequestError} errorProvider={todosRequestError}/>
            </div>
        );
    }

    goToLogin() {
        this.props.history.push('/');
    }
}

function mapStateToProps(state) { // maps redux state to component props
    return {
        ...state
    }
}

function mapDispatchToProps(dispatch) { // maps redux actions to component props
     return bindActionCreators(actionCreators, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));