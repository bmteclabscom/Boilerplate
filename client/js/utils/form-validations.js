import {strings} from '../utils/strings';

// REQUIRED: validates single value
export const required = value => value ? undefined : strings.validationRequired;

// REQUIRED: validates if valid email value
export const email = value => (typeof value === 'undefined' || value.trim() === '' || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) ? undefined : strings.validationEmail;
