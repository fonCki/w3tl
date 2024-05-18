/**
 * Represents a service for handling tweets.
 *
 * @interface ITweetService
 */
export interface ITweetService {
    // GET METHODS
    getAllTweets(): Promise<any[]>;
    getTweetById(postId: string): Promise<any>;
    getTweetsByUserId(userId: string): Promise<any[]>;
    getTweetsByUserNickname(userNickname: string): Promise<any[]>;
    getTweetsWithMedia(): Promise<any[]>;
    getAllTweetsThatUserLikes(userId: string): Promise<any[]>;
    getAllTweetsThatUserRetweets(userId: string): Promise<any[]>;
    getAllTweetsThatUserHighlights(userId: string): Promise<any[]>;
    getAllTweetsThatUserComments(userId: string): Promise<any[]>;
    getTweetLikesCount(tweetId: string): Promise<number>;

    // SEARCH METHODS
    searchTweets(query: string): Promise<any[]>;
    searchTweetsWithLimit(query: string, limit: number): Promise<any[]>;

    // BOOLEAN METHODS
    isTweetLikedByUser(userId: string, tweetId: string): Promise<boolean>;
    isTweetRetweetedByUser(userId: string, tweetId: string): Promise<boolean>;
    isTweetCommentedByUser(userId: string, tweetId: string): Promise<boolean>;
    isTweetHighlightedByUser(userId: string, tweetId: string): Promise<boolean>;

    // GET COMMENTS METHODS
    getCommentById(replyId: string): Promise<any>;
    getAllCommentsByTweetId(tweetId: string): Promise<any[]>;
    getHowManyCommentsByTweetId(tweetId: string): Promise<number>;
    getAllCommentsByUserId(userId: string): Promise<any[]>;
}

