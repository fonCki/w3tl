import { User } from '@models/user/user';

/**
 * Represents a response type object.
 *
 * @typedef {Object} ResponseType
 * @property {boolean} success - Represents whether the response was successful or not.
 * @property {User} [user] - Represents a user object.
 * @property {string} [token] - Represents a token string.
 * @property {string} [privateKey] - Represents a private key string.
 * @property {string} [error] - Represents an error message string.
 */
export type ResponseType = {
    success: boolean;
    user?: User;
    token?: string;
    privateKey?: string;
    error?: string;
};