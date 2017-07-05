import React, { Component } from 'react';
import { Field } from 'redux-form';

/**
 * Renders regular text tag field
 */
export const renderTextField = ({ input, label, type, placeholder, className, options, meta: { touched, error }, children }) => (
    <div className={`form-group ${className}`}>
        <label className="control-label" hidden={!label}>{label}</label>
        <input {...input} placeholder={placeholder} type="text" className="form-control"/>
        {touched && error && <span className="form-group-error">{error}</span>}
    </div>
);

/**
 * Renders password text tag field
 */
export const renderPasswordField = ({ input, label, type, placeholder, className, options, meta: { touched, error }, children }) => (
    <div className={`form-group ${className}`}>
        <label className="control-label" hidden={!label}>{label}</label>
        <input {...input} placeholder={placeholder} type="password" className="form-control"/>
        {touched && error && <span className="form-group-error">{error}</span>}
    </div>
);