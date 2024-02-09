export interface ITweetService {
    // GET METHODS
    getAllTweets(): Promise<any[]>;
    getTweetById(tweetId: string): Promise<any>;
    getTweetsByUserId(userId: string): Promise<any[]>;
    getTweetsByUserNickname(userNickname: string): Promise<any[]>;
    getTweetsWithMedia(): Promise<any[]>;
    getAllTweetsThatUserLikes(userId: string): Promise<any[]>;
    getAllTweetsThatUserRetweets(userId: string): Promise<any[]>;
    getAllTweetsThatUserComments(userId: string): Promise<any[]>;
    getAllTweetsThatUserHighlights(userId: string): Promise<any[]>;

    searchTweets(query: string): Promise<any[]>;
    searchTweetsWithLimit(query: string, limit: number): Promise<any[]>;

    isTweetLikedByUser(tweetId: string, userId: string): Promise<boolean>;
    isTweetRetweetedByUser(tweetId: string, userId: string): Promise<boolean>;
    isTweetCommentedByUser(tweetId: string, userId: string): Promise<boolean>;
    isTweetHighlightedByUser(tweetId: string, userId: string): Promise<boolean>;

    getReplyById(replyId: string): Promise<any>;
    getAllRepliesByTweetId(tweetId: string): Promise<any[]>;
    getHowManyRepliesByTweetId(tweetId: string): Promise<number>;
    getAllRepliesByUserId(userId: string): Promise<any[]>;
    getTweetLikesCount(tweetId: string): Promise<number>;
}

