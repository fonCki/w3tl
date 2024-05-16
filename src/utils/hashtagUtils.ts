// utils/hashtagUtils.ts
export const containsHashtag = (text: string): boolean => {
    const hashtagRegex = /#[\w-]+/g;
    return hashtagRegex.test(text);
};
