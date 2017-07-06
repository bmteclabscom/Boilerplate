import LocalizedStrings from 'react-localization';

export const strings = new LocalizedStrings({
    en: {
        fieldLabelUsername: 'Email',
        fieldPlaceholderUsername: 'Email...',
        fieldLabelPassword: 'Password',
        fieldPlaceholderPassword: 'Password',

        buttonLabelLogin: 'Login',
        buttonLabelLogout: 'Logout',

        validationRequired: 'Required',
        validationEmail: 'Invalid Email Format',
        validationLogin: 'Invalid username or password',

        errorMessage: 'There was a problem, please try again or refresh page',
        errorAuthenticationFailed: 'There was a problem, authentication failed or expired',

        checkingAuthentication: 'Verifying authentication...'
    },
    es: {
        fieldLabelUsername: 'Correo Electrónico',
        fieldPlaceholderUsername: 'Correo Electrónico...',
        fieldLabelPassword: 'Contraseña',
        fieldPlaceholderPassword: 'Contraseña...',

        buttonLabelLogin: 'Ingresar',
        buttonLabelLogout: 'Salir',

        validationRequired: 'Campo Requerido',
        validationEmail: 'Formato de correo electronico inválido',
        validationLogin: 'Usuario o contraseña incorrecto',

        errorMessage: 'Hubo un problema, por favor intente de nuevo o refresque la pagina',
        errorAuthenticationFailed: 'Hubo un problema, sesión invalida o expirada',

        checkingAuthentication: 'Verificando autenticación...'
    }
});