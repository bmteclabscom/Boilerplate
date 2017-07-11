import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as FormFields from '../components/form-fields';
import {strings} from '../utils/strings';
import * as Validations from '../utils/form-validations';

/**
 * Contains login form and fields
 * 
 */
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
                    placeholder={strings.fieldPlaceholderUsername}
                    component={FormFields.renderTextField}
                    className="required" 
                    label={strings.fieldLabelUsername} validate={[Validations.required, Validations.email]}/>
                <Field name="password"
                    placeholder={strings.fieldPlaceholderPassword}
                    component={FormFields.renderPasswordField}
                    className="required" 
                    label={strings.fieldLabelPassword} validate={[Validations.required]}/>
                <div className="text-center">
                    <button disabled={requesting} type="submit" className="btn btn-outline-primary">{strings.buttonLabelLogin}</button>
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

export default LoginForm;