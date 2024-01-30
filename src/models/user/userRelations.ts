export interface UserRelations {
    id: string;                     // User's unique identifier
    followers: string[];            // Array of user IDs who are followers
    following: string[];            // Array of user IDs who the user is following
    likedTweetIds: string[];        // Array of tweet IDs that the user has liked
    retweetedTweetIds: string[];    // Array of tweet IDs that the user has retweeted
    highlightedTweetIds: string[];  // Array of tweet IDs that the user has highlighted
}
