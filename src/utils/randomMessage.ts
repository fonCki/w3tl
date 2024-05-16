import { PROFANITY_MESSAGES } from '@constants/profanityMessages';

export const getRandomProfanityMessage = () => {
    const randomIndex = Math.floor(Math.random() * PROFANITY_MESSAGES.length);
    return PROFANITY_MESSAGES[randomIndex];
};
