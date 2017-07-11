import React, { Component } from 'react';
import { Field } from 'redux-form';

/**
 * Renders regular text tag field
 */
export const renderTextField = ({ input, label, type, placeholder, className, options, meta: { touched, error }, children }) => {
    const hasError = touched && error;
    const errorCss = hasError ? 'has-danger' : '';
    const errorFieldCss = hasError ? 'form-control-danger' : '';
    return (
        <div className={`form-group ${className} ${errorCss}`}>
            <label className="form-control-label" hidden={!label}>{label}</label>
            <input {...input} placeholder={placeholder} type="text" className={`form-control ${errorFieldCss}`}/>
            {hasError && <div className="form-control-feedback">{error}</div>}
        </div>
    ); 
}


/**
 * Renders password text tag field
 */
export const renderPasswordField = ({ input, label, type, placeholder, className, options, meta: { touched, error }, children }) => {
    const hasError = touched && error;
    const errorCss = hasError ? 'has-danger' : '';
    const errorFieldCss = hasError ? 'form-control-danger' : '';
    return (
        <div className={`form-group ${className} ${errorCss}`}>
            <label className="form-control-label" hidden={!label}>{label}</label>
            <input {...input} placeholder={placeholder} type="password" className={`form-control ${errorFieldCss}`}/>
            {hasError && <div className="form-control-feedback">{error}</div>}
        </div>
    ); 
}