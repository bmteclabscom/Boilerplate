import React, { Component } from 'react';

class ProgressIndicator extends Component {

    static get defaultProps() {
        return {
            show: false
        }
    }

    render() {
        const {show} = this.props;
        const showCss = show ? 'loading' : '';
        return (
            <div className="progress-indicator">
                <div className={`progress-indicator-bar ${showCss}`}>
                    <div className="progress-indicator-bar-animation"></div>
                </div>
            </div>
        );
    }
}

export default ProgressIndicator;