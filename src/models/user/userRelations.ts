export interface UserRelations {
    userId: number;
    followers: number[]; // Array of user IDs who are followers
    following: number[]; // Array of user IDs who the user is following
    likedTweetIds: number[]; // Array of tweet IDs that the user has liked
    retweetedTweetIds: number[]; // Array of tweet IDs that the user has retweeted
    highlightedTweetIds: number[]; // Array of tweet IDs that the user has highlighted
}