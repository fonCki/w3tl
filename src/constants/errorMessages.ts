/**
 * Contains error messages for various scenarios.
 * @type {Object}
 * @property {string} usernameRequired - Error message when username is required.
 * @property {string} usernameTooShort - Error message when username is too short.
 * @property {string} usernameTaken - Error message when username is already taken.
 * @property {string} nameRequired - Error message when name is required.
 * @property {string} lastnameRequired - Error message when last name is required.
 * @property {string} emailInvalid - Error message when email is not valid.
 * @property {string} passwordTooShort - Error message when password is too short.
 * @property {string} signupFailed - Error message when sign up fails.
 * @property {string} networkError - Error message when a network error occurs.
 * @property {string} passwordTooLong - Error message when password is too long.
 * @property {string} bioTooLong - Error message when bio is too long.
 * @property {string} locationTooLong - Error message when location is too long.
 */
export const ERROR_MESSAGES = {
    usernameRequired: 'Username is required.',
    usernameTooShort: 'Username must be more than 3 characters.',
    usernameTaken: 'Username is already taken.',
    nameRequired: 'Name is required.',
    lastnameRequired: 'Last name is required.',
    emailInvalid: 'Email is not valid.',
    passwordTooShort: 'Password must be at least 6 characters long.',
    signupFailed: 'Signup failed. Please try again.',
    networkError: 'A network error occurred. Please check your connection.',
    // Add any other error messages as needed
    passwordTooLong: 'Password must be less than 128 characters long.',
    bioTooLong: 'Bio must be less than 500 characters long.',
    locationTooLong: 'Location must be less than 100 characters long.',

};
