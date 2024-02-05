// src/interfaces/IUserProfileService.ts

export interface ITweetActionService {
    postTweet(userId: string, content: string, additionalData?: any): Promise<{ success: boolean; tweetId?: string; error?: string }>;
    likeTweet(userId: string, tweetId: string): Promise<{ success: boolean; error?: string }>;
    retweet(userId: string, tweetId: string): Promise<{ success: boolean; error?: string }>;
    commentOnTweet(userId: string, tweetId: string, comment: string): Promise<{ success: boolean; error?: string }>;
    deleteTweet(userId: string, tweetId: string): Promise<{ success: boolean; error?: string }>;
    // Additional tweet-related actions can be added here
}
