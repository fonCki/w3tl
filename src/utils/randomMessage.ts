import { PROFANITY_MESSAGES } from '@constants/profanityMessages';

/**
 * Returns a random profanity message from the PROFANITY_MESSAGES array.
 *
 * @returns {string} A random profanity message.
 */
export const getRandomProfanityMessage = () => {
    const randomIndex = Math.floor(Math.random() * PROFANITY_MESSAGES.length);
    return PROFANITY_MESSAGES[randomIndex];
};
