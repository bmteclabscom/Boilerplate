import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Services from '../utils/services';
import {strings} from '../utils/strings';
import * as FormFields from '../components/form-fields';
import ProgressIndicator from '../components/progress-indicator';
import * as Validations from '../utils/form-validations';
import * as userActionCreators from '../actions/user-actions';

class LoginForm extends Component {

    static get defaultProps() {
        return {
            requesting: false // flag to detect whether or not data is being sent
        }
    }

    render() {
        const {handleSubmit, onSubmit, requesting} = this.props;
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <Field name="username"
                    placeholder=""
                    component={FormFields.renderTextField}
                    className="required" 
                    label={strings.fieldLabelUsername} validate={[Validations.required]}/>
                <Field name="password"
                    placeholder=""
                    component={FormFields.renderPasswordField}
                    className="required" 
                    label={strings.fieldLabelPassword} validate={[Validations.required]}/>
                <div className="text-center">
                    <button disabled={requesting} type="submit" className="btn btn-primary">{strings.buttonLabelLogin}</button>
                </div>
            </form>
        );
    }
}

LoginForm = reduxForm({
    form: 'login', // a unique identifier for this form
    enableReinitialize: true
})(LoginForm);

LoginForm = connect(
    state => ({
        initialValues: state.user.loginFormData // pull initial values from redux store
    })
)(LoginForm)

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