// src/interfaces/IUserProfileService.ts

export interface ITweetActionService {
    postTweet(content: string, additionalData?: any): Promise<{ success: boolean; tweetId?: string; error?: string }>;
    likeTweet(userId: string, tweetId: string): Promise<{ success: boolean; error?: string }>;
    getTweetLikesCount(tweetId: string): Promise<number>;
    retweet(tweetId: string): Promise<{ success: boolean; error?: string }>;
    commentOnTweet(tweetId: string, comment: string): Promise<{ success: boolean; error?: string }>;
    deleteTweet(tweetId: string): Promise<{ success: boolean; error?: string }>;
    highlightTweet(userId: string, tweetId: string): Promise<{ success: boolean; error?: string }>;
    // Additional tweet-related actions can be added here
    isTweetLikedByUser(userId: string, tweetId: string): Promise<boolean>;
    isTweetRetweetedByUser(userId: string, tweetId: string): Promise<boolean>;
    isTweetCommentedByUser(userId: string, tweetId: string): Promise<boolean>;
    isTweetHighlightedByUser(userId: string, tweetId: string): Promise<boolean>;

}
