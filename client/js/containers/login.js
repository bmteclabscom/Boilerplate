import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Services from '../utils/services';
import {strings} from '../utils/strings';
import ProgressIndicator from '../components/progress-indicator';
import LoginForm from '../components/login-form';
import * as userActionCreators from '../actions/user-actions';

class Login extends Component {
    
    componentDidUpdate() {
        const {user} = this.props;
        if (user.isUserLogged) {
            this.goToDashboard();
        }
    }

    onSubmit(data) {
        const {username, password} = data;
        this.props.login(username, password);
    }

    render() {
        const {user} = this.props;
        return (
            <div className="login-wrapper">
                <div className="login login-centered">
                    <div className="container-fluid">
                        <div className="row-fluid">
                            <div className="col-md-12">
                                <LoginForm onSubmit={this.onSubmit.bind(this)} requesting={user.isRequestingLogin}/>
                                <div className="text-center">
                                    <span hidden={!user.loginError} className="form-group-error">{strings.validationLogin}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ProgressIndicator show={user.isCheckingAuthentication} title={strings.checkingAuthentication} type="circular"/>
                <ProgressIndicator show={user.isRequestingLogin}/>
            </div>
        );
    }

    goToDashboard() {
        this.props.history.push('/dashboard');
    }
}

function mapStateToProps(state) { // maps redux state to component props
    return {
        ...state
    }
}

function mapDispatchToProps(dispatch) { // maps redux actions to component props
     return bindActionCreators(userActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);