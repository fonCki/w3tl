/**
 * The default background image for the application.
 *
 * @type {string}
 */
export const DEFAULT_BACKGROUND_IMAGE: string = "https://source.unsplash.com/random/800x600";
/**
 * Maximum length allowed for a tweet.
 *
 * @type {number}
 * @constant
 * @default 145
 * @since 1.0.0
 */
export const MAX_TWEET_LENGTH: number = 145;
/**
 * The maximum length allowed for a comment.
 *
 * @type {number}
 */
export const MAX_COMMENT_LENGTH: number = 145;

/**
 * Retrieve the default avatar image for a given username.
 *
 * @param {string} username - The username for which to retrieve the default avatar image.
 * @returns {string} The URL of the default avatar image.
 */
export const getDefaultAvatarImage = (username: string): string => {
    // Using a placeholder service
    return (username === 'default') ?
        LOCAL_DEFAULT_AVATAR_IMAGE :
        `https://robohash.org/${encodeURIComponent(username)}.png?set=set1&size=150x150`;
};

/**
 * The default local banner image path.
 *
 * @type {string}
 */
export const LOCAL_DEFAULT_BANNER_IMAGE: string = "../../src/assets/images/default-banner.png";
/**
 * The default avatar image path.
 *
 * @type {string}
 */
export const LOCAL_DEFAULT_AVATAR_IMAGE: string = "../../src/assets/images/default-avatar.png";
/**
 * Represents the delay in seconds for a toggle operation.
 *
 * @type {number}
 * @default 5
 */
export const TOGGLE_DELAY_SECONDS = 5;  // Amount of seconds for the delay

/**
 * The URL of the backend API for the Onion Architecture.
 *
 * @type {string}
 * @default import.meta.env.VITE_ONION_ARCHITECTURE_BACKEND_API_URL
 */
export const BACKEND_URL = import.meta.env.VITE_ONION_ARCHITECTURE_BACKEND_API_URL + '/api';



