/**
 * Service interface for performing various actions on tweets.
 */
export interface ITweetActionService {
    postTweet(tweet: any, token: string, additionalData?: any): Promise<{
        success: boolean;
        tweetId?: string;
        error?: string
    }>;

    likeTweet(userId: string, tweetId: string, token: string): Promise<{ success: boolean; error?: string }>;

    retweet(tweetId: string, token: string): Promise<{ success: boolean; error?: string }>;

    commentOnTweet(comment: any, token: string): Promise<{ success: boolean; error?: string }>;

    uploadMedia(file: File, token: string): Promise<{ success: boolean; downloadURL?: string; error?: string }>;

    deleteTweet(tweetId: string, token: string): Promise<{ success: boolean; error?: string }>;

    highlightTweet(userId: string, tweetId: string, token: string): Promise<{ success: boolean; error?: string }>;
}
