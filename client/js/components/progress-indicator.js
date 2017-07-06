import React, { Component } from 'react';

class ProgressIndicator extends Component {

    static get defaultProps() {
        return {
            show: false,
            type: 'bar',
            title: ''
        }
    }

    render() {
        const {type} = this.props;
        return (
            <div className="progress-indicator">
                {type === 'bar' ? this.renderProgressBar() : null}
                {type === 'circular' ? this.renderProgressCircular() : null}
            </div>
        );
    }

    renderProgressBar() {
        const {show} = this.props;
        const showCss = show ? 'loading' : '';
        return (
            <div className={`progress-indicator-bar ${showCss}`}>
                <div className="progress-indicator-bar-animation"></div>
            </div>
        )
    }

    renderProgressCircular() {
        const {show, title} = this.props;
        const showCss = show ? 'loading' : '';
        return (
            <div className={`progress-indicator-circular-modal ${showCss}`}>
                <div className="progress-indicator-circular-wrapper">
                    <div className="progress-indicator-circular loading">
                        <div className="circularG_1 circularG"></div>
                        <div className="circularG_2 circularG"></div>
                        <div className="circularG_3 circularG"></div>
                        <div className="circularG_4 circularG"></div>
                        <div className="circularG_5 circularG"></div>
                        <div className="circularG_6 circularG"></div>
                        <div className="circularG_7 circularG"></div>
                        <div className="circularG_8 circularG"></div>
                    </div>
                    <div className="progress-indicator-circular-modal-title">
                        {title}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProgressIndicator;