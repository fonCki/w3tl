/**
 * Checks if a text contains a hashtag.
 *
 * @param {string} text - The text to check for hashtags.
 * @returns {boolean} - `true` if the text contains a hashtag, `false` otherwise.
 */
export const containsHashtag = (text: string): boolean => {
    const hashtagRegex = /#[\w-]+/g;
    return hashtagRegex.test(text);
};
