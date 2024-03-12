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

    searchTweets(query: string): Promise<any[]>;
    searchTweetsWithLimit(query: string, limit: number): Promise<any[]>;

    isTweetLikedByUser(userId: string, tweetId: string): Promise<boolean>;
    isTweetRetweetedByUser(userId: string, tweetId: string): Promise<boolean>;
    isTweetCommentedByUser(userId: string, tweetId: string): Promise<boolean>;
    isTweetHighlightedByUser(userId: string, tweetId: string): Promise<boolean>;

    getCommentById(replyId: string): Promise<any>;
    getAllCommentsByTweetId(tweetId: string): Promise<any[]>;
    getHowManyCommentsByTweetId(tweetId: string): Promise<number>;
    getAllCommentsByUserId(userId: string): Promise<any[]>;
}

