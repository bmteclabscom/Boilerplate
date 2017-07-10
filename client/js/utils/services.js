import 'whatwg-fetch';
import Promise from 'promise-polyfill';
import queryString from 'query-string';

if (!window.Promise) {
    window.Promise = Promise;
}

const GET_OPTIONS = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
    },
    credentials: 'include'
};

const POST_OPTIONS = {
    ...GET_OPTIONS,
    method: 'POST'
};

/**
 * Encapsulates JSON HTTP requests
 */
export default {

    /**
     * Authenticates user
     * 
     * @param {String} username 
     * @param {String} password 
     */
    login(username, password) {
        return fetch('/api/v1/users/login', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: queryString.stringify({username, password})
        }).then(handleResponse)
            .catch(error => Promise.reject(error));
    },

    /**
     * Logs out user
     * 
     */
    logout() {
        return fetch('/api/v1/users/logout', {
            credentials: 'include',
            method: 'POST'
        });
    },

    /**
     * Verifies if there is an active user session in the browser
     */
    isAuthenticated() {
        return fetch('/api/v1/users/check-login', GET_OPTIONS)
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    },

    getTodos() {
        return fetch('/api/v1/todos/list', GET_OPTIONS)
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    }
}

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    }
    throw new Error(response.status);
}