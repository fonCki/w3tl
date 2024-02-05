import { ERROR_MESSAGES } from '@constants/errorMessages';

export const validateUsername = (username:string) => {
    if (!username.trim()) return ERROR_MESSAGES.usernameRequired;
    if (username.length < 4) return ERROR_MESSAGES.usernameTooShort;
    return '';
};

export const validateName = (name:string) => {
    return name.trim() ? '' : ERROR_MESSAGES.nameRequired;
};

export const validateLastname = (lastname:string) => {
    return lastname.trim() ? '' : ERROR_MESSAGES.lastnameRequired;
};

export const validateEmail = (email:string) => {
    const emailRegex = /^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email) && email.length > 0 ? '' : ERROR_MESSAGES.emailInvalid;
};

export const validatePassword = (password:string) => {
    return password.length >= 6 ? '' : ERROR_MESSAGES.passwordTooShort;
};
