

export const DEFAULT_BACKGROUND_IMAGE: string = "https://source.unsplash.com/random/800x600";

export const getDefaultAvatarImage = (username: string): string => {
    // Using a placeholder service
    return `https://robohash.org/${encodeURIComponent(username)}.png?set=set1&size=150x150`;
};


