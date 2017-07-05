import LocalizedStrings from 'react-localization';

export const strings = new LocalizedStrings({
    en: {
        fieldLabelUsername: 'Email',
        fieldLabelPassword: 'Password',

        buttonLabelLogin: 'Login',
        buttonLabelLogout: 'Logout',

        validationRequired: 'Required',
        validationEmail: 'Invalid Email Format'

    },
    es: {
        fieldLabelUsername: 'Correo Electrónico',
        fieldLabelPassword: 'Contraseña',

        buttonLabelLogin: 'Ingresar',
        buttonLabelLogout: 'Salir',

        validationRequired: 'Campo Requerido',
        validationEmail: 'Formato de correo electronico inválido'

    }
});