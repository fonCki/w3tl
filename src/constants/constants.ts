export const DEFAULT_BACKGROUND_IMAGE: string = "https://source.unsplash.com/random/800x600";
export const MAX_TWEET_LENGTH: number = 145;
export const MAX_COMMENT_LENGTH: number = 145;

export const getDefaultAvatarImage = (username: string): string => {
    // Using a placeholder service
    return (username === 'default') ?
        LOCAL_DEFAULT_AVATAR_IMAGE :
        `https://robohash.org/${encodeURIComponent(username)}.png?set=set1&size=150x150`;
};

export const LOCAL_DEFAULT_BANNER_IMAGE: string = "../../src/assets/images/default-banner.png";
export const LOCAL_DEFAULT_AVATAR_IMAGE: string = "../../src/assets/images/default-avatar.png";
export const MACHINE_LEARNING_SERVICE_URL: string = 'http://4.225.70.129:8000/';
export const TOGGLE_DELAY_SECONDS = 5;  // Amount of seconds for the delay



