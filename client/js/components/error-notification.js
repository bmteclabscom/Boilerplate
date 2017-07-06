import React, { Component } from 'react';

import {strings} from '../utils/strings';

/**
 * Displays errors based on communication with server basically, 
 * generic error or authentication error for example
 */
class ErrorNotification extends Component {

    static get defaultProps() {
        return {
            show: false,
            positionCss: 'notification-bottom', // notification-bottom or notification-top
            errorProvider: null // Error object
        }
    }

    render() {
        const {positionCss, show, errorProvider} = this.props;
        const showCss = show ? 'notification-visible' : '';
        const message = !errorProvider ? strings.errorMessage : this.retrieveErrorMessage(errorProvider);
        
        return (
            <div className={`notification ${positionCss} ${showCss}`}>
                <div className="notification-alert alert alert-danger" role="alert">
                    {message}
                </div>
            </div>
        );
    }

    /**
     * Retrieve a message based on http error code
     * @param {Error} errorProvider 
     */
    retrieveErrorMessage(errorProvider) {
        const errorNumber = parseInt(errorProvider.message);
        switch(errorNumber) {
            case 401:
                return strings.errorAuthenticationFailed;
        }
        return strings.errorMessage;
    }
}

export default ErrorNotification;