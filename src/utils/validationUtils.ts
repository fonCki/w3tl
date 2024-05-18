import { ERROR_MESSAGES } from '@constants/errorMessages';

/**
 * Validates if the username is valid.
 *
 * @param {string} username - The username to be validated.
 * @returns {string} - An error message if the username is invalid, otherwise an empty string.
 */
export const validateUsername = (username:string) => {
    if (!username.trim()) return ERROR_MESSAGES.usernameRequired;
    if (username.length < 4) return ERROR_MESSAGES.usernameTooShort;
    return '';
};

/**
 * Validates a given name.
 *
 * @param {string} name - The name to be validated.
 * @returns {string} - An error message if the name is empty or whitespace, otherwise an empty string.
 */
export const validateName = (name:string) => {
    return name.trim() ? '' : ERROR_MESSAGES.nameRequired;
};

/**
 * Validate the lastname field.
 * @param {string} lastname - The lastname to be validated.
 * @returns {string} - An error message if the lastname is empty, otherwise an empty string.
 */
export const validateLastname = (lastname:string) => {
    return lastname.trim() ? '' : ERROR_MESSAGES.lastnameRequired;
};

/**
 * Validates an email address.
 *
 * @param {string} email - The email address to be validated.
 * @returns {string} - An empty string if the email is valid, otherwise an error message.
 */
export const validateEmail = (email:string) => {
    const emailRegex = /^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email) && email.length > 0 ? '' : ERROR_MESSAGES.emailInvalid;
};

/**
 * Validates the length of a location string.
 *
 * @param {string} location - The location string to validate.
 * @returns {string} - An empty string if the location string length is less than 100 characters,
 *                    otherwise returns the error message "locationTooLong".
 */
export const validateLocation = (location: string) => {
    return location?.length < 100 ? '' : ERROR_MESSAGES.locationTooLong;

};

/**
 * Validates the bio provided.
 *
 * @param {string} bio - The biography to validate.
 * @returns {string} - An error message if the bio is too long, otherwise an empty string.
 */
export const validateBio = (bio: string) => {

    return bio?.length < 500 ? '' : ERROR_MESSAGES.bioTooLong;
};

/**
 * Validates the given password.
 *
 * @param {string} password - The password to be validated.
 * @returns {string} - Returns an error message if the password is invalid, otherwise returns an empty string.
 */
export const validatePassword = (password:string) => {
    if (password.length < 6) return ERROR_MESSAGES.passwordTooShort;
    if (password.length > 128) return ERROR_MESSAGES.passwordTooLong;
    return '';
};
