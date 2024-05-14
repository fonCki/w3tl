import { Tweet } from '@models/tweet';

export interface ITweetService {
    // GET METHODS
    getAllTweets(): Promise<Tweet[]>;

    getTweetById(postId: string): Promise<Tweet | null>;

    getTweetsByUserId(userId: string): Promise<Tweet[]>;

    getTweetsByUserNickname(userNickname: string): Promise<Tweet[]>;

    getTweetsWithMedia(): Promise<Tweet[]>;

    getAllTweetsThatUserLikes(userId: string): Promise<Tweet[]>;

    getAllTweetsThatUserRetweets(userId: string): Promise<Tweet[]>;

    getAllTweetsThatUserHighlights(userId: string): Promise<Tweet[]>;

    getAllTweetsThatUserComments(userId: string): Promise<Tweet[]>;
    getTweetLikesCount(tweetId: string): Promise<number>;

    searchTweets(query: string): Promise<Tweet[]>;

    searchTweetsWithLimit(query: string, limit: number): Promise<Tweet[]>;

    isTweetLikedByUser(userId: string, tweetId: string): Promise<boolean>;
    isTweetRetweetedByUser(userId: string, tweetId: string): Promise<boolean>;
    isTweetCommentedByUser(userId: string, tweetId: string): Promise<boolean>;
    isTweetHighlightedByUser(userId: string, tweetId: string): Promise<boolean>;

    getCommentById(replyId: string): Promise<Comment>;

    getAllCommentsByTweetId(tweetId: string): Promise<Comment[]>;
    getHowManyCommentsByTweetId(tweetId: string): Promise<number>;

    getAllCommentsByUserId(userId: string): Promise<Comment[]>;
}

