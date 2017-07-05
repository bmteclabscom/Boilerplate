
// REQUIRED: validates single value
export const required = value => value ? undefined : 'field-required';

// REQUIRED: validates if valid email value
export const email = value => (typeof value === 'undefined' || value.trim() === '' || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) ? undefined : 'field-email-invalid';
